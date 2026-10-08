// ===============================
// REGISTER
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const userType = document.getElementById("userType").value;
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const alertBox = document.getElementById("registerAlert");

        if (password.length < 6) {
            showAlert(alertBox, "Password must contain at least 6 characters.", "error");
            return;
        }

        if (password !== confirmPassword) {
            showAlert(alertBox, "Passwords do not match.", "error");
            return;
        }

        console.log("Registered User:", { name, email, phone, userType, password });

        showAlert(alertBox, "Registration successful! You can now login.", "success");
        registerForm.reset();
    });
}

// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const alertBox = document.getElementById("loginAlert");

        if (!email || !password) {
            showAlert(alertBox, "Please enter email and password.", "error");
            return;
        }

        console.log("Login credentials:", { email, password });
        showAlert(alertBox, "Login successful!", "success");

        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 1000);
    });
}

// ===============================
// ALERT HELPER
// ===============================

function showAlert(element, message, type) {
    if (!element) return;
    element.textContent = message;
    element.className = "alert " + type;
    element.style.display = "block";
}