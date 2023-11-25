import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {

  const navigate = useNavigate();
  const [emailNotification, setEmailNotification] = useState("Enter the email you used to register");

  return (
    <>
      <h1>Veggie Tasks</h1>
      <div className="container">
        <div className="verify-box">
          <form className="verification-form">
          <div className="form-title">Reset Password</div>
            <label className="h5" htmlFor="EmailFieldReset">Email:</label>
            <input className="rounded-pill p-2 mb-4" id="EmailFieldReset" type="text" placeholder="Email:" required />
            <button type="button" onClick={undefined} id="verifyButton">Find User</button>
            <p>{emailNotification}</p>
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

export default ResetPassword;
