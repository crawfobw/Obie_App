/**
 * Created by crawfobw
 */
'use strict';

// Include 3rd party packages
var express = require('express'),
    io      = require('socket.io'),
    http    = require('http'),
    logger  = require('morgan');

// Initialize server elements
var app = express();
var server = http.Server(app);
var ioServer = io(server);

var rooms = [
    { id: 'sports', name: 'Sports', messages: [""] },
    { id: 'politics', name: 'Politics', messages: [""] },
    { id: 'fashion', name: 'Fashion', messages: [""] },
    { id: 'technology', name: 'Technology', messages: [""] }
];

var users = [];

// logger development mode
app.use(logger('dev'));

// Server socket handler
ioServer.on('connection', function(socket) {
    console.log('user connected to socket');

    socket.on('checkConnection', function(data) {
       console.log(data);
    });

    socket.on('login', function(credentials) {
        console.log(credentials);

        if(!(credentials.userId in users)) {
            var person = {};
            person[credentials.userId] = credentials;
            users.push(person);
        }

        console.log("logged in users: ");
        users.forEach(function(user) {
            console.log(user);
        })
    });

    socket.on('logout', function(userId) {
        // find user and remove from list of active users
    });

    socket.on('chat message', function(message) {
        console.log('received message ' + message);
        ioServer.emit('chat message', message);
    });

    socket.on('get room', function(roomId) {
        ioServer.emit('room info', rooms[roomId])
    });

    socket.on('disconnect', function() {
        console.log('user disconnected from socket');
    });
});

// Get from root
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// listen on port 8000
server.listen(8000, function() {
    console.log("Server listening on port " + server.address().port);
});


