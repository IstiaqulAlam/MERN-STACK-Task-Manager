const loginWithStoredCredentials = async () => {
  // Retrieve username and password from localStorage
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  // Check if both username and password are present
  if (storedUsername && storedPassword) {
    try {
      // Make a login request using stored credentials
      const response = await fetch('http://67.205.172.88:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: storedUsername, password: storedPassword }),
      });

      if (response.ok) {
        const jsonObject = await response.json();
        console.log(JSON.stringify(jsonObject));
        return jsonObject;
      } else {
        console.error('Login failed');
        return null;
      }
    } catch (err) {
      console.error(`Error during login: ${err}`);
      return null;
    }
  } else {
    console.error('Stored credentials not found');
    return null;
  }
};

export { loginWithStoredCredentials };