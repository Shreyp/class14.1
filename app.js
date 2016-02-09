var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
  port: 3306,
  host: 'localhost',
  user: 'root',
  database: 'sienfeld'
});

connection.connect(function(err) {
  if(err) {
    console.log("Error", err.stack);
  }

  console.log("Connected as id: %s", connection.threadId)
})

var PORT = process.env.NODE_ENV || 9001;

app.get('/', function(req, res) {
  connection.query("SELECT * FROM coolness;", function(err, result) {
    res.send(result);
  });
});

app.listen(PORT, function() {
  console.log("Listening at %s", PORT);
});