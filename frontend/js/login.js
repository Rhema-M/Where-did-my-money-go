const API_URL = "http://127.0.0.1:5000";

const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    try {

        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (!response.ok) {
            loginMessage.textContent = result.error || "Login failed.";
            return;
        }

        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("user_name", result.user.name);
        window.location.href = "dashboard.html";

    } catch (error) {

        console.error("Login error:", error);
        loginMessage.textContent = "Unable to connect to the server.";

    }

});