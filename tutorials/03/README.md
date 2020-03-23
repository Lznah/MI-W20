# TUTORIAL 3
## Tasks
### CORS
Implement server with CORS support. Use http://nodejs.org and only http module - no additional nodejs modules or libraries.

- Your server has to listen on localhost and port 8888
- Server has to implement CORS
- Server has to allow GET, PUT, POST, DELETE methods
- each method for the specific resource: GET on /get/, PUT on /put/, …​
- Server has to allow content negotiation specific HTTP headers
- Do not forget on preflight request

For testing of your implementation use simple “client” - http://users.fit.cvut.cz/~kuchajar/public/mi-w20/tutorial-cors-client.html

### JSONP
Work with JSONP, mashup resources

- Implement a service that provides a list of entries as JSON (e.g. list of persons, orders, …​)
- use Node.js for the implementation of the service
extend the service about JSONP output: e.g. parameter _callback=loadData
- Create a simple HTML page. Do not use any JavaScript frameworks.
- Write a JavaScript script that will show list of entries in the HTML as a list.
- Fetch the data from your service using JSONP

## Solution
In one terminal, run:
```
    node service/server.js
```

And in the second one, run:
```
    http-server ./standalone
```

In browser:
http://users.fit.cvut.cz/~kuchajar/public/mi-w20/tutorial-cors-client.html
http://localhost:8080

