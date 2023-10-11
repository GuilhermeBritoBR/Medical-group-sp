
const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
const port = 7000;
//devo lembrar que o mysql deve ser sempre o 2, utilizar o maria db para manejamento de dados

//este database serve para a validação e cadastro do usuario
const db = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'flamengo',
  database: 'db',
});
//sem o db conect, o servidor não é ativado, lembrar-se 
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  }
});
//bom este database serve para conexões internas, como exemp, o agendamento e exames
const agendamento = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'flamengo',
  database: 'internaldb'
})
agendamento.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  }
});
//esta parte serve para vizualizar os arquivos extensionados em .ejs, sem isso não nada funciona !!!!!!!!
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});

//para o server vizualizar as páginas em .HTML
app.use(express.static('views'));
app.use(express.static('html'));
app.use(express.static('public'));
//tambem para carregar arquivos dentro da pasta que não é public e sim views

//aqui as configurações das extensões essencias para o servidor
app.use(express.urlencoded( {extended: true }));
app.use(express.json());


//lembrar que o app.get ser para carregar coisas ou criar rotas em href nos html <a href="/cadastrohref"> POR EXEMPLO
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
  app.use(express.static('views'));
});

///////////até aqui não remover é para a vizualição;
////vizualização do cadastro
app.get('/',(req, res) => {
  res.render('cadastro');
  
  });

//rota para a pagina de cadastro
app.get('/cadastro',(req, res) => {
res.render('cadastro');
});
//rota para a pagina de login
app.get('/login', (req, res) => {
res.render('login'); 
app.use(express.static('views'));

});
//rota do href da pagina de login e cadastro pós validado para a de usuário
app.get('/user', (req, res) => {
  res.render('user'); 
  app.use(express.static('views'));
  ras.render('styles.css');
  });
  
// Rota de cadastro e sistema de cadastramento funcional NÃO REMOVER ESSENCIAL
//lembrar que o DB QUERY só funciona se no HTML estiver sinalizado os marcadores <Name ="nome"> POR EXEMPLO
app.post('/cadastro', (req, res) => {
  const { nome, senha, email } = req.body;
  const query = 'INSERT INTO tabela (nome, senha, email) VALUES (?, ?, ?)';
  db.query(query, [nome, senha, email], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar o usuário:', err);
      res.status(500).send('Erro ao cadastrar o usuário.');
    } else {
      res.redirect('/user');
      console.log('Usuário cadastrado com sucesso!');
      
    }
  });
});
//Aqui tambem para renderizar a userpage pós validação
app.get('/views/user', (req, res) => {
  res.render('user');
  
});
//login
//aqui serve para renderizar a pagina de login NÃO REMOVER, ESSENCIAL
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
 //AQUI TAMBEM server para carregar pagina de login
  app.get('/views/login', (req, res) => {
    res.render('login');
    ras.render();
  });
 //aqui é o HREF CADASTRO que liga a pagina inicial a pagina de cadastro
  app.get('/hrefcadastro', (req, res) => {
    res.render('cadastro');
  
  });
