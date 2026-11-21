/**
 * BackToyou — Interactive Frontend Logic & State Management
 * Adheres strictly to the Public Transport Lost Item Tracker Guide
 */

// =====================================================================
// 1. Initial State & Realistic Demo Transit Data
// =====================================================================

const INITIAL_ITEMS = [
    {
        id: "TRX-782194",
        type: "Lost",
        title: "Grey Laptop",
        category: "Electronics",
        transitType: "Metro",
        route: "Blue Line 2 (Carriage #304)",
        location: "Boarded Central Hub towards Civic Center",
        date: "2026-10-09",
        timeApprox: "08:35 AM Morning Peak",
        color: "Grey with charcoal sleeve",
        brand: "Apple",
        description: "Grey laptop left near seats on Blue Line. Has a charcoal felt sleeve and small stickers.",
        custodyLocation: "Reported missing by passenger",
        status: "Possible Match",
        image: null,
        reporterName: "Marcus V.",
        reporterEmail: "m.vance@transitdev.io",
        claimed: false
    },
    {
        id: "TRX-491028",
        type: "Found",
        title: "Grey Laptop with Case",
        category: "Electronics",
        transitType: "Metro",
        route: "Blue Line 2 (Platform 3)",
        location: "Civic Center Station Terminal Concourse",
        date: "2026-10-09",
        timeApprox: "09:10 AM Custody Handover",
        color: "Dark Grey with charcoal sleeve",
        brand: "Apple",
        description: "Laptop found in protective felt sleeve on train seats after terminating run.",
        custodyLocation: "Civic Center Station Custody Desk Vault #B2",
        status: "Possible Match",
        image: "found_laptop.jpg",
        reporterName: "Station Staff",
        reporterEmail: "custody.civic@metrotransit.org",
        claimed: false
    },
    {
        id: "TRX-310892",
        type: "Lost",
        title: "Brown Leather Bag",
        category: "Bags & Wallets",
        transitType: "Train",
        route: "Northern Regional Link (Express #14)",
        location: "Grand Central Terminal departure track 7",
        date: "2026-10-08",
        timeApprox: "17:45 PM Evening Commute",
        color: "Brown with brass buckles",
        brand: "Leather Bag",
        description: "Brown leather shoulder bag. Contains sketchbooks and drawing pencil pouch.",
        custodyLocation: "Missing",
        status: "Open",
        image: null,
        reporterName: "Elena R.",
        reporterEmail: "elena.design@studio.com",
        claimed: false
    },
    {
        id: "TRX-824190",
        type: "Found",
        title: "Brown Sunglasses",
        category: "Accessories",
        transitType: "Bus",
        route: "Metro City Bus Route 42",
        location: "Cross-town bus stop at Lexington Ave",
        date: "2026-10-09",
        timeApprox: "14:15 PM Midday Service",
        color: "Brown with gold accents",
        brand: "Ray-Ban",
        description: "Brown sunglasses in black protective clamshell case found on bus seats.",
        custodyLocation: "Main Bus Depot Holding Locker 12",
        status: "Open",
        image: "found_sunglasses.jpg",
        reporterName: "Bus Driver",
        reporterEmail: "depot42@metrobus.gov",
        claimed: false
    },
    {
        id: "TRX-905142",
        type: "Found",
        title: "Silver Headphones",
        category: "Electronics",
        transitType: "Station",
        route: "Grand Central Hub Waiting Lounge",
        location: "Bench beside Gate 14 East concourse",
        date: "2026-10-10",
        timeApprox: "11:20 AM Morning",
        color: "Silver Grey",
        brand: "Sony",
        description: "Silver wireless over-ear headphones enclosed in zippered light grey travel case.",
        custodyLocation: "Grand Central Lost Property Office Desk #1",
        status: "Claim Pending",
        image: "found_headphones.jpg",
        reporterName: "Station Staff",
        reporterEmail: "grandcentral.security@metro.org",
        claimed: true
    },
    {
        id: "TRX-639108",
        type: "Lost",
        title: "Brown Leather Wallet",
        category: "Bags & Wallets",
        transitType: "Metro",
        route: "Red Subway Line 1",
        location: "Transfer connection at Metro South Hub",
        date: "2026-10-07",
        timeApprox: "19:10 PM",
        color: "Caramel Brown leather",
        brand: "Leather Wallet",
        description: "Brown leather bifold wallet with transport pass and identity cards inside.",
        custodyLocation: "Reported missing",
        status: "Open",
        image: null,
        reporterName: "David S.",
        reporterEmail: "d.sterling@metrotransit.org",
        claimed: false
    },
    {
        id: "TRX-119284",
        type: "Found",
        title: "Yellow Winter Scarf",
        category: "Clothing",
        transitType: "Bus",
        route: "Express Route 101",
        location: "Rear passenger seats",
        date: "2026-10-08",
        timeApprox: "21:00 PM Night Run",
        color: "Mustard Yellow knit",
        brand: "Wool Scarf",
        description: "Warm knitted yellow winter scarf found on the rear seats of bus 101.",
        custodyLocation: "Depot Customer Service Lost Bin",
        status: "Open",
        image: "found_scarf.jpg",
        reporterName: "Bus Driver",
        reporterEmail: "jadams@transitdept.org",
        claimed: false
    },
    {
        id: "TRX-553198",
        type: "Found",
        title: "Keys with Keychain",
        category: "Keys",
        transitType: "Station",
        route: "South Terminal Station",
        location: "Ticket Vending Kiosk #4",
        date: "2026-10-06",
        timeApprox: "13:40 PM",
        color: "Brass & silver keys with brown tag",
        brand: "Door keys",
        description: "Set of standard house door keys on a round metal ring with a brown leather tag.",
        custodyLocation: "South Terminal Security Office",
        status: "Recovered",
        image: "normal_keys.jpg",
        reporterName: "Station Security",
        reporterEmail: "spatel@southtransit.gov",
        claimed: true
    }
];

// Initial Pending Claims (Rule 7: Admin / Staff Dashboard & Claims verification)
const INITIAL_CLAIMS = [
    {
        claimId: "CLM-9031",
        itemId: "TRX-905142",
        itemTitle: "Silver Headphones",
        claimantName: "Sarah Jenkins",
        claimantPhone: "+1 (555) 234-8921",
        secretDetails: "Device name in Bluetooth is 'Sarah XM5'. The inside headband has a tiny gray sticker from my workplace audio lab. Carrying case has a blue USB-C charging cable inside the mesh compartment.",
        pickupStation: "Grand Central Terminal Lost & Found Office",
        status: "Pending Review",
        dateSubmitted: "2026-10-10"
    },
    {
        claimId: "CLM-4812",
        itemId: "TRX-491028",
        itemTitle: "Grey Laptop with Case",
        claimantName: "Marcus Vance",
        claimantPhone: "+1 (555) 890-1122",
        secretDetails: "MacBook Pro 14-inch, Serial number ending in -H92. Lock screen avatar is an orange transit schematic map. Developer stickers include Rust and Docker logos on top lid.",
        pickupStation: "Civic Center Station Custody Desk Vault #B2",
        status: "Pending Review",
        dateSubmitted: "2026-10-09"
    }
];

// In-App Notifications Stack (Guide Section 8)
const INITIAL_NOTIFICATIONS = [
    {
        id: "notif-1",
        title: "High-Confidence Match Detected!",
        body: "Your lost report 'Grey Laptop' matches found item 'Grey Laptop with Case' at Civic Center (94% Match).",
        time: "10 mins ago",
        read: false,
        itemId: "TRX-491028"
    },
    {
        id: "notif-2",
        title: "Claim Submitted for Review",
        body: "Claim #CLM-9031 for Silver Headphones is queued for transit verification.",
        time: "2 hours ago",
        read: false,
        itemId: "TRX-905142"
    },
    {
        id: "notif-3",
        title: "Item Safely Handed Over",
        body: "Keys with Keychain (TRX-553198) was successfully handed over to verified owner at South Terminal.",
        time: "Yesterday",
        read: true,
        itemId: "TRX-553198"
    }
];

// Admin: registered accounts (User Management)
const INITIAL_USERS = [
    { id: "USR-1001", name: "Sarah Jenkins", email: "sarah.jenkins@metrotransit.org", role: "Passenger", station: "Grand Central Terminal", lastActive: "Today, 09:12", status: "Active" },
    { id: "USR-1002", name: "Marcus Vance", email: "m.vance@transitdev.io", role: "Passenger", station: "Civic Center Station", lastActive: "Today, 08:40", status: "Active" },
    { id: "USR-1003", name: "David Sterling", email: "d.sterling@metrotransit.org", role: "Passenger", station: "South Terminal Station", lastActive: "Yesterday, 19:25", status: "Active" },
    { id: "USR-2001", name: "Officer Miller", email: "custody.civic@metrotransit.org", role: "Staff", station: "Civic Center Station", lastActive: "Today, 09:05", status: "Active" },
    { id: "USR-2002", name: "Officer Patel", email: "spatel@southtransit.gov", role: "Staff", station: "South Terminal Station", lastActive: "2 days ago", status: "Active" },
    { id: "USR-2003", name: "Depot Clerk J. Adams", email: "jadams@transitdept.org", role: "Staff", station: "Express Route Depot", lastActive: "5 days ago", status: "Suspended" },
    { id: "USR-9001", name: "Director Vance", email: "admin.director@transit.gov", role: "Admin", station: "Central Operations", lastActive: "Online now", status: "Active" }
];

// Admin: system audit trail (Audit Trail) - newest first
const INITIAL_AUDIT = [
    { id: "AUD-0005", time: "Today, 08:55", actor: "Officer Miller", category: "Access", action: "Signed in to Staff Portal", target: "custody.civic@metrotransit.org" },
    { id: "AUD-0004", time: "Yesterday, 17:30", actor: "Officer Patel", category: "Claims", action: "Approved claim & issued handover voucher", target: "CLM-8120 - Keys with Keychain" },
    { id: "AUD-0003", time: "Yesterday, 14:10", actor: "Director Vance", category: "Users", action: "Suspended account", target: "Depot Clerk J. Adams (USR-2003)" },
    { id: "AUD-0002", time: "2 days ago", actor: "Director Vance", category: "Disposal", action: "Approved disposal (donation)", target: "DSP-7003 - Umbrella (Black)" },
    { id: "AUD-0001", time: "3 days ago", actor: "System", category: "Access", action: "Automatic nightly custody integrity check passed", target: "All station vaults" }
];

// Admin: unclaimed items past the 90-day holding period (Disposal Mgmt)
const INITIAL_DISPOSALS = [
    { id: "DSP-7001", itemTitle: "Navy Umbrella", category: "Accessories", station: "Civic Center Custody Desk", daysHeld: 112, method: "Donate to charity", status: "Due for Disposal" },
    { id: "DSP-7002", itemTitle: "Child's Backpack", category: "Bags & Wallets", station: "South Terminal Security Office", daysHeld: 98, method: "Donate to charity", status: "Due for Disposal" },
    { id: "DSP-7004", itemTitle: "Wired Earphones", category: "Electronics", station: "Grand Central Lost & Found", daysHeld: 94, method: "E-waste recycling", status: "Due for Disposal" },
    { id: "DSP-7005", itemTitle: "Gym Water Bottle", category: "Other", station: "Express Route Depot Lost Bin", daysHeld: 91, method: "Recycle", status: "Due for Disposal" },
    { id: "DSP-7003", itemTitle: "Black Umbrella", category: "Accessories", station: "Grand Central Lost & Found", daysHeld: 120, method: "Donate to charity", status: "Disposed" }
];

// App Global State
// Passenger feedback shown to the admin (newest first)
const INITIAL_FEEDBACK = [
    { id: "FDB-1004", time: "Today, 08:15", name: "Marcus Vance", rating: 5, category: "Claim process", message: "Claiming my laptop was quick and clear. I got a handover voucher the same afternoon." },
    { id: "FDB-1003", time: "Yesterday, 18:40", name: "David Sterling", rating: 3, category: "Search & matching", message: "Search works well, but I would like to filter by the exact station where I lost my item." },
    { id: "FDB-1002", time: "2 days ago", name: "Sarah Jenkins", rating: 4, category: "Reporting an item", message: "The report form is easy to follow. A photo upload for lost items would help too." },
    { id: "FDB-1001", time: "4 days ago", name: "Marcus Vance", rating: 2, category: "Bug / problem", message: "I did not get a notification when a possible match was found for my scarf." }
];

// ---- Passenger accounts & profiles (saved in this browser) ---------------
// NOTE: this is a front-end demo. Real accounts need a server and secure password storage.
const DEMO_PASSENGER = { name: "Sarah Jenkins", email: "sarah.jenkins@metrotransit.org", password: "TransitPass2026!" };

function readStore(key, fallback) {
    try {
        const v = JSON.parse(localStorage.getItem(key) || "null");
        return v ?? fallback;
    } catch (err) { return fallback; }
}

function writeStore(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (err) { /* storage unavailable */ }
}

function normalizeEmail(email) {
    return (email || "").trim().toLowerCase();
}

function isValidPhone(phone) {
    const digits = phone.replace(/\D/g, "");
    return /^[+\d][\d\s\-().]*$/.test(phone) && digits.length >= 7 && digits.length <= 15;
}

async function hashPassword(password, salt) {
    const text = `${salt}:${password}`;
    if (window.crypto?.subtle) {
        const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
    }
    // Fallback for browsers without Web Crypto (not secure - demo only)
    let hash = 5381;
    for (let i = 0; i < text.length; i++) hash = ((hash << 5) + hash + text.charCodeAt(i)) >>> 0;
    return `x${hash.toString(16)}`;
}

function getAccounts() {
    return readStore("transit_accounts", []);
}

function accountExists(email) {
    const e = normalizeEmail(email);
    return e === DEMO_PASSENGER.email || getAccounts().some(a => a.email === e);
}

// Returns { name, email, phone } for valid credentials, otherwise null
async function verifyPassengerLogin(email, password) {
    const e = normalizeEmail(email);
    if (e === DEMO_PASSENGER.email && password === DEMO_PASSENGER.password) {
        return { name: DEMO_PASSENGER.name, email: e, phone: "" };
    }
    const acct = getAccounts().find(a => a.email === e);
    if (!acct) return null;
    const hash = await hashPassword(password, acct.salt);
    return hash === acct.hash ? { name: acct.name, email: acct.email, phone: acct.phone || "" } : null;
}

async function createPassengerAccount({ name, email, phone, password }) {
    const salt = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const account = { name, email: normalizeEmail(email), phone, salt, hash: await hashPassword(password, salt) };
    writeStore("transit_accounts", [...getAccounts(), account]);
    addPassengerToUserList(account);
    return account;
}

function addPassengerToUserList(account) {
    if (state.users.some(u => (u.email || "").toLowerCase() === account.email)) return;
    state.users.push({
        id: `USR-${String(1000 + state.users.length + 1)}`,
        name: account.name,
        email: account.email,
        role: "Passenger",
        station: "Not set",
        lastActive: "Just now",
        status: "Active"
    });
}

// Profile details are saved per account email
function loadProfileFor(email, fallbackName, fallbackPhone) {
    const base = { name: fallbackName || "", phone: fallbackPhone || "", address: "" };
    const saved = readStore("transit_profiles", {})[normalizeEmail(email)];
    return saved ? { ...base, ...saved } : base;
}

function saveProfileFor(email, profile) {
    const all = readStore("transit_profiles", {});
    all[normalizeEmail(email)] = profile;
    writeStore("transit_profiles", all);
}

const state = {
    items: [...INITIAL_ITEMS],
    claims: [...INITIAL_CLAIMS],
    notifications: [...INITIAL_NOTIFICATIONS],
    users: INITIAL_USERS.map(u => ({ ...u })),
    auditLog: readStore("transit_audit_log", INITIAL_AUDIT.map(a => ({ ...a }))),
    disposals: INITIAL_DISPOSALS.map(d => ({ ...d })),
    feedback: readStore("transit_feedback", INITIAL_FEEDBACK.map(f => ({ ...f }))),
    homeFeedType: "Found",
    staffInv: { q: "", type: "all", status: "all", custody: "all" },
    staffMatchMin: 0,
    staffDispFilter: "all",
    disposeConfirmId: null,
    dismissedMatches: new Set(),
    confirmedMatches: new Set(),
    profile: { name: "", phone: "", address: "" },
    currentView: "login",
    theme: "light",
    filters: {
        type: "all",
        keyword: "",
        category: "all",
        transit: "all",
        status: "all",
        dateRange: "all",
        sort: "newest"
    },
    currentUser: null
};

// =====================================================================
// 2. Rule-Based Matching Engine (Guide Page 6)
// =====================================================================

/**
 * Calculates a match score between a Lost and a Found item
 * Compares category, route, transport type, colors, and keywords
 */
