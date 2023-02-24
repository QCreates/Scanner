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

//REST API demo in Node.js
/*var express = require('express');
var app = express();
var fs = require('fs'); 

//Endpoint to get a list of users
app.get('/getUsers', function(req, res){
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
	console.log(data);
	res.send(data); 
    });
})


var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})
*/
