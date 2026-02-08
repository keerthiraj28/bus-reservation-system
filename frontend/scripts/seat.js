const API_BASE = "http://localhost:8080/api";
const userId = localStorage.getItem("userId");

if (!userId) {
    window.location.href = "login.html";
}


let selectedSeat = null;

// -------------------- GET BUS ID --------------------
const params = new URLSearchParams(window.location.search);
const busId = params.get("busId");

if (!busId) {
    alert("Please select a bus first");
    window.location.href = "index.html";
}

// -------------------- BACK NAV --------------------
function goBack() {
    window.location.href = "index.html";
}

// -------------------- LOAD SEATS --------------------
function loadSeats() {
    fetch(`${API_BASE}/seats/all?busId=${busId}`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to load seats");
            return res.json();
        })
        .then(seats => {
            const container = document.getElementById("seatContainer");
            container.innerHTML = "";

            // sort seats
            seats.sort((a, b) => a.seatNumber - b.seatNumber);

            seats.forEach((seat, index) => {

                // ROW LABEL
                const rowIndex = Math.floor((seat.seatNumber - 1) / 4);
                const rowLetter = String.fromCharCode(65 + rowIndex);
                const seatLabel = `${rowLetter}${seat.seatNumber}`;

                // seat box
                const seatBox = document.createElement("div");
                seatBox.className = "seat-box";

                // seat button
                const btn = document.createElement("button");
                btn.className = "seat-btn";
                btn.title = seat.booked
                    ? "Seat already booked"
                    : "Click to book this seat";

                // label
                const label = document.createElement("div");
                label.className = "seat-label";
                label.innerText = seatLabel;

                // state
                if (seat.booked) {
                    btn.classList.add("booked");
                    btn.disabled = true;
                } else {
                    btn.classList.add("available");
                    btn.onclick = () => {
                        if (selectedSeat) {
                            selectedSeat.classList.remove("selected");
                        }
                        selectedSeat = btn;
                        btn.classList.add("selected");
                        bookSeat(seat.seatNumber);
                    };
                }

                seatBox.appendChild(btn);
                seatBox.appendChild(label);

                // Insert aisle gap after every 2 seats
                if (index % 4 === 2) {
                    const gap = document.createElement("div");
                    container.appendChild(gap);
                }

                container.appendChild(seatBox);
            });
        })
        .catch(err => {
            console.error(err);
            alert("Failed to load seats");
        });
}

// -------------------- BOOK SEAT --------------------
function bookSeat(seatNumber) {
    fetch(
        `${API_BASE}/bookings?userId=${userId}&busId=${busId}&seatNumber=${seatNumber}`,
        { method: "POST" }
    )
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => {
                    throw new Error(err.error || "Booking failed");
                });
            }
            return res.json();
        })
        .then(() => {
            alert(`Seat ${seatNumber} booked successfully`);
            selectedSeat = null;
            loadSeats();
        })
        .catch(err => alert(err.message));
}

// -------------------- INIT --------------------
loadSeats();