function calculateMatchScore(itemA, itemB) {
    // Only compare opposite types
    if (itemA.type === itemB.type) return null;

    let score = 0;
    const reasons = [];

    // 1. Category must match (mandatory base)
    if (itemA.category.toLowerCase() === itemB.category.toLowerCase()) {
        score += 40;
        reasons.push(`Identical Category: ${itemA.category}`);
    } else {
        return null; // Not a match if categories differ
    }

    // 2. Transport type match
    if (itemA.transitType.toLowerCase() === itemB.transitType.toLowerCase()) {
        score += 20;
        reasons.push(`Matching Transit Corridor (${itemA.transitType})`);
    }

    // 3. Keyword / Brand overlap
    const textA = `${itemA.title} ${itemA.description} ${itemA.color} ${itemA.brand}`.toLowerCase();
    const textB = `${itemB.title} ${itemB.description} ${itemB.color} ${itemB.brand}`.toLowerCase();

    const keywordsA = textA.split(/\W+/).filter(w => w.length > 3);
    let keywordHits = 0;
    for (const word of keywordsA) {
        if (textB.includes(word)) {
            keywordHits++;
        }
    }

    if (keywordHits >= 2) {
        const kwScore = Math.min(30, keywordHits * 10);
        score += kwScore;
        reasons.push(`Matching descriptive keywords & characteristics`);
    }

    // 4. Route proximity check
    if (itemA.route && itemB.route) {
        const routeWords = itemA.route.toLowerCase().split(/\W+/).filter(w => w.length > 2);
        const matchedRoute = routeWords.some(rw => itemB.route.toLowerCase().includes(rw));
        if (matchedRoute) {
            score += 15;
            reasons.push(`Overlapping line/route service`);
        }
    }

    // Minimum threshold
    if (score >= 50) {
        return {
            score: Math.min(score, 98),
            reasons,
            matchedItem: itemB
        };
    }

    return null;
}

function findMatchesForItem(targetItem) {
    const matches = [];
    for (const item of state.items) {
        if (item.id === targetItem.id) continue;
        const result = calculateMatchScore(targetItem, item);
        if (result) {
            matches.push(result);
        }
    }
    return matches.sort((a, b) => b.score - a.score);
}

// =====================================================================
// 3. DOM Elements & Initializer
// =====================================================================

document.addEventListener("DOMContentLoaded", () => {
async function syncFromBackend() {
    try {
        const itemsRes = await BackToYouAPI.items.getAll();
        if (itemsRes.success && Array.isArray(itemsRes.data)) {
            state.items = itemsRes.data;
        }
    } catch (err) {
        console.warn("[BackToYou] Notice: Using cached transit data:", err.message);
    }

    if (state.currentUser) {
        try {
            const notifRes = await BackToYouAPI.me.getNotifications();
            if (notifRes.success && Array.isArray(notifRes.data)) {
                state.notifications = notifRes.data;
            }
        } catch (e) {}

        try {
            if (state.currentUser.role === "Passenger") {
                const claimsRes = await BackToYouAPI.claims.getMyClaims();
                if (claimsRes.success && Array.isArray(claimsRes.data)) {
                    state.claims = claimsRes.data;
                }
            } else {
                const claimsRes = await BackToYouAPI.claims.getAll();
                if (claimsRes.success && Array.isArray(claimsRes.data)) {
                    state.claims = claimsRes.data;
                }
                const auditRes = await BackToYouAPI.admin.getAudit();
                if (auditRes.success && Array.isArray(auditRes.data)) {
                    state.auditLog = auditRes.data;
                }
                const dispRes = await BackToYouAPI.admin.getDisposals();
                if (dispRes.success && Array.isArray(dispRes.data)) {
                    state.disposals = dispRes.data;
                }
                const fbRes = await BackToYouAPI.feedback.getAll();
                if (fbRes.success && Array.isArray(fbRes.data)) {
                    state.feedback = fbRes.data;
                }
                if (state.currentUser.role === "Admin") {
                    const usersRes = await BackToYouAPI.admin.getUsers();
                    if (usersRes.success && Array.isArray(usersRes.data)) {
                        state.users = usersRes.data;
                    }
                }
            }
        } catch (e) {}
    }

    renderAllViews();
}

async function initAuthSession() {
    window.addEventListener("backtoyou:unauthorized", () => {
        handleLogout();
        showToast("Authentication session expired. Please sign in again.", "warning");
    });

    const token = BackToYouAPI.getToken();
    if (token) {
        try {
            const res = await BackToYouAPI.auth.getMe();
            if (res.success && res.user) {
                state.currentUser = res.user;
                updateNavAuthState();
                await syncFromBackend();
                return;
            }
        } catch (err) {
            BackToYouAPI.clearSession();
        }
    }
    state.currentUser = null;
    updateNavAuthState();
    await syncFromBackend();
}

document.addEventListener("DOMContentLoaded", async () => {
    initTheme();
    setupNavigation();
    setupLoginPortal();
    setupSearchAndFilters();
    setupReportForm();
    setupModals();
    setupHomeFeedSwitch();
    setupFeedback();
    setupProfile();
    setupStaff();
    getAccounts().forEach(addPassengerToUserList);
    setupNotifications();
    setupAdminConsole();
    setupFaqAccordion();
    updateNavAuthState();
    renderAllViews();
    await initAuthSession();
});

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem("transit_theme") || "light";
    setTheme(savedTheme);

    document.getElementById("theme-toggle")?.addEventListener("click", () => {
        const nextTheme = state.theme === "light" ? "dark" : "light";
        setTheme(nextTheme);
        showToast(`Switched to ${nextTheme === "dark" ? "High-Contrast Charcoal & Mustard" : "Architectural Warm Stone & Brown"} theme`, "info");
    });
}

function setTheme(theme) {
    state.theme = theme;
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("transit_theme", theme);
}

// =====================================================================
// Login View: Multi-Role Portals & Password Toggle
// =====================================================================

function setupLoginPortal() {
    const roleTabs = document.querySelectorAll(".login-role-tab");
    const heading = document.getElementById("login-heading");
    const subheading = document.getElementById("login-subheading");
    const emailLabel = document.getElementById("login-email-label");
    const emailInput = document.getElementById("login-view-email");
    const pwdInput = document.getElementById("login-view-password");
    const submitBtnText = document.getElementById("btn-login-text");
    const roleInput = document.getElementById("login-active-role");
    const form = document.getElementById("form-login-view");
    const togglePwdBtn = document.getElementById("login-view-toggle-pwd");
    const signupForm = document.getElementById("form-signup-view");
    const authSwitch = document.getElementById("passenger-auth-switch");
    const loginError = document.getElementById("login-error");
    const signupError = document.getElementById("signup-error");
    let authMode = "login"; // passengers can switch to "signup"

    const roleConfigs = {
        passenger: {
            heading: "Passenger Login",
            subheading: "",
            emailLabel: "Email",
            emailValue: "sarah.jenkins@metrotransit.org",
            emailPlaceholder: "passenger@metro.org",
            btnText: "Sign In as Passenger",
            roleName: "Passenger",
            userName: "Sarah Jenkins",
            navLabel: "Sarah J. (Passenger)"
        },
        staff: {
            heading: "Staff Portal Login",
            subheading: "",
            emailLabel: "Email",
            emailValue: "custody.civic@metrotransit.org",
            emailPlaceholder: "staff.id@metrotransit.org",
            btnText: "Sign In to Staff Portal",
            roleName: "Staff",
            userName: "Officer Miller",
            navLabel: "Staff Officer"
        },
        admin: {
            heading: "Admin Login",
            subheading: "",
            emailLabel: "Email",
            emailValue: "admin.director@transit.gov",
            emailPlaceholder: "admin@transit.gov",
            btnText: "Sign In as Administrator",
            roleName: "Admin",
            userName: "Director Vance",
            navLabel: "System Admin"
        }
    };

    // Passenger: show either the Log In form or the Sign Up form
    function showAuthError(el, msg) {
        if (!el) return;
        el.textContent = msg || "";
        el.hidden = !msg;
    }

    function applyAuthMode() {
        const role = roleInput ? roleInput.value : "passenger";
        const isPassenger = role === "passenger";
        const mode = isPassenger ? authMode : "login";
        const signingUp = mode === "signup";

        if (authSwitch) authSwitch.hidden = !isPassenger;
        authSwitch?.querySelectorAll(".auth-mode-btn").forEach(btn => {
            const on = btn.getAttribute("data-auth-mode") === mode;
            btn.classList.toggle("active", on);
            btn.setAttribute("aria-selected", on ? "true" : "false");
        });

        if (form) form.hidden = signingUp;
        if (signupForm) signupForm.hidden = !signingUp;
        document.getElementById("login-to-signup-wrap")?.toggleAttribute("hidden", !isPassenger);
        showAuthError(loginError, "");
        showAuthError(signupError, "");

        const config = roleConfigs[role] || roleConfigs.passenger;
        if (heading) heading.textContent = signingUp ? "Create Passenger Account" : config.heading;
        if (subheading) {
            subheading.textContent = signingUp
                ? "Sign up to report lost or found items, track matches and manage your claims."
                : config.subheading;
            subheading.hidden = !signingUp && !config.subheading;
        }
    }

    authSwitch?.querySelectorAll(".auth-mode-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            authMode = btn.getAttribute("data-auth-mode");
            applyAuthMode();
        });
    });
    document.getElementById("link-to-signup")?.addEventListener("click", (e) => {
        e.preventDefault();
        authMode = "signup";
        applyAuthMode();
    });
    document.getElementById("link-to-login")?.addEventListener("click", (e) => {
        e.preventDefault();
        authMode = "login";
        applyAuthMode();
    });

    // Switch role tabs
    roleTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const role = tab.getAttribute("data-role");
            if (!role || !roleConfigs[role]) return;

            roleTabs.forEach(t => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");

            const config = roleConfigs[role];
            if (roleInput) roleInput.value = role;
            if (heading) heading.textContent = config.heading;
            if (subheading) subheading.textContent = config.subheading;
            if (emailLabel) emailLabel.textContent = config.emailLabel;
            if (emailInput) {
                emailInput.type = "email";
                emailInput.value = config.emailValue;
                emailInput.placeholder = config.emailPlaceholder;
            }
            if (submitBtnText) submitBtnText.textContent = config.btnText;
            applyAuthMode();
        });
    });

    // Password visibility eye toggle on main login page
    if (togglePwdBtn && pwdInput) {
        togglePwdBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const isPassword = pwdInput.type === "password";
            pwdInput.type = isPassword ? "text" : "password";
            togglePwdBtn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
            togglePwdBtn.setAttribute("title", isPassword ? "Hide password" : "Show password");

            const openEye = togglePwdBtn.querySelector(".eye-icon-open");
            const closedEye = togglePwdBtn.querySelector(".eye-icon-closed");
            if (openEye && closedEye) {
                openEye.style.display = isPassword ? "none" : "block";
                closedEye.style.display = isPassword ? "block" : "none";
            }
        });
    }

    document.querySelectorAll(".btn-toggle-pwd[data-toggle-target]").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const input = document.getElementById(btn.getAttribute("data-toggle-target"));
            if (!input) return;
            const show = input.type === "password";
            input.type = show ? "text" : "password";
            btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
        });
    });

    // Passenger sign in (shared by Log In and Sign Up)
    function signInPassenger(account) {
        state.profile = loadProfileFor(account.email, account.name, account.phone);
        state.currentUser = { name: state.profile.name || account.name, email: account.email, role: "Passenger" };
        logAudit("Access", "Signed in", `${state.currentUser.role} • ${account.email}`);
    async function signInPassenger(user, token) {
        if (token) BackToYouAPI.setToken(token);
        BackToYouAPI.setStoredUser(user);
        state.currentUser = user;
        updateNavAuthState();
        showToast(`Welcome, ${state.currentUser.name.split(" ")[0]}!`, "success");
        showToast(`Welcome, ${user.name.split(" ")[0]}!`, "success");
        await syncFromBackend();
        navigateToView("home"); // passengers land on the Home page
    }

    // Sign Up form
    if (signupForm) {
        const clearOnInput = ["signup-name", "signup-email", "signup-phone", "signup-password", "signup-confirm"];
        clearOnInput.forEach(id => {
            document.getElementById(id)?.addEventListener("input", () => {
                document.getElementById(id).closest(".form-group-custom")?.classList.remove("has-error");
                showAuthError(signupError, "");
            });
        });

        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            signupForm.querySelectorAll(".form-group-custom").forEach(g => g.classList.remove("has-error"));
            showAuthError(signupError, "");

            const name = document.getElementById("signup-name").value.trim().replace(/\s+/g, " ");
            const email = document.getElementById("signup-email").value.trim();
            const phone = document.getElementById("signup-phone").value.trim();
            const password = document.getElementById("signup-password").value;
            const confirm = document.getElementById("signup-confirm").value;

            let hasError = false;
            if (!name) { markError("signup-name"); hasError = true; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { markError("signup-email"); hasError = true; }
            if (phone && !isValidPhone(phone)) { markError("signup-phone"); hasError = true; }
            if (password.length < 8) { markError("signup-password"); hasError = true; }
            if (confirm !== password) { markError("signup-confirm"); hasError = true; }
            if (hasError) return;

            if (accountExists(email)) {
                markError("signup-email");
                showAuthError(signupError, "An account with this email already exists. Please log in instead.");
                return;
            try {
                const res = await BackToYouAPI.auth.register({ name, email, phone, password });
                if (res.success) {
                    signupForm.reset();
                    authMode = "login";
                    applyAuthMode();
                    await signInPassenger(res.user, res.token);
                }
            } catch (err) {
                showAuthError(signupError, err.message || "Failed to create passenger account.");
            }

            const account = await createPassengerAccount({ name, email, phone, password });
            state.currentUser = { name, email: account.email, role: "Passenger" };
            logAudit("Accounts", "Created passenger account", `${name} (${account.email})`);
            saveProfileFor(account.email, { name, phone, address: "" });
            signupForm.reset();
            authMode = "login";
            applyAuthMode();
            signInPassenger(account);
        });
    }

    // Handle Form Submission (Log In)
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            showAuthError(loginError, "");
            const currentRole = roleInput ? roleInput.value : "passenger";
            const config = roleConfigs[currentRole] || roleConfigs.passenger;
            const enteredEmail = emailInput ? emailInput.value.trim() : config.emailValue;
            const password = pwdInput ? pwdInput.value : "";

            if (currentRole === "passenger") {
                const password = pwdInput ? pwdInput.value : "";
                if (!enteredEmail || !password) {
                    showAuthError(loginError, "Please enter your email and password.");
                    return;
                }
                const account = await verifyPassengerLogin(enteredEmail, password);
                if (!account) {
                    showAuthError(loginError, "Incorrect email or password. New here? Use Sign Up to create an account.");
                    return;
                }
                signInPassenger(account);
            if (!enteredEmail || !password) {
                showAuthError(loginError, "Please enter your email and password.");
                return;
            }

            state.currentUser = {
                name: config.userName,
                email: enteredEmail,
                role: config.roleName
            };
            logAudit("Access", "Signed in", `${state.currentUser.role} • ${enteredEmail}`);
            updateNavAuthState();
            showToast(`Welcome! Logged in to ${config.heading}.`, "success");
            try {
                const res = await BackToYouAPI.auth.login({
                    email: enteredEmail,
                    password: password,
                    role: config.roleName
                });

            if (currentRole === "admin") {
                navigateToView("dashboard");
                openAdminConsole("Analytics");
            } else if (currentRole === "staff") {
                navigateToView("staff-home");
            } else {
                // Passengers land on the Home page after signing in
                navigateToView("home");
                if (res.success) {
                    BackToYouAPI.setToken(res.token);
                    BackToYouAPI.setStoredUser(res.user);
                    state.currentUser = res.user;
                    updateNavAuthState();
                    showToast(`Welcome! Logged in as ${res.user.name}.`, "success");
                    await syncFromBackend();

                    if (currentRole === "admin") {
                        navigateToView("dashboard");
                        openAdminConsole("analytics");
                    } else if (currentRole === "staff") {
                        navigateToView("staff-home");
                    } else {
                        navigateToView("home");
                    }
                }
            } catch (err) {
                showAuthError(loginError, err.message || "Invalid credentials. Please verify your email and password.");
            }
        });
    }
}

// User Navigation Auth State & Logout
function updateNavAuthState() {

    document.body.classList.toggle("is-admin-user", state.currentUser?.role === "Admin");
    const userPill = document.getElementById("user-auth-pill");
    const userLabel = document.getElementById("user-nav-label");
    const loginBtn = document.getElementById("btn-open-login");
    const logoutBtn = document.getElementById("btn-logout");

    if (state.currentUser) {
        if (userLabel) userLabel.textContent = `${state.currentUser.name} (${state.currentUser.role})`;
        if (userPill) userPill.style.display = "inline-flex";
        if (loginBtn) loginBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "inline-flex";
        renderRoleNavLinks(state.currentUser.role);
        applyRoleSpecificUI(state.currentUser.role);
        refreshProfileAvatars();
    } else {
        if (userLabel) userLabel.textContent = "Login";
        if (userPill) userPill.style.display = "none";
        if (loginBtn) loginBtn.style.display = "inline-flex";
        if (logoutBtn) logoutBtn.style.display = "none";
        // Clear nav links on logout
        const navLinks = document.getElementById("nav-links");
        if (navLinks) navLinks.innerHTML = "";
        applyRoleSpecificUI(null);
    }
}

