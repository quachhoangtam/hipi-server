var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
var listusername;
var mysql=require("mysql");

server.listen(process.env.PORT || 3000);

console.log("SERVER RUN");

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

var connection = mysql.createConnection({
	host	: '103.7.41.145',
	user 	: 'zonedes_hipi',
	password: '6g4pQtIW',
	database: 'zonedes_hipidb',
	port	: 3306
});

connection.connect();
connection.query('SELECT * FROM zone_user',
	function(err, rows, fields){
		if(err) throw err;
		console.log('The solution is:',rows);
	}
);
connection.end();

io.sockets.on('connection', function(socket){
	console.log("USER CONNECT");
	socket.on('client-send-username',function(data){
		console.log('CLIENT REGISTER USERNAME = '+ data );	
		console.log("da up git");
		//listusername.push(data);
		//socket.key = data;
		socket.emit('serverguitinnhan', { noidung: data });
	});
});