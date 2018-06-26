// server.js
// where your node app starts

// init project
let express = require('express');

let body_parser = require("body-parser");
let http = require('http');
let WsServer = require('./wss.js');
let register = require('./routes/api/registration');

let app = express();





const server = http.createServer();

app.use(express.static('public'));

app.locals.wsc =  WsServer(server, '/live');



app.get("/", function (request, response) {// for test only
  response.sendFile(__dirname + '/views/index.html');
});

app.use(body_parser.json());

app.use('/api', register);


server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

server.on('request', app);