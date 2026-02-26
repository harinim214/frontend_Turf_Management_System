import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import StarRating from "../components/StarRating";
import "../styles/turfDetail.css";

function TurfDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [turf, setTurf] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTurf();
  }, [id]);

  const fetchTurf = async () => {
    try {
      const res = await API.get(`/turfs/${id}`);
      setTurf(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewSubmit = async () => {
    if (!rating || !comment) {
      alert("Please provide rating and comment");
      return;
    }

    try {
      setLoading(true);

     await API.post(`/turfs/${id}/review`, {
      rating: Number(rating),
      comment,
});
      alert("Review added successfully ⭐");
      setRating(0);
      setComment("");
      fetchTurf();
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (!turf) return <div className="loading">Loading...</div>;

  return (
    <div className="turf-details">

      {/* Banner */}
      <div
        className="turf-banner"
        style={{ backgroundImage: `url(${turf.image})` }}
      />

      <div className="turf-container">

        {/* Basic Info */}
        <h1>{turf.name}</h1>
        <p className="location">📍 {turf.location}</p>
        <p className="price">₹ {turf.pricePerHour} / hour</p>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <StarRating rating={Math.round(turf.rating)} readOnly />
          <span>({turf.rating?.toFixed(1)})</span>
        </div>

        {/* Amenities */}
        <div className="section">
          <h3>Amenities</h3>
          <div className="amenities">
            {turf.amenities?.parking && <span>🅿 Parking</span>}
            {turf.amenities?.washroom && <span>🚻 Washroom</span>}
            {turf.amenities?.floodlights && <span>💡 Floodlights</span>}
            {turf.amenities?.drinkingWater && <span>🚰 Drinking Water</span>}
          </div>
        </div>

        {/* Slots */}
        <div className="section">
          <h3>Select Slot</h3>
          <div className="slots">
            {turf.availableSlots?.map((slot, index) => (
              <button
                key={index}
                className={`slot-btn ${selectedSlot === slot ? "active" : ""}`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Book Button */}
        <button
          className="book-btn"
          disabled={!selectedSlot}
          onClick={() => navigate(`/booking/${turf._id}?slot=${selectedSlot}`)}
        >
          {selectedSlot ? "Book Now" : "Select Slot First"}
        </button>

        {/* Review Form */}
        <div className="section">
          <h3>Write a Review</h3>

          <StarRating rating={rating} setRating={setRating} />

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button onClick={handleReviewSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>

        {/* Reviews List */}
        <div className="section">
          <h3>Reviews</h3>

          {turf.reviews?.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            turf.reviews.map((review, index) => (
              <div key={index} className="review-card">
                <strong>{review.userName}</strong>
                <StarRating rating={review.rating} readOnly />
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Google Map */}
        <div className="section">
          <h3>Location</h3>
          <iframe
            title="map"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.google.com/maps?q=${turf.coordinates?.latitude},${turf.coordinates?.longitude}&output=embed`}
          ></iframe>
        </div>

      </div>
    </div>
  );
}

export default TurfDetails;