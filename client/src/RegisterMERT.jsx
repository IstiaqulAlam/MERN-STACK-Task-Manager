import React, { useState } from 'react';
import './styles2.css';
import { Link } from 'react-router-dom';
import { Register } from './RegisterScript';

function RegisterMERT() {

  const [registrationNotice, setRegistrationNotice] = useState("");

    const handleRegistration = async () => {
      const firstname = document.getElementById("firstname").value;
      const lastname = document.getElementById("lastname").value;
      const email = document.getElementById("email").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (firstname === "" || lastname === "" || email === "" || username === "" || password === "") {
      setRegistrationNotice("Register Failed: Please fill in all fields");      
      } else {
        const registrationResponse = await Register({ firstname, lastname, email, username, password });
        setRegistrationNotice(registrationResponse);
      }
    };
    return (
      <>
        <h1>LifeQuests</h1>
        <div className="container">
          <div className="content">
            <div className="form-title">Sign Up</div>
            <form id="loginForm">
              <label className="h5" htmlFor="firstname">First Name:</label>
              <input className="rounded-pill p-2 mb-4" id="firstname" type="text" placeholder="First Name" required />
              <label className="h5" htmlFor="lastname">Last Name:</label>
              <input className="rounded-pill p-2 mb-4" id="lastname" type="text" placeholder="Last Name" required />
              <label className="h5" htmlFor="username">Username:</label>
              <input className="rounded-pill p-2 mb-4" id="username" type="text" placeholder="Username" required />
              <label className="h5" htmlFor="password">Password:</label>
              <input className="rounded-pill p-2 mb-4" id="password" type="password" placeholder="Password" required />
              <label className="h5" htmlFor="retypePassword">Retype Password:</label>
              <input className="rounded-pill p-2 mb-4" id="retypePassword" type="password" placeholder="Retype Password" required />
              <label className="h5" htmlFor="email">Email:</label>
              <input className="rounded-pill p-2 mb-4" id="email" type="email" placeholder="Email" required />
              <button type="button" onClick={handleRegistration} id="registerButton">Register</button>
              <Link to="/login" id="loginRedirectButton">Login</Link>
            </form>
            <div>{registrationNotice && <p>{registrationNotice}</p>}</div>
          </div>
        </div>
        <div className="mountain left-mountain"></div>
        <div className="mountain right-mountain"></div>
        <div className="sun"></div>
        <script src="RegisterScript.js"></script>
      </>
    );
  }
  
  export default RegisterMERT;
