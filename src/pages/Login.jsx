import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("LOGIN PAYLOAD:", { email, password });

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      login(res.data.token);
      navigate("/"); // better than "/"
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="center">
      <h2>Login</h2>
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p>Enter your details to access your account</p>

     <form className="auth-form" onSubmit={handleSubmit} style={{ display: "flex", padding:'10px'}} >
          <input
            type="email"
            placeholder="Email Address"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-auth" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;