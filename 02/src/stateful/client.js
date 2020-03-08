const net = require("net");

var client = new net.Socket();
const port = 8124;
const address = "localhost";
const chosenRequestsSet = process.argv[2];

const requestsSet = {
    "set1": [
        { 
            command: "OPEN"
        },
        { 
            command: "ADD",
            item: "Hammer"
        },
        { 
            command: "PROCESS"
        }
    ],
    "set2": [
        { 
            command: "ADD",
            item: "Hammer"
        }
    ],
    "set3": [
        { 
            command: "PROCESS"
        }
    ],
    "set4": [
        { 
            command: "OPEN"
        },
        { 
            command: "OPEN"
        },
        { 
            command: "PROCESS"
        }
    ],
    "set5": [
        { 
            command: "OPEN"
        },
        { 
            command: "PROCESS"
        },
        { 
            command: "PROCESS"
        }
    ],
};

const requests = requestsSet[chosenRequestsSet];

var i = 0;

var interval;

client.connect(port, address, function() {
    interval = setInterval( function() {
        client.write( JSON.stringify(requests[i]));
        console.log("COMMAND: " + requests[i].command + (requests[i].item != undefined? " "+requests[i].item: ""));
        i++;
        if(i>=requests.length) {
            client.end();
        }
    }, 1*1000);
});

client.on('data', function(message) {
    console.log(message.toString('utf8'));
});


client.on('close', function() {
    clearInterval(interval);
    client.destroy();
    console.log('Connection closed');
});

client.on('error', function(data) {
    console.error(data.toString('utf8'));
});