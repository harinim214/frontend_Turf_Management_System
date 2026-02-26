import { FaStar } from "react-icons/fa";

function StarRating({ rating, setRating }) {
  return (
    <div>
      {[1,2,3,4,5].map((star) => (
        <FaStar
          key={star}
          size={24}
          style={{
            cursor: "pointer",
            marginRight: 10
          }}
          color={star <= rating ? "#ffc107" : "#e4e5e9"}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
}

export default StarRating;