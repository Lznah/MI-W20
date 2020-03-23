const http = require('http');
const url = require("url");
const path = require("path");
const fs = require("fs");

const hostname = '127.0.0.1';
const port = 8080;
const wd = process.cwd();

var ServeStatic = {
	exists: function(path) {
        return new Promise( (resolve, reject) => {
            fs.access(path, fs.constants.F_OK, (err) => {
                if(err){
                    return reject(err)
                }
                resolve();
            });
        })
	},
	readContent: async function(path){
        return new Promise( async function(resolve, reject) {
            if(path == wd+"/") {
                path = path+"index.html";
            }
            data = fs.readFile(path, "binary", (err, data) => {
                if(err) {
                    reject(err);
                }
                resolve(data);
            });
        })
	},
    run: async (pathName, filePath, res) => {
        try{
            await ServeStatic.exists(filePath);
            ServeStatic.readContent(filePath)
            .then( function(data) {
                res.statusCode = 200;
                res.write(data, "binary");
                res.end();
            })
            .catch( function(err) {
                console.log("ERROR has occured: " + err);
                res.statusCode = 400;
                res.end();
            });
        } catch(err) {
            res.statusCode = 404;
            res.end();
        } 
    }
}

function wait(time, callback) {
    console.log("Jen si posečkej!")
    setTimeout(() => {
        callback("Jedu bomby!")
    }, time);
}

http.createServer( async (req, res) => {
  var pathName = url.parse(req.url).pathname;
  var filePath = path.join(wd, pathName);
  wait(10000, function(message) {
    console.log(message);
    ServeStatic.run(pathName, filePath, res);
  });
  
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});