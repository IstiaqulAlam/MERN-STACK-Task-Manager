import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function VerifyPasswordChange() {

  const [verifyNotification, setVerifyNotification] = useState("Enter code sent to your email");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const HandleVerifyClick = async () => {

    console.log(email);

    const urlBase = 'http://cop4331group2.com:5000';

    const restoreId = document.getElementById("verificationCode").value;

    console.log(restoreId);

      try {
        const response = await fetch(`${urlBase}/api/allowPasswordChange`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ restoreid: restoreId }),
        });

        if (response.ok) {
          console.log(response);
          navigate("/SetNewPassword", { state: { email } });
        }
      } catch (err) {
        console.log(err);
      }
      setVerifyNotification("Invalid Code");
    };

  return (
    <>
      <h1>Veggie Tasks</h1>
      <div className="container">
        <div className="verify-box">
          <form className="verification-form">
          <div className="form-title">User verification</div>
            <label className="h5" htmlFor="verificationCode">Verify email code</label>
            <input className="rounded-pill p-2 mb-4" id="verificationCode" type="text" placeholder="Verification code" required />
            <button type="button" onClick={() => HandleVerifyClick()} id="verifyButton">Submit</button>
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
