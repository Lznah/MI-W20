var http = require("http");
var crypto = require("crypto");

var secret = "Jedno velké tajemství";

function createToken(username) {
    let header = {
        typ: 'JWT',
        alg: 'HS256'
      };
      
      header = Buffer.from(JSON.stringify(header)).toString('base64');
      
      let payload = {
        iat: Date.now(),
        username: username
      };
      
      payload = Buffer.from(JSON.stringify(payload)).toString('base64');
      
      let key = header + '.' + payload;
      let signature = crypto.createHmac('sha256', secret);
      signature.update(key);
      key = signature.digest('base64');
      
      return header + '.' + payload + '.' + key;
}

function hmac(data) {
    let signature = crypto.createHmac('sha256', secret);
    signature.update(data);
    return signature.digest('base64');
}

function authentificate(token) {
    let [header, payload, signature] = token.split(".");
    let key = header + "." +payload;

    header = JSON.parse(Buffer.from(header, 'base64').toString('ascii'));
    payload = JSON.parse(Buffer.from(payload, 'base64').toString('ascii'));
    if(header.alg == 'HS256' && header.typ == 'JWT') {
        let signature2 = crypto.createHmac('sha256', secret);
        signature2.update(key);
        key = signature2.digest('base64');
        if(key == signature) return true;
    }
    return false;
}

http.createServer(function(req, res) {
    req.body = "";
    req.on('data', function (chunk) {
        req.body += chunk;
    });
    req.on('end', function () {
        if (req.url == '/login' && req.method == 'POST') {
            let reqBody = JSON.parse(req.body);
            if(reqBody.password == "password" && reqBody.username == "admin") {
                let token = createToken(reqBody.username);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({"token": token}));
            } else {
                res.statusCode = 500;
                res.end();
            }
        }

        if(req.url.match(/\/data/) && req.method == 'GET') {
            if( authentificate(req.headers.authorization) ) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({"data": "Secret content"}));
            } else {
                res.writeHead(401, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({"error": "Bad authentification"}));
            }
        }

        if(req.url.match(/\/hmac/) && req.method == 'GET') {
            let header = req.headers['authorization'] || '',
                token = header.split(/\s+/).pop()||'',
                auth = new Buffer.from(token, 'base64').toString(),
                parts=auth.split(/:/),
                username=parts[0];

            let data = {
                username: username,
                http_method: req.method,
                timestamp: Date.now(),
                url: req.url,
            }
            let data_string = JSON.stringify(data);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({"hmac": hmac(data_string)}));
        }

        res.writeHead(400);
        res.end();

    });

}).listen(8080);




// curl --header "Content-Type: application/json" \
//   --request POST \
//   --data '{"password":"password", "username":"admin"}' \
//   http://localhost:8080/login

// curl -X GET \
//   -H 'Authorization: aa.bb.cc' \
//   http://localhost:8080/data