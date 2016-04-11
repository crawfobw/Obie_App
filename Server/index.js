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

// logger development mode
app.use(logger('dev'));

// Server socket handler
ioServer.on('connection', function(socket) {
    console.log('user connected to socket');

    socket.on('checkConnection', function(data) {
       console.log(data);
    });

    socket.on('chat message', function(message) {
        console.log('received message ' + message);
        ioServer.emit('chat message', message);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected from socket');
    });
});

// listen on port 8800
server.listen(8800, function() {
    console.log("Server listening on port " + server.address().port);
});
