const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { connectDB, closeDB } = require('../config/db');

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_jwt_secret_key_12345';

let app;
let passengerToken;
let staffToken;
let adminToken;
let createdItemId;
let createdClaimId;

test.before(async () => {
  await connectDB();
  app = require('../server');
  // Seed the test database
  const seedAll = require('../utils/seedData');
  await seedAll();
});

test.after(async () => {
  await closeDB();
});

test.describe('BackToYou API Test Suite', () => {
  // 1. Health Check Endpoint
  test('GET /api/health returns 200 and status UP', async () => {
    const res = await request(app).get('/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'UP');
    assert.equal(typeof res.body.uptime, 'number');
  });

  // 2. Authentication Tests
  test('POST /api/auth/login logs in passenger successfully', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'sarah.jenkins@metrotransit.org',
        password: 'TransitPass2026!',
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.token);
    assert.equal(res.body.user.role, 'Passenger');
    passengerToken = res.body.token;
  });

  test('POST /api/auth/login logs in staff successfully', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'custody.civic@metrotransit.org',
        password: 'TransitPass2026!',
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.user.role, 'Staff');
    staffToken = res.body.token;
  });

  test('POST /api/auth/login logs in admin successfully', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin.director@transit.gov',
        password: 'TransitPass2026!',
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.user.role, 'Admin');
    adminToken = res.body.token;
  });

  test('POST /api/auth/register prevents duplicate email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Duplicate Sarah',
        email: 'sarah.jenkins@metrotransit.org',
        password: 'AnotherPassword123!',
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });

  test('POST /api/auth/register creates new passenger account', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Alex Rivera',
        email: 'alex.rivera@commuter.org',
        password: 'CommuterPassword2026!',
        phone: '+1 (555) 777-8899',
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.token);
    assert.equal(res.body.user.name, 'Alex Rivera');
  });

  // 3. Items Management Tests
  test('GET /api/items retrieves lost and found items', async () => {
    const res = await request(app).get('/api/items');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.count > 0);
    assert.ok(Array.isArray(res.body.data));
  });

  test('GET /api/items filters by type and category', async () => {
    const res = await request(app).get('/api/items?type=Found&category=Electronics');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    res.body.data.forEach((item) => {
      assert.equal(item.type, 'Found');
      assert.equal(item.category, 'Electronics');
    });
  });

  test('GET /api/items searches by keyword', async () => {
    const res = await request(app).get('/api/items?keyword=Headphones');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.length >= 1);
    assert.ok(res.body.data[0].title.includes('Headphones'));
  });

  test('POST /api/items creates new lost report and triggers matcher', async () => {
    const res = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${passengerToken}`)
      .send({
        title: 'Silver Wireless Headphones',
        type: 'Lost',
        category: 'Electronics',
        color: 'Silver Grey',
        brand: 'Sony',
        description: 'Lost my silver headphones near Grand Central lounge waiting area.',
        transitType: 'Station',
        route: 'Grand Central Hub Waiting Lounge',
        location: 'Concourse waiting bench',
        date: '2026-10-10',
        timeApprox: '11:00 AM',
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.customId);
    assert.equal(res.body.data.status, 'Possible Match'); // Matched with TRX-905142!
    createdItemId = res.body.data.customId;
  });

  test('GET /api/items/:id/matches returns ranked match proposals', async () => {
    const res = await request(app).get(`/api/items/${createdItemId}/matches`);
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.count >= 1);
    assert.ok(res.body.matches[0].score >= 50);
    assert.ok(res.body.matches[0].reasons.length > 0);
  });

  // 4. Claims Management Tests
  test('POST /api/items/:id/claims files ownership claim on found item', async () => {
    const res = await request(app)
      .post('/api/items/TRX-491028/claims')
      .set('Authorization', `Bearer ${passengerToken}`)
      .send({
        claimantName: 'Sarah Jenkins',
        claimantPhone: '+1 (555) 234-8921',
        secretDetails: 'Laptop has a small crack near bottom left hinge and sticker on lid.',
        pickupStation: 'Civic Center Station Custody Desk Vault #B2',
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.claimId);
    createdClaimId = res.body.data.claimId;
  });

  test('GET /api/me/claims returns passenger claims', async () => {
    const res = await request(app)
      .get('/api/me/claims')
      .set('Authorization', `Bearer ${passengerToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.count >= 1);
  });

  test('GET /api/admin/claims protected against unauthorized passenger role', async () => {
    const res = await request(app)
      .get('/api/admin/claims')
      .set('Authorization', `Bearer ${passengerToken}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
  });

  test('PATCH /api/admin/claims/:id allows staff to approve claim and marks item Recovered', async () => {
    const res = await request(app)
      .patch(`/api/admin/claims/${createdClaimId}`)
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        status: 'Approved',
        reviewNotes: 'Verified claimant ownership proof against depot vault log.',
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.status, 'Approved');

    // Verify item is now Recovered
    const itemRes = await request(app).get('/api/items/TRX-491028');
    assert.equal(itemRes.body.data.status, 'Recovered');
  });

  // 5. Admin & Analytics Tests
  test('GET /api/admin/summary returns complete system counts', async () => {
    const res = await request(app)
      .get('/api/admin/summary')
      .set('Authorization', `Bearer ${adminToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.users.total > 0);
    assert.ok(res.body.data.items.total > 0);
    assert.ok(res.body.data.claims.total > 0);
  });

  test('GET /api/me/notifications returns passenger notifications', async () => {
    const res = await request(app)
      .get('/api/me/notifications')
      .set('Authorization', `Bearer ${passengerToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.length >= 1);
  });
});
