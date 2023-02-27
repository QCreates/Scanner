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
