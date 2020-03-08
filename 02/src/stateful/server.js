var net = require('net');

var db = {}

var statuses = {};

function newID() {
  let keys = [...Object.keys(db),0];
  return Math.max.apply(Math, keys)+1;
}

var server = net.createServer(function(c) {
  console.log('socket opened');
  c.setEncoding('utf8');
  c.on('end', function() {
    console.log('connection/socket closed');
  });
  c.on('data', function(data) {
    let message = JSON.parse(data);
    switch(message.command) {
      case "OPEN":
        if(statuses[c.remoteAddress].status != "INIT") {
          message.command = "REFUSED: ALREADY OPENED OR CLOSE"
          break;
        }
        message.orderID = newID();
        statuses[c.remoteAddress].orderID = message.orderID;
        db[message.orderID] = {
          orderID: message.orderID,
          items: []
        };
        console.log("REQUEST: OPEN("+message.orderID+")");
        statuses[c.remoteAddress].status = "OPENED";
        break;
      case "ADD":
        if(statuses[c.remoteAddress].status != "OPENED") {
          message.command = "REFUSED: NOT OPENED OR ALREADY CLOSED";
          break;
        }
        message.orderID = statuses[c.remoteAddress].orderID;
        console.log("REQUEST: ADD("+message.item+", "+message.orderID+")");
        message.command = "ADDED";
        db[message.orderID].items.push(message.item);
        break;
      case "PROCESS":
        if(statuses[c.remoteAddress].status != "OPENED") {
          message.command = "REFUSED: NOT OPENED OR ALREADY CLOSED"
          break;
        }
        message.orderID = statuses[c.remoteAddress].orderID;
        console.log("REQUEST: PROCESS("+message.orderID+")");
        message.command = "PROCESSED";
        statuses[c.remoteAddress].status = "PROCESSED";
        break;
    }
    c.write(message.command);
    
  });
  c.on('close', (data) => {
    delete statuses[c.remoteAddress];
    console.log("CLOSED CONNECTION FROM: " + c.remoteAddress);
  });
});

server.on('connection', (c) => {
  console.log("NEW CONNECTION FROM: " + c.remoteAddress);
  statuses[c.remoteAddress] = {status: "INIT", orderID: undefined};
});

server.listen(8124, function() { // start server (port 8124)
  console.log('server started');
});