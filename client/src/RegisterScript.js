async function Register() {
  console.log("Register function called");
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const retypePassword = document.getElementById("retypePassword").value; // Assuming you have this field

  const urlBase = 'http://cop4331group2.com:5000';

  // Check if any of the required fields are empty
  if (firstname === "" || lastname === "" || email === "" || username === "" || password === "" || retypePassword === "") {
    return "Please fill out all fields";
  }
  // Must be 6 or more chars and have a special char
  else if (password.length < 6 || !hasSpecialCharacter(password)) {
    return "Your password did not meet complexity requirements";
  }
  // Password and retype password fields must match
  else if (password !== retypePassword) {
    return "Your passwords do not match";
  }

  const response = await fetch(`${urlBase}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname,
      lastname,
      email,
      username,
      password,
    }),
  });

  const result = await response.json();
  console.log(result);

  // Check the response from the server
  if (response.ok) {
    return "Registration successful";
  } else {
    console.error(result.err);
    return result.err;
  }

  function hasSpecialCharacter(str) {
    var specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharacters.test(str);
  }
}

export { Register };
