/**
 * Created by crawfobw
 */
'use strict';

// Include 3rd party packages
var express = require('express'),
    io      = require('socket.io'),
    http    = require('http'),
    _       = require('underscore'),
    logger  = require('morgan');

// Initialize server elements
var app = express();
var server = http.Server(app);
var ioServer = io(server);

var rooms = [
    { id: 'sports', name: 'Sports', messages: [{'person' : "David Harper", 'message': "Lebron James is the GOAT"}, {'person': "John Fox", 'message' :"Michael Jordan was easily better than Lebron"},
        {'person': "David Harper", 'message' : "Stop being a Lebron Hater!!!"}] },
    { id: 'politics', name: 'Politics', messages: [{'person': "Andrew Johnson", 'message': "Bernie Sanders for pres #feelthebern"},
        {'person': "Christina Liu", 'message': "I feel that we need a moderate president"}, {'person': "Leslie Pratt", 'message': "There isn't time for moderates, we need TRUMP! MAKE AMERICA GREAT AGAIN!!!"}]},
    { id: 'fashion', name: 'Fashion', messages: [""] },
    { id: 'technology', name: 'Technology', messages: [""] }
];

var users = [];

var findRoom = function(roomId) {
    var roomFound = null;

    rooms.forEach(function(room) {
        if(room.id === roomId) {
            roomFound = room;
        }
    });
    return roomFound;
};

// logger development mode
app.use(logger('dev'));

// Server socket handler
ioServer.on('connection', function(socket) {
    socket.on('checkConnection', function(data) {
       console.log(data);
    });

    socket.on('login', function(credentials) {
        if(!(credentials.userId in users)) {
            var person = {};
            person[credentials.userId] = credentials;
            users.push(person);
        }

    });

    socket.on('chat message', function(message) {
        findRoom(message.roomId).messages.push({'person' : message.person, 'message' : message.content});
        ioServer.emit('message from ' + message.roomId, {'person' : message.person, 'message' : message.content});
    });


    socket.on('get room', function(roomId) {
        var room = findRoom(roomId);

        ioServer.emit('room info for ' + roomId, room);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected from socket');
    });
});

// listen on port 8000
server.listen(8000, function() {
    console.log("Server listening on port " + server.address().port);
});


