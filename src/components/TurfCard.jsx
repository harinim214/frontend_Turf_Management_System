import { useNavigate } from "react-router-dom";

function TurfCard({ turf }) {
  const navigate = useNavigate();

  return (
    <div className="turf-card">
      <img
        src={turf.image}
        alt={turf.name}
        onClick={() => navigate(`/turf/${turf._id}`)}
        style={{ cursor: "pointer" }}
      />

      <div className="turf-info">
        <h3 onClick={() => navigate(`/turf/${turf._id}`)}>
          {turf.name}
        </h3>

        <p>{turf.location}</p>
        <p>₹{turf.pricePerHour} / hour</p>

        <button
          className="btn"
          onClick={() => navigate(`/turf/${turf._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default TurfCard;