import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Verify } from './VerifyScript';

function VerificationPage() {
  
  const navigate = useNavigate();
  const [verificationNotice, setVerificationNotice] = useState("Enter the verification code that you recieved in your email");
  const handleVerification = async () => {
    const result = await Verify();

    if (result === "Verification successful. User registered.") {
      // Redirect to the login page on successful verification
      navigate('/login');
    } else {
      // Display a message for unsuccessful verification
      setVerificationNotice("Verification code doesn't match. Please try again.");
    }
  };

  return (
    <>
      <h1>Veggie Tasks - Email Verification</h1>
      <div className="container">
        <div className="verification-box">
          <div className="form-title"
          >Verification</div>
          <form className="verification-form">
            <label className="h5" htmlFor="verificationCode">Verification Code:</label>
            <input className="rounded-pill p-2 mb-4" id="verificationCode" type="text" placeholder="Verifican Code:" required />
            <button type="button" onClick={handleVerification} id="verifyButton">Verify</button>
            <p>{verificationNotice}</p>
          </form>
          <div id="verificationNotice"></div>
        </div>
      </div>
    </>
  );
}

export default VerificationPage;
