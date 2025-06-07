const form = document.getElementById("appointmentForm");
const timeSlotSelect = document.getElementById("time");

// Load available time slots based on selected date
// Available slots
dateInput.addEventListener("change", async () => {
    const date = dateInput.value;
    timeSlotSelect.innerHTML =
        "<option disabled selected> FETCHING AVAILABLE SLOTS PLEASE WAIT....(est. 1 min) </option>";

    try {
        const res = await fetch(
            `https://nextra-backend.onrender.com/api/available-slots?date=${date}`
        );
        const slots = await res.json();

        timeSlotSelect.innerHTML = "";
        slots.forEach(({ slot, remaining }) => {
            const option = document.createElement("option");
            option.value = slot;
            option.textContent = `${slot} (${remaining} slots left)`;
            timeSlotSelect.appendChild(option);
        });

        if (slots.length === 0) {
            const option = document.createElement("option");
            option.disabled = true;
            option.textContent = "No slots available";
            timeSlotSelect.appendChild(option);
        }
    } catch (err) {
        console.error("Error fetching slots:", err);
    }
});

// Handle form submit
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const date = dateInput.value;
    const slot = timeSlotSelect.value;
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    const response = await fetch("https://nextra-backend.onrender.com/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, date, slot, message }),
    });

    const result = await response.json();

    if (response.ok) {
        alert("Booking successful!");
        form.reset();
    } else {
        alert(result.message || "Booking failed.");
    }
});