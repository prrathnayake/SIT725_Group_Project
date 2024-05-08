function handleRegistration() {
  const username = document.getElementById("userSignUp").value;
  const password = document.getElementById("passSignUp").value;
  const repeatPassword = document.getElementById("repeatPass").value;
  const email = document.getElementById("email").value;

  fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      repeatPassword: repeatPassword,
      email: email,
    }),
  })
    .then((response) => {
      if (response.ok) {
      } else {
        alert("Registration failed.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

document.getElementById("signUpButton").addEventListener("click", handleRegistration);
