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

var PORT = process.env.NODE_ENV || 7080;

app.get('/actors', function(req, res) {
  connection.query("SELECT id, name FROM coolness;", function(err, result) {
    res.send(result);
  });
});

app.get('/coolness-chart', function(req, res) {
  connection.query("SELECT coolness_points, name FROM coolness order by coolness_points desc;", function(err, result) {
    res.send(result);
  });
});

app.get('/:type', function(req, res) {
  connection.query("SELECT name FROM coolness WHERE attitude = '" + req.params.type + "';", function(err, result) {
    res.send(result);
  });
});

app.listen(PORT, function() {
  console.log("Listening at %s", PORT);
});