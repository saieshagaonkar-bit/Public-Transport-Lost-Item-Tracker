# BackToYou — Backend REST API & Database Engine

Official Backend Service for **BackToYou** — Public Transport Lost & Found Tracking Platform.

---

## 🚆 System Overview

The BackToYou backend is a robust RESTful API and rule-based matching engine built with **Node.js**, **Express.js**, **MongoDB Atlas**, and **Mongoose**. It manages transit lost and found reports across subway lines, bus corridors, regional rail networks, and station hubs, powering smart match suggestions, ownership claim verification, and in-app transit notifications.

---

## 🛠️ Technology Stack

- **Runtime Environment:** Node.js (v18+)
- **Web Framework:** Express.js 4.x
- **Database:** MongoDB Atlas / Local MongoDB via Mongoose 8.x
- **Authentication & Security:** JSON Web Tokens (JWT), bcryptjs password hashing, CORS, rate limiting
- **Testing Engine:** Node.js native test runner & Supertest
- **In-Memory Testing Database:** `mongodb-memory-server`

---

## 📁 Folder Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection & fallback management
├── controllers/
│   ├── authController.js     # User registration, login, current profile
│   ├── itemController.js     # CRUD for lost and found reports
│   ├── claimController.js    # Claim submission, tracking, admin approval
│   ├── userController.js     # User dossier, notifications, profile updates
│   ├── adminController.js    # System stats, account access, audit logs, disposals
│   └── feedbackController.js # Passenger ratings and community feedback
├── middleware/
│   ├── authMiddleware.js     # JWT verification & role-based access control (RBAC)
│   └── errorHandler.js       # Centralized error handling & status mapping
├── models/
│   ├── User.js               # Passenger, Staff, and Admin schemas
│   ├── Item.js               # Lost & Found items collection with text indexes
│   ├── Claim.js              # Ownership claims and verification evidence
│   ├── Notification.js       # In-app passenger notifications
│   ├── Feedback.js           # Star ratings and feedback submissions
│   ├── AuditLog.js           # Chain-of-custody audit trail
│   └── Disposal.js           # Unclaimed property past 90-day holding policy
├── routes/
│   ├── authRoutes.js         # /api/auth endpoints
│   ├── itemRoutes.js         # /api/items endpoints
│   ├── claimRoutes.js        # /api/claims endpoints
│   ├── userRoutes.js         # /api/me & /api/users endpoints
│   ├── adminRoutes.js        # /api/admin endpoints
│   └── feedbackRoutes.js     # /api/feedback endpoints
├── utils/
│   ├── matching.js           # Rule-based explainable lost-and-found matcher
│   └── seedData.js           # Database population utility with demo transit data
├── tests/
│   └── api.test.js           # Comprehensive automated API integration suite
├── .env.example              # Template environment variables
├── .gitignore                # Git exclusions
├── package.json              # Project metadata, scripts, and dependencies
├── README.md                 # Backend documentation
└── server.js                 # Express application entrypoint
```

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher
- A **MongoDB Atlas** cluster URL or a locally installed MongoDB daemon

### 2. Install Dependencies
Navigate into the `backend` directory and install packages:
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate `.env` with your settings:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/backtoyou?retryWrites=true&w=majority
JWT_SECRET=your_long_random_jwt_secret_key_here
JWT_EXPIRE=7d
FRONTEND_ORIGIN=http://127.0.0.1:5500,http://localhost:5500,http://localhost:3000
```

> **Note:** If `MONGODB_URI` is left unconfigured during local development or testing, the server automatically boots an embedded in-memory database engine (`mongodb-memory-server`) so you can test immediately without external setup.

### 4. Seed Demo Transit Data (Optional)
To preload realistic sample transit items, passenger accounts, pending claims, and station custody points:
```bash
npm run seed
```

### 5. Start the Server
- Normal execution:
  ```bash
  npm start
  ```
The API will start listening on `http://localhost:5000`.

---

## 🧪 Automated Testing

Execute the comprehensive automated test suite (covers health, authentication, items, rule-based matching, claims, permissions, and notifications):
```bash
npm test
```

---

## 📡 REST API Reference

### Health Check
- `GET /api/health` — Verifies server uptime, health status, and service name.

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Create new passenger account (`name`, `email`, `password`, `phone`).
- `POST /api/auth/login` — Sign in and receive JWT token (`email`, `password`).
- `GET /api/auth/me` — Retrieve currently logged-in user profile (`Bearer <token>`).

### Items (`/api/items`)
- `GET /api/items` — Query items with filters: `keyword`, `type` (Lost/Found), `category`, `transitType`, `status`, `sort`, `page`, `limit`.
- `POST /api/items` — Register a new Lost or Found item. Automatically triggers the rule-based matching engine.
- `GET /api/items/:id` — Get item details by custom ID (e.g. `TRX-782194`) or MongoDB ObjectId.
- `PATCH /api/items/:id` — Update item attributes or custody point (Creator, Staff, or Admin only).
- `DELETE /api/items/:id` — Remove or archive an item report (Creator, Staff, or Admin only).
- `GET /api/items/:id/matches` — Compute explainable rule-based candidate matches against opposite-type reports.
- `POST /api/items/:id/claims` — Submit an ownership verification claim on a Found item.

### Passenger Dashboard (`/api/me`)
- `GET /api/me/items` — Retrieve reports filed by the authenticated passenger.
- `GET /api/me/claims` — Retrieve ownership claims filed by the authenticated passenger.
- `GET /api/me/notifications` — Retrieve in-app notifications and unread count.
- `PATCH /api/me/notifications/:id` — Mark a notification as read.
- `PATCH /api/me/notifications/read-all` — Mark all notifications as read.
- `PATCH /api/users/profile` — Update passenger profile details (`name`, `phone`, `address`).

### Claims Management (`/api/claims` & `/api/admin/claims`)
- `GET /api/admin/claims` — View claims verification queue (Staff & Admin only).
- `PATCH /api/admin/claims/:id` — Approve or reject an ownership claim with reviewer notes. On approval, marks the item as `Recovered` and issues a digital collection notification.

### Administration & Operations (`/api/admin`)
- `GET /api/admin/summary` — Key performance indicators (Total accounts, lost vs found, active, claims, recoveries).
- `GET /api/admin/users` — List registered users with role and status filtering (Admin only).
- `PATCH /api/admin/users/:id/status` — Suspend or reactivate user accounts (Admin only).
- `GET /api/admin/audit` — Immutable chain-of-custody audit log events.
- `GET /api/admin/disposals` — Unclaimed property past the 90-day retention threshold.
- `PATCH /api/admin/disposals/:id` — Execute disposal or extend hold by 30 days.

### Passenger Feedback (`/api/feedback`)
- `POST /api/feedback` — Submit rating (1–5 stars) and message.
- `GET /api/feedback` — List passenger feedback filtered by category (Staff & Admin only).
