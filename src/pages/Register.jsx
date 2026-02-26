import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleRegister = async () => {
  try {
    await API.post("/auth/register", form);
    alert("Registered Successfully");
    navigate("/login");
  } catch (error) {
    console.log(error.response?.data);  // 👈 ADD THIS
    alert(error.response?.data?.message || "Registration Failed");
  }
};
  return (
    <div className="form-container">
      <h2>Create Account</h2>

      <input
        placeholder="Full Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />
      <input
        type="tel"
        placeholder="Phone Number"
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />
      <button className="btn" onClick={handleRegister}>
        Register
      </button>
      <p className="auth-switch">
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
