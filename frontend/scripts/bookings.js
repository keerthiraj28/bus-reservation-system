const API_BASE = "http://localhost:8080/api";
const userId = localStorage.getItem("userId");

if (!userId) {
    window.location.href = "login.html";
}


// -------------------- BACK --------------------
function goBack() {
    window.location.href = "index.html";
}

// -------------------- LOAD BOOKINGS --------------------
function loadBookings() {
    fetch(`${API_BASE}/bookings/user/${userId}`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to load bookings");
            return res.json();
        })
        .then(bookings => {
            const table = document.getElementById("bookingTable");
            table.innerHTML = "";

            if (bookings.length === 0) {
                table.innerHTML = `
                    <tr>
                        <td colspan="4">No bookings found</td>
                    </tr>
                `;
                return;
            }

            bookings.forEach(booking => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${booking.bus.busName}</td>
                    <td>${booking.seat.seatNumber}</td>
                    <td>${booking.bookingDate}</td>
                    <td>
                        <button onclick="cancelBooking(${booking.id})">
                            Cancel
                        </button>
                    </td>
                `;

                table.appendChild(row);
            });
        })
        .catch(err => {
            alert(err.message);
        });
}

// -------------------- CANCEL BOOKING --------------------
function cancelBooking(bookingId) {
    if (!confirm("Cancel this booking?")) return;

    fetch(`${API_BASE}/bookings/${bookingId}`, {
        method: "DELETE"
    })
        .then(res => {
            if (!res.ok) throw new Error("Failed to cancel booking");
            alert("Booking cancelled");
            loadBookings();
        })
        .catch(err => alert(err.message));
}

// -------------------- INIT --------------------
loadBookings();
