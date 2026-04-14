import { useState } from "react";
import API from "../services/api";

function Register() {
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
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="center">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })} />

        <input placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input type="password" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;