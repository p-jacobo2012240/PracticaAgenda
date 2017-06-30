var mysql = require("mysql");
var parametros = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'agendaa'
};
var connection = mysql.createConnection(parametros);

module.exports = connection;
