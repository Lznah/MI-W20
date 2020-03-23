var sendButton = document.querySelector("#sendButton");
var authorInput = document.querySelector("#author");
var messageInput = document.querySelector("#message");
var chatWindow = document.querySelector("#chatWindow");

sendButton.addEventListener('click', function() {
  socket.emit('createMessage', {
    author: authorInput.value,
    message: messageInput.value
  }, function(data) {
    console.log('Got it!', data);
  });
});

var socket = io();

socket.on('connect', function(message) {
  console.log('Connected to server');
});

socket.on('sendAuthor', function(message) {
  authorInput.value = message.author;
  console.log(message.message);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('Recieved message', message);

  var date = new Date(message.time).toISOString();
  chatWindow.innerHTML += "<b>"+message.author+"</b> [" + date  +"]: " + message.message + "<br>";
});
