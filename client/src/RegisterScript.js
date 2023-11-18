async function Register() {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const retypePassword = document.getElementById("retypePassword").value;

  const urlBase = 'http://67.205.172.88:5000';

  const doRegister = async () => {

    // Check if any of the required fields are empty
    if (firstname === "" || lastname === "" || email === "" || username === "" || password === "" || retypePassword === "") {
      return "Please fill out all fields";
    }
    else if (password.length < 6 || !hasSpecialCharacter(password)) {
      return "Your password did not meet complexity requirements";
    }
    else if (password !== retypePassword) {
      return "Your passwords do not match";
    }

    try {

      const response = await fetch(`${urlBase}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          username: username,
          password: password
        }),
      });

      if (response.ok) {
        const jsonObject = await response.json();

        if (jsonObject.err) {
          console.log(JSON.stringify(jsonObject));
          return "Failed to register. Username or Email already taken";
        } else {
          console.log(JSON.stringify(jsonObject));
          return "Registration Complete";
        }
      } else {
        return "Registration Complete";
      }
    } catch (err) {
      return "Failed to register";
    }
  };

  function hasSpecialCharacter(str) {
    var specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharacters.test(str);
  }

  return await doRegister();
}

export { Register };