// Report Item form + feedback entry points depend on who is signed in
function applyRoleSpecificUI(role) {
    const isPassenger = role === "Passenger";

    // Report Item > Custody & Contact: passengers do not choose a "Person Reporting"
    const roleGroup = document.getElementById("reporter-role-group");
    const roleSelect = document.getElementById("form-reporter-role");
    const nameLabel = document.getElementById("reporter-name-label");
    const grid = document.getElementById("custody-contact-grid");
    if (roleGroup) roleGroup.style.display = isPassenger ? "none" : "";
    if (roleSelect && isPassenger) roleSelect.value = "Passenger";
    if (grid) grid.classList.toggle("two-cols", isPassenger);
    if (nameLabel) {
        nameLabel.innerHTML = `${isPassenger ? "Full Name" : "Reporter Full Name"} <span class="required-star">*</span>`;
    }

    // Passengers can open their profile from the account pill
    const pill = document.getElementById("user-auth-pill");
    if (pill) {
        pill.classList.toggle("is-clickable", isPassenger);
        if (isPassenger) {
            pill.setAttribute("role", "button");
            pill.setAttribute("tabindex", "0");
            pill.setAttribute("title", "My profile");
        } else {
            pill.removeAttribute("role");
            pill.removeAttribute("tabindex");
            pill.removeAttribute("title");
        }
    }

    // Staff do not log items from the footer
    document.querySelectorAll(".footer-passenger-only").forEach(li => {
        li.style.display = role === "Staff" ? "none" : "";
    });

    // Footer feedback link is for passengers only
    const footerFb = document.getElementById("footer-feedback-item");
    if (footerFb) footerFb.style.display = isPassenger ? "" : "none";
}

/**
 * Renders contextual navigation links in the top navbar based on the logged-in role.
 * Passenger  → Home, Browse Reports, My Dashboard, FAQ & Support
 * Staff      → Log Found Item, Verify Claims, Manage Inventory, Direct Matching
 * Admin      → Analytics, User Management, Feedback, Staff Console
 */
function renderRoleNavLinks(role) {
    const navLinksEl = document.getElementById("nav-links");
    if (!navLinksEl) return;

    let linksHTML = "";

    if (role === "Passenger") {
        linksHTML = `
      <li><a href="#home" class="nav-link" data-view="home">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Home
      </a></li>
      <li><a href="#browse" class="nav-link" data-view="browse">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        Browse Reports
      </a></li>
      <li><a href="#report" class="nav-link" data-view="report">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        Report Item
      </a></li>
      <li><a href="#faq" class="nav-link" data-view="faq">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        FAQ &amp; Support
      </a></li>
      <li><a href="#" class="nav-link nav-link-feedback" id="nav-feedback">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        Feedback
      </a></li>
    `;
    } else if (role === "Staff") {
        linksHTML = `
      <li><a href="#staff-home" class="nav-link nav-link-staffnav" data-view="staff-home">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
        Dashboard
      </a></li>
      <li><a href="#staff-inventory" class="nav-link nav-link-staffnav" data-view="staff-inventory">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
        Manage Inventory
      </a></li>
      <li><a href="#staff-matching" class="nav-link nav-link-staffnav" data-view="staff-matching">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
        Direct Matching
      </a></li>
      <li><a href="#staff-disposal" class="nav-link nav-link-staffnav" data-view="staff-disposal">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        Disposal
      </a></li>
    `;
    } else if (role === "Admin") {
        linksHTML = `
      <li><a href="#" class="nav-link nav-link-admin" data-admin-tab="analytics">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        Analytics
      </a></li>
      <li><a href="#" class="nav-link nav-link-admin" id="nav-admin-users" data-admin-tab="users">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        User Management
      </a></li>
      <li><a href="#" class="nav-link nav-link-admin" id="nav-admin-feedback" data-admin-tab="feedback">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        Feedback
      </a></li>
      <li><a href="#" class="nav-link nav-link-admin" id="nav-admin-console" data-admin-tab="console">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
        Staff Console
      </a></li>
    `;
    }

    navLinksEl.innerHTML = linksHTML;

    // Attach click events to the newly rendered nav links
    navLinksEl.querySelectorAll(".nav-link[data-view]").forEach(link => {
        link.addEventListener("click", (e) => {
            const view = link.getAttribute("data-view");
            const staffTab = link.getAttribute("data-staff-tab");
            if (view) {
                e.preventDefault();
                navigateToView(view);
                // If staff tab is specified, activate that dashboard tab
                if (staffTab) {
                    setTimeout(() => {
                        document.querySelectorAll(".dash-tab-btn").forEach(b => b.classList.remove("active"));
                        document.querySelectorAll(".dash-pane").forEach(p => p.classList.remove("active"));
                        const tabBtn = document.querySelector(`.dash-tab-btn[data-dash-tab="${staffTab}"]`);
                        if (tabBtn) tabBtn.classList.add("active");
                        document.getElementById(`pane-dash-${staffTab}`)?.classList.add("active");
                    }, 100);
                }
            }
        });
    });

    // Passenger feedback link opens the feedback form
    navLinksEl.querySelector("#nav-feedback")?.addEventListener("click", (e) => {
        e.preventDefault();
        openFeedbackModal();
    });

    // Admin special links: each one opens its own panel in the admin console
    if (role === "Admin") {
        navLinksEl.querySelectorAll(".nav-link-admin").forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                openAdminConsole(link.getAttribute("data-admin-tab") || "console");
            });
        });
    }
}

function handleLogout() {
    if (state.currentUser) logAudit("Access", "Signed out", `${state.currentUser.role} • ${state.currentUser.email || ""}`);
    BackToYouAPI.clearSession();
    closeAdminModal();
    document.body.classList.remove("is-admin-user");
    state.currentUser = null;
    updateNavAuthState();
    showToast("You have been signed out successfully.", "info");
    navigateToView("login");
}

// Navigation & View Router
// ---- Profile: auto-generated picture + form ----------------------------
function getInitials(name) {
    const parts = (name || "").trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    const first = parts[0][0];
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
}

// Same name always gives the same colours
function avatarGradient(name) {
    const key = (name || "").trim().toLowerCase();
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    const hue = hash % 360;
    return `linear-gradient(135deg, hsl(${hue}, 62%, 42%), hsl(${(hue + 40) % 360}, 66%, 30%))`;
}

function paintAvatar(el, name) {
    if (!el) return;
    el.textContent = getInitials(name);
    el.style.background = avatarGradient(name);
}

function refreshProfileAvatars() {
    const nav = document.getElementById("nav-avatar");
    const isPassenger = state.currentUser?.role === "Passenger";
    if (nav) {
        nav.style.display = isPassenger ? "inline-flex" : "none";
        if (isPassenger) paintAvatar(nav, state.currentUser.name);
    }
}

function fillProfileForm() {
    const nameEl = document.getElementById("profile-name");
    if (!nameEl) return;
    nameEl.value = state.currentUser?.name || state.profile.name || "";
    document.getElementById("profile-email").value = state.currentUser?.email || "";
    document.getElementById("profile-phone").value = state.profile.phone || "";
    document.getElementById("profile-address").value = state.profile.address || "";
    document.querySelectorAll("#form-profile .form-group-custom").forEach(g => g.classList.remove("has-error"));
    paintAvatar(document.getElementById("profile-avatar"), nameEl.value);
}

function setupProfile() {
    const form = document.getElementById("form-profile");
    if (!form) return;
    const nameEl = document.getElementById("profile-name");
    const phoneEl = document.getElementById("profile-phone");

    // Picture updates live while the name is typed
    nameEl.addEventListener("input", () => {
        paintAvatar(document.getElementById("profile-avatar"), nameEl.value);
        nameEl.closest(".form-group-custom")?.classList.remove("has-error");
    });
    phoneEl.addEventListener("input", () => phoneEl.closest(".form-group-custom")?.classList.remove("has-error"));

    // Open the profile from the account pill (passengers only)
    const pill = document.getElementById("user-auth-pill");
    const openProfile = () => { if (state.currentUser?.role === "Passenger") navigateToView("profile"); };
    pill?.addEventListener("click", openProfile);
    pill?.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProfile(); }
    });

    document.getElementById("btn-profile-cancel")?.addEventListener("click", () => navigateToView("home"));

    form.addEventListener("submit", (e) => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        form.querySelectorAll(".form-group-custom").forEach(g => g.classList.remove("has-error"));

        const name = nameEl.value.trim().replace(/\s+/g, " ");
        const phone = phoneEl.value.trim();
        const address = document.getElementById("profile-address").value.trim();

        let hasError = false;
        if (!name) { markError("profile-name"); hasError = true; }
        if (phone && !isValidPhone(phone)) {
            markError("profile-phone"); hasError = true;
        }
        if (hasError) {
            showToast("Please fix the highlighted fields.", "error");
            return;
        }

        state.profile = { name, phone, address };
        if (state.currentUser?.email) saveProfileFor(state.currentUser.email, state.profile);

        if (state.currentUser) {
            state.currentUser.name = name;
            updateNavAuthState();
        try {
            const res = await BackToYouAPI.me.updateProfile({ name, phone, address });
            if (res.success) {
                state.currentUser.name = res.user.name;
                state.currentUser.phone = res.user.phone;
                state.currentUser.address = res.user.address;
                updateNavAuthState();
                paintAvatar(document.getElementById("profile-avatar"), name);
                showToast("Profile saved successfully in database.", "success");
            }
        } catch (err) {
            showToast(err.message || "Failed to save profile", "error");
        }
        paintAvatar(document.getElementById("profile-avatar"), name);
        showToast("Profile saved.", "success");
    });
}

function setupHomeFeedSwitch() {
    const buttons = document.querySelectorAll("#home-feed-switch .feed-type-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            state.homeFeedType = btn.getAttribute("data-feed-type");
            buttons.forEach(b => {
                const on = b === btn;
                b.classList.toggle("active", on);
                b.setAttribute("aria-selected", on ? "true" : "false");
            });
            renderAllViews();
        });
    });
}

function setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-link, .footer-nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const view = link.getAttribute("data-view");
            if (view) {
                e.preventDefault();
                navigateToView(view);
            }
        });
    });

    // Action CTAs
    document.getElementById("btn-open-login")?.addEventListener("click", () => navigateToView("login"));
    document.getElementById("btn-logout")?.addEventListener("click", handleLogout);
    document.getElementById("hero-btn-report")?.addEventListener("click", () => navigateToView("report"));
    document.getElementById("hero-btn-browse")?.addEventListener("click", () => navigateToView("browse"));
    document.getElementById("btn-view-all-browse")?.addEventListener("click", () => navigateToView("browse"));
    document.getElementById("browse-header-report-btn")?.addEventListener("click", () => navigateToView("report"));
    document.getElementById("dash-new-report-btn")?.addEventListener("click", () => navigateToView("report"));
    document.getElementById("empty-state-reset-btn")?.addEventListener("click", resetAllFilters);
    document.getElementById("nav-brand")?.addEventListener("click", (e) => {
        e.preventDefault();
        navigateToView(state.currentUser ? (state.currentUser.role === "Staff" ? "staff-home" : (state.currentUser.role === "Passenger" ? "home" : "dashboard")) : "login");
    });

    // Transport category click-through shortcuts
    document.querySelectorAll("[data-transit-filter]").forEach(btn => {
        btn.addEventListener("click", () => {
            const transit = btn.getAttribute("data-transit-filter");
            state.filters.transit = transit;
            const select = document.getElementById("filter-transit-select");
            if (select) select.value = transit;
            navigateToView("browse");
            applyFilters();
            showToast(`Showing reports filtered by: ${transit}`, "info");
        });
    });

    // Dashboard Tab Switching
    document.querySelectorAll(".dash-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".dash-tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".dash-pane").forEach(p => p.classList.remove("active"));
            btn.classList.add("active");
            const tabName = btn.getAttribute("data-dash-tab");
            document.getElementById(`pane-dash-${tabName}`)?.classList.add("active");
        });
    });

    // Hash change handling
    window.addEventListener("hashchange", () => {
        const hash = window.location.hash.replace("#", "") || "login";
        if (["login", "home", "browse", "report", "dashboard", "faq", "profile", "staff-home", "staff-inventory", "staff-matching", "staff-disposal"].includes(hash)) {
            navigateToView(hash);
        }
    });

    // Handle initial page load: default to login first!
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash && ["home", "browse", "report", "dashboard", "faq"].includes(initialHash)) {
        navigateToView(initialHash);
    } else {
        navigateToView("login");
    }
}

function navigateToView(viewName) {
    // Staff have their own workspace instead of the passenger dashboard / directory
    const role = state.currentUser?.role;
    if (role === "Staff") {
        if (viewName === "dashboard") viewName = "staff-home";
        else if (viewName === "browse") viewName = "staff-inventory";
    }
    // Role guards for protected views
    if (viewName.startsWith("staff-") && role !== "Staff") viewName = state.currentUser ? "dashboard" : "login";
    if (viewName === "profile" && role !== "Passenger") viewName = state.currentUser ? "dashboard" : "login";
    if (viewName !== "login" && !state.currentUser) viewName = "login";

    state.currentView = viewName;
    window.location.hash = `#${viewName}`;

    // Update navbar links
    document.querySelectorAll(".nav-link").forEach(link => {
        if (link.getAttribute("data-view") === viewName) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Update view sections
    document.querySelectorAll(".view-section").forEach(sec => {
        sec.classList.remove("active");
    });
    const targetSection = document.getElementById(`view-${viewName}`);
    if (targetSection) {
        targetSection.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Login View state: clean header & hide footer on login page
    document.body.classList.toggle("login-view-active", viewName === "login");
    const footer = document.querySelector(".app-footer");
    if (footer) {
        footer.style.display = viewName === "login" ? "none" : "";
    }

    // Refresh view contents
    if (viewName === "browse") {
        applyFilters();
    } else if (viewName === "dashboard") {
        renderDashboard();
    } else if (viewName === "profile") {
        fillProfileForm();
    } else if (viewName.startsWith("staff-")) {
        renderStaffViews();
    }
}

// =====================================================================
// 4. Search & Filter Controls (Directory & Hero)
// =====================================================================

function setupSearchAndFilters() {
    // Hero Quick Search Form
    const heroForm = document.getElementById("hero-search-form");
    if (heroForm) {
        heroForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const kw = document.getElementById("hero-keyword-input").value.trim();
            const cat = document.getElementById("hero-category-select").value;
            const trans = document.getElementById("hero-transit-select").value;
            const rType = heroForm.querySelector("input[name='hero-report-type']:checked")?.value || "all";

            state.filters.keyword = kw;
            state.filters.category = cat || "all";
            state.filters.transit = trans || "all";
            state.filters.type = rType;

            // Sync directory controls
            syncDirectoryFilterInputs();
            navigateToView("browse");
            applyFilters();
        });
    }

    // Browse Directory Sidebar Filters
    document.querySelectorAll(".segment-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".segment-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            state.filters.type = btn.getAttribute("data-filter-type");
            applyFilters();
        });
    });

    const kwInput = document.getElementById("filter-keyword-input");
    const clearKwBtn = document.getElementById("filter-clear-keyword");
    if (kwInput) {
        kwInput.addEventListener("input", () => {
            state.filters.keyword = kwInput.value.trim();
            clearKwBtn.style.display = state.filters.keyword ? "block" : "none";
            applyFilters();
        });
    }
    if (clearKwBtn) {
        clearKwBtn.addEventListener("click", () => {
            kwInput.value = "";
            state.filters.keyword = "";
            clearKwBtn.style.display = "none";
            applyFilters();
        });
    }

    document.getElementById("filter-category-select")?.addEventListener("change", (e) => {
        state.filters.category = e.target.value;
        applyFilters();
    });

    document.getElementById("filter-transit-select")?.addEventListener("change", (e) => {
        state.filters.transit = e.target.value;
        applyFilters();
    });

    document.getElementById("filter-status-select")?.addEventListener("change", (e) => {
        state.filters.status = e.target.value;
        applyFilters();
    });

    document.querySelectorAll("input[name='filter-date-range']").forEach(radio => {
        radio.addEventListener("change", (e) => {
            state.filters.dateRange = e.target.value;
            applyFilters();
        });
    });

    document.getElementById("sort-by-select")?.addEventListener("change", (e) => {
        state.filters.sort = e.target.value;
        applyFilters();
    });

    document.getElementById("btn-clear-filters")?.addEventListener("click", resetAllFilters);
}

