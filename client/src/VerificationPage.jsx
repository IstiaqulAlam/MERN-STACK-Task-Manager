import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Verify } from './VerifyScript';

function VerificationPage() {
  
  const navigate = useNavigate();
  const [verificationNotice, setVerificationNotice] = useState("Enter the verification code that you recieved in your email.");
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
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      handleVerification();
    }
  };
  return (
    <>
      <h1>Veggie Tasks - Email Verification</h1>
      <div className="container">
        <div className="verify-box">
          <div className="form-title">Verification</div>
          <form
            className="verification-form"
            onKeyDown={handleKeyDown} 
          >
            <label className="h5" htmlFor="verificationCode">Verification Code:</label>
            <input className="rounded-pill p-2 mb-4" id="verificationCode" type="text" placeholder="Verifican Code:" required />
            <button type="button" onClick={handleVerification} id="verifyButton">Verify</button>
            <p>{verificationNotice}</p>
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

export default VerificationPage;
