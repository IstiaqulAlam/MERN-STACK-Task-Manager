import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SetNewPassword() {

  const navigate = useNavigate();
  const [passwordNotification, setPasswordNotification] = useState("Enter new password");

  return (
    <>
      <h1>Veggie Tasks</h1>
      <div className="container">
        <div className="verify-box">
          <form className="verification-form">
          <div className="form-title">Set New Password</div>
            <label className="h5" htmlFor="verificationCode">Verification Code:</label>
            <input className="rounded-pill p-2 mb-4" id="verificationCode" type="text" placeholder="New Password" required />
            <button type="button" onClick={undefined} id="verifyButton">Submit</button>
            <p>{passwordNotification}</p>
          </form>
          <div id="verificationNotice"></div>
        </div>
      <div className="mountain left-mountain"></div>
      <div className="mountain right-mountain"></div>
      <div className="sun"></div>
      </div>
    </>
  );
}

export default SetNewPassword;
