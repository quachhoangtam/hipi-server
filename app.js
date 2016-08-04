var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
var listusername;

server.listen(process.env.PORT || 3000);

console.log("SERVER RUN");

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});


io.sockets.on('connection', function(socket){
	console.log("USER CONNECT");
	socket.on('client-send-username',function(data){
		console.log('CLIENT REGISTER USERNAME = '+ data );	
		listusername.push(data);
		socket.key = data;
		socket.emit('serverguitinnhan', { noidung: data });
	});
});