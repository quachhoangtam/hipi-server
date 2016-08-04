var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
var listusername;
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 5000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

server.listen(server_ip_address || server_port);

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