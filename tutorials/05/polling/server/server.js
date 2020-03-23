const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

var messages = [];
var authors = [];

var indexFile = fs.readFileSync( path.join(__dirname,"../client/index.html"), "binary");
var jsonFile = fs.readFileSync( path.join(__dirname,"../client/client.js"), "binary");

http.createServer(function(req, res) {
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

        if(req.url.match(/\/client.js/) && req.method == 'GET') {
            res.statusCode = 200;
            res.write(jsonFile, "binary");
            res.end();
        }

        if(req.url.match(/\/sendMessage/) && req.method == 'POST') {
            const reqBody = JSON.parse(req.body);
            reqBody.time = Date.now();
            authors[reqBody.author] = reqBody.time;
            if(reqBody.message != '') {
                messages.push(reqBody);
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({status: "OK"}));
        }

        if(req.url.match(/\/getMessages/) && req.method == 'GET') {
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            let author = query.author;
            if(author == "") {
                author = "Anonymous"+Math.round(Math.random()*1000);
            }
            if( !(author in authors) ) {
                messages.push({
                    author: "SERVER",
                    message: "New user <b>" + author + "</b> has joined the chat",
                    time: Date.now()
                });
                authors[author] = Date.now();
                res.writeHead(200, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({'username': author}));
            }
            let newMessages = [];
            for(let i=0; i<messages.length; i++) {
                if(authors[author] < messages[i].time) {
                    newMessages.push(messages[i]);
                }
            }
            if(messages.length != 0){
                authors[author] = messages[messages.length-1].time;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(newMessages));
        }

        res.writeHead(400);
        res.end();

    });

}).listen(8080);