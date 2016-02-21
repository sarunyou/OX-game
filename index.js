var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var icon;
var lasticon;
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
var players = [];
io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
    socket.on('first login', function() {
        if (players.length % 2 == 0) {
            icon = "icon-x";
            var canClick = false;
            var state = "You Turn"
        } else {
            icon = "icon-o";
            var state = "Wait For Your Friend Choose"
            var canClick = true;
        }
        socket.emit('update users', {
            name:players,
            icon:icon,
            canclick:canClick,
            state:state}
        );
    });
    socket.on('add user', function(username) {
        players.push(username);
        io.emit('show users', username);
    });
    socket.on('end game', function() {
        socket.broadcast.emit('show end');
    });
    socket.on('re game', function() {
        io.emit('regame');
        console.log("regame");
    });

    socket.on('changTurn', function (id) {
        socket.broadcast.emit('new turn', {
      click:false,id:id.click,icon:id.icon
   });
 });

});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
