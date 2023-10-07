
const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cadastro = require('./cad.js');
//aqui faz a conexão com o sistema de validação!
const validação = require('./validation.js');
/////////////////////////////////////////


////////////////////////////////////////
const db = mysql.createConnection({
  host: 'localhost', 
  user: 'phpmyadmin', 
  password: 'flamengo', 
  database: 'medical', 
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  }
});


app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});

////////////////////////////////////

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');

  });
  app.use(express.static('html'));
  app.use(express.static('css')); 

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); 

///////////até aqui não remover é para a vizualição;
var sql = "INSERT INTO validation (user, senha) VALUES (?, ?)";
app.post('/cadastro', (req, res) => {
  
  const { nome, senha } = req.body;

  db.query(sql, [nome, senha], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco de dados:', err);
      res.status(500).send('Erro ao cadastrar usuário.');
    } else {
      console.log('Usuário cadastrado com sucesso!');
      window.location.replace("user.html");
      res.status(200).send('Cadastro realizado com sucesso!');
    }
  });
});