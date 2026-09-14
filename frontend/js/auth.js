const API_URL = "http://127.0.0.1:5000";

const token = localStorage.getItem("access_token");

if (!token) {
    window.location.href = "index.html";
}

const userName = localStorage.getItem("user_name");

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    };
}

function handleUnauthorized(response) {

    if (response.status === 401) {

        localStorage.removeItem("access_token");
        localStorage.removeItem("user_name");

        alert("Your session has expired. Please log in again.");

        window.location.href = "index.html";

        return true;
    }

    return false;
}

function logout() {

    localStorage.removeItem("access_token");
    localStorage.removeItem("user_name");

    window.location.href = "index.html";
}