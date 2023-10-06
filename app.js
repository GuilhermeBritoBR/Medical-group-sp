
var express = require("express");
var mysql = require('mysql');
const app = express();
const port = 3000; 

app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html');

});
app.use(express.static(__dirname+'/'));

app.listen(port, () => {
console.log(`Servidor Express está rodando na porta ${port}`);
});

var con = mysql.createConnection({
    host: "localhost",
    user: "phpmyadmin",
    password: "flamengo"
  });
 

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});