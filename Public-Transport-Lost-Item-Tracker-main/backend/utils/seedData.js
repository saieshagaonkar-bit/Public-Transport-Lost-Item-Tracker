const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Item = require('../models/Item');
const Claim = require('../models/Claim');
const Notification = require('../models/Notification');
const Feedback = require('../models/Feedback');
const AuditLog = require('../models/AuditLog');
const Disposal = require('../models/Disposal');
const { connectDB } = require('../config/db');

dotenv.config();

const seedAll = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await connectDB();

    console.log('[Seed] Clearing existing collections...');
    await User.deleteMany({});
    await Item.deleteMany({});
    await Claim.deleteMany({});
    await Notification.deleteMany({});
    await Feedback.deleteMany({});
    await AuditLog.deleteMany({});
    await Disposal.deleteMany({});

    console.log('[Seed] Seeding Users...');
    const users = await User.create([
      {
        name: 'Sarah Jenkins',
        email: 'sarah.jenkins@metrotransit.org',
        password: 'TransitPass2026!',
        phone: '+1 (555) 234-8921',
        role: 'Passenger',
        station: 'Grand Central Terminal',
        status: 'Active',
      },
      {
        name: 'Marcus Vance',
        email: 'm.vance@transitdev.io',
        password: 'TransitPass2026!',
        phone: '+1 (555) 890-1122',
        role: 'Passenger',
        station: 'Civic Center Station',
        status: 'Active',
      },
      {
        name: 'David Sterling',
        email: 'd.sterling@metrotransit.org',
        password: 'TransitPass2026!',
        phone: '+1 (555) 345-6789',
        role: 'Passenger',
        station: 'South Terminal Station',
        status: 'Active',
      },
      {
        name: 'Officer Miller',
        email: 'custody.civic@metrotransit.org',
        password: 'TransitPass2026!',
        phone: '+1 (555) 456-7890',
        role: 'Staff',
        station: 'Civic Center Station',
        status: 'Active',
      },
      {
        name: 'Officer Patel',
        email: 'spatel@southtransit.gov',
        password: 'TransitPass2026!',
        phone: '+1 (555) 567-8901',
        role: 'Staff',
        station: 'South Terminal Station',
        status: 'Active',
      },
      {
        name: 'Depot Clerk J. Adams',
        email: 'jadams@transitdept.org',
        password: 'TransitPass2026!',
        phone: '+1 (555) 678-9012',
        role: 'Staff',
        station: 'Express Route Depot',
        status: 'Suspended',
      },
      {
        name: 'Director Vance',
        email: 'admin.director@transit.gov',
        password: 'TransitPass2026!',
        phone: '+1 (555) 999-0000',
        role: 'Admin',
        station: 'Central Operations',
        status: 'Active',
      },
    ]);

    const sarah = users[0];
    const marcus = users[1];
    const david = users[2];
    const miller = users[3];
    const patel = users[4];
    const admin = users[6];

    console.log('[Seed] Seeding Items...');
    const items = await Item.create([
      {
        customId: 'TRX-782194',
        type: 'Lost',
        title: 'Grey Laptop',
        category: 'Electronics',
        transitType: 'Metro',
        route: 'Blue Line 2 (Carriage #304)',
        location: 'Boarded Central Hub towards Civic Center',
        date: '2026-10-09',
        timeApprox: '08:35 AM Morning Peak',
        color: 'Grey with charcoal sleeve',
        brand: 'Apple',
        description: 'Grey laptop left near seats on Blue Line. Has a charcoal felt sleeve and small stickers.',
        custodyLocation: 'Reported missing by passenger',
        status: 'Possible Match',
        image: null,
        reportedBy: marcus._id,
        reporterName: 'Marcus V.',
        reporterEmail: marcus.email,
        reporterRole: 'Passenger',
        claimed: false,
      },
      {
        customId: 'TRX-491028',
        type: 'Found',
        title: 'Grey Laptop with Case',
        category: 'Electronics',
        transitType: 'Metro',
        route: 'Blue Line 2 (Platform 3)',
        location: 'Civic Center Station Terminal Concourse',
        date: '2026-10-09',
        timeApprox: '09:10 AM Custody Handover',
        color: 'Dark Grey with charcoal sleeve',
        brand: 'Apple',
        description: 'Laptop found in protective felt sleeve on train seats after terminating run.',
        custodyLocation: 'Civic Center Station Custody Desk Vault #B2',
        status: 'Possible Match',
        image: 'found_laptop.jpg',
        reportedBy: miller._id,
        reporterName: 'Station Staff',
        reporterEmail: miller.email,
        reporterRole: 'Station Staff',
        claimed: true,
      },
      {
        customId: 'TRX-310892',
        type: 'Lost',
        title: 'Brown Leather Bag',
        category: 'Bags & Wallets',
        transitType: 'Train',
        route: 'Northern Regional Link (Express #14)',
        location: 'Grand Central Terminal departure track 7',
        date: '2026-10-08',
        timeApprox: '17:45 PM Evening Commute',
        color: 'Brown with brass buckles',
        brand: 'Leather Bag',
        description: 'Brown leather shoulder bag. Contains sketchbooks and drawing pencil pouch.',
        custodyLocation: 'Reported missing by passenger',
        status: 'Open',
        image: null,
        reportedBy: sarah._id,
        reporterName: 'Sarah Jenkins',
        reporterEmail: sarah.email,
        reporterRole: 'Passenger',
        claimed: false,
      },
      {
        customId: 'TRX-824190',
        type: 'Found',
        title: 'Brown Sunglasses',
        category: 'Accessories',
        transitType: 'Bus',
        route: 'Metro City Bus Route 42',
        location: 'Cross-town bus stop at Lexington Ave',
        date: '2026-10-09',
        timeApprox: '14:15 PM Midday Service',
        color: 'Brown with gold accents',
        brand: 'Ray-Ban',
        description: 'Brown sunglasses in black protective clamshell case found on bus seats.',
        custodyLocation: 'Main Bus Depot Holding Locker 12',
        status: 'Open',
        image: 'found_sunglasses.jpg',
        reportedBy: miller._id,
        reporterName: 'Bus Driver',
        reporterEmail: 'depot42@metrobus.gov',
        reporterRole: 'Driver',
        claimed: false,
      },
      {
        customId: 'TRX-905142',
        type: 'Found',
        title: 'Silver Headphones',
        category: 'Electronics',
        transitType: 'Station',
        route: 'Grand Central Hub Waiting Lounge',
        location: 'Bench beside Gate 14 East concourse',
        date: '2026-10-10',
        timeApprox: '11:20 AM Morning',
        color: 'Silver Grey',
        brand: 'Sony',
        description: 'Silver wireless over-ear headphones enclosed in zippered light grey travel case.',
        custodyLocation: 'Grand Central Lost Property Office Desk #1',
        status: 'Claim Pending',
        image: 'found_headphones.jpg',
        reportedBy: miller._id,
        reporterName: 'Station Staff',
        reporterEmail: 'grandcentral.security@metro.org',
        reporterRole: 'Station Staff',
        claimed: true,
      },
      {
        customId: 'TRX-639108',
        type: 'Lost',
        title: 'Brown Leather Wallet',
        category: 'Bags & Wallets',
        transitType: 'Metro',
        route: 'Red Subway Line 1',
        location: 'Transfer connection at Metro South Hub',
        date: '2026-10-07',
        timeApprox: '19:10 PM',
        color: 'Caramel Brown leather',
        brand: 'Leather Wallet',
        description: 'Brown leather bifold wallet with transport pass and identity cards inside.',
        custodyLocation: 'Reported missing by passenger',
        status: 'Open',
        image: null,
        reportedBy: david._id,
        reporterName: 'David Sterling',
        reporterEmail: david.email,
        reporterRole: 'Passenger',
        claimed: false,
      },
      {
        customId: 'TRX-119284',
        type: 'Found',
        title: 'Yellow Winter Scarf',
        category: 'Clothing',
        transitType: 'Bus',
        route: 'Express Route 101',
        location: 'Rear passenger seats',
        date: '2026-10-08',
        timeApprox: '21:00 PM Night Run',
        color: 'Mustard Yellow knit',
        brand: 'Wool Scarf',
        description: 'Warm knitted yellow winter scarf found on the rear seats of bus 101.',
        custodyLocation: 'Depot Customer Service Lost Bin',
        status: 'Open',
        image: 'found_scarf.jpg',
        reportedBy: miller._id,
        reporterName: 'Bus Driver',
        reporterEmail: 'jadams@transitdept.org',
        reporterRole: 'Driver',
        claimed: false,
      },
      {
        customId: 'TRX-553198',
        type: 'Found',
        title: 'Keys with Keychain',
        category: 'Keys',
        transitType: 'Station',
        route: 'South Terminal Station',
        location: 'Ticket Vending Kiosk #4',
        date: '2026-10-06',
        timeApprox: '13:40 PM',
        color: 'Brass & silver keys with brown tag',
        brand: 'Door keys',
        description: 'Set of standard house door keys on a round metal ring with a brown leather tag.',
        custodyLocation: 'South Terminal Security Office',
        status: 'Recovered',
        image: 'normal_keys.jpg',
        reportedBy: patel._id,
        reporterName: 'Station Security',
        reporterEmail: patel.email,
        reporterRole: 'Station Staff',
        claimed: true,
      },
    ]);

    const laptopFound = items[1];
    const headphones = items[4];
    const keys = items[7];

    console.log('[Seed] Seeding Claims...');
    await Claim.create([
      {
        claimId: 'CLM-9031',
        item: headphones._id,
        itemId: headphones.customId,
        itemTitle: headphones.title,
        claimant: sarah._id,
        claimantName: sarah.name,
        claimantPhone: sarah.phone,
        secretDetails:
          "Device name in Bluetooth is 'Sarah XM5'. The inside headband has a tiny gray sticker from my workplace audio lab. Carrying case has a blue USB-C charging cable inside the mesh compartment.",
        pickupStation: 'Grand Central Terminal Lost & Found Office',
        status: 'Pending Review',
      },
      {
        claimId: 'CLM-4812',
        item: laptopFound._id,
        itemId: laptopFound.customId,
        itemTitle: laptopFound.title,
        claimant: marcus._id,
        claimantName: marcus.name,
        claimantPhone: marcus.phone,
        secretDetails:
          'MacBook Pro 14-inch, Serial number ending in -H92. Lock screen avatar is an orange transit schematic map. Developer stickers include Rust and Docker logos on top lid.',
        pickupStation: 'Civic Center Station Custody Desk Vault #B2',
        status: 'Pending Review',
      },
      {
        claimId: 'CLM-8120',
        item: keys._id,
        itemId: keys.customId,
        itemTitle: keys.title,
        claimant: david._id,
        claimantName: david.name,
        claimantPhone: david.phone,
        secretDetails: 'Apartment #302 stamped on the small brass key. Leather tag engraved with initial "D".',
        pickupStation: 'South Terminal Station Security Office',
        status: 'Approved',
        adminReview: {
          reviewedBy: patel._id,
          reviewerName: patel.name,
          reviewNotes: 'Keys matched apartment number and owner ID.',
          reviewedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    ]);

    console.log('[Seed] Seeding Notifications...');
    await Notification.create([
      {
        user: marcus._id,
        title: 'High-Confidence Match Detected!',
        body: "Your lost report 'Grey Laptop' matches found item 'Grey Laptop with Case' at Civic Center (94% Match).",
        type: 'match',
        relatedItem: laptopFound._id,
        relatedItemId: laptopFound.customId,
        read: false,
      },
      {
        user: sarah._id,
        title: 'Claim Submitted for Review',
        body: 'Claim #CLM-9031 for Silver Headphones is queued for transit verification.',
        type: 'claim_submitted',
        relatedItem: headphones._id,
        relatedItemId: headphones.customId,
        read: false,
      },
      {
        user: david._id,
        title: 'Item Safely Handed Over',
        body: 'Keys with Keychain (TRX-553198) was successfully handed over to verified owner at South Terminal.',
        type: 'item_recovered',
        relatedItem: keys._id,
        relatedItemId: keys.customId,
        read: true,
      },
    ]);

    console.log('[Seed] Seeding Feedback...');
    await Feedback.create([
      {
        feedbackId: 'FDB-1004',
        user: marcus._id,
        name: marcus.name,
        email: marcus.email,
        rating: 5,
        category: 'Claim process',
        message: 'Claiming my laptop was quick and clear. I got a handover voucher the same afternoon.',
      },
      {
        feedbackId: 'FDB-1003',
        user: david._id,
        name: david.name,
        email: david.email,
        rating: 3,
        category: 'Search & matching',
        message: 'Search works well, but I would like to filter by the exact station where I lost my item.',
      },
      {
        feedbackId: 'FDB-1002',
        user: sarah._id,
        name: sarah.name,
        email: sarah.email,
        rating: 4,
        category: 'Reporting an item',
        message: 'The report form is easy to follow. A photo upload for lost items would help too.',
      },
      {
        feedbackId: 'FDB-1001',
        user: marcus._id,
        name: marcus.name,
        email: marcus.email,
        rating: 2,
        category: 'Bug / problem',
        message: 'I did not get a notification when a possible match was found for my scarf.',
      },
    ]);

    console.log('[Seed] Seeding Audit Logs...');
    await AuditLog.create([
      {
        actor: 'Officer Miller',
        email: miller.email,
        role: 'Staff',
        category: 'Access',
        action: 'Signed in to Staff Portal',
        target: miller.email,
      },
      {
        actor: 'Officer Patel',
        email: patel.email,
        role: 'Staff',
        category: 'Claims',
        action: 'Approved claim & issued handover voucher',
        target: 'CLM-8120 - Keys with Keychain',
      },
      {
        actor: 'Director Vance',
        email: admin.email,
        role: 'Admin',
        category: 'Users',
        action: 'Suspended account',
        target: 'Depot Clerk J. Adams (USR-2003)',
      },
      {
        actor: 'Director Vance',
        email: admin.email,
        role: 'Admin',
        category: 'Disposal',
        action: 'Approved disposal (donation)',
        target: 'DSP-7003 - Umbrella (Black)',
      },
      {
        actor: 'System',
        email: '',
        role: 'System',
        category: 'Access',
        action: 'Automatic nightly custody integrity check passed',
        target: 'All station vaults',
      },
    ]);

    console.log('[Seed] Seeding Disposals...');
    await Disposal.create([
      {
        disposalId: 'DSP-7001',
        itemTitle: 'Navy Umbrella',
        category: 'Accessories',
        station: 'Civic Center Custody Desk',
        daysHeld: 112,
        method: 'Donate to charity',
        status: 'Due for Disposal',
      },
      {
        disposalId: 'DSP-7002',
        itemTitle: "Child's Backpack",
        category: 'Bags & Wallets',
        station: 'South Terminal Security Office',
        daysHeld: 98,
        method: 'Donate to charity',
        status: 'Due for Disposal',
      },
      {
        disposalId: 'DSP-7004',
        itemTitle: 'Wired Earphones',
        category: 'Electronics',
        station: 'Grand Central Lost & Found',
        daysHeld: 94,
        method: 'E-waste recycling',
        status: 'Due for Disposal',
      },
      {
        disposalId: 'DSP-7005',
        itemTitle: 'Gym Water Bottle',
        category: 'Other',
        station: 'Express Route Depot Lost Bin',
        daysHeld: 91,
        method: 'Recycle',
        status: 'Due for Disposal',
      },
      {
        disposalId: 'DSP-7003',
        itemTitle: 'Black Umbrella',
        category: 'Accessories',
        station: 'Grand Central Lost & Found',
        daysHeld: 120,
        method: 'Donate to charity',
        status: 'Disposed',
      },
    ]);

    console.log('[Seed] Database successfully populated with realistic BackToYou transit data!');
    if (process.argv[1].endsWith('seedData.js')) {
      process.exit(0);
    }
  } catch (err) {
    console.error(`[Seed] Error seeding data: ${err.message}`);
    if (process.argv[1].endsWith('seedData.js')) {
      process.exit(1);
    }
  }
};

if (require.main === module) {
  seedAll();
}

module.exports = seedAll;
