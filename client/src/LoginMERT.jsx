import React, { useState } from 'react';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { Login } from './LoginScript';

function LoginMERT() {

  const [loginNotice, setLoginNotice] = useState("");
  const navigate = useNavigate();
    
  const handleLogin = async () => {
    const user = await Login();
    console.log('Login result:', user);
    if (user === "Failed to login") {
      setLoginNotice('Login failed. Please check your credentials.');
    }
    else if (user) {
      setLoginNotice(`Logged in as ${user.username}`);
      // Redirect to the main page with user information
      navigate('/mainpage', { state: { user } });
    } else {
      setLoginNotice('Login failed. Please check your credentials.');
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleLogin();
    }
  };
  return (
    <>
      <h1>Veggie Tasks</h1>
      <div className="container">
        <div className="login-box">
          <div className="form-title">Login</div>
          <form
            id="loginForm"
            className="login-form"
            onKeyDown={handleKeyPress} 
          >            <input className="rounded-pill p-2 mb-4" id="username" type="text" placeholder="Username" required />
            <label className="h5" htmlFor="password">Password:</label>
            <input className="rounded-pill p-2 mb-4" id="password" type="password" placeholder="Password" required />
            <button type="button" onClick={handleLogin} id="loginButton">Login</button>
            <p id="loginNotice">{loginNotice}</p>
            <Link to="/register" id="registerRedirectButton">Register</Link>
            <Link to="/resetpassword" id="resetpasswordbutton">Reset Password</Link>
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
