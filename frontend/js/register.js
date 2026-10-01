const API_URL = "http://127.0.0.1:5000";

const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");

registerForm.addEventListener("submit", async function (event) {


event.preventDefault();

const name = document.getElementById("register-name").value.trim();
const email = document.getElementById("register-email").value.trim();
const password = document.getElementById("register-password").value;

try {

    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    });

    const result = await response.json();

    if (!response.ok) {
        registerMessage.textContent =
            result.error || "Registration failed.";
        return;
    }

    registerMessage.textContent =
        "Registration successful. Redirecting to login...";

    setTimeout(() => {
        window.location.href = "/";
    }, 1000);

} catch (error) {

    console.error("Registration error:", error);

    registerMessage.textContent =
        "Unable to connect to the server.";

}


});
