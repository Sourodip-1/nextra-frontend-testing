import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  const [bookings, setBookings] = useState({});
  const [filteredBookings, setFilteredBookings] = useState({});
  const [selectedDate, setSelectedDate] = useState('2025-06-11');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  // Check for auth cookie (client-side fallback)
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('admin-auth='))
      ?.split('=')[1];

    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://nextra-backend.onrender.com/api/bookings?date=${selectedDate}`
        );
        const data = await res.json();
        setBookings(data);
        setFilteredBookings(data);
        setError('');
      } catch (err) {
        setError('Failed to load data.');
      }
    }

    fetchData();
  }, [selectedDate]);

  useEffect(() => {
    const filtered = {};
    for (const slot in bookings) {
      const matched = bookings[slot].filter(b =>
        (b.name + b.service).toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matched.length > 0) filtered[slot] = matched;
    }
    setFilteredBookings(filtered);
  }, [searchQuery, bookings]);

  return (
    <>
      <Head>
        <title>Booking Dashboard</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="container my-5">
        <h2 className="text-center mb-4">📅 Booking Dashboard</h2>

        <div className="row mb-4">
          <div className="col-md-4 mb-2">
            <input
              type="date"
              value={selectedDate}
              className="form-control"
              onChange={e => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="col-md-8 mb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-control"
              placeholder="Search by name or service..."
            />
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {Object.keys(filteredBookings).length === 0 && !error && (
          <p>No bookings found.</p>
        )}

        {Object.entries(filteredBookings).map(([slot, items]) => (
          <div key={slot} className="card mb-3">
            <div className="slot-heading bg-primary text-white p-3 rounded-top fw-bold">
              🕒 {slot} ({items.length} booking{items.length > 1 ? 's' : ''})
            </div>
            <div className="card-body d-flex flex-wrap gap-3">
              {items.map((b, i) => (
                <div key={i} className="booking-card border p-3 rounded" style={{ minWidth: 250 }}>
                  <p><strong>👤 Name:</strong> {b.name}</p>
                  <p><strong>📧 Email:</strong> {b.email}</p>
                  <p><strong>💼 Service:</strong> {b.service}</p>
                  <p><strong>📝 Message:</strong> {b.message}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