function syncDirectoryFilterInputs() {
    const kwInput = document.getElementById("filter-keyword-input");
    if (kwInput) kwInput.value = state.filters.keyword;

    const catSelect = document.getElementById("filter-category-select");
    if (catSelect) catSelect.value = state.filters.category;

    const transSelect = document.getElementById("filter-transit-select");
    if (transSelect) transSelect.value = state.filters.transit;

    document.querySelectorAll(".segment-btn").forEach(btn => {
        if (btn.getAttribute("data-filter-type") === state.filters.type) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

function resetAllFilters() {
    state.filters = {
        type: "all",
        keyword: "",
        category: "all",
        transit: "all",
        status: "all",
        dateRange: "all",
        sort: "newest"
    };

    syncDirectoryFilterInputs();
    const kwInput = document.getElementById("filter-keyword-input");
    if (kwInput) kwInput.value = "";
    const clearKwBtn = document.getElementById("filter-clear-keyword");
    if (clearKwBtn) clearKwBtn.style.display = "none";

    const statSelect = document.getElementById("filter-status-select");
    if (statSelect) statSelect.value = "all";

    const defaultDate = document.querySelector("input[name='filter-date-range'][value='all']");
    if (defaultDate) defaultDate.checked = true;

    applyFilters();
    showToast("Search filters reset to full transit directory", "info");
}

function applyFilters() {
    let filtered = [...state.items];

    // 1. Report Type (Lost / Found / All)
    if (state.filters.type !== "all") {
        filtered = filtered.filter(i => i.type.toLowerCase() === state.filters.type.toLowerCase());
    }

    // 2. Keyword Filter
    if (state.filters.keyword) {
        const q = state.filters.keyword.toLowerCase();
        filtered = filtered.filter(i =>
            i.title.toLowerCase().includes(q) ||
            i.description.toLowerCase().includes(q) ||
            i.location.toLowerCase().includes(q) ||
            i.route.toLowerCase().includes(q) ||
            i.color.toLowerCase().includes(q) ||
            (i.brand && i.brand.toLowerCase().includes(q))
        );
    }

    // 3. Category Filter
    if (state.filters.category !== "all") {
        filtered = filtered.filter(i => i.category.toLowerCase() === state.filters.category.toLowerCase());
    }

    // 4. Transit Type
    if (state.filters.transit !== "all") {
        filtered = filtered.filter(i => i.transitType.toLowerCase() === state.filters.transit.toLowerCase());
    }

    // 5. Status
    if (state.filters.status !== "all") {
        const wanted = state.filters.status.toLowerCase();
        filtered = filtered.filter(i => {
            const s = i.status.toLowerCase();
            return wanted === "claim pending" ? (s === "claim pending" || s === "open") : s === wanted;
        });
    }

    // 6. Sorting
    if (state.filters.sort === "newest") {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (state.filters.sort === "oldest") {
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (state.filters.sort === "title") {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    renderDirectoryCards(filtered);
    renderActiveFilterTags();
}

function renderDirectoryCards(items) {
    const container = document.getElementById("browse-items-grid");
    const emptyState = document.getElementById("browse-empty-state");
    const countEl = document.getElementById("results-count-number");

    if (!container) return;

    if (countEl) countEl.textContent = items.length;

    if (items.length === 0) {
        container.style.display = "none";
        if (emptyState) emptyState.style.display = "block";
        return;
    }

    container.style.display = "grid";
    if (emptyState) emptyState.style.display = "none";

    container.innerHTML = items.map(item => createItemCardHTML(item)).join("");
    attachCardActionEvents(container);
}

function renderActiveFilterTags() {
    const container = document.getElementById("active-tags-container");
    if (!container) return;

    const tags = [];
    if (state.filters.type !== "all") {
        tags.push({ label: `Type: ${state.filters.type}`, key: "type", resetVal: "all" });
    }
    if (state.filters.keyword) {
        tags.push({ label: `"${state.filters.keyword}"`, key: "keyword", resetVal: "" });
    }
    if (state.filters.category !== "all") {
        tags.push({ label: `Category: ${state.filters.category}`, key: "category", resetVal: "all" });
    }
    if (state.filters.transit !== "all") {
        tags.push({ label: `Transit: ${state.filters.transit}`, key: "transit", resetVal: "all" });
    }
    if (state.filters.status !== "all") {
        tags.push({ label: `Status: ${state.filters.status}`, key: "status", resetVal: "all" });
    }

    container.innerHTML = tags.map(tag => `
    <span class="filter-tag-pill">
      <span>${escapeHtml(tag.label)}</span>
      <button onclick="removeFilterTag('${tag.key}', '${tag.resetVal}')" aria-label="Remove filter">&times;</button>
    </span>
  `).join("");
}

window.removeFilterTag = function (key, resetVal) {
    state.filters[key] = resetVal;
    syncDirectoryFilterInputs();
    applyFilters();
};

// =====================================================================
// 5. Item Card HTML Generator & Event Attachments
// =====================================================================

// Items that are still "Open" are shown to users as "Claim Pending"
function displayStatus(status) {
    return status === "Open" ? "Claim Pending" : status;
}

function statusPillHTML(item, extraClass = "", style = "") {
    if (!item.status) return "";
    const cls = item.status === "Possible Match" ? "match-found" : (item.status === "Recovered" ? "recovered" : "");
    return `<span class="media-status-pill ${cls} ${extraClass}"${style ? ` style="${style}"` : ""}>${displayStatus(item.status)}</span>`;
}

function createItemCardHTML(item) {
    const isLost = item.type === "Lost";
    return `
    <article class="item-card hover-lift" data-item-id="${item.id}">
      ${!isLost ? `
        <div class="item-card-media">
          <span class="media-tag-lost-found found">
            FOUND
          </span>
          ${statusPillHTML(item)}
          ${item.image ? `
            <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy" onerror="this.src='found_laptop.jpg'" />
          ` : `
            <div class="item-media-placeholder">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <span class="text-xs font-bold">Transit Found Record</span>
            </div>
          `}
        </div>
      ` : `
        <div class="item-card-lost-header">
          <span class="media-tag-lost-found lost" style="position:static;">
            LOST
          </span>
          ${statusPillHTML(item)}
        </div>
      `}
 
      <div class="item-card-body">
        <div class="item-card-meta-top">
          <span class="item-category-pill">${item.category}</span>
          <span class="item-date-text">${formatDate(item.date)}</span>
        </div>
 
        <h3 class="item-card-title">${escapeHtml(item.title)}</h3>
        ${isLost ? `
          <div class="item-card-desc-box">
            <span class="desc-tag-label">Description:</span>
            <p class="item-card-desc" style="-webkit-line-clamp:4;">${escapeHtml(item.description)}</p>
          </div>
        ` : `
          <p class="item-card-desc">${escapeHtml(item.description)}</p>
        `}
 
        <div class="item-card-transit-info">
          <svg class="item-transit-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            ${getTransitIconPath(item.transitType)}
          </svg>
          <span>${escapeHtml(item.route)}</span>
        </div>
 
        <div class="item-card-footer">
          <span class="item-ref-id">${item.id}</span>
          <button class="btn-card-action" data-action="view-details" data-id="${item.id}">
            <span>Inspect & Match</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

function attachCardActionEvents(container) {
    container.querySelectorAll("[data-action='view-details']").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.getAttribute("data-id");
            openDetailsModal(id);
        });
    });

    // Clicking anywhere on card also opens details
    container.querySelectorAll(".item-card").forEach(card => {
        card.addEventListener("click", () => {
            const id = card.getAttribute("data-item-id");
            openDetailsModal(id);
        });
    });
}

function getTransitIconPath(transitType) {
    switch (transitType) {
        case "Metro":
            return '<rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/>';
        case "Bus":
            return '<path d="M19 17h2V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v9h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>';
        case "Train":
            return '<rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 10h16"/><circle cx="8" cy="14" r="1"/><circle cx="16" cy="14" r="1"/><path d="m9 21-2-4"/><path d="m15 21 2-4"/>';
        default:
            return '<path d="M3 21h18"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/>';
    }
}

// =====================================================================
// 6. Report Lost & Found Interactive Form (Guide Page 5)
// =====================================================================

function setupReportForm() {
    const tabLost = document.getElementById("tab-report-lost");
    const tabFound = document.getElementById("tab-report-found");
    const typeInput = document.getElementById("form-report-type");
    const foundOnlyFields = document.getElementById("found-only-fields");
    const custodyTitle = document.getElementById("custody-block-title");
    const btnSubmitText = document.getElementById("btn-submit-text");

    if (tabLost && tabFound) {
        tabLost.addEventListener("click", () => {
            tabLost.classList.add("active");
            tabFound.classList.remove("active");
            typeInput.value = "Lost";
            foundOnlyFields.style.display = "none";
            custodyTitle.textContent = "Owner Contact & Security";
            btnSubmitText.textContent = "Register Lost Report & Run Matcher";
        });

        tabFound.addEventListener("click", () => {
            tabFound.classList.add("active");
            tabLost.classList.remove("active");
            typeInput.value = "Found";
            foundOnlyFields.style.display = "block";
            custodyTitle.textContent = "Custody Location & Surrender";
            btnSubmitText.textContent = "Register Custodial Entry & Alert Owners";
        });
    }

    // File dropzone mock handler
    const dropzone = document.getElementById("dropzone-area");
    const fileInput = document.getElementById("form-photo-upload");
    const previewImg = document.getElementById("dropzone-img");
    const previewBox = document.getElementById("dropzone-preview");
    const dropzoneContent = document.getElementById("dropzone-content");
    const removeBtn = document.getElementById("dropzone-remove");

    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (re) => {
                    previewImg.src = re.target.result;
                    previewBox.style.display = "block";
                    dropzoneContent.style.display = "none";
                };
                reader.readAsDataURL(file);
            }
        });

        removeBtn?.addEventListener("click", (e) => {
            e.stopPropagation();
            fileInput.value = "";
            previewImg.src = "";
            previewBox.style.display = "none";
            dropzoneContent.style.display = "flex";
        });
    }

    // Pre-fill today's date
    const dateInput = document.getElementById("form-date");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.value = today;
    }

    // Cancel report button
    document.getElementById("btn-cancel-report")?.addEventListener("click", () => {
        navigateToView("home");
    });

    // Submit Handler with Client Validation
    const reportForm = document.getElementById("transit-report-form");
    if (reportForm) {
        reportForm.addEventListener("submit", handleReportSubmission);
    }
}

function handleReportSubmission(e) {
async function handleReportSubmission(e) {
    e.preventDefault();

    // Reset errors
    document.querySelectorAll(".form-group-custom").forEach(fg => fg.classList.remove("has-error"));

    let hasError = false;

    const itemName = document.getElementById("form-item-name").value.trim();
    const category = document.getElementById("form-category").value;
    const color = document.getElementById("form-color").value.trim();
    const description = document.getElementById("form-description").value.trim();
    const transitType = document.getElementById("form-transit-type").value;
    const route = document.getElementById("form-route").value.trim();
    const dateVal = document.getElementById("form-date").value;
    const locationVal = document.getElementById("form-location").value.trim();
    const reporterName = document.getElementById("form-reporter-name").value.trim();
    const reporterRole = document.getElementById("form-reporter-role")?.value || "Passenger";
    const reporterEmail = document.getElementById("form-reporter-email").value.trim();
    const reportType = document.getElementById("form-report-type").value;
    const brandVal = document.getElementById("form-brand").value.trim();
    const timeVal = document.getElementById("form-time-approx").value.trim();
    const custodyLoc = document.getElementById("form-custody-location")?.value || "Secured by transit reporting team";

    // Validate fields
    if (!itemName) { markError("form-item-name"); hasError = true; }
    if (!category) { markError("form-category"); hasError = true; }
    if (!color) { markError("form-color"); hasError = true; }
    if (description.length < 15) { markError("form-description"); hasError = true; }
    if (!transitType) { markError("form-transit-type"); hasError = true; }
    if (!route) { markError("form-route"); hasError = true; }
    if (!dateVal) { markError("form-date"); hasError = true; }
    if (!locationVal) { markError("form-location"); hasError = true; }
    if (!reporterName) { markError("form-reporter-name"); hasError = true; }
    if (!reporterEmail || !reporterEmail.includes("@")) { markError("form-reporter-email"); hasError = true; }

    if (hasError) {
        showToast("Please complete the required fields highlighted in red.", "error");
        return;
    }

    // Generate Reference Tracking ID
    const newRefId = `TRX-${Math.floor(100000 + Math.random() * 900000)}`;
    if (!state.currentUser) {
        showToast("Please sign in to register your report.", "warning");
        navigateToView("login");
        return;
    }

    const photoPreview = document.getElementById("dropzone-img")?.src;
    const recordedReporter = reporterRole === "Conductor" ? `${reporterName} (Conductor Person)` : reporterName;

    const newReport = {
        id: newRefId,
    const reportPayload = {
        title: itemName,
        type: reportType,
        title: itemName,
        category,
        transitType,
        route,
        location: locationVal,
        date: dateVal,
        timeApprox: timeVal || "Registered at custody intake",
        color,
        brand: brandVal || "Unspecified",
        description,
        custodyLocation: reportType === "Found" ? custodyLoc : "Pending Custodial Match",
        status: "Open",
        image: reportType === "Found" ? (photoPreview || null) : null,
        reporterName: recordedReporter,
        reporterEmail,
        claimed: false
        reporterRole
    };

    // Add to state
    state.items.unshift(newReport);
    logAudit("Reports", `Submitted ${newReport.type.toLowerCase()} item report`, `${newReport.title} (${newReport.id})`);
    const submitBtn = document.getElementById("form-submit-btn");
    const origBtnText = document.getElementById("btn-submit-text").textContent;
    if (submitBtn) submitBtn.disabled = true;
    document.getElementById("btn-submit-text").textContent = "Registering in MongoDB...";

    // Check automated matching immediately!
    const potentialMatches = findMatchesForItem(newReport);
    if (potentialMatches.length > 0) {
        newReport.status = "Possible Match";
        // Also notify user
        const topMatch = potentialMatches[0];
        state.notifications.unshift({
            id: `notif-${Date.now()}`,
            title: `Possible Match Found for ${itemName}!`,
            body: `Engine detected an ${topMatch.score}% confidence match with item ${topMatch.matchedItem.id} (${topMatch.matchedItem.title}).`,
            time: "Just now",
            read: false,
            itemId: topMatch.matchedItem.id
        });
    }
    try {
        const res = await BackToYouAPI.items.create(reportPayload);

    // Update navbar count & stats
    updateSystemCounters();
        // Reset form
        document.getElementById("transit-report-form").reset();
        const previewBox = document.getElementById("dropzone-preview");
        if (previewBox) previewBox.style.display = "none";
        const dropzoneContent = document.getElementById("dropzone-content");
        if (dropzoneContent) dropzoneContent.style.display = "flex";

    // Reset form
    document.getElementById("transit-report-form").reset();
    const previewBox = document.getElementById("dropzone-preview");
    if (previewBox) previewBox.style.display = "none";
    const dropzoneContent = document.getElementById("dropzone-content");
    if (dropzoneContent) dropzoneContent.style.display = "flex";
        showToast(`Report ${res.data.customId} successfully registered in MongoDB!`, "success");

    // Show Toast
    showToast(`Report ${newRefId} successfully submitted to the transit registry!`, "success");

    // Navigate to Dashboard or Details
    navigateToView("dashboard");
        await syncFromBackend();
        navigateToView("dashboard");
    } catch (err) {
        showToast(err.message || "Failed to register report. Please check server.", "error");
    } finally {
        if (submitBtn) submitBtn.disabled = false;
        document.getElementById("btn-submit-text").textContent = origBtnText;
    }
}

function markError(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.closest(".form-group-custom")?.classList.add("has-error");
    }
}

// =====================================================================
// 7. Modals: Details & Ownership Claims (Guide Page 6 & 8)
// =====================================================================

function setupModals() {
    // Details Modal Close
    document.getElementById("modal-details-close")?.addEventListener("click", closeDetailsModal);
    document.getElementById("modal-details")?.addEventListener("click", (e) => {
        if (e.target.id === "modal-details") closeDetailsModal();
    });

    // Claim Modal Close
    document.getElementById("modal-claim-close")?.addEventListener("click", closeClaimModal);
    document.getElementById("modal-claim")?.addEventListener("click", (e) => {
        if (e.target.id === "modal-claim") closeClaimModal();
    });

    // Claim Submission
    const claimForm = document.getElementById("form-submit-claim");
    if (claimForm) {
        claimForm.addEventListener("submit", handleClaimSubmission);
    }

    // Auth Modal
    document.getElementById("modal-auth-close")?.addEventListener("click", closeAuthModal);
    document.getElementById("modal-auth")?.addEventListener("click", (e) => {
        if (e.target.id === "modal-auth") closeAuthModal();
    });
    document.getElementById("form-auth")?.addEventListener("submit", (e) => {
        e.preventDefault();
        closeAuthModal();
        showToast("Signed in as Sarah Jenkins (Verified Passenger Account)", "success");
        document.getElementById("user-nav-label").textContent = "Sarah J.";
    });

    // Password toggle
    document.getElementById("auth-toggle-pwd")?.addEventListener("click", () => {
        const pwdInput = document.getElementById("auth-password");
        if (pwdInput) {
            pwdInput.type = pwdInput.type === "password" ? "text" : "password";
        }
    });

    // Global ESC key listener for modals
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeDetailsModal();
            closeClaimModal();
            closeAuthModal();
            closeAdminModal();
        }
    });
}

function openDetailsModal(itemId) {
    const item = state.items.find(i => i.id === itemId);
    if (!item) return;

    const modal = document.getElementById("modal-details");
    const badge = document.getElementById("modal-item-badge");
    const refEl = document.getElementById("modal-item-ref");
    const body = document.getElementById("modal-details-body");
    const footer = document.getElementById("modal-details-footer");

    badge.className = `report-type-badge-lg ${item.type.toLowerCase()}`;
    badge.textContent = item.type.toUpperCase();
    refEl.textContent = item.id;

    // Possible Matches analysis (Guide Page 6)
    const matches = findMatchesForItem(item);

    const isFound = item.type === "Found";

    body.innerHTML = `
    <div class="details-layout-grid" style="${!isFound ? 'grid-template-columns: 1fr;' : ''}">
      ${isFound ? `
        <div class="details-image-box">
          ${item.image ? `
            <img src="${item.image}" alt="${escapeHtml(item.title)}" onerror="this.src='found_laptop.jpg'" />
          ` : `
            <div class="item-media-placeholder">
              <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <span class="text-xs font-bold">Transit Found Record</span>
            </div>
          `}
        </div>
      ` : ''}
 
      <div class="details-info-col">
        <h2>${escapeHtml(item.title)}</h2>
        <div style="margin: 10px 0 16px; padding: 12px 14px; background: var(--bg-surface-subtle); border-radius: var(--radius-sm); border-left: 3px solid var(--mustard-500);">
          <strong style="display:block; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--mustard-700); margin-bottom:4px;">
            ${isFound ? 'Found Item Description' : 'Lost Item Description'}
          </strong>
          <p style="font-size:0.95rem; color:var(--text-secondary); line-height:1.6; margin:0;">${escapeHtml(item.description)}</p>
        </div>
 
        <div class="details-attr-grid">
          <div class="attr-item">
            <span class="attr-lbl">Category</span>
            <span class="attr-val">${item.category}</span>
          </div>
          <div class="attr-item">
            <span class="attr-lbl">Corridor / Line</span>
            <span class="attr-val">${escapeHtml(item.route)}</span>
          </div>
          <div class="attr-item">
            <span class="attr-lbl">Location Secured</span>
            <span class="attr-val">${escapeHtml(item.location)}</span>
          </div>
          <div class="attr-item">
            <span class="attr-lbl">Incident Date & Time</span>
            <span class="attr-val">${formatDate(item.date)} (${item.timeApprox})</span>
          </div>
          <div class="attr-item">
            <span class="attr-lbl">Color & Finish</span>
            <span class="attr-val">${escapeHtml(item.color)}</span>
          </div>
          <div class="attr-item">
            <span class="attr-lbl">Current Custody Point</span>
            <span class="attr-val" style="color:var(--mustard-700);">${escapeHtml(item.custodyLocation)}</span>
          </div>
        </div>
      </div>
    </div>
 
    <!-- Rule-Based Matching Section (Guide Page 6) -->
    ${matches.length > 0 ? `
      <div class="possible-matches-box">
        <div class="possible-matches-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" color="var(--mustard-600)"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
            <strong>Rule-Based AI Match Proposal (${matches.length} found)</strong>
          </div>
          <span class="rule-match-tag">${matches[0].score}% High Probability Match</span>
        </div>
        <p style="font-size:0.86rem; color:var(--text-secondary); margin-bottom:12px;">
          The transit match system correlated this entry with a corresponding <strong>${matches[0].matchedItem.type}</strong> report.
        </p>
 
        <div style="background:var(--bg-surface); padding:14px; border-radius:var(--radius-sm); border:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:0.92rem;">${escapeHtml(matches[0].matchedItem.title)}</strong>
            <div style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
              ${matches[0].matchedItem.id} • ${matches[0].matchedItem.transitType} • ${matches[0].reasons.join(" • ")}
            </div>
          </div>
          <button class="btn btn-outline-brown btn-sm" onclick="openDetailsModal('${matches[0].matchedItem.id}')">
            Inspect Counterpart
          </button>
        </div>
      </div>
    ` : `
      <div style="background:var(--bg-surface-subtle); padding:14px 18px; border-radius:var(--radius-md); font-size:0.85rem; color:var(--text-muted); display:flex; gap:10px; align-items:center;">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <span>No direct counter-reports have crossed the 50% correlation threshold yet. Active monitoring remains engaged.</span>
      </div>
    `}
  `;

    // Modal Footer: status badge sits at the left of the footer (no longer over the X)
    const footerPill = statusPillHTML(item, "modal-footer-pill");
    const isStaffView = state.currentUser?.role === "Staff" || state.currentUser?.role === "Admin";
    if (item.type === "Found" && item.status !== "Recovered" && !isStaffView) {
        footer.innerHTML = `
      ${footerPill}
      <button class="btn btn-primary-mustard hover-glow" onclick="openClaimModal('${item.id}', '${escapeHtml(item.title)}')">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>I Think This Is My Item — Claim</span>
      </button>
    `;
    } else {
        footer.innerHTML = footerPill;
    }
    footer.style.display = footer.innerHTML.trim() ? "" : "none";

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeDetailsModal() {
    document.getElementById("modal-details")?.classList.remove("open");
    document.body.style.overflow = "";
}

window.openClaimModal = function (itemId, title) {
    closeDetailsModal();
    const modal = document.getElementById("modal-claim");
    document.getElementById("claim-item-id").value = itemId;
    document.getElementById("claim-modal-item-title").textContent = title;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
};

function closeClaimModal() {
    document.getElementById("modal-claim")?.classList.remove("open");
    document.body.style.overflow = "";
}

function handleClaimSubmission(e) {
async function handleClaimSubmission(e) {
    e.preventDefault();
    const itemId = document.getElementById("claim-item-id").value;
    const name = document.getElementById("claim-claimant-name").value.trim();
    const phone = document.getElementById("claim-claimant-phone").value.trim();
    const secret = document.getElementById("claim-secret-details").value.trim();
    const station = document.getElementById("claim-pickup-station").value;

    if (!name || !phone || !secret) {
        showToast("Please provide all ownership verification proof fields.", "error");
        return;
    }

    const newClaimId = `CLM-${Math.floor(1000 + Math.random() * 9000)}`;

    const targetItem = state.items.find(i => i.id === itemId);
    if (targetItem) {
        targetItem.status = "Claim Pending";
        targetItem.claimed = true;
    if (!state.currentUser) {
        showToast("Please sign in to file an ownership claim.", "warning");
        closeClaimModal();
        navigateToView("login");
        return;
    }

    const claimRecord = {
        claimId: newClaimId,
        itemId,
        itemTitle: targetItem ? targetItem.title : "Transit Item",
        claimantName: name,
        claimantPhone: phone,
        secretDetails: secret,
        pickupStation: station,
        status: "Pending Review",
        dateSubmitted: new Date().toISOString().split("T")[0]
    };
    const actionBtn = document.getElementById("btn-submit-claim-action");
    if (actionBtn) actionBtn.disabled = true;

    state.claims.unshift(claimRecord);
    logAudit("Claims", "Submitted ownership claim", `${claimRecord.claimId} • ${claimRecord.itemTitle}`);
    try {
        const res = await BackToYouAPI.claims.create(itemId, {
            claimantName: name,
            claimantPhone: phone,
            secretDetails: secret,
            pickupStation: station
        });

    // In-app notification
    state.notifications.unshift({
        id: `notif-${Date.now()}`,
        title: `Ownership Claim ${newClaimId} Filed`,
        body: `Your claim for '${targetItem?.title}' has been submitted to authorized staff for review.`,
        time: "Just now",
        read: false,
        itemId
    });
        closeClaimModal();
        document.getElementById("form-submit-claim").reset();
        showToast(`Claim ${res.data.claimId} registered in MongoDB database! Authorized officers will examine your proof.`, "success");

    closeClaimModal();
    document.getElementById("form-submit-claim").reset();
    showToast(`Claim ${newClaimId} registered! Authorized officers will examine your proof.`, "success");

    updateSystemCounters();
    renderAllViews();
        await syncFromBackend();
        renderAllViews();
    } catch (err) {
        showToast(err.message || "Failed to submit claim. Please try again.", "error");
    } finally {
        if (actionBtn) actionBtn.disabled = false;
    }
}

// Auth Modal helpers
function openAuthModal() {
    document.getElementById("modal-auth")?.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeAuthModal() {
    document.getElementById("modal-auth")?.classList.remove("open");
    document.body.style.overflow = "";
}

// Copy Reference Link
window.shareReportLink = function (itemId) {
    navigator.clipboard?.writeText(window.location.origin + window.location.pathname + "#browse");
    showToast(`Report Reference ID ${itemId} copied to clipboard!`, "success");
};

// =====================================================================
// 8. Staff / Admin Workspace Console (Guide Page 8)
// =====================================================================

const ADMIN_TAB_META = {
    analytics: { title: "Network Analytics & Activity", sub: "Live overview of passenger and staff activity, reports, recoveries and system events." },
    console: { title: "Transit Custody & Verification Console", sub: "Authorized verification and chain-of-custody handover tracking." },
    users: { title: "User Management", sub: "Review registered accounts, roles and access status." },
    feedback: { title: "Passenger Feedback", sub: "See what passengers think of the app and where it can improve." }
};

function logAudit(category, action, target) {
    const now = new Date();
    state.auditLog.unshift({
        id: `AUD-${String(Date.now()).slice(-6)}`,
        timestamp: now.toISOString(),
        time: now.toLocaleString(),
        actor: state.currentUser?.name || "System",
        email: state.currentUser?.email || "",
        role: state.currentUser?.role || "System",
        category, action, target
    });
    state.auditLog = state.auditLog.slice(0, 500);
    writeStore("transit_audit_log", state.auditLog);
}


function renderAdminAnalytics() {
    const pane = document.getElementById("admin-pane-analytics");
    if (!pane) return;
    const users = state.users || [];
    const items = state.items || [];
    const feedback = state.feedback || [];
    const audit = state.auditLog || [];
    const counts = {
        Passenger: users.filter(u => u.role === "Passenger").length,
        Staff: users.filter(u => u.role === "Staff").length,
        Admin: users.filter(u => u.role === "Admin").length
    };
    const lost = items.filter(i => i.type === "Lost").length;
    const found = items.filter(i => i.type === "Found").length;
    const recovered = items.filter(i => /Recovered|Claimed/i.test(i.status || "") || i.claimed).length;
    const signedIn = audit.filter(a => a.category === "Access" && /Signed in/i.test(a.action)).length;
    const signedOut = audit.filter(a => a.category === "Access" && /Signed out/i.test(a.action)).length;
    const maxRole = Math.max(1, ...Object.values(counts));
    const maxItem = Math.max(1, lost, found);
    const recent = audit.slice(0, 30);
    pane.innerHTML = `
      <div class="admin-stat-row">
        ${adminStatTiles([[users.length, "Registered Accounts"], [signedIn, "Recorded Sign-ins"], [signedOut, "Recorded Sign-outs"], [items.length, "Item Reports"], [recovered, "Recovered / Claimed"], [feedback.length, "Passenger Feedback"]])}
      </div>
      <div class="admin-analytics-grid">
        <section class="admin-table-card admin-chart-card">
          <div class="admin-card-header"><h3>Account distribution</h3><span class="admin-pill-note">By role</span></div>
          <div class="admin-chart-bars">
            ${Object.entries(counts).map(([role, n]) => `<div class="admin-bar-row"><span>${role}</span><div class="admin-bar-track"><i style="width:${(n / maxRole) * 100}%"></i></div><b>${n}</b></div>`).join("")}
          </div>
        </section>
        <section class="admin-table-card admin-chart-card">
          <div class="admin-card-header"><h3>Lost & found reports</h3><span class="admin-pill-note">Current records</span></div>
          <div class="admin-chart-bars">
            ${[["Lost", lost], ["Found", found], ["Recovered", recovered]].map(([label, n]) => `<div class="admin-bar-row"><span>${label}</span><div class="admin-bar-track"><i style="width:${(n / maxItem) * 100}%"></i></div><b>${n}</b></div>`).join("")}
          </div>
          <div class="admin-chart-summary"><span>${lost} lost reports</span><span>${found} found reports</span></div>
        </section>
      </div>
      <section class="admin-table-card admin-activity-card">
        <div class="admin-card-header"><h3>Complete activity & audit trail</h3><span class="admin-pill-note">Newest first · latest 30 events</span></div>
        <div class="table-responsive"><table class="admin-table"><thead><tr><th>Time</th><th>Person</th><th>Role</th><th>Activity</th><th>Category</th><th>Details</th></tr></thead>
        <tbody>${recent.length ? recent.map(a => `<tr><td>${escapeHtml(a.time || a.timestamp || "—")}</td><td><strong>${escapeHtml(a.actor || "System")}</strong>${a.email ? `<br><span class="text-xs text-muted">${escapeHtml(a.email)}</span>` : ""}</td><td>${escapeHtml(a.role || "—")}</td><td>${escapeHtml(a.action || "")}</td><td>${escapeHtml(a.category || "")}</td><td>${escapeHtml(a.target || "")}</td></tr>`).join("") : `<tr><td colspan="6">No activity recorded yet.</td></tr>`}</tbody></table></div>
      </section>`;
}

function openAdminConsole(tab = "analytics") {
    const workspace = document.getElementById("modal-admin");
    if (!workspace) return;

    document.body.classList.add("is-admin-user");
    document.body.style.overflow = "";
    workspace.classList.add("open");

    switchAdminTab(tab);
    window.scrollTo({ top: 0, behavior: "instant" });
}

function switchAdminTab(tab) {
    if (!ADMIN_TAB_META[tab]) tab = "analytics";

    // The four admin sections are top-level navigation links, not tabs inside a pop-up.
    document.querySelectorAll(".nav-link-admin").forEach(link => {
        const selected = link.getAttribute("data-admin-tab") === tab;
        link.classList.toggle("active", selected);
        link.setAttribute("aria-current", selected ? "page" : "false");
    });

    document.querySelectorAll(".admin-pane").forEach(pane => {
        const selected = pane.id === `admin-pane-${tab}`;
        pane.classList.toggle("active", selected);
        pane.setAttribute("aria-hidden", selected ? "false" : "true");
    });

    const titleEl = document.getElementById("admin-modal-title");
    const subEl = document.getElementById("admin-modal-subtitle");
    if (titleEl) titleEl.textContent = ADMIN_TAB_META[tab].title;
    if (subEl) subEl.textContent = ADMIN_TAB_META[tab].sub;

    // Render the selected section immediately so it never opens as an empty panel.
    if (tab === "analytics") renderAdminAnalytics();
    else if (tab === "console") renderAdminTable();
    else if (tab === "users") renderAdminUsers();
    else if (tab === "feedback") renderAdminFeedback();
}

function setupAdminConsole() {
    const switchBtn = document.getElementById("admin-quick-switch");
    const modal = document.getElementById("modal-admin");
    const closeBtn = document.getElementById("modal-admin-close");
    const footerStaffLink = document.getElementById("footer-staff-link");

    // Quick-switch button and footer link open the verification console
    switchBtn?.addEventListener("click", () => openAdminConsole("console"));
    footerStaffLink?.addEventListener("click", (e) => {
        e.preventDefault();
        openAdminConsole("console");
    });

    // In-modal section tabs
    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => switchAdminTab(btn.getAttribute("data-admin-tab")));
    });

    document.getElementById("admin-feedback-filter")?.addEventListener("change", renderAdminFeedback);

    closeBtn?.addEventListener("click", closeAdminModal);
    modal?.addEventListener("click", (e) => {
        if (e.target.id === "modal-admin") closeAdminModal();
    });
}

function closeAdminModal() {
    document.getElementById("modal-admin")?.classList.remove("open");
    document.body.style.overflow = "";
}

function adminStatTiles(tiles) {
    return tiles.map(([val, lbl]) => `
    <div class="admin-stat-tile">
      <span class="tile-val">${val}</span>
      <span class="tile-lbl">${lbl}</span>
    </div>`).join("");
}

// ---- User Management ------------------------------------------------
function renderAdminUsers() {
    const tbody = document.getElementById("admin-users-tbody");
    const statsEl = document.getElementById("admin-users-stats");
    if (!tbody) return;

    const u = state.users;
    if (statsEl) statsEl.innerHTML = adminStatTiles([
        [u.length, "Total Accounts"],
        [u.filter(x => x.role === "Passenger").length, "Passengers"],
        [u.filter(x => x.role === "Staff" || x.role === "Admin").length, "Staff &amp; Admins"],
        [u.filter(x => x.status === "Suspended").length, "Suspended"]
    ]);

    const visibleUsers = u.filter(user =>
        (user.email || "").toLowerCase() !== "admin.director@transit.gov"
    );

    tbody.innerHTML = visibleUsers.map(user => `
    <tr>
      <td>
        <strong>${escapeHtml(user.name)}</strong><br>
        <span class="text-xs text-muted">${escapeHtml(user.email)}</span>
      </td>
      <td><span class="admin-role-chip role-${user.role.toLowerCase()}">${user.role}</span></td>
      <td>${escapeHtml(user.station)}</td>
      <td>${escapeHtml(user.lastActive)}</td>
      <td>
        <span class="media-status-pill ${user.status === "Active" ? "recovered" : "lost"}">${user.status}</span>
      </td>
      <td>
        ${user.role === "Admin"
            ? `<span class="text-xs text-muted">Protected</span>`
            : `<button class="${user.status === "Active" ? "btn-admin-reject" : "btn-admin-approve"}" onclick="adminToggleUser('${user.id}')">
               ${user.status === "Active" ? "Suspend" : "Reactivate"}
             </button>`}
      </td>
    </tr>
  `).join("");
}

window.adminToggleUser = function (userId) {
    const user = state.users.find(x => x.id === userId);
window.adminToggleUser = async function (userId) {
    const user = state.users.find(x => x.id === userId || x._id === userId);
    if (!user || user.role === "Admin") return;
    const suspending = user.status === "Active";
    user.status = suspending ? "Suspended" : "Active";
    logAudit("Users", suspending ? "Suspended account" : "Reactivated account", `${user.name} (${user.id})`);
    renderAdminUsers();
    showToast(`${user.name} has been ${suspending ? "suspended" : "reactivated"}.`, suspending ? "info" : "success");
    try {
        const res = await BackToYouAPI.admin.toggleUserStatus(user._id || user.id);
        if (res.success) {
            user.status = res.data.status;
            renderAdminUsers();
            showToast(`${user.name} has been ${user.status.toLowerCase()}.`, "success");
            await syncFromBackend();
        }
    } catch (err) {
        showToast(err.message || "Failed to toggle user status", "error");
    }
};

// =====================================================================
// Staff workspace: Dashboard, Manage Inventory, Direct Matching
// =====================================================================

const STAFF_DEFAULT_CUSTODY_POINTS = [
    "Grand Central Terminal Lost & Found Office",
    "Civic Center Station Custody Desk Vault #B2",
    "South Terminal Station Security Office",
    "Depot Customer Service Lost Bin"
];

function staffCustodyPoints() {
    const set = new Set(STAFF_DEFAULT_CUSTODY_POINTS);
    state.items.filter(i => i.type === "Found" && i.custodyLocation).forEach(i => set.add(i.custodyLocation));
    return [...set];
}

function pairKey(lostId, foundId) {
    return `${lostId}|${foundId}`;
}

// Every lost report paired with the found items the matcher suggests for it
function getMatchPairs() {
    const pairs = [];
    state.items.filter(i => i.type === "Lost" && i.status !== "Recovered").forEach(lost => {
        findMatchesForItem(lost).forEach(m => {
            const key = pairKey(lost.id, m.matchedItem.id);
            if (state.dismissedMatches.has(key)) return;
            pairs.push({
                key, lost, found: m.matchedItem, score: m.score, reasons: m.reasons,
                confirmed: state.confirmedMatches.has(key)
            });
        });
    });
    return pairs.sort((a, b) => b.score - a.score);
}

function staffThumb(item) {
    if (item.image) {
        return `<img class="staff-thumb" src="${item.image}" alt="" loading="lazy" onerror="this.src='found_laptop.jpg'" />`;
    }
    return `<span class="staff-thumb staff-thumb-ph ${item.type === "Lost" ? "lost" : "found"}" aria-hidden="true">${item.type === "Lost" ? "?" : "✓"}</span>`;
}

function staffStatusPill(item) {
    return statusPillHTML(item) || `<span class="text-xs text-muted">—</span>`;
}

function renderStaffViews() {
    renderStaffHome();
    renderStaffInventory();
    renderStaffMatching();
    renderStaffDisposal();
}

// ---- Dashboard ------------------------------------------------------
function renderStaffHome() {
    const kpiEl = document.getElementById("staff-kpis");
    if (!kpiEl) return;

    const hour = new Date().getHours();
    const part = hour < 12 ? "morning" : (hour < 17 ? "afternoon" : "evening");
    const greet = document.getElementById("staff-greeting");
    if (greet) greet.textContent = `Good ${part}, ${state.currentUser?.name || "Officer"}`;
    const dateStr = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const sub = document.getElementById("staff-subline");
    if (sub) sub.textContent = `${dateStr}. Here is what needs your attention today.`;

    const inCustody = state.items.filter(i => i.type === "Found" && i.status !== "Recovered");
    const pendingClaims = state.claims.filter(c => c.status === "Pending Review");
    const pairs = getMatchPairs().filter(p => !p.confirmed);
    const dueDisposal = state.disposals.filter(d => d.status === "Due for Disposal").length;
    const handedOver = state.items.filter(i => i.status === "Recovered").length;

    const kpis = [
        {
            num: inCustody.length, lbl: "Items in custody", tone: "mustard", link: "staff-inventory",
            icon: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'
        },
        {
            num: pendingClaims.length, lbl: "Claims to verify", tone: "alert", link: "",
            icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'
        },
        {
            num: pairs.length, lbl: "Suggested matches", tone: "mustard", link: "staff-matching",
            icon: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>'
        },
        {
            num: dueDisposal, lbl: "Due for disposal", tone: "brown", link: "staff-disposal",
            icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/>'
        },
        {
            num: handedOver, lbl: "Handed over", tone: "green", link: "",
            icon: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
        }
    ];
    kpiEl.innerHTML = kpis.map(k => `
    <${k.link ? `button type="button" data-view-link="${k.link}"` : "div"} class="staff-kpi-card ${k.link ? "is-link" : ""}">
      <span class="staff-kpi-icon ${k.tone}">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">${k.icon}</svg>
      </span>
      <span class="staff-kpi-body">
        <span class="kpi-num">${k.num}</span>
        <span class="kpi-lbl">${k.lbl}</span>
      </span>
    </${k.link ? "button" : "div"}>`).join("");

    // Claims queue
    const claimsEl = document.getElementById("staff-claims-queue");
    const claimsCount = document.getElementById("staff-claims-count");
    if (claimsCount) {
        claimsCount.textContent = pendingClaims.length;
        claimsCount.classList.toggle("is-zero", pendingClaims.length === 0);
    }
    if (claimsEl) {
        claimsEl.innerHTML = pendingClaims.length === 0
            ? `<div class="staff-empty"><strong>All caught up.</strong><span>No ownership claims are waiting for verification.</span></div>`
            : pendingClaims.map(c => {
                const item = state.items.find(i => i.id === c.itemId);
                return `
        <div class="staff-claim-row">
          ${item ? staffThumb(item) : '<span class="staff-thumb staff-thumb-ph found">✓</span>'}
          <div class="staff-claim-main">
            <div class="staff-claim-title">${escapeHtml(c.itemTitle)} <span class="staff-ref">${c.claimId}</span></div>
            <div class="staff-claim-meta">Claimed by <strong>${escapeHtml(c.claimantName)}</strong> • ${formatDate(c.dateSubmitted)} • ${escapeHtml(c.pickupStation)}</div>
            <p class="staff-claim-proof">“${escapeHtml(c.secretDetails)}”</p>
          </div>
          <button type="button" class="btn btn-primary-mustard btn-sm" onclick="openClaimReview('${c.claimId}')">Review claim</button>
        </div>`;
            }).join("");
    }

    // Recently received (found items)
    const recentEl = document.getElementById("staff-recent-intake");
    if (recentEl) {
        const recent = state.items.filter(i => i.type === "Found")
            .sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
        recentEl.innerHTML = recent.length === 0
            ? `<div class="staff-empty"><strong>Nothing received yet.</strong></div>`
            : recent.map(i => `
        <div class="staff-list-row">
          ${staffThumb(i)}
          <div class="staff-list-main">
            <strong>${escapeHtml(i.title)}</strong>
            <span>${escapeHtml(i.custodyLocation || "—")} • ${formatDate(i.date)}</span>
          </div>
          <div class="staff-list-side">
            ${staffStatusPill(i)}
            <button type="button" class="staff-link-btn" onclick="openDetailsModal('${i.id}')">View</button>
          </div>
        </div>`).join("");
    }

    // Match preview
    const matchEl = document.getElementById("staff-match-preview");
    if (matchEl) {
        const top = pairs.slice(0, 3);
        matchEl.innerHTML = top.length === 0
            ? `<div class="staff-empty"><strong>No open suggestions.</strong><span>New reports are checked automatically.</span></div>`
            : top.map(p => `
        <div class="staff-list-row">
          <span class="staff-score staff-score-sm" style="--score:${p.score}"><span>${p.score}%</span></span>
          <div class="staff-list-main">
            <strong>${escapeHtml(p.lost.title)}</strong>
            <span>↔ ${escapeHtml(p.found.title)}</span>
          </div>
          <button type="button" class="staff-link-btn" data-view-link="staff-matching">Review</button>
        </div>`).join("");
    }

    // Custody point bars
    const barsEl = document.getElementById("staff-custody-bars");
    if (barsEl) {
        const counts = {};
        inCustody.forEach(i => { counts[i.custodyLocation || "Unassigned"] = (counts[i.custodyLocation || "Unassigned"] || 0) + 1; });
        const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        const max = entries.length ? entries[0][1] : 1;
        barsEl.innerHTML = entries.length === 0
            ? `<div class="staff-empty"><strong>No items in custody.</strong></div>`
            : entries.map(([name, n]) => `
        <div class="staff-bar-row">
          <div class="staff-bar-label"><span>${escapeHtml(name)}</span><strong>${n}</strong></div>
          <div class="staff-bar-track"><div class="staff-bar-fill" style="width:${Math.round((n / max) * 100)}%"></div></div>
        </div>`).join("");
    }
}

// ---- Manage Inventory -----------------------------------------------
function getInventoryRows() {
    const f = state.staffInv;
    const q = f.q.trim().toLowerCase();
    return state.items.filter(i => {
        if (f.type !== "all" && i.type !== f.type) return false;
        if (f.status !== "all") {
            const s = displayStatus(i.status);
            if (s !== f.status) return false;
        }
        if (f.custody !== "all" && (i.custodyLocation || "") !== f.custody) return false;
        if (q) {
            const hay = [i.id, i.title, i.category, i.route, i.location, i.custodyLocation, i.color, i.brand].join(" ").toLowerCase();
            if (!hay.includes(q)) return false;
        }
        return true;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
}

function renderStaffInventory() {
    const tbody = document.getElementById("staff-inv-tbody");
    if (!tbody) return;

    // custody filter options (keeps current selection)
    const custodySel = document.getElementById("staff-inv-custody");
    if (custodySel) {
        const points = staffCustodyPoints();
        custodySel.innerHTML = `<option value="all">All custody points</option>` +
            points.map(p => `<option value="${escapeHtml(p)}">${escapeHtml(p)}</option>`).join("");
        custodySel.value = points.includes(state.staffInv.custody) ? state.staffInv.custody : "all";
        state.staffInv.custody = custodySel.value;
    }

    const rows = getInventoryRows();
    const countEl = document.getElementById("staff-inv-count");
    if (countEl) countEl.textContent = `${rows.length} of ${state.items.length} items`;

    if (rows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="staff-empty-cell">No items match these filters.</td></tr>`;
        return;
    }

    const points = staffCustodyPoints();
    tbody.innerHTML = rows.map(i => {
        const canMove = i.type === "Found" && i.status !== "Recovered";
        const custodyCell = i.type === "Lost"
            ? `<span class="text-xs text-muted">Reported missing</span>`
            : (canMove
                ? `<select class="admin-filter-select staff-custody-select" aria-label="Custody point for ${escapeHtml(i.title)}" onchange="staffSetCustody('${i.id}', this.value)">
                     ${points.map(p => `<option value="${escapeHtml(p)}" ${p === i.custodyLocation ? "selected" : ""}>${escapeHtml(p)}</option>`).join("")}
                   </select>`
                : `<span class="text-xs">${escapeHtml(i.custodyLocation || "—")}</span>`);
        return `
    <tr>
      <td>
        <div class="staff-item-cell">
          ${staffThumb(i)}
          <div>
            <strong>${escapeHtml(i.title)}</strong><br>
            <span class="staff-ref">${i.id}</span> <span class="text-xs text-muted">• ${escapeHtml(i.route)}</span>
          </div>
        </div>
      </td>
      <td><span class="report-type-badge-sm ${i.type.toLowerCase()}">${i.type.toUpperCase()}</span></td>
      <td>${escapeHtml(i.category)}</td>
      <td style="min-width:230px;">${custodyCell}</td>
      <td style="white-space:nowrap;">${formatDate(i.date)}</td>
      <td>${staffStatusPill(i)}</td>
      <td><button type="button" class="btn btn-outline-brown btn-sm" onclick="openDetailsModal('${i.id}')">View</button></td>
    </tr>`;
    }).join("");
}

window.staffSetCustody = function (itemId, newPoint) {
    const item = state.items.find(i => i.id === itemId);
window.staffSetCustody = async function (itemId, newPoint) {
    const item = state.items.find(i => i.id === itemId || i.customId === itemId);
    if (!item || item.custodyLocation === newPoint) return;
    const from = item.custodyLocation || "Unassigned";
    item.custodyLocation = newPoint;
    logAudit("Inventory", `Moved item from ${from} to ${newPoint}`, `${item.id} - ${item.title}`);
    renderAllViews();
    showToast(`${item.title} moved to ${newPoint}.`, "success");
    try {
        await BackToYouAPI.items.update(item.customId || item.id, { custodyLocation: newPoint });
        item.custodyLocation = newPoint;
        renderAllViews();
        showToast(`${item.title} moved to ${newPoint}.`, "success");
        await syncFromBackend();
    } catch (err) {
        showToast(err.message || "Failed to update custody location", "error");
    }
};

// ---- Direct Matching --------------------------------------------------
function confidenceLabel(score) {
    return score >= 85 ? "High confidence" : (score >= 65 ? "Likely match" : "Possible match");
}

function renderStaffMatching() {
    const grid = document.getElementById("staff-match-grid");
    if (!grid) return;

    const all = getMatchPairs();
    const pairs = all.filter(p => p.score >= state.staffMatchMin);
    const open = all.filter(p => !p.confirmed).length;
    const confirmed = all.filter(p => p.confirmed).length;

    const summary = document.getElementById("staff-match-summary");
    if (summary) {
        summary.innerHTML = `
      <span class="staff-count-pill ${open === 0 ? "is-zero" : ""}">${open}</span> waiting for review
      <span class="staff-sep">•</span>
      <span class="staff-count-pill is-zero">${confirmed}</span> confirmed`;
    }

    if (pairs.length === 0) {
        grid.innerHTML = `<div class="staff-empty staff-empty-wide"><strong>No matches to show.</strong><span>Try a lower score filter, or wait for new reports to come in.</span></div>`;
        return;
    }

    grid.innerHTML = pairs.map(p => `
    <article class="staff-match-card ${p.confirmed ? "is-confirmed" : ""}">
      <div class="staff-match-head">
        <span class="staff-score" style="--score:${p.score}"><span>${p.score}%</span></span>
        <div>
          <strong>${confidenceLabel(p.score)}</strong>
          <div class="text-xs text-muted">${escapeHtml(p.lost.transitType)} corridor • ${escapeHtml(p.lost.category)}</div>
        </div>
        ${p.confirmed ? `<span class="media-status-pill recovered staff-confirmed-pill">Match confirmed</span>` : ""}
      </div>
 
      <div class="staff-match-pair">
        <div class="staff-match-side">
          <span class="staff-side-tag lost">LOST REPORT</span>
          <strong>${escapeHtml(p.lost.title)}</strong>
          <span class="text-xs text-muted">${p.lost.id} • ${escapeHtml(p.lost.route)}</span>
          <span class="text-xs text-muted">Reported by ${escapeHtml(p.lost.reporterName)} • ${formatDate(p.lost.date)}</span>
        </div>
        <span class="staff-match-arrow" aria-hidden="true">⇄</span>
        <div class="staff-match-side">
          <span class="staff-side-tag found">FOUND • IN CUSTODY</span>
          <div class="staff-match-found-row">
            ${staffThumb(p.found)}
            <div>
              <strong>${escapeHtml(p.found.title)}</strong>
              <span class="text-xs text-muted" style="display:block;">${p.found.id}</span>
            </div>
          </div>
          <span class="text-xs text-muted">${escapeHtml(p.found.custodyLocation || "—")}</span>
        </div>
      </div>
 
      <div class="staff-reasons">
        ${p.reasons.map(r => `<span class="staff-reason-chip">${escapeHtml(r)}</span>`).join("")}
      </div>
 
      <div class="staff-match-actions">
        <button type="button" class="btn btn-outline-brown btn-sm" onclick="openDetailsModal('${p.lost.id}')">View lost</button>
        <button type="button" class="btn btn-outline-brown btn-sm" onclick="openDetailsModal('${p.found.id}')">View found</button>
        <span class="staff-spacer"></span>
        ${p.confirmed ? "" : `
          <button type="button" class="btn btn-sm staff-btn-quiet" onclick="staffDismissMatch('${p.lost.id}', '${p.found.id}')">Not a match</button>
          <button type="button" class="btn btn-primary-mustard btn-sm" onclick="staffConfirmMatch('${p.lost.id}', '${p.found.id}')">Confirm match</button>`}
      </div>
    </article>`).join("");
}

window.staffConfirmMatch = function (lostId, foundId) {
    const lost = state.items.find(i => i.id === lostId);
    const found = state.items.find(i => i.id === foundId);
    if (!lost || !found) return;

    state.confirmedMatches.add(pairKey(lostId, foundId));
    [lost, found].forEach(i => { if (i.status === "Open") i.status = "Possible Match"; });

    state.notifications.unshift({
        id: `notif-${Date.now()}`,
        title: "Staff confirmed a match!",
        body: `Staff matched your report '${lost.title}' with item '${found.title}' held at ${found.custodyLocation}. Submit a claim to arrange pickup.`,
        time: "Just now",
        read: false,
        itemId: found.id
    });
    logAudit("Claims", "Confirmed lost/found match", `${lost.id} ↔ ${found.id}`);
    renderAllViews();
    showToast(`Match confirmed. ${lost.reporterName} will be notified.`, "success");
};

window.staffDismissMatch = function (lostId, foundId) {
    const lost = state.items.find(i => i.id === lostId);
    const found = state.items.find(i => i.id === foundId);
    state.dismissedMatches.add(pairKey(lostId, foundId));
    logAudit("Claims", "Dismissed suggested match", `${lostId} ↔ ${foundId}`);
    renderAllViews();
    showToast(`Marked "${lost?.title}" and "${found?.title}" as not a match.`, "info");
};

// ---- Disposal Management ----------------------------------------------
function renderStaffDisposal() {
    const tbody = document.getElementById("staff-disposal-tbody");
    const statsEl = document.getElementById("staff-disposal-stats");
    if (!tbody) return;

    const all = state.disposals;
    const stat = (num, lbl, tone, icon) => `
    <div class="staff-kpi-card">
      <span class="staff-kpi-icon ${tone}">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">${icon}</svg>
      </span>
      <span class="staff-kpi-body"><span class="kpi-num">${num}</span><span class="kpi-lbl">${lbl}</span></span>
    </div>`;
    if (statsEl) {
        statsEl.innerHTML =
            stat(all.filter(x => x.status === "Due for Disposal").length, "Awaiting disposal", "alert", '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/>') +
            stat(all.filter(x => x.status === "Hold Extended").length, "Holds extended", "mustard", '<path d="M12 5v14M5 12h14"/>') +
            stat(all.filter(x => x.status === "Disposed").length, "Disposed", "green", '<polyline points="20 6 9 17 4 12"/>') +
            stat("90 days", "Standard holding period", "brown", '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>');
    }

    const rows = state.staffDispFilter === "all" ? all : all.filter(x => x.status === state.staffDispFilter);
    if (rows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="staff-empty-cell">No items to show.</td></tr>`;
        return;
    }

    tbody.innerHTML = rows.map(item => {
        const pillClass = item.status === "Disposed" ? "recovered" : (item.status === "Hold Extended" ? "match-found" : "lost");
        const confirming = state.disposeConfirmId === item.id;
        let actions;
        if (item.status === "Disposed") {
            actions = `<span class="text-xs text-muted">Completed</span>`;
        } else if (confirming) {
            actions = `<div class="admin-action-btn-group">
                 <button class="btn-admin-reject" onclick="staffDisposeItem('${item.id}')">Yes, dispose</button>
                 <button class="btn-admin-neutral" onclick="staffCancelDispose()">Cancel</button>
               </div>`;
        } else {
            actions = `<div class="admin-action-btn-group">
                 <button class="btn-admin-approve" onclick="staffDisposeItem('${item.id}')">Dispose</button>
                 ${item.status === "Due for Disposal" ? `<button class="btn-admin-neutral" onclick="staffExtendHold('${item.id}')">Extend hold</button>` : ""}
               </div>`;
        }
        return `
    <tr>
      <td><strong>${escapeHtml(item.itemTitle)}</strong><br><span class="staff-ref">${item.id}</span></td>
      <td>${escapeHtml(item.category)}</td>
      <td>${escapeHtml(item.station)}</td>
      <td style="white-space:nowrap;"><strong>${item.daysHeld}</strong> days</td>
      <td>${escapeHtml(item.method)}</td>
      <td><span class="media-status-pill ${pillClass}">${item.status}</span></td>
      <td>${actions}</td>
    </tr>`;
    }).join("");
}

// Disposal cannot be undone, so the first click asks for a second confirming click
window.staffDisposeItem = function (id) {
    const item = state.disposals.find(x => x.id === id);
window.staffDisposeItem = async function (id) {
    const item = state.disposals.find(x => x.id === id || x.disposalId === id);
    if (!item) return;
    if (state.disposeConfirmId !== id) {
        state.disposeConfirmId = id;
        renderStaffDisposal();
        return;
    }
    state.disposeConfirmId = null;
    item.status = "Disposed";
    logAudit("Disposal", `Approved disposal (${item.method.toLowerCase()})`, `${item.id} - ${item.itemTitle}`);
    renderAllViews();
    showToast(`${item.itemTitle} marked as disposed.`, "success");
    try {
        await BackToYouAPI.admin.updateDisposal(item.disposalId || item.id, 'dispose');
        item.status = "Disposed";
        renderAllViews();
        showToast(`${item.itemTitle} marked as disposed.`, "success");
        await syncFromBackend();
    } catch (err) {
        showToast(err.message || "Failed to update disposal", "error");
    }
};

window.staffCancelDispose = function () {
    state.disposeConfirmId = null;
    renderStaffDisposal();
};

window.staffExtendHold = function (id) {
    const item = state.disposals.find(x => x.id === id);
window.staffExtendHold = async function (id) {
    const item = state.disposals.find(x => x.id === id || x.disposalId === id);
    if (!item) return;
    state.disposeConfirmId = null;
    item.status = "Hold Extended";
    logAudit("Disposal", "Extended holding period by 30 days", `${item.id} - ${item.itemTitle}`);
    renderAllViews();
    showToast(`Holding period extended by 30 days for ${item.itemTitle}.`, "info");
    try {
        await BackToYouAPI.admin.updateDisposal(item.disposalId || item.id, 'extend');
        item.status = "Hold Extended";
        renderAllViews();
        showToast(`Holding period extended by 30 days for ${item.itemTitle}.`, "info");
        await syncFromBackend();
    } catch (err) {
        showToast(err.message || "Failed to extend hold", "error");
    }
};

// ---- Claim review window ----------------------------------------------
window.openClaimReview = function (claimId) {
    const claim = state.claims.find(c => c.claimId === claimId);
    if (!claim) return;
    const item = state.items.find(i => i.id === claim.itemId);

    document.getElementById("review-claim-id").textContent = claim.claimId;
    document.getElementById("review-claim-body").innerHTML = `
    <div class="review-grid">
      <section class="review-col">
        <h4 class="review-col-title">Item held in custody</h4>
        ${item ? `
          <div class="review-item-card">
            ${item.image ? `<img class="review-item-img" src="${item.image}" alt="${escapeHtml(item.title)}" onerror="this.src='found_laptop.jpg'" />` : ""}
            <strong>${escapeHtml(item.title)}</strong>
            <span class="staff-ref">${item.id}</span>
            <dl class="review-dl">
              <dt>Category</dt><dd>${escapeHtml(item.category)}</dd>
              <dt>Colour</dt><dd>${escapeHtml(item.color)}</dd>
              <dt>Found at</dt><dd>${escapeHtml(item.location)}</dd>
              <dt>Custody</dt><dd>${escapeHtml(item.custodyLocation || "—")}</dd>
              <dt>Description</dt><dd>${escapeHtml(item.description)}</dd>
            </dl>
          </div>` : `<p class="text-muted">Item record not found.</p>`}
      </section>
 
      <section class="review-col">
        <h4 class="review-col-title">Passenger's claim</h4>
        <dl class="review-dl">
          <dt>Claimant</dt><dd>${escapeHtml(claim.claimantName)}</dd>
          <dt>Phone</dt><dd>${escapeHtml(claim.claimantPhone)}</dd>
          <dt>Pickup desk</dt><dd>${escapeHtml(claim.pickupStation)}</dd>
          <dt>Submitted</dt><dd>${formatDate(claim.dateSubmitted)}</dd>
        </dl>
        <div class="review-proof">
          <strong>Proof of ownership given by the passenger</strong>
          <p>“${escapeHtml(claim.secretDetails)}”</p>
        </div>
        <p class="review-hint">Compare these details with the item itself before you approve. Only the real owner can describe things that are not visible in the photo.</p>
        <div class="form-group-custom review-reason" id="review-reason-group">
          <label for="review-reject-reason">Reason (required if you reject)</label>
          <textarea id="review-reject-reason" rows="2" placeholder="e.g. The serial number given does not match the item."></textarea>
          <span class="input-error-msg">Please give a reason so the passenger knows what to fix</span>
        </div>
      </section>
    </div>`;

    document.getElementById("review-claim-footer").innerHTML = `
    <button type="button" class="btn staff-btn-danger" onclick="staffRejectFromReview('${claim.claimId}')">Reject claim</button>
    <button type="button" class="btn btn-primary-mustard hover-glow" onclick="staffApproveFromReview('${claim.claimId}')">Approve &amp; issue voucher</button>`;

    document.getElementById("modal-claim-review").classList.add("open");
    document.body.style.overflow = "hidden";
};

window.closeClaimReview = function () {
    document.getElementById("modal-claim-review")?.classList.remove("open");
    document.body.style.overflow = "";
};

window.staffApproveFromReview = function (claimId) {
    closeClaimReview();
    adminApproveClaim(claimId);
};

window.staffRejectFromReview = function (claimId) {
    const reasonEl = document.getElementById("review-reject-reason");
    const reason = reasonEl ? reasonEl.value.trim() : "";
    if (reason.length < 5) {
        document.getElementById("review-reason-group")?.classList.add("has-error");
        reasonEl?.focus();
        return;
    }
    closeClaimReview();
    adminRejectClaim(claimId, reason);
};

function setupStaff() {
    // Buttons anywhere that jump to another staff page
    document.addEventListener("click", (e) => {
        const link = e.target.closest("[data-view-link]");
        if (link) navigateToView(link.getAttribute("data-view-link"));
    });

    // Inventory toolbar
    document.getElementById("staff-inv-search")?.addEventListener("input", (e) => {
        state.staffInv.q = e.target.value;
        renderStaffInventory();
    });
    document.querySelectorAll("#staff-inv-type .feed-type-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            state.staffInv.type = btn.getAttribute("data-inv-type");
            document.querySelectorAll("#staff-inv-type .feed-type-btn").forEach(b => b.classList.toggle("active", b === btn));
            renderStaffInventory();
        });
    });
    document.getElementById("staff-inv-status")?.addEventListener("change", (e) => {
        state.staffInv.status = e.target.value;
        renderStaffInventory();
    });
    document.getElementById("staff-inv-custody")?.addEventListener("change", (e) => {
        state.staffInv.custody = e.target.value;
        renderStaffInventory();
    });

    // Disposal filter
    document.getElementById("staff-disp-filter")?.addEventListener("change", (e) => {
        state.staffDispFilter = e.target.value;
        state.disposeConfirmId = null;
        renderStaffDisposal();
    });

    // Matching
    document.getElementById("staff-match-min")?.addEventListener("change", (e) => {
        state.staffMatchMin = Number(e.target.value);
        renderStaffMatching();
    });

    // Claim review window
    document.getElementById("modal-claim-review-close")?.addEventListener("click", closeClaimReview);
    document.getElementById("modal-claim-review")?.addEventListener("click", (e) => {
        if (e.target.id === "modal-claim-review") closeClaimReview();
    });
}

// ---- Passenger Feedback ---------------------------------------------
function starsHTML(n) {
    return `<span class="feedback-stars" aria-label="${n} out of 5">${"★".repeat(n)}<span class="star-off">${"★".repeat(5 - n)}</span></span>`;
}

function renderAdminFeedback() {
    const tbody = document.getElementById("admin-feedback-tbody");
    const statsEl = document.getElementById("admin-feedback-stats");
    if (!tbody) return;

    const all = state.feedback;
    const avg = all.length ? (all.reduce((s, f) => s + f.rating, 0) / all.length).toFixed(1) : "–";
    if (statsEl) statsEl.innerHTML = adminStatTiles([
        [all.length, "Total Feedback"],
        [avg, "Average Rating (out of 5)"],
        [all.filter(f => f.rating >= 4).length, "Positive (4–5 stars)"],
        [all.filter(f => f.rating <= 2).length, "Needs Attention (1–2 stars)"]
    ]);

    const filter = document.getElementById("admin-feedback-filter")?.value || "all";
    const rows = filter === "all" ? all : all.filter(f => f.category === filter);

    if (rows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:24px; color:var(--text-muted);">No feedback for this category yet.</td></tr>`;
        return;
    }

    tbody.innerHTML = rows.map(f => `
    <tr>
      <td style="white-space:nowrap;"><span class="text-xs text-muted">${escapeHtml(f.time)}</span><br><span style="font-family:'Space Grotesk', monospace; font-size:0.72rem;">${f.id}</span></td>
      <td>${escapeHtml(f.name)}</td>
      <td style="white-space:nowrap;">${starsHTML(f.rating)}</td>
      <td><span class="admin-role-chip">${escapeHtml(f.category)}</span></td>
      <td style="min-width:260px;">${escapeHtml(f.message)}</td>
    </tr>
  `).join("");
}

function openFeedbackModal() {
    const form = document.getElementById("form-feedback");
    form?.reset();
    setFeedbackRating(0);
    form?.querySelectorAll(".form-group-custom").forEach(g => g.classList.remove("has-error"));
    document.getElementById("modal-feedback")?.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeFeedbackModal() {
    document.getElementById("modal-feedback")?.classList.remove("open");
    document.body.style.overflow = "";
}

function setFeedbackRating(value) {
    const input = document.getElementById("feedback-rating");
    if (input) input.value = value;
    document.querySelectorAll("#feedback-stars .star-btn").forEach(btn => {
        btn.classList.toggle("on", Number(btn.getAttribute("data-value")) <= value);
    });
}

function setupFeedback() {
    document.querySelectorAll("#feedback-stars .star-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            setFeedbackRating(Number(btn.getAttribute("data-value")));
            document.getElementById("feedback-rating")?.closest(".form-group-custom")?.classList.remove("has-error");
        });
    });

    document.getElementById("feedback-message")?.addEventListener("input", (e) => {
        e.target.closest(".form-group-custom")?.classList.remove("has-error");
    });

    document.getElementById("footer-feedback-link")?.addEventListener("click", (e) => {
        e.preventDefault();
        openFeedbackModal();
    });
    document.getElementById("modal-feedback-close")?.addEventListener("click", closeFeedbackModal);
    document.getElementById("modal-feedback")?.addEventListener("click", (e) => {
        if (e.target.id === "modal-feedback") closeFeedbackModal();
    });

    document.getElementById("form-feedback")?.addEventListener("submit", (e) => {
    document.getElementById("form-feedback")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        document.querySelectorAll("#form-feedback .form-group-custom").forEach(g => g.classList.remove("has-error"));

        const rating = Number(document.getElementById("feedback-rating").value);
        const category = document.getElementById("feedback-category").value;
        const message = document.getElementById("feedback-message").value.trim();

        let hasError = false;
        if (!rating) { markError("feedback-rating"); hasError = true; }
        if (message.length < 10) { markError("feedback-message"); hasError = true; }
        if (hasError) {
            showToast("Please add a rating and a short message.", "error");
            return;
        }

        state.feedback.unshift({
            id: `FDB-${String(Date.now()).slice(-6)}`,
            time: new Date().toLocaleString(),
            name: state.currentUser?.name || "Passenger",
            email: state.currentUser?.email || "",
            rating, category, message
        });
        writeStore("transit_feedback", state.feedback);
        logAudit("Feedback", "Submitted passenger feedback", `${category} • ${rating}/5 stars`);

        closeFeedbackModal();
        showToast("Thank you! Your feedback has been sent to the admin team.", "success");
        try {
            await BackToYouAPI.feedback.submit({
                name: state.currentUser?.name || "Passenger",
                email: state.currentUser?.email || "",
                rating,
                category,
                message
            });
            await syncFromBackend();
            closeFeedbackModal();
            showToast("Thank you! Your feedback has been saved to the database.", "success");
        } catch (err) {
            closeFeedbackModal();
            showToast("Thank you! Your feedback has been recorded.", "success");
        }
    });
}

function renderAdminTable() {
    const tbody = document.getElementById("admin-claims-tbody");
    const pendingCountEl = document.getElementById("admin-pending-claims-count");
    if (!tbody) return;

    const pendingClaims = state.claims.filter(c => c.status === "Pending Review");
    if (pendingCountEl) pendingCountEl.textContent = pendingClaims.length;

    if (state.claims.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:24px; color:var(--text-muted);">No claims in queue.</td></tr>`;
        return;
    }

    tbody.innerHTML = state.claims.map(claim => `
    <tr>
      <td><strong style="font-family:'Space Grotesk', monospace;">${claim.claimId}</strong></td>
      <td>
        <strong>${escapeHtml(claim.itemTitle)}</strong><br>
        <span class="text-xs text-muted">Item Ref: ${claim.itemId}</span>
      </td>
      <td>
        ${escapeHtml(claim.claimantName)}<br>
        <span class="text-xs text-muted">${claim.claimantPhone}</span>
      </td>
      <td style="max-width:280px; font-size:0.8rem; color:var(--text-secondary); line-height:1.4;">
        <em>"${escapeHtml(claim.secretDetails)}"</em>
      </td>
      <td>
        <span class="media-status-pill ${claim.status === 'Approved' ? 'recovered' : (claim.status === 'Rejected' ? 'lost' : 'match-found')}">
          ${claim.status}
        </span>
      </td>
      <td>
        ${claim.status === "Pending Review" ? `
          <div class="admin-action-btn-group">
            <button class="btn-admin-approve" onclick="adminApproveClaim('${claim.claimId}')">Approve</button>
            <button class="btn-admin-reject" onclick="adminRejectClaim('${claim.claimId}')">Reject</button>
          </div>
        ` : `
          <span class="text-xs text-muted">Audited</span>
        `}
      </td>
    </tr>
  `).join("");
}

window.adminApproveClaim = function (claimId) {
    const claim = state.claims.find(c => c.claimId === claimId);
    if (!claim) return;
window.adminApproveClaim = async function (claimId) {
    try {
        const res = await BackToYouAPI.claims.review(claimId, {
            status: "Approved",
            reviewNotes: "Ownership verified via provided proof."
        });

    claim.status = "Approved";
    logAudit("Claims", "Approved claim & issued handover voucher", `${claimId} - ${claim.itemTitle}`);

    // Also update corresponding item to Recovered
    const item = state.items.find(i => i.id === claim.itemId);
    if (item) {
        item.status = "Recovered";
        if (res.success) {
            showToast(`Claim ${claimId} Approved! Digital handover voucher generated.`, "success");
            await syncFromBackend();
            renderAdminTable();
            renderAllViews();
        }
    } catch (err) {
        showToast(err.message || "Failed to approve claim", "error");
    }

    state.notifications.unshift({
        id: `notif-${Date.now()}`,
        title: `Claim ${claimId} Approved!`,
        body: `Authorized staff verified ownership for '${claim.itemTitle}'. Custody handover voucher issued for pickup at ${claim.pickupStation}.`,
        time: "Just now",
        read: false,
        itemId: claim.itemId
    });

    renderAdminTable();
    updateSystemCounters();
    renderAllViews();
    showToast(`Claim ${claimId} Approved! Digital handover voucher generated.`, "success");
};

window.adminRejectClaim = function (claimId, reasonOverride) {
window.adminRejectClaim = async function (claimId, reasonOverride) {
    const reason = reasonOverride !== undefined
        ? reasonOverride
        : prompt("Enter specific verification rejection reason (e.g. proof does not match logged item identifiers):");
    if (reason === null) return;

    const claim = state.claims.find(c => c.claimId === claimId);
    if (!claim) return;
    try {
        const res = await BackToYouAPI.claims.review(claimId, {
            status: "Rejected",
            reviewNotes: reason || "Inconclusive ownership proof provided."
        });

    claim.status = "Rejected";
    logAudit("Claims", "Rejected claim", `${claimId} - ${claim.itemTitle}`);

    const item = state.items.find(i => i.id === claim.itemId);
    if (item) {
        item.status = "Open";
        if (res.success) {
            showToast(`Claim ${claimId} rejected and recorded in custody log.`, "info");
            await syncFromBackend();
            renderAdminTable();
            renderAllViews();
        }
    } catch (err) {
        showToast(err.message || "Failed to reject claim", "error");
    }

    state.notifications.unshift({
        id: `notif-${Date.now()}`,
        title: `Claim ${claimId} Review Concluded`,
        body: `Staff recorded reason: ${reason || 'Inconclusive ownership proof provided'}.`,
        time: "Just now",
        read: false,
        itemId: claim.itemId
    });

    renderAdminTable();
    updateSystemCounters();
    renderAllViews();
    showToast(`Claim ${claimId} rejected and recorded in custody log.`, "info");
};

// =====================================================================
// 9. Dashboard Views: Reports, Claims & Matches (Guide Page 7)
// =====================================================================

function renderDashboard() {
    const myReportsList = document.getElementById("dash-my-reports-list");
    const myClaimsList = document.getElementById("dash-my-claims-list");
    const matchesGrid = document.getElementById("dash-matches-grid");

    // Update dashboard heading based on role
    const role = state.currentUser?.role || "Passenger";
    const eyebrowEl = document.querySelector("#view-dashboard .eyebrow-text");
    const headingEl = document.querySelector("#view-dashboard .page-main-heading");
    const subEl = document.querySelector("#view-dashboard .page-main-sub");

    if (eyebrowEl && headingEl && subEl) {
        if (role === "Staff") {
            eyebrowEl.textContent = "STAFF PORTAL";
            headingEl.textContent = "Staff Operations Console";
            subEl.textContent = "Log found items, verify ownership claims, manage inventory, and cross-reference lost & found matches.";
        } else if (role === "Admin") {
            eyebrowEl.textContent = "ADMIN PORTAL";
            headingEl.textContent = "System Administration & Analytics";
            subEl.textContent = "Monitor performance metrics, manage users, and review passenger feedback.";
        } else {
            eyebrowEl.textContent = "PASSENGER PORTAL";
            headingEl.textContent = "My Transit Reports & Claims";
            subEl.textContent = "Track real-time resolution status, review automatic match candidates, and view staff verification vouchers.";
        }
    }

    // KPI counters
    const myReports = state.items.filter(i => i.reporterName.includes("Sarah") || i.reporterName.includes("Marcus") || i.type === "Lost");
    const myClaims = state.claims;

    document.getElementById("dash-stat-my-reports").textContent = myReports.length;
    document.getElementById("dash-stat-pending-claims").textContent = myClaims.filter(c => c.status === "Pending Review").length;
    document.getElementById("dash-stat-recovered").textContent = state.items.filter(i => i.status === "Recovered").length;
    const recoveredKpi = document.getElementById("dash-stat-recovered")?.closest(".dash-kpi-card");
    recoveredKpi?.querySelectorAll(".media-status-pill, .status-pill, .claim-status-badge").forEach(badge => badge.remove());

    // Render My Reports
    if (myReportsList) {
        if (myReports.length === 0) {
            myReportsList.innerHTML = `<div class="state-empty-container"><p>You have not registered any reports yet.</p></div>`;
        } else {
            myReportsList.innerHTML = myReports.map(item => `
        <div class="dossier-card hover-lift">
          <div>
            <span class="dossier-type-badge ${item.type.toLowerCase()}">${item.type}</span>
          </div>
          <div class="dossier-main">
            <h4>${escapeHtml(item.title)}</h4>
            <div class="dossier-meta-row">
              <span><strong>Case:</strong> ${item.id}</span>
              <span><strong>Route:</strong> ${escapeHtml(item.route)}</span>
              <span><strong>Date:</strong> ${formatDate(item.date)}</span>
            </div>
          </div>
          <div class="dossier-status-col">
            ${statusPillHTML(item)}
            <button class="btn btn-outline-brown btn-sm" onclick="openDetailsModal('${item.id}')">
              Examine
            </button>
          </div>
        </div>
      `).join("");
        }
    }

    // Render My Claims
    if (myClaimsList) {
        if (myClaims.length === 0) {
            myClaimsList.innerHTML = `<div class="state-empty-container"><p>No active ownership claims filed.</p></div>`;
        } else {
            myClaimsList.innerHTML = myClaims.map(claim => `
        <div class="dossier-card hover-lift">
          <div>
            <span class="dossier-type-badge found">CLAIM</span>
          </div>
          <div class="dossier-main">
            <h4>${escapeHtml(claim.itemTitle)}</h4>
            <div class="dossier-meta-row">
              <span><strong>Claim ID:</strong> ${claim.claimId}</span>
              <span><strong>Pickup Desk:</strong> ${escapeHtml(claim.pickupStation)}</span>
              <span><strong>Submitted:</strong> ${formatDate(claim.dateSubmitted)}</span>
            </div>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-top:6px;">
              <strong>Submitted Proof:</strong> "${escapeHtml(claim.secretDetails)}"
            </div>
          </div>
          <div class="dossier-status-col">
            <span class="media-status-pill ${claim.status === 'Approved' ? 'recovered' : (claim.status === 'Rejected' ? 'lost' : 'match-found')}">
              ${claim.status}
            </span>
            ${claim.status === 'Approved' ? `
              <button class="btn btn-primary-mustard btn-sm hover-glow" onclick="alert('DIGITAL VOUCHER:\\n\\nPresent Claim #${claim.claimId} with government photo ID at ${claim.pickupStation}. Handover authorized.')">
                View Handover QR Voucher
              </button>
            ` : `
              <span class="text-xs text-muted">Awaiting Staff Review</span>
            `}
          </div>
        </div>
      `).join("");
        }
    }

    // Render Rule-Based Matches Grid
    if (matchesGrid) {
        const matchPairs = [];
        state.items.filter(i => i.type === "Lost").forEach(lostItem => {
            const ms = findMatchesForItem(lostItem);
            ms.forEach(m => {
                matchPairs.push({ lost: lostItem, found: m.matchedItem, score: m.score, reasons: m.reasons });
            });
        });

        document.getElementById("tab-matches-count").textContent = matchPairs.length;
        document.getElementById("dash-stat-matches-found").textContent = matchPairs.length;

        if (matchPairs.length === 0) {
            matchesGrid.innerHTML = `<div class="state-empty-container" style="grid-column:1/-1;"><p>No potential matches proposed currently.</p></div>`;
        } else {
            matchesGrid.innerHTML = matchPairs.map(pair => `
        <div class="match-pair-card hover-lift">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="match-score-badge">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              ${pair.score}% Match Likelihood
            </span>
            <span class="text-xs text-muted">${pair.lost.transitType} Corridor</span>
          </div>
 
          <div class="match-pair-details">
            <div>
              <span class="eyebrow-text" style="font-size:0.65rem; padding:2px 8px;">LOST REPORT</span>
              <h5 style="margin-top:4px; font-size:0.92rem;">${escapeHtml(pair.lost.title)}</h5>
              <div class="text-xs text-muted" style="margin-top:2px;">${pair.lost.id} • ${pair.lost.route}</div>
            </div>
 
            <div>
              <span class="eyebrow-text" style="font-size:0.65rem; padding:2px 8px; background:var(--mustard-200); color:var(--mustard-800);">FOUND HELD</span>
              <h5 style="margin-top:4px; font-size:0.92rem;">${escapeHtml(pair.found.title)}</h5>
              <div class="text-xs text-muted" style="margin-top:2px;">${pair.found.id} • ${pair.found.custodyLocation}</div>
            </div>
          </div>
 
          <div style="font-size:0.8rem; color:var(--text-secondary);">
            <strong>Match Indicators:</strong> ${pair.reasons.join(", ")}
          </div>
 
          <div style="display:flex; justify-content:flex-end; gap:8px;">
            <button class="btn btn-outline-brown btn-sm" onclick="openDetailsModal('${pair.lost.id}')">View Lost</button>
            <button class="btn btn-primary-mustard btn-sm hover-glow" onclick="openDetailsModal('${pair.found.id}')">Inspect & Claim</button>
          </div>
        </div>
      `).join("");
        }
    }
}

// =====================================================================
// 10. Notifications & FAQ Accordion
// =====================================================================

function setupNotifications() {
    const bellBtn = document.getElementById("notif-toggle-btn");
    const drawer = document.getElementById("notif-drawer");
    const markReadBtn = document.getElementById("btn-mark-all-read");

    bellBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        drawer.classList.toggle("open");
        renderNotifications();
    });

    document.addEventListener("click", (e) => {
        if (!drawer?.contains(e.target) && e.target !== bellBtn) {
            drawer?.classList.remove("open");
        }
    });

    markReadBtn?.addEventListener("click", () => {
        state.notifications.forEach(n => n.read = true);
        renderNotifications();
        updateSystemCounters();
        showToast("All notifications marked as read.", "info");
    });
}

function renderNotifications() {
    const container = document.getElementById("notif-list-container");
    if (!container) return;

    if (state.notifications.length === 0) {
        container.innerHTML = `<div style="padding:24px; text-align:center; color:var(--text-muted); font-size:0.85rem;">No new transit notifications.</div>`;
        return;
    }

    container.innerHTML = state.notifications.map(n => `
    <div class="notif-card-item ${n.read ? '' : 'unread'}" onclick="handleNotificationClick('${n.id}', '${n.itemId}')">
      <div style="color:var(--mustard-600); margin-top:2px;">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
      </div>
      <div class="notif-item-body">
        <h5>${escapeHtml(n.title)}</h5>
        <p>${escapeHtml(n.body)}</p>
        <span class="notif-item-time">${n.time}</span>
      </div>
    </div>
  `).join("");
}

window.handleNotificationClick = function (notifId, itemId) {
    const n = state.notifications.find(item => item.id === notifId);
    if (n) n.read = true;
    document.getElementById("notif-drawer")?.classList.remove("open");
    updateSystemCounters();
    if (itemId) {
        openDetailsModal(itemId);
    }
};

function setupFaqAccordion() {
    document.querySelectorAll(".faq-question-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const item = btn.closest(".faq-item");
            const isOpen = item.classList.contains("open");

            // Close all
            document.querySelectorAll(".faq-item").forEach(i => {
                i.classList.remove("open");
                i.querySelector(".faq-question-btn")?.setAttribute("aria-expanded", "false");
            });

            if (!isOpen) {
                item.classList.add("open");
                btn.setAttribute("aria-expanded", "true");
            }
        });
    });

    // Contact support form mock
    document.getElementById("contact-support-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("Support message dispatched to Central Station Custody Desk!", "success");
        e.target.reset();
    });

    // Verification Protocol button in safety banner
    document.getElementById("btn-read-guidelines")?.addEventListener("click", () => {
        navigateToView("faq");
    });
}

// =====================================================================
// 11. Live Counters & Toast System
// =====================================================================

function updateSystemCounters() {
    const totalReportsEl = document.getElementById("stat-total-reports");
    const foundReportsEl = document.getElementById("stat-found-reports");
    const recoveredEl = document.getElementById("stat-recovered-count");
    const openReportsEl = document.getElementById("stat-open-reports");
    const navBadgeEl = document.getElementById("nav-badge-count");
    const notifBadgeEl = document.getElementById("notif-badge-indicator");

    const total = state.items.length;
    const found = state.items.filter(i => i.type === "Found").length;
    const recovered = state.items.filter(i => i.status === "Recovered").length;
    const open = state.items.filter(i => i.status === "Open" || i.status === "Possible Match").length;
    const unreadNotifs = state.notifications.filter(n => !n.read).length;

    if (totalReportsEl) totalReportsEl.textContent = (1480 + total).toLocaleString();
    if (foundReportsEl) foundReportsEl.textContent = (860 + found).toLocaleString();
    if (recoveredEl) recoveredEl.textContent = (1120 + recovered).toLocaleString();
    if (openReportsEl) openReportsEl.textContent = (360 + open).toLocaleString();

    if (navBadgeEl) navBadgeEl.textContent = total;
    if (notifBadgeEl) {
        notifBadgeEl.textContent = unreadNotifs;
        notifBadgeEl.style.display = unreadNotifs > 0 ? "flex" : "none";
    }
}

function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;

    let icon = `ℹ️`;
    if (type === "success") icon = `✅`;
    if (type === "warning") icon = `⚠️`;
    if (type === "error") icon = `❌`;

    toast.innerHTML = `
    <span>${icon}</span>
    <span style="font-size:0.88rem; font-weight:600;">${escapeHtml(message)}</span>
  `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(50px)";
        toast.style.transition = "all 0.35s ease";
        setTimeout(() => toast.remove(), 350);
    }, 4000);
}

// Utility Helpers
function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatDate(dateStr) {
    if (!dateStr) return "Recent";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
    return dateStr;
}

function renderAllViews() {
    // Render Home Recent Items (first 6 items)
    const homeGrid = document.getElementById("home-recent-items-grid");
    if (homeGrid) {
        const recentItems = state.items.filter(i => i.type === state.homeFeedType).slice(0, 6);
        homeGrid.innerHTML = recentItems.length
            ? recentItems.map(item => createItemCardHTML(item)).join("")
            : `<p class="feed-empty-note">No ${state.homeFeedType.toLowerCase()} items reported yet.</p>`;
        attachCardActionEvents(homeGrid);
    }

    // Render Directory
    applyFilters();

    // Update Counters
    updateSystemCounters();

    // Staff workspace
    if (state.currentUser?.role === "Staff") renderStaffViews();
}
