# Homework 2
Implement simple Statefull (All interactions within one session) and Stateless (Information about state is part of communication) server in http://nodejs.org using network module.

Your server should be able to communicate using following commmands: * open - open order * add - add item * process - process order

Example of communication (order of commands is important):
```
  -->open (client request)
  <--opened (server response)
  -->add
  <--added
  -->process
  <--processed
```

Do not forget show example of telnet communications.

# Instructions
    - Publish source code of your solution.

# Example
**“Echo server”**

```javascript
var net = require('net');

var server = net.createServer(function(c) {
  console.log('socket opened');
  c.setEncoding('utf8');
  c.on('end', function() {
    console.log('connection/socket closed');
  });
  c.on('data', function(data) {
    console.log('Data:'+data);
    c.write('Answer:'+data);
    // c.end(); // close socket/conection
  });
});

server.listen(8124, function() { // start server (port 8124)
  console.log('server started');
});
```
