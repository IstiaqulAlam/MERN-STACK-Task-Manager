import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function SetNewPassword() {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  const [passwordNotification, setPasswordNotification] = useState("Enter new password");

  function hasSpecialCharacter(str) {
    var specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharacters.test(str);
  }

  const SendResetPasswordRequest = async () => {

    console.log(email);

    const urlBase = 'http://cop4331group2.com:5000';

    const password = document.getElementById("newPassword").value;

    if (password.length < 6 || !hasSpecialCharacter(password)) {
      setPasswordNotification("Your password did not meet complexity requirements");
    return;
  }

    console.log(password);

      try {
        const response = await fetch(`${urlBase}/api/changePassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: password, email: email }),
        });

        if (response.ok) {
         navigate("/login");
        }
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <>
      <h1>Veggie Tasks</h1>
      <div className="container">
        <div className="verify-box">
          <form className="verification-form">
          <div className="form-title">Set New Password</div>
            <label className="h5" htmlFor="newPassword">Verification Code:</label>
            <input className="rounded-pill p-2 mb-4" id="newPassword" type="password" placeholder="New Password" required />
            <button type="button" onClick={() => SendResetPasswordRequest()} id="verifyButton">Submit</button>
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
