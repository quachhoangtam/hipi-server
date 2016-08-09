var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
var listusername;
var mysql = require("mysql");

server.listen(process.env.PORT || 3000);

console.log("SERVER RUN");

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

var con = mysql.createConnection({
	host	: '103.7.41.145',
	user 	: 'zonedes_hipi',
	password: '6g4pQtIW',
	database: 'zonedes_hipidb',
	port	: 3306
});

con.connect();
con.query('SELECT * FROM zone_user',
	function(err, rows){
		if(err) throw err;
		console.log('The solution is:' + rows);
	}
);
con.end();

io.sockets.on('connection', function(socket){
	console.log("USER CONNECT");
	socket.on('client-send-username',function(data){
		console.log('CLIENT REGISTER USERNAME = '+ data );	
		console.log("da up git asda");
		//listusername.push(data);
		//socket.key = data;
		socket.emit('serverguitinnhan', { noidung: data });
	});
});