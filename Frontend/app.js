const loginForm = document.querySelector('#login-form');
const errorMessage = document.querySelector('#error-message');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const response = await fetch('/login', {
	method: 'POST',
	headers: {
	    'Content-Type': 'application/json'
	},
	body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
	// Login was successful - store the JWT token in localStorage and redirect to the protected page
	localStorage.setItem('token', data.token);
	window.location.href = '/protected';
    } else {
	// Login failed - display an error message
	errorMessage.textContent = data.error;
    }
});
