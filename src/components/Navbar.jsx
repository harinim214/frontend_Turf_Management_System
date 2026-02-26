import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
        <h2 className="footer-logo">
            Turf<span>Book</span>
          </h2>

      <div>
        <Link to="/">Home</Link>

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {token && role === "user" && (
          <>
            <Link to="/mybookings">My Bookings</Link>
            <button className="btn" onClick={logout}>Logout</button>
          </>
        )}

        {token && role === "admin" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/manage">Manage Turfs</Link>
            <button className="btn" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
