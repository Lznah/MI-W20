var sendButton = document.querySelector("#sendButton");
var authorInput = document.querySelector("#author");
var messageInput = document.querySelector("#message");
var chatWindow = document.querySelector("#chatWindow");

function request(params, callback){
    var request = new XMLHttpRequest();
    request.open(params.method, params.url, true);
    request.addEventListener("load", callback);
    request.addEventListener("readystatechange", function(){
        if (request.readyState == XMLHttpRequest.DONE) {
            // alert("The server responded with the status: " + request.status);
        }
      });
      
      request.addEventListener("error", function(err){
        alert("A network error occured");
      });
      request.send(JSON.stringify(params.message));
}  

sendButton.addEventListener('click', function() {
    var params = {
        "method": "POST",
        "url": "http://localhost:8080/sendMessage",
        "message": {
            "author": authorInput.value,
            "message": messageInput.value
        }
    };
    request(params, function() {
        var date = new Date().toISOString();
        if(params.message.message == "") return;
        chatWindow.innerHTML += "<b>"+params.message.author+"</b> ["+ date  +"]: " + params.message.message + "<br>";
        messageInput.value = '';
    });
});

function getMessages() {
    var params = {
        "method": "GET",
        "url": "http://localhost:8080/getMessages?author="+authorInput.value,
        "message": {}
    };
    request(params, function() {
        var response = JSON.parse(this.responseText);
        
        if(typeof response.username != "undefined") {
            return authorInput.value = response.username;
        }
        var output = "";
        console.log(response);
        for(var i=0; i<response.length; i++) {
            var date = new Date(response[i].time).toISOString();
            output += "<b>"+response[i].author+"</b> ["+ date  +"]: " + response[i].message + "<br>";
        }
        console.log(output);
        chatWindow.innerHTML += output;
    });
}

window.onload = function() {
    getMessages();
    var interval = setInterval(getMessages,3000);
};

