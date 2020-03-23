const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const socketIO = require('socket.io');

var messages = [];
var authors = [];
var waiters = [];

var indexFile = fs.readFileSync( path.join(__dirname,"../client/index.html"), "binary");
var jsonFile = fs.readFileSync( path.join(__dirname,"../client/client.js"), "binary");
var socketIoFile = fs.readFileSync( path.join(__dirname,"../client/socket.io.js"), "binary");

var server = http.createServer(function(req, res) {
    const serverTime = Date.now();
    req.body = "";
    req.on('data', function (chunk) {
        req.body += chunk;
    });
    req.on('end', function () {

        if(req.url.match(/\/index.html/) && req.method == 'GET') {
            res.statusCode = 200;
            res.write(indexFile, "binary");
            res.end();
        }

        if(req.url.match(/\/socket.io.js/) && req.method == 'GET') {
            res.statusCode = 200;
            res.write(socketIoFile, "binary");
            res.end();
        }

        if(req.url.match(/\/client.js/) && req.method == 'GET') {
            res.statusCode = 200;
            res.write(jsonFile, "binary");
            res.end();
        }
    });
}).listen(8080);

var io = socketIO(server);

var authors = [];

io.on('connection', (socket) => {
    console.log('New user connected');
    let author = "Anonymous"+Math.round(Math.random()*1000);
    authors.push(author);
    socket.emit('sendAuthor', generateMessage(author, "Your name is " + author));
    socket.broadcast.emit('newMessage', generateMessage('Admin', "New user <b>" + author + "</b> has joined the chat"));

    socket.on('createMessage', (data, callback) => {
        console.log('Recieved message', data);
        io.emit('newMessage', generateMessage(data.author, data.message));
        callback('This is from the server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});

function generateMessage(author, message) {
    return {
        author,
        message,
        time: Date.now()
    }
}