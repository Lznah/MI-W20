const net = require("net");

var client = new net.Socket();
const port = 8124;
const address = "localhost";
const chosenRequestsSet = process.argv[2]; 
const orderID = process.argv[3];

const requestsSet = {
    "all": [
        { 
            command: "OPEN",
            orderID
        },
        { 
            command: "ADD",
            orderID,
            item: "Hammer"
        },
        { 
            command: "PROCESS",
            orderID
        }
    ],
    "open": [{ 
        command: "OPEN",
        orderID
    }],
    "open-noid": [{ 
        command: "OPEN"
    }],
    "add": [{ 
        command: "ADD",
        orderID,
        item: "Hammer"
    }],
    "process": [{ 
        command: "PROCESS",
        orderID
    }]
};

const requests = requestsSet[chosenRequestsSet];

var i = 0;

var interval;

client.connect(port, address, function() {
    interval = setInterval( function() {
        client.write( JSON.stringify(requests[i]));
        i++;
        if(i>=requests.length) {
            client.end();
        }
    }, 1*1000);
});

client.on('data', function(data) {
    let message = JSON.parse(data);
    switch(message.command) {
        case "OPENED":
            console.log("OPENED");
            break;
        case "ADDED":
            console.log("ADDED");
            break;
        case "PROCESSED":
            console.log("PROCESSED");
            break;
        default:
            console.log(message.command);
            break;
    }
});


client.on('close', function() {
    clearInterval(interval);
    client.destroy();
    console.log('Connection closed');
});

client.on('error', function(data) {
    console.error(data);
});