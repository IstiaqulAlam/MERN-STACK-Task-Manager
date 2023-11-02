import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { Login } from './LoginScript';

function LoginMERT() {

  const [loginNotice, setLoginNotice] = useState("");

  return (
    <>
      <h1>LifeQuests</h1>
      <div className="container">
        <div className="content">
          <div className="form-title">Login</div>
          <form id="loginForm">
            <label className="h5" htmlFor="username">Username:</label>
            <input className="rounded-pill p-2 mb-4" id="username" type="text" placeholder="Username" required />
            <label className="h5" htmlFor="password">Password:</label>
            <input className="rounded-pill p-2 mb-4" id="password" type="password" placeholder="Password" required />
            <button type="button" onClick={async () => setLoginNotice(await Login())} id="loginButton">Login</button>
            <p id="loginNotice">{loginNotice}</p>
            <Link to="/register" id="registerRedirectButton">Register</Link>
          </form>
          <div id="loginNotice"></div>
        </div>
      </div>
      <div className="mountain left-mountain"></div>
      <div className="mountain right-mountain"></div>
      <div className="sun"></div>
      <script src="LoginScript.js"></script>
    </>
  );
}

export default LoginMERT;

