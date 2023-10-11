
const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
const port = 7000;
//const cadastro = require('./cad.js');
//aqui faz a conexão com o sistema de validação!

/////////////////////////////////////////



////////////////////////////////////////
const db = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'flamengo',
  database: 'db',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  }
});
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});

////////////////////////////////////
app.use(express.static('views'));
app.use(express.static('html'));
app.use(express.static('public'));
app.use(express.urlencoded( {extended: true }));
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
  app.use(express.static('views'));
});



///////////até aqui não remover é para a vizualição;

app.get('/',(req, res) => {
  res.render('cadastro');
  
  });

//rota para a pagina de cadastro
app.get('/cadastro',(req, res) => {
res.render('cadastro');
});

app.get('/login', (req, res) => {
res.render('login'); 
app.use(express.static('views'));

});

app.get('/user', (req, res) => {
  res.render('user'); 
  app.use(express.static('views'));
  ras.render('styles.css');
  });
  


// Rota de cadastro
app.post('/cadastro', (req, res) => {
  const { nome, senha, email } = req.body;
  const query = 'INSERT INTO tabela (nome, senha, email) VALUES (?, ?, ?)';
  db.query(query, [nome, senha, email], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar o usuário:', err);
      res.status(500).send('Erro ao cadastrar o usuário.');
    } else {
      console.log('Usuário cadastrado com sucesso!');
      res.status(200).send('Usuário cadastrado com sucesso.');
    }
  });
});

app.get('/views/user', (req, res) => {
  res.render('user');
  
});
//login


app.get('/login', (req, res) => {
    res.render('login');
  });
  
  app.post('/login', (req, res) => {
    const { nome, senha } = req.body;
    const query = 'SELECT * FROM tabela WHERE nome = ? AND senha = ?';
    
    db.query(query, [nome, senha], (err, result) => {
      if (err) {
        console.error('Erro ao verificar o login:', err);
        res.status(500).send('Erro ao verificar o login.');
      } else if (result.length > 0) {
        
        console.log('Login bem-sucedido!');
        
        res.redirect('/user');
      } else {
        console.log('Credenciais inválidas');
        res.status(401).send('Credenciais inválidas.');
      }
    });
  });
 
  app.get('/views/login', (req, res) => {
    res.render('login');
    ras.render();
  });
 
  app.get('/hrefcadastro', (req, res) => {
    res.render('cadastro');
    ras.render();
  });
