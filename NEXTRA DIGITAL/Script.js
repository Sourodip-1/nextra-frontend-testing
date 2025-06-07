document.getElementById("year").textContent = new Date().getFullYear();


const API_BASE = "http://localhost:3000"; // change to your server's IP/domain in production

// Get available slots for a date
const res = await fetch(`${API_BASE}/api/available-slots?date=2025-06-05`);

name= "John Doe"; // Replace with actual name input
const date = "2025-06-05"; // Replace with actual date input
slot = "10:00-11:00"; // Replace with actual slot input

async function makeBooking(name, slot, date) {
  const API_BASE = "http://localhost:3000"; // Your Express backend URL

  // Check if all required values are present
  if (!name || !slot || !date) {
    return { message: "All fields are required!" };
  }

  // Call the backend to make a booking
  try {
    const response = await fetch(`${API_BASE}/api/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, slot, date })
    });

    // Parse the response from the server
    const data = await response.json();

    if (response.ok) {
      return { message: data.message || 'Booking successful!' };
    } else {
      return { message: data.message || 'Booking failed. Try again.' };
    }
  } catch (error) {
    return { message: 'An error occurred. Please try again later.' };
  }
}
