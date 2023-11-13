import isAlpha from 'stringutilsjs';

async function Register() {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const urlBase = 'http://67.205.172.88:5000';

  const doRegister = async () => {

    if (firstname === "" || lastname === "" || email === "" || username === "" || password === "") {
        // Check if any of the required fields are empty
        return "Fill out all fields";
      }
      else if (password.length < 6 || isAlpha(password)) {
        return "Password did not meet compelxity requirments";
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
      
      //If any field is empty
      //Proceed with registration check
      if (response.ok) {
        const jsonObject = await response.json();

        if (jsonObject.err) {
          console.log(JSON.stringfy(jsonObject));
        } else {
          console.log(JSON.stringify(jsonObject));
        }
      } else {
        return "Registeration Complete";
      }
      
    } catch (err) {
      return "Failed to register";
    }
    return "Registeration Complete";
  };

  return await doRegister();
}

export { Register };
