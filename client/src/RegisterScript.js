const Register = async () => {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const urlBase = 'http://67.205.172.88:5000';

  const doRegister = async () => {
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
      if (firstname === "" || lastname === "" || email === "" || username === "" || password === "") {
        // Check if any of the required fields are empty
        return "Register Failed"
      } 
      //Proceed with registration check
      else {
        if (response.ok) {
          const jsonObject = await response.json();
  
          if (jsonObject.err) {
            console.log(JSON.stringfy(jsonObject));
          } else {
            console.log(JSON.stringify(jsonObject));
          }
        } else {
          return "Failed to register";
        }
      }
      
    } catch (err) {
      return err;
    }
  };

  return await doRegister();
}

export { Register };
