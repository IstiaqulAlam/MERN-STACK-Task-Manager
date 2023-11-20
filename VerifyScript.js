async function Verify() {
  const verificationCode = document.getElementById("verificationCode").value;
  const urlBase = 'http://67.205.172.88:5000';
  
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