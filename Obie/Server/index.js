/**
 * Created by crawfobw1 on 3/5/16.
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

// Get from root
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/v1/user/login', function(req, res) {

});

// listen on port 8000
server.listen(8000, function() {
    console.log("Server listening on port " + server.address().port);
});


