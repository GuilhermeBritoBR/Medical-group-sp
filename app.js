
const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cadastration = require('./validation.js');
app.use(express.static('html'));
app.use(express.static('css'));


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/cadastrar', (req, res) => {
  const { email, senha } = req.body;
  const resultado = cadastration(email, senha);
  res.send(resultado);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  
  });
  


app.listen(3000);