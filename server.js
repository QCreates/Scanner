//REST API demo in Node.js
var express = require('express'); //Require the express framework
var app = express();
var fs = require('fs'); //Require file system object

//Endpoint to get a list of users
app.get('/getUsers', function(req, res){
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
	console.log(data);
	res.send(data); //Assigns the data to res
    });
})


var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})
