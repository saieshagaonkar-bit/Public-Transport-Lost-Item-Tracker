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
const state = {
    items: [...INITIAL_ITEMS],
    claims: [...INITIAL_CLAIMS],
    notifications: [...INITIAL_NOTIFICATIONS],
    users: INITIAL_USERS.map(u => ({ ...u })),
    auditLog: INITIAL_AUDIT.map(a => ({ ...a })),
    disposals: INITIAL_DISPOSALS.map(d => ({ ...d })),
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
    initTheme();
    setupNavigation();
    setupLoginPortal();
    setupSearchAndFilters();
    setupReportForm();
    setupModals();
    setupNotifications();
    setupAdminConsole();
    setupFaqAccordion();
    updateNavAuthState();
    renderAllViews();
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

    const roleConfigs = {
        passenger: {
            heading: "Passenger Login",
            subheading: "Welcome! Sign in to view matches, register reports, and track custody handovers.",
            emailLabel: "Passenger Email / Transit ID",
            emailValue: "sarah.jenkins@metrotransit.org",
            emailPlaceholder: "passenger@metro.org",
            btnText: "Sign In as Passenger",
            roleName: "Passenger",
            userName: "Sarah Jenkins",
            navLabel: "Sarah J. (Passenger)"
        },
        staff: {
            heading: "Staff Portal Login",
            subheading: "Authorized custody desk, transit depot personnel, and station officer access.",
            emailLabel: "Staff Official ID / Transit Email",
            emailValue: "custody.civic@metrotransit.org",
            emailPlaceholder: "staff.id@metrotransit.org",
            btnText: "Sign In to Staff Portal",
            roleName: "Staff",
            userName: "Officer Miller",
            navLabel: "Staff Officer"
        },
        admin: {
            heading: "Admin Login",
            subheading: "System supervisory workspace, audit validation desk, and network administration.",
            emailLabel: "Administrator Secure ID / Email",
            emailValue: "admin.director@transit.gov",
            emailPlaceholder: "admin@transit.gov",
            btnText: "Sign In as Administrator",
            roleName: "Admin",
            userName: "Director Vance",
            navLabel: "System Admin"
        }
    };

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
                emailInput.value = config.emailValue;
                emailInput.placeholder = config.emailPlaceholder;
            }
            if (submitBtnText) submitBtnText.textContent = config.btnText;
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

    // Handle Form Submission
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const currentRole = roleInput ? roleInput.value : "passenger";
            const config = roleConfigs[currentRole] || roleConfigs.passenger;
            const enteredEmail = emailInput ? emailInput.value.trim() : config.emailValue;

            state.currentUser = {
                name: config.userName,
                email: enteredEmail,
                role: config.roleName
            };

            updateNavAuthState();
            showToast(`Welcome! Logged in to ${config.heading}.`, "success");

            if (currentRole === "admin") {
                navigateToView("dashboard");
                setTimeout(() => {
                    document.getElementById("admin-quick-switch")?.click();
                }, 300);
            } else if (currentRole === "staff") {
                navigateToView("dashboard");
            } else {
                navigateToView("dashboard");
            }
        });
    }
}

// User Navigation Auth State & Logout
function updateNavAuthState() {
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
    } else {
        if (userLabel) userLabel.textContent = "Login";
        if (userPill) userPill.style.display = "none";
        if (loginBtn) loginBtn.style.display = "inline-flex";
        if (logoutBtn) logoutBtn.style.display = "none";
        // Clear nav links on logout
        const navLinks = document.getElementById("nav-links");
        if (navLinks) navLinks.innerHTML = "";
    }
}

