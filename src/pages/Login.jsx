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
   console.log("Sending login request...");
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
   <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p>Enter your details to access your account</p>

        <form className="auth-form" onSubmit={handleSubmit}>
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

        <div className="auth-footer">
          Don't have an account? <Link to="/register" className="auth-link">Create one</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;