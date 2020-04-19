const redis = require('redis');
const http = require('http');
const port = 8888;

const client = redis.createClient(6379, '172.17.0.2');

client.on('connect', () => console.log('Connected to Redis'));
client.on('error', err => console.log('Error occured ' + err));

http.createServer( (req, res) => {
    const person = req.url.match(/\/person\/([a-zA-Z]{1,})\/address/)
    if(person) {
        return client.get(person[1], (err, data) => {
            if(err) {
                res.writeHead(500, {'Content-Type' : 'text/plain'});
                return res.end(err);
            }
            res.writeHead(200, {'Content-Type' : 'text/plain'});
            res.end(data);
        });
    }
    res.writeHead(404, {'Content-Type' : 'text/plain'});
    res.end("Nothing here");
}).listen(port, () => console.log('Server is listening on port ' + port));