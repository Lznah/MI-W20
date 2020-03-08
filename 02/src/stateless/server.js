var net = require('net');

var db = {
  1: {
    orderID: 1,
    items: [],
    processed: false
  },
  2: {
    orderID: 2,
    items: [],
    processed: true
  }
}

function newID() {
  let keys = Object.keys(db);
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
        if(typeof message.orderID == "undefined") {
          message.orderID = newID();
        }
        if(typeof db[message.orderID] == "undefined") {
          db[message.orderID] = {
            orderID: message.orderID,
            items: [],
            processed: false
          };
        }
        if(db[message.orderID].processed) {
          message.command = "REFUSED: ALREADY PROCESSED";
          console.log(message.command);
          break;
        }

        console.log("REQUEST: OPEN("+message.orderID+")");
        message.command = "OPENED";
        break;
      case "ADD":
        if(typeof db[message.orderID] == "undefined") {
          message.command = "REFUSED: UNKNOWN ORDER ID";
          console.log(message.command);
          break;
        }
        if(db[message.orderID].processed) {
          message.command = "REFUSED: ALREADY PROCESSED";
          console.log(message.command);
          break;
        }
        console.log("REQUEST: ADD("+message.item+", "+message.orderID+")");
        message.command = "ADDED";
        db[message.orderID].items.push(message.item);
        break;
      case "PROCESS":
        if(typeof db[message.orderID] == "undefined") {
          message.command = "REFUSED: UNKNOWN ORDER ID";
          console.log(message.command);
          break;
        }
        if(db[message.orderID].processed) {
          message.command = "REFUSED: ALREADY PROCESSED";
          console.log(message.command);
          break;
        }
        console.log("REQUEST: PROCESS("+message.orderID+")");
        db[message.orderID].processed = true;
        message.command = "PROCESSED";
        break;
    }
    c.write(JSON.stringify(message));
    
  });
});

server.listen(8124, function() { // start server (port 8124)
  console.log('server started');
});