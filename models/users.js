let db = require("../db");

module.exports = {
  register(data, ip, newToken) {
    let queryString =
      "INSERT INTO sdk_token(partner_name, partner_id, registed_ip, token) VALUES($1, $2, $3, $4)";
    let values = [data.partnerName, data.partnerId, ip, newToken];
    console.log("data:" + data.partnerName);
    console.log("token:" + newToken);
    console.log("DBV:" + values);
    return db
      .query(queryString, values)
      .then(() => [true])
      .catch(err => [false, err]);
  },
  checkToken(sdkToken){
    let queryString = "SELECT * FROM sdk_token WHERE token = $1";
    let values = [sdkToken];
    return db
      .query(queryString, values)
      .then(() => [true])
      .catch(err => [false, err]);

  }
};
