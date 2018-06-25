let WebSocketServer = require("uws").Server;
let Users = require("./models/users");
let url = require('url');

module.exports = function WsServer(server, wspath) {


  let wss = new WebSocketServer({ server, path: wspath });
  

   wss.connectedUsers = {};
  function onMessage(message) {
    console.log("received: " + message);
  }

  wss.on("connection", ws => {
    let Url = url.parse(ws.upgradeReq.url, true);
    
    Users.checkToken()
    ws.userinfo = {
      sdkToken: Url.query.sdkToken,
      userToken: Url.query.userToken,
      action: Url.query.action
    };

    connectedUsers[ws.userinfo.userToken] = ws;
    console.log(
      "connected: " +
        connectedUsers[ws.userinfo.userToken] +
        " in " +
        Object.getOwnPropertyNames(connectedUsers)
    );
    //connection is up, let's add a simple simple event

    ws.on("message", message => {
      //log the received message and send it back to the client
      console.log(
        "received: %s",
        message.action + "from:" + ws.userinfo.userToken
      );
      ws.send(`Hello, you sent -> ${message}`);
    });

    /*
    ws.on('close', function () {
      delete connectedUsers[userToken]
    console.log('deleted: ' + userToken);
    })*/
    //send immediatly a feedback to the incoming connection
    ws.send(`phoneUserToken -> ${ws.userinfo.userToken}`);
  });

  return wss;
};
