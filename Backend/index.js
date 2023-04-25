//const fs require('fs');

function addUser(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    var data = {
	"email":email.value,
	"password":password.value
    }
    //convert JavaScript object to JSON
    var userData = JSON.stringify(data)
//    fs.writeFile('users.json', userData)

    window.location.replace("https://codermerlin.com/users/qasem-abdeljaber/Scanner/Frontend/login.html");
}

function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
	x.type = "text";
	document.getElementById("showpswrd").style.backgroundColor = "lightblue";
    } else {
	x.type = "password";
	document.getElementById("showpswrd").style.backgroundColor = "#f8a19580";
    }
}
