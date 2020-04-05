const http = require('http')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util');
const port = 3000
const filePath = 'file.dummy'

const stat = promisify(fs.stat);

const server = http.createServer( async (req, res) => {
    console.log(`${req.method}> ${req.url}`)

    if(req.url.startsWith('/file')) {
        let stats;
        try{
            stats = await stat(filePath);
        } catch (err) {
            console.log(err);
            res.status(500)
            return res.end()
        }

        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Content-Length' : stats.size,
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Disposition': 'attachment; filename="file.dummy"' 
        }

        const readStream = fs.createReadStream(filePath);
        res.writeHead(200, headers)
        readStream.pipe(res);
    }
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})
