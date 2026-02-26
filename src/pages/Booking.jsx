import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/booking.css";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slotCounts, setSlotCounts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM",
    "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
    "9:00 PM", "10:00 PM"
  ];

  // 🔥 Fetch slot availability when date changes
  useEffect(() => {
    if (date) {
      API.get(`/bookings/date/${id}/${date}`)
        .then((res) => {
          const countMap = {};
          res.data.forEach((item) => {
            countMap[item._id] = item.count;
          });
          setSlotCounts(countMap);
        })
        .catch((err) => console.error(err));
    }
  }, [date, id]);

  // Open confirmation modal
  const handleBookingClick = () => {
    if (!date || !selectedSlot) {
      alert("Please select date and slot");
      return;
    }

    setShowModal(true);
  };

  // Confirm booking
  const confirmBooking = async () => {
    try {
      setLoading(true);

      await API.post("/bookings", {
        turf: id,
        date,
        slot: selectedSlot,
      });

      setShowModal(false);
      navigate("/mybookings");

    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Book Turf</h2>

      {/* Date Picker */}
      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          setSelectedSlot("");
        }}
      />

      {/* Time Slots */}
      <div className="slot-grid">
        {timeSlots.map((slot, index) => {
          const count = slotCounts[slot] || 0;
          const isFull = count >= 3;

          return (
            <button
              key={index}
              disabled={isFull}
              className={`time-slot 
                ${selectedSlot === slot ? "active" : ""} 
                ${isFull ? "disabled-slot" : ""}`}
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
              <br />
              <small>{count}/3 booked</small>
            </button>
          );
        })}
      </div>

      {/* Confirm Button */}
      <button
        className="btn"
        onClick={handleBookingClick}
        disabled={loading}
      >
        {loading ? "Processing..." : "Confirm Booking"}
      </button>

      {/* 🔥 Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Booking</h3>
            <p>
              <strong>Date:</strong> {date}
              <br />
              <strong>Slot:</strong> {selectedSlot}
            </p>

            <div className="modal-buttons">
              <button onClick={confirmBooking}>
                {loading ? "Booking..." : "Confirm"}
              </button>
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;