const API_BASE = "http://localhost:8080/api/auth";

// LOGIN
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorEl = document.getElementById("error");

    errorEl.textContent = "";

    try {
        const res = await fetch(`${API_BASE}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            errorEl.textContent = data.message;
            return;
        }

        // save userId
        localStorage.setItem("userId", data.id);

        window.location.href = "index.html";

    } catch (err) {
        errorEl.textContent = "Server not reachable";
    }
}

// REGISTER
async function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorEl = document.getElementById("error");

    errorEl.textContent = "";

    try {
        const res = await fetch(`${API_BASE}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            errorEl.textContent = data.message;
            return;
        }

        // after register → go to login
        window.location.href = "login.html";

    } catch (err) {
        errorEl.textContent = "Server not reachable";
    }
}
