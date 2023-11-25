import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VerifyPasswordChange() {

  const navigate = useNavigate();
  const [verifyNotification, setVerifyNotification] = useState("Enter code sent to your email");

  return (
    <>
      <h1>Veggie Tasks</h1>
      <div className="container">
        <div className="verify-box">
          <form className="verification-form">
          <div className="form-title">User verification</div>
            <label className="h5" htmlFor="verificationCode">Verify email code</label>
            <input className="rounded-pill p-2 mb-4" id="verificationCode" type="text" placeholder="Verification code" required />
            <button type="button" onClick={undefined} id="verifyButton">Submit</button>
            <p>{verifyNotification}</p>
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

export default VerifyPasswordChange;
