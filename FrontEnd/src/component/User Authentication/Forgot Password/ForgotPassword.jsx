import { useState } from "react";
import { forgotPassword } from "../../../services/authService";
import "../UserAuthentication.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const currentBaseUrl = `${window.location.protocol}//${window.location.host}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //Call forgotPassword function from authService
      const responseMessage = await forgotPassword(email, currentBaseUrl);
      setSuccess(responseMessage);
      setError("");
    } catch (errMessage) {
      setError(errMessage);
      setSuccess("");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Forgot Password</h2>
        {success && <p style={{ color: "green" }}>{success}</p>}
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
          <div className="auth-button">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
