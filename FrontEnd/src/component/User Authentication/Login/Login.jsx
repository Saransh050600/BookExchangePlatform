import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/authService";
import "../UserAuthentication.css";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    //Navigate to register Page
    navigate("/signup");
  };

  const handleForgotPassword = () => {
    //Navigate to Forgot Password Page
    navigate("/forgotpassword");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //Call LoginUser function from authService to be able to login
      const token = await loginUser(email, password);
      localStorage.setItem("token", token);
      //Add Token in local storage and set Auth to true
      setAuth(true);
      //After succussful login navigate to Home Page
      navigate("/home");
    } catch (errMessage) {
      setError(errMessage);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
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
            <button type="submit">Login</button>
          </div>
        </form>
        <p className="auth-text-link" onClick={handleForgotPassword}>
          Forgot password?
        </p>
        <p>
          Do not have an account?{" "}
          <span className="auth-text-link" onClick={handleSignUp}>
            Sign Up Now
          </span>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  setAuth: PropTypes.func.isRequired,
};

export default Login;
