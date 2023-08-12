const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3001,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = connection;
