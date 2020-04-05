var info = document.getElementById("info");
var send = document.getElementById("send");

function progress(event) {
    var percentage = Math.round(100*event.loaded/event.total);
    info.innerHTML += '<br> Downloaded: ' + percentage + " %";
}

function load() {
    info.innerHTML += '<br> <b>Download completed!</b>';
}

function error(event) {
    info.innerHTML += '<br> <b>Error! Look into the console!</b> ';
    console.log(event);
}

function loadend(event) {
    info.innerHTML += '<br> <b>Transfer finished!</b> ';
    console.log(event);
}

send.addEventListener('click', function() {
    var req = new XMLHttpRequest();
    
    req.addEventListener('progress', progress);
    req.addEventListener('load', load);
    req.addEventListener('error', error);
    req.addEventListener('loadend', loadend);

    info.innerHTML += '<br> Transfer initialized!';
    req.open('GET', 'http://localhost:3000/file', true);
    req.send()
})