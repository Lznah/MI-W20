const http = require('http')

const handleRequest = (req, res) => {
    console.log('Recieved request for URL: ' + req.url)
    const name = req.url.match('^\/([a-zA-Z]*)$')
    if(!name) {
        res.writeHead(500)
        return res.end('Give me your name!')
    }
    res.writeHead(200)
    res.end(`Hello ${name[1]}`)
}

var www = http.createServer(handleRequest);
www.listen(8888);
