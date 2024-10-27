import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetUserPassword } from "../../../services/authService";
import "../UserAuthentication.css";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      //Call resetUserPassword from authService
      await resetUserPassword(resetToken, newPassword);
      setMessage("Password reset successful");
      //After Successful Password Reset navigate to login page
      navigate("/login");
    } catch (errMessage) {
      setMessage(errMessage);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Reset Password</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleResetPassword}>
          <input
            className="auth-input"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="Enter new password"
            required
          />
          <div className="auth-button">
            <button type="submit">Set New Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
