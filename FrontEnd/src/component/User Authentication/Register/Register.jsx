import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/authService";
import "../UserAuthentication.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    //Navigate to Login Page
    navigate("/login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //Call registerUser function from authService to register the user in Database
      await registerUser(email, password);
      //After successful register navigate to Login page
      navigate("/login");
    } catch (errMessage) {
      setError(errMessage);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
          />
          <div className="auth-button">
            <button type="submit">Register</button>
          </div>
        </form>
        <p>
          Already have an account?{" "}
          <span className="auth-text-link" onClick={handleLogin}>
            Sign In Now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