/**
 * Renders contextual navigation links in the top navbar based on the logged-in role.
 * Passenger  → Home, Browse Reports, My Dashboard, FAQ & Support
 * Staff      → Log Found Item, Verify Claims, Manage Inventory, Direct Matching
 * Admin      → Analytics, User Management, Audit Trail, Disposal Mgmt, System Settings
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
      <li><a href="#dashboard" class="nav-link" data-view="dashboard">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        My Dashboard
      </a></li>
      <li><a href="#faq" class="nav-link" data-view="faq">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        FAQ &amp; Support
      </a></li>
    `;
    } else if (role === "Staff") {
        linksHTML = `
      <li><a href="#report" class="nav-link" data-view="report">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        Log Found Item
      </a></li>
      <li><a href="#dashboard" class="nav-link" data-view="dashboard" data-staff-tab="claims">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Verify Claims
      </a></li>
      <li><a href="#browse" class="nav-link" data-view="browse">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
        Manage Inventory
      </a></li>
      <li><a href="#dashboard" class="nav-link" data-view="dashboard" data-staff-tab="matches">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
        Direct Matching
      </a></li>
    `;
    } else if (role === "Admin") {
        linksHTML = `
      <li><a href="#dashboard" class="nav-link" data-view="dashboard">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        Analytics
      </a></li>
      <li><a href="#" class="nav-link nav-link-admin" id="nav-admin-users" data-admin-tab="users">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        User Management
      </a></li>
      <li><a href="#" class="nav-link nav-link-admin" id="nav-admin-audit" data-admin-tab="audit">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        Audit Trail
      </a></li>
      <li><a href="#" class="nav-link nav-link-admin" id="nav-admin-disposal" data-admin-tab="disposal">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        Disposal Mgmt
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
    state.currentUser = null;
    updateNavAuthState();
    showToast("You have been signed out successfully.", "info");
    navigateToView("login");
}

// Navigation & View Router
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
        navigateToView(state.currentUser ? "dashboard" : "login");
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
        if (["login", "home", "browse", "report", "dashboard", "faq"].includes(hash)) {
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
        filtered = filtered.filter(i => i.status.toLowerCase() === state.filters.status.toLowerCase());
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

function createItemCardHTML(item) {
    const isLost = item.type === "Lost";
    const statusClass = item.status === "Possible Match" ? "match-found" : (item.status === "Recovered" ? "recovered" : "");

    return `
    <article class="item-card hover-lift" data-item-id="${item.id}">
      ${!isLost ? `
        <div class="item-card-media">
          <span class="media-tag-lost-found found">
            FOUND
          </span>
          <span class="media-status-pill ${statusClass}">
            ${item.status}
          </span>
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
          <span class="media-status-pill ${statusClass}">
            ${item.status}
          </span>
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

    const photoPreview = document.getElementById("dropzone-img")?.src;
    const recordedReporter = reporterRole === "Conductor" ? `${reporterName} (Conductor Person)` : reporterName;

    const newReport = {
        id: newRefId,
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
    };

    // Add to state
    state.items.unshift(newReport);

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

    // Update navbar count & stats
    updateSystemCounters();

    // Reset form
    document.getElementById("transit-report-form").reset();
    const previewBox = document.getElementById("dropzone-preview");
    if (previewBox) previewBox.style.display = "none";
    const dropzoneContent = document.getElementById("dropzone-content");
    if (dropzoneContent) dropzoneContent.style.display = "flex";

    // Show Toast
    showToast(`Report ${newRefId} successfully submitted to the transit registry!`, "success");

    // Navigate to Dashboard or Details
    navigateToView("dashboard");
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
    document.getElementById("btn-cancel-claim")?.addEventListener("click", closeClaimModal);
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
        <span class="media-status-pill ${item.status === 'Possible Match' ? 'match-found' : ''}" style="display:inline-block; margin-bottom:8px;">
          ${item.status}
        </span>
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

    // Modal Footer Actions
    if (item.type === "Found" && item.status !== "Recovered") {
        footer.innerHTML = `
      <button class="btn btn-outline-brown" onclick="closeDetailsModal()">Close</button>
      <button class="btn btn-primary-mustard hover-glow" onclick="openClaimModal('${item.id}', '${escapeHtml(item.title)}')">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>I Think This Is My Item — Claim</span>
      </button>
    `;
    } else {
        footer.innerHTML = `
      <button class="btn btn-outline-brown" onclick="closeDetailsModal()">Close</button>
      <button class="btn btn-primary-mustard" onclick="shareReportLink('${item.id}')">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        <span>Copy Case Reference Link</span>
      </button>
    `;
    }

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

    state.claims.unshift(claimRecord);

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
    showToast(`Claim ${newClaimId} registered! Authorized officers will examine your proof.`, "success");

    updateSystemCounters();
    renderAllViews();
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
    console: { title: "Transit Custody & Verification Console", sub: "Authorized verification and chain-of-custody handover tracking." },
    users: { title: "User Management", sub: "Review registered accounts, roles and access status." },
    audit: { title: "Audit Trail", sub: "Chronological record of every administrative and custody action." },
    disposal: { title: "Disposal Management", sub: "Process unclaimed property that has passed its holding period." }
};

function logAudit(category, action, target) {
    state.auditLog.unshift({
        id: `AUD-${String(Date.now()).slice(-6)}`,
        time: "Just now",
        actor: state.currentUser?.name || "System",
        category,
        action,
        target
    });
}

function openAdminConsole(tab = "console") {
    const modal = document.getElementById("modal-admin");
    if (!modal) return;
    switchAdminTab(tab);
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function switchAdminTab(tab) {
    if (!ADMIN_TAB_META[tab]) tab = "console";
    document.querySelectorAll(".admin-tab-btn").forEach(b => {
        const on = b.getAttribute("data-admin-tab") === tab;
        b.classList.toggle("active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.querySelectorAll(".admin-pane").forEach(p => {
        p.classList.toggle("active", p.id === `admin-pane-${tab}`);
    });
    const titleEl = document.getElementById("admin-modal-title");
    const subEl = document.getElementById("admin-modal-subtitle");
    if (titleEl) titleEl.textContent = ADMIN_TAB_META[tab].title;
    if (subEl) subEl.textContent = ADMIN_TAB_META[tab].sub;

    if (tab === "console") renderAdminTable();
    else if (tab === "users") renderAdminUsers();
    else if (tab === "audit") renderAdminAudit();
    else if (tab === "disposal") renderAdminDisposal();
}

function setupAdminConsole() {
    const switchBtn = document.getElementById("admin-quick-switch");
    const modal = document.getElementById("modal-admin");
    const closeBtn = document.getElementById("modal-admin-close");
    const footerCloseBtn = document.getElementById("admin-close-btn");
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

    document.getElementById("admin-audit-filter")?.addEventListener("change", renderAdminAudit);

    closeBtn?.addEventListener("click", closeAdminModal);
    footerCloseBtn?.addEventListener("click", closeAdminModal);
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

    tbody.innerHTML = u.map(user => `
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
    if (!user || user.role === "Admin") return;
    const suspending = user.status === "Active";
    user.status = suspending ? "Suspended" : "Active";
    logAudit("Users", suspending ? "Suspended account" : "Reactivated account", `${user.name} (${user.id})`);
    renderAdminUsers();
    showToast(`${user.name} has been ${suspending ? "suspended" : "reactivated"}.`, suspending ? "info" : "success");
};

// ---- Audit Trail ----------------------------------------------------
function renderAdminAudit() {
    const tbody = document.getElementById("admin-audit-tbody");
    const statsEl = document.getElementById("admin-audit-stats");
    if (!tbody) return;

    const log = state.auditLog;
    if (statsEl) statsEl.innerHTML = adminStatTiles([
        [log.length, "Total Entries"],
        [log.filter(x => x.category === "Claims").length, "Claim Decisions"],
        [log.filter(x => x.category === "Users").length, "User Actions"],
        [log.filter(x => x.category === "Disposal").length, "Disposal Actions"]
    ]);

    const filter = document.getElementById("admin-audit-filter")?.value || "all";
    const rows = filter === "all" ? log : log.filter(x => x.category === filter);

    if (rows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:24px; color:var(--text-muted);">No audit entries for this filter.</td></tr>`;
        return;
    }

    tbody.innerHTML = rows.map(e => `
    <tr>
      <td style="white-space:nowrap;"><span class="text-xs text-muted">${escapeHtml(e.time)}</span><br><span style="font-family:'Space Grotesk', monospace; font-size:0.72rem;">${e.id}</span></td>
      <td>${escapeHtml(e.actor)}</td>
      <td><span class="admin-role-chip cat-${e.category.toLowerCase()}">${e.category}</span></td>
      <td>${escapeHtml(e.action)}</td>
      <td>${escapeHtml(e.target)}</td>
    </tr>
  `).join("");
}

// ---- Disposal Management --------------------------------------------
function renderAdminDisposal() {
    const tbody = document.getElementById("admin-disposal-tbody");
    const statsEl = document.getElementById("admin-disposal-stats");
    if (!tbody) return;

    const d = state.disposals;
    if (statsEl) statsEl.innerHTML = adminStatTiles([
        [d.filter(x => x.status === "Due for Disposal").length, "Awaiting Disposal"],
        [d.filter(x => x.status === "Hold Extended").length, "Holds Extended"],
        [d.filter(x => x.status === "Disposed").length, "Disposed"],
        ["90 days", "Standard Holding Period"]
    ]);

    tbody.innerHTML = d.map(item => `
    <tr>
      <td>
        <strong>${escapeHtml(item.itemTitle)}</strong><br>
        <span class="text-xs text-muted">${item.id}</span>
      </td>
      <td>${escapeHtml(item.category)}</td>
      <td>${escapeHtml(item.station)}</td>
      <td>${item.daysHeld} days</td>
      <td>${escapeHtml(item.method)}</td>
      <td>
        <span class="media-status-pill ${item.status === "Disposed" ? "recovered" : (item.status === "Hold Extended" ? "match-found" : "lost")}">${item.status}</span>
      </td>
      <td>
        ${item.status === "Disposed"
            ? `<span class="text-xs text-muted">Audited</span>`
            : `<div class="admin-action-btn-group">
               <button class="btn-admin-approve" onclick="adminDisposeItem('${item.id}')">Dispose</button>
               ${item.status === "Due for Disposal"
                ? `<button class="btn-admin-neutral" onclick="adminExtendHold('${item.id}')">Extend Hold</button>` : ""}
             </div>`}
      </td>
    </tr>
  `).join("");
}

window.adminDisposeItem = function (id) {
    const item = state.disposals.find(x => x.id === id);
    if (!item) return;
    item.status = "Disposed";
    logAudit("Disposal", `Approved disposal (${item.method.toLowerCase()})`, `${item.id} - ${item.itemTitle}`);
    renderAdminDisposal();
    showToast(`${item.itemTitle} marked as disposed and logged in the audit trail.`, "success");
};

window.adminExtendHold = function (id) {
    const item = state.disposals.find(x => x.id === id);
    if (!item) return;
    item.status = "Hold Extended";
    logAudit("Disposal", "Extended holding period by 30 days", `${item.id} - ${item.itemTitle}`);
    renderAdminDisposal();
    showToast(`Holding period extended for ${item.itemTitle}.`, "info");
};

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

    claim.status = "Approved";
    logAudit("Claims", "Approved claim & issued handover voucher", `${claimId} - ${claim.itemTitle}`);

    // Also update corresponding item to Recovered
    const item = state.items.find(i => i.id === claim.itemId);
    if (item) {
        item.status = "Recovered";
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

window.adminRejectClaim = function (claimId) {
    const reason = prompt("Enter specific verification rejection reason (e.g. proof does not match logged item identifiers):");
    if (reason === null) return;

    const claim = state.claims.find(c => c.claimId === claimId);
    if (!claim) return;

    claim.status = "Rejected";
    logAudit("Claims", "Rejected claim", `${claimId} - ${claim.itemTitle}`);

    const item = state.items.find(i => i.id === claim.itemId);
    if (item) {
        item.status = "Open";
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
            subEl.textContent = "Monitor performance metrics, manage users, review audit trails, and configure system-wide policies.";
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
            <span class="media-status-pill ${item.status === 'Possible Match' ? 'match-found' : (item.status === 'Recovered' ? 'recovered' : '')}">
              ${item.status}
            </span>
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
        const recentItems = state.items.slice(0, 6);
        homeGrid.innerHTML = recentItems.map(item => createItemCardHTML(item)).join("");
        attachCardActionEvents(homeGrid);
    }

    // Render Directory
    applyFilters();

    // Update Counters
    updateSystemCounters();
}