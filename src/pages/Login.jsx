import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      phone,
      password
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    navigate("/mybookings");
  } catch (error) {
    console.log(error.response?.data);
    alert(error.response?.data?.message);
  }console.log("Entered phone:", phone);
console.log("Entered password:", password);
console.log("DB user:", user);

};

  return (
    <div className="form-container">
      <h2>Login</h2>

      {error && <p className="error-text">{error}</p>}

      <input
        type="tel"
        placeholder="Phone Number"
        onChange={(e) => setPhone(e.target.value.trim())}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn" onClick={handleLogin}>
        Login
      </button>

      <p className="auth-switch">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
