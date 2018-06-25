let { Pool } = require('pg');

let sdkApi = new Pool({
  user: 'postgres',
  password: 'asdf7777',
  database: 'postgres',
  host: 'psqldb.cryygodz7ewm.ap-southeast-1.rds.amazonaws.com',
  port: 5432,
  max: 20,
  min: 4,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  ssl: false
});

sdkApi.on('error', err => {});

module.exports = sdkApi;