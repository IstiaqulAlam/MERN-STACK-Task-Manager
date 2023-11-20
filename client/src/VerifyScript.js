async function Verify() {
  const verificationCode = document.getElementById("verificationCode").value;
  const urlBase = 'http://cop4331group2.com:5000';
  
    const response = await fetch(`${urlBase}/api/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        verificationCode,
      }),
    });

    if (response.ok) {
      return "Verification successful. User registered.";
    } else {
      return "Verification failed. Invalid code.";
    } 
  }
  
  export { Verify };
