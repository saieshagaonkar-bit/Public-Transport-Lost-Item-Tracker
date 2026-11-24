# BackToYou — Public Transport Lost Item Tracker

> A full-stack transit recovery network connecting passengers, drivers, conductors, and depot security across municipal transit corridors (Metro, Bus, Rail, and Station Hubs).

---

## 📌 Project Overview

**BackToYou** is an official public transport lost item recovery and custody management system. When passengers misplace personal belongings on public transit services, they can file lost reports, browse verified custodial intakes, receive explainable match suggestions, submit private ownership claims, and collect items from verified depot desks.

### Core Visual Identity
The system adheres to an architectural, high-contrast palette:
- **Golden Amber / Mustard:** `#d97706` / `var(--mustard-500)`
- **Deep Espresso Brown:** `#3a281c` / `var(--brown-800)`
- **Cream / Warm Stone:** `#fbf9f5` / `var(--stone-50)`
- **Taupe Grey:** `#78716c` / `var(--taupe-500)`

---

## 🏛️ System Architecture

```
Public-Transport-Lost-Item-Tracker/
├── backend/ # Node.js + Express.js + MongoDB REST API service │
├── config/db.js # Database connection & memory fallback manager │
├── models/ # Mongoose schemas (User, Item, Claim, Notification, Feedback, AuditLog, Disposal) │
├── controllers/ # Business logic & database operations │
├── routes/ # REST endpoints routing │
├── middleware/ # JWT verification & role authorization (RBAC) │
├── utils/matching.js # Explainable rule‑based matching engine │
├── utils/seedData.js # Realistic transit database seeder │
├── tests/api.test.js # Automated test suite (17 passed tests) │
├── package.json # Dependencies and test runner configuration │
├── .env.example # Configuration template │
    └── server.js # Express API server entry point
├── frontend/ # Static site (HTML/CSS/JS) │
 ├── index.html # Multi‑view responsive layout (SPA) │
├── style.css # Stylesheet & design tokens │
├── app.js # Frontend state manager & UI controllers │
├── api.js # Centralized fetch API client │
    └── *.jpg # Brand logos & item thumbnails
 ├── .gitignore # Excludes node_modules, .env, and sensitive files
    └── README.md # Project documentation
```

---

## 💾 MongoDB Database Design & Collections

The database contains seven core collections structured to provide persistent auditability, privacy, and fast relational indexing.

### 1. `users` Collection
Stores registered accounts across three user roles: **Passenger**, **Staff**, and **Admin**.
- `name` (String, required): Full legal name.
- `email` (String, required, unique, indexed): Lowercase email identifier.
- `password` (String, select: false): Bcrypt salted password hash (cost factor 10).
- `phone` (String): Contact phone for custody notification.
- `role` (String, enum: `['Passenger', 'Staff', 'Admin']`, default: `'Passenger'`).
- `station` (String): Assigned transit depot or home terminal.
- `status` (String, enum: `['Active', 'Suspended']`, default: `'Active'`).
- `lastActive` (Date): Timestamp of recent user action.
- Timestamps (`createdAt`, `updatedAt`).

### 2. `items` Collection
Stores all registered Lost and Found property records.
- `customId` (String, unique, indexed): Human-readable tracking ID (e.g. `TRX-782194`).
- `title` (String, required): Descriptive title.
- `type` (String, enum: `['Lost', 'Found']`, indexed): Classification.
- `category` (String, enum: `['Electronics', 'Bags & Wallets', 'Documents', 'Accessories', 'Clothing', 'Keys', 'Other']`, indexed).
- `color` (String, required): Primary finish and color.
- `brand` (String): Manufacturer or brand name.
- `description` (String, required): Distinguishing features and condition notes.
- `transitType` (String, enum: `['Metro', 'Bus', 'Train', 'Station']`, indexed): Corridor.
- `route` (String, required): Line, route number, or train carriage.
- `location` (String, required): Boarding stop, station, or discovery point.
- `date` (String, required): Incident date (`YYYY-MM-DD`).
- `timeApprox` (String): Approximate time of incident.
- `custodyLocation` (String): Exact vault, locker, or depot custody desk.
- `status` (String, enum: `['Open', 'Possible Match', 'Claim Pending', 'Recovered', 'Archived']`, indexed).
- `image` (String): Image file URL or photo preview.
- `reportedBy` (ObjectId ref `'User'`, indexed): Submitting user ID.
- `reporterName`, `reporterEmail`, `reporterRole`: Identity reference.
- `claimed` (Boolean): Active claim flag.
- Compound Text Indexes on `title`, `description`, `color`, `brand`, `route`, `location`.

### 3. `claims` Collection
Stores ownership claims and protects private identifying proof.
- `claimId` (String, unique, indexed): Claim reference (e.g. `CLM-9031`).
- `item` (ObjectId ref `'Item'`, indexed): Claimed found item reference.
- `itemId` (String, indexed): Custom item ID (e.g. `TRX-491028`).
- `itemTitle` (String): Item title snapshot.
- `claimant` (ObjectId ref `'User'`, indexed): Claiming passenger ID.
- `claimantName`, `claimantPhone` (String, required): Contact details.
- `secretDetails` (String, required): Private verification proof (e.g. wallpaper description, engraved initials, serial number) exclusively visible to authorized staff officers and the claimant.
- `pickupStation` (String, required): Preferred station lost property desk.
- `status` (String, enum: `['Submitted', 'Pending Review', 'Under Review', 'Approved', 'Rejected', 'Completed']`, indexed).
- `adminReview`: Subdocument containing `reviewedBy`, `reviewerName`, `reviewNotes`, `reviewedAt`.

