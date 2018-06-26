
let express = require("express");
let uuidV4 = require("uuid/v4");

let Users = require("../../models/users");
let router = express.Router();

router.post("/register", async function(req, res, next) {
  try {
    let newToken = uuidV4();

    let ip = (req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress.split(':').pop() ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress).split(",")[0];
    
    let [success, error] = await Users.register(req.body, ip, newToken);
    console.log("regERROR:" + error);
    if (success) {
      res.json({ token: newToken });
    } else {
      res.json({ token: error });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.post("/stop", function (req, res) {
  let body = req.body;
  let token  = body.userToken;
  let { wsc } = req.app.locals;
  let userWs  = wss.connectedUsers[token];
  console.log(token);
  if(userWs){
    userWs.send('STOP!@!');
    userWs.close(1500,'stopped');
    res.json("success");
  }
  
});

module.exports = router;
