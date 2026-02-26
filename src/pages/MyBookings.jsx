import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/mybooking.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      setLoadingId(id);
      await API.put(`/bookings/${id}/cancel`);
      alert("Booking Cancelled ❌");
      fetchBookings();
    } catch (error) {
      alert("Cancellation failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>No bookings yet</p>
        </div>
      ) : (
        <div className="bookings-table-wrapper">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Turf</th>
                <th>Location</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.turf?.name}</td>
                  <td>{b.turf?.location}</td>
                  <td>{b.date}</td>
                  <td>{b.slot}</td>
                  <td>{b.status}</td>
                  <td>
                    {b.status === "confirmed" ? (
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(b._id)}
                        disabled={loadingId === b._id}
                      >
                        {loadingId === b._id
                          ? "Cancelling..."
                          : "Cancel"}
                      </button>
                    ) : (
                      <span style={{ color: "red" }}>
                        Cancelled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyBookings;