const API_BASE = "http://localhost:8080/api";
const userId = localStorage.getItem("userId");

if (!userId) {
    window.location.href = "login.html";
}

fetch(`${API_BASE}/buses`)
    .then(response => response.json())
    .then(buses => {
        const tableBody = document.querySelector("#busTable tbody");
        tableBody.innerHTML = "";

        buses.forEach(bus => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${bus.busNumber}</td>
                <td>${bus.busName}</td>
                <td>${bus.totalSeats}</td>
                <td>
                    <button onclick="viewSeats(${bus.id})">
                        View Seats
                    </button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error fetching buses:", error);
        alert("Failed to load buses");
    });

function viewSeats(busId) {
    window.location.href = `seats.html?busId=${busId}`;
}

function logout() {
    localStorage.removeItem("userId");
    window.location.href = "login.html";
}