### 4. `notifications` Collection
In-app alerts delivered to passengers and staff.
- `user` (ObjectId ref `'User'`, indexed): Receiving account.
- `title`, `body` (String, required): Alert content.
- `type` (String, enum: `['match', 'claim_submitted', 'claim_approved', 'claim_rejected', 'item_recovered', 'system']`).
- `relatedItem`, `relatedClaim`: Object references.
- `read` (Boolean, default: `false`, indexed): Read status.

### 5. `feedbacks`, `auditlogs`, and `disposals` Collections
Supporting collections for passenger satisfaction ratings, immutable custody audit records, and property past the 90-day retention policy.

---

## 🧠 Explainable Rule-Based Matching System

The algorithm (`backend/utils/matching.js`) compares opposite-type reports (Lost vs Found) using a transparent scoring matrix:

$$\text{Match Score} = \text{Category}(40) + \text{Transit Mode}(20) + \text{Keywords \& Traits}(0\text{--}30) + \text{Route Proximity}(15) + \text{Date Window}(0\text{--}10)$$

1. **Mandatory Category Prerequisite (+40 pts):** Category must match identically (e.g. Electronics to Electronics). Different categories return `null` immediately.
2. **Transit Corridor (+20 pts):** Matching transport network (Metro, Bus, Train, Station).
3. **Keyword / Brand / Color Overlap (Up to +30 pts):** Compares tokenized words from title, brand, color, and description after stripping common stop words. Each distinct match contributes +10 pts (capped at 30).
4. **Route / Vehicle Proximity (+15 pts):** Overlapping line tokens (e.g., "Line 2", "Route 42", "Carriage 4").
5. **Date Window (+5 to +10 pts):** Dates within 48 hours receive +10 pts; within 7 days receive +5 pts.

- **Threshold:** Reports scoring $\ge 50\%$ are presented as candidate match proposals.
- **Score Cap:** Scores are capped at $98\%$ to guarantee that final handover requires human custodial inspection.
- **Safety:** Items cannot match themselves, and items marked `Recovered` are excluded.

---

## 🚀 Running the Project Locally

### Step 1: Start the Backend Service

```bash
cd backend

# Install dependencies (if not already installed)
npm install

# Start the Express server
npm start
```
The server will run at: `http://localhost:5000`  
Health check endpoint: `http://localhost:5000/api/health`

### Step 2: Open the Frontend

You can serve the frontend with any static web server:

**Option A: VS Code / IDE Live Server Extension**
- Open `BackToYou_frontemd/index.html` in Live Server (`http://127.0.0.1:5500/BackToYou_frontemd/index.html`).

**Option B: Python HTTP Server**
```bash
# From repository root
python -m http.server 5500
```
Then visit: `http://localhost:5500/BackToYou_frontemd/`

### Default Pre-Configured Demo Accounts

| Role | Email | Password |
|---|---|---|
| **Passenger** | `sarah.jenkins@metrotransit.org` | `TransitPass2026!` |
| **Staff** | `custody.civic@metrotransit.org` | `TransitPass2026!` |
| **Admin** | `admin.director@transit.gov` | `TransitPass2026!` |

You can also click **Sign Up** on the login page to register any new passenger account directly to MongoDB.

---

## 🧪 Automated Test Execution

The project includes an automated integration test suite covering end-to-end user journeys:
```bash
cd backend
npm test
```

### Test Coverage Results:
- `GET /api/health` — Returns status UP and uptime: **PASS**
- `POST /api/auth/login` (Passenger, Staff, Admin): **PASS**
- `POST /api/auth/register` (Duplicate email check & new account): **PASS**
- `GET /api/items` (All, filtered by type/category, keyword search): **PASS**
- `POST /api/items` (Create report & auto-trigger matcher): **PASS**
- `GET /api/items/:id/matches` (Ranked match proposals & explanations): **PASS**
- `POST /api/items/:id/claims` (Filing ownership verification claim): **PASS**
- `GET /api/me/claims` (Passenger personal claim history): **PASS**
- `GET /api/admin/claims` (RBAC protection against unauthorized roles): **PASS**
- `PATCH /api/admin/claims/:id` (Staff approval & item status update): **PASS**
- `GET /api/admin/summary` (System counts and KPIs): **PASS**
- `GET /api/me/notifications` (In-app notifications): **PASS**

---

## 🌐 Production Deployment Guide

### Deploying the Backend (e.g. Render, Railway, or Heroku)
1. Set the root directory to `backend`.
2. Configure Environment Variables in your hosting dashboard:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `MONGODB_URI=your_mongodb_atlas_connection_string`
   - `JWT_SECRET=your_super_secret_production_key`
   - `FRONTEND_ORIGIN=https://your-frontend-app.netlify.app`
3. Build command: `npm install`
4. Start command: `npm start`

### Deploying the Frontend (e.g. Netlify, Vercel, or GitHub Pages)
1. Set publish directory to `BackToYou_frontemd`.
2. In `BackToYou_frontemd/api.js`, update `window.BACKTOYOU_API_URL` or define it globally in `index.html`:
   ```html
   <script>
     window.BACKTOYOU_API_URL = "https://your-backend-api.onrender.com/api";
   </script>
   ```

---

## 📄 License
This project was developed for academic and public transport demonstration purposes under the ISC License.
