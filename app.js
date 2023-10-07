
const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
//const cadastro = require('./cad.js');
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
app.use(express.static('html'));
app.use(express.static('css'));
app.use(express.static('public'));
app.use(express.urlencoded( {extended: true }));
//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

///////////até aqui não remover é para a vizualição;
var sql = "INSERT INTO validation ( user, senha ) VALUES (?, ?)";
app.post('/cadastro', (req, res) => {

  const { nome, senha } = req.body;
  console.log(`Nome: ${nome}\nSenha: ${senha}`)
  db.query(sql, [nome, senha], (err, result) => {
    console.log(req.body);
    if (err) {
      console.error('Erro ao inserir dados no banco de dados:', err);
      res.status(500).send('Erro ao cadastrar usuário.');
    } else {
      console.log('Usuário cadastrado com sucesso!');
      res.redirect("/user.html"); // Redireciona o cliente para user.html
    }
  });
});