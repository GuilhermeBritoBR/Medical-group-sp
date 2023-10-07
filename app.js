
const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
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
  res.sendFile(__dirname + '/public/');
  
  });
  app.use(express.static('html'));
  app.use(express.static('css')); 


 app.use(express.static('html'));
 app.use(express.static('css')); 


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); 

///////////até aqui não remover é para a vizualição;

function cadastro(){

 
  return validação();
}
return cadastro();

//// conexão ativa 




  


