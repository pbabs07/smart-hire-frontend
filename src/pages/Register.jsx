import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Join SmartHire to track your job hunt</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input 
            placeholder="Username"
            required
            onChange={(e) => setForm({ ...form, username: e.target.value })} 
          />
          <input 
            type="email"
            placeholder="Email Address"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })} 
          />
          <input 
            type="password" 
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })} 
          />
          <button className="btn-auth" type="submit">Register</button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;