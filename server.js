// server.js
// where your node app starts

// init project
let express = require('express');

let body_parser = require("body-parser");
let http = require('http');
let WsServer = require('./wss.js');
let register = require('./routes/api/registration');

let app = express();


app.use(body_parser.json());
app.use('/api', register);

const server = http.createServer();

app.use(express.static('public'));

let wss = WsServer(server, '/live');



app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post("/stop", function (request, response) {
  let body = request.body;
  
  let token  = body.userToken;
  let userWs  = wss.connectedUsers[token];
  console.log(token);
  if(userWs){
    userWs.send('STOP!@!');
  }
});

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

server.on('request', app);