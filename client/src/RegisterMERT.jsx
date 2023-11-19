import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { Register } from './RegisterScript';

function RegisterMERT() {

    const [registerNotice, setRegisterNotice] = useState("Please ensure that your password is 6 or more characters long and includes a special character.");
    return (
      <>
        <h1>Veggie Tasks</h1>
        <div className="container">
          <div className="register-box">
            <div className="form-title">Sign Up</div>
            <form id="registerForm" className="register-form">
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
              <button type="button" onClick={async () => setRegisterNotice(await Register())} id="registerButton">Register</button>
              <p>{registerNotice}</p>
              <Link to="/login" id="loginRedirectButton">Login</Link>
            </form>
            <div id="loginNotice"></div>
          </div>
        </div>
        <script src="RegisterScript.js"></script>
      </>
    );
  }
  
  export default RegisterMERT;
