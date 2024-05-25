document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = loginForm.username.value;
        const password = loginForm.password.value;

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.status === 200) {
                const result = await response.json();
                const userId = result.userId;
                const userType = result.userType;
console.log(userType);
                // Store userId in session storage and local storage
                sessionStorage.setItem('userId', userId);
                localStorage.setItem('userId', userId);
                if (userType === 1) {
                    window.location.href = '/';
                } else if (userType === 0) {
                    window.location.href = '/dashboard';
                } else {
                    alert('Unknown user type. Please contact support.');
                }
            } else {
                // Handle errors
                const errorText = await response.text();
                alert(`Login failed: ${errorText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
