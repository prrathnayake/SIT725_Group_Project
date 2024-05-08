function handleLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => {
        if (response.ok) {
        } else {
            alert('Login failed. Please check your credentials.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.getElementById("loginButton").addEventListener("click", handleLogin);