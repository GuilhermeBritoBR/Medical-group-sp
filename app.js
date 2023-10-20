
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
/* const agendamento = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'flamengo',
  database: 'internaldb'
}) */
/* agendamento.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  }
}); */
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
  res.render('styles.css');
  });
  
// Rota de cadastro e sistema de cadastramento funcional NÃO REMOVER ESSENCIAL
//lembrar que o DB QUERY só funciona se no HTML estiver sinalizado os marcadores <Name ="nome"> POR EXEMPLO
app.post('/cadastro', (req, res) => {
  const { nome, senha, email } = req.body;
  const query = 'INSERT INTO tabela (nome, senha, email, type) VALUES (?, ?, ? , "Leitor")';
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
app.get('/user', (req, res) => {
  res.render('user');
  
});
//login
//aqui serve para renderizar a pagina de login NÃO REMOVER, ESSENCIAL
app.get('/login', (req, res) => {
    res.render('login');
  });
  //rota para index do admin
  app.get('/index_admin',(req,res)=>{
    res.render('./admin/index.ejs');
  });
  app.post('/login', (req, res) => {
    const { nome, senha } = req.body;
    const query = 'SELECT * FROM tabela WHERE nome = ? AND senha = ?';
    
    db.query(query, [nome, senha], (err, result) => {
      if (err) {
          console.error('Erro ao verificar o login:', err);
          res.status(500).send('Erro ao verificar o login.');
      } else if (result.length > 0) {
          // O login foi bem-sucedido, obtenha o valor "type" do resultado.
          const userType = result[0].type;
          
          // Redirecione com base no valor de "type".
          switch (userType) {
              case 'Administrador':
                  res.redirect('/index_admin');
                  break;
              case 'Doctor':
                  res.redirect('/index_doctor');
                  break;
              default:
                  console.log('Tipo de usuário desconhecido');
                  res.redirect('/user');
                  break;
          }
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
    //appset caminho para a pasta admin
    
  //AQUI VOU INTRODUZIR SALVAMENTO DE INFORMAÇÕES validantion PELA users.ejs do admin
  //rota na qual vou introduzir EJS de agendamentos
  app.get('/administrador', (req, res) => {
    
    res.render('../views/admin/users');
    

  });
//rota que leva a página de vizualição
app.get('/view',(req,res)=>{
  res.render('./admin/vies.ejs');
})
//method que o ADMIN VIZUALIZA TUDO!!!!!!!!!!!!!!!!!
/* app.post('/viewadmin',(req,res)=>{
  var sql = 'SELECT * FROM tabela WHERE nome = ? AND senha = ? AND email = ? AND type = ?;';
  

  const nome = req.sql;
const senha = req.sql;
const email = req.sql;
const type = req.sql; 



res.render('admin/vies', { nome, senha, email, type });
console.log({ nome, senha, email, type }); 
}) */



db.connect();
app.get('/viewadmin', (req, res) => {
  db.query('SELECT nome , senha, email, type  FROM tabela', (err, rows) => {
      if (err) throw err;
      res.render('admin/vies', { data: rows });
  });
});






///////cadastro pelo adm
app.post('/cadadmin', (req, res) => {
  const { nome, senha, email, type } = req.body;
  const query = 'INSERT INTO tabela (nome, senha, email, type) VALUES (?, ?, ?, ?)';
  db.query(query, [nome, senha, email, type], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar o usuário:', err);
      res.status(500).send('Erro ao cadastrar o usuário.');
    } else {
      console.log('Usuário cadastrado com sucesso!');
      res.redirect('/administrador');
    }
  });
});
//rota pra controle do adm
app.get('/controle', (req,res)=>{
  res.render('admin/controle');
})

app.post('/controle', (req,res)=>{
  const sql = "SELECT nome, email, senha, types FROM tabela";
  const nome = results[0].nome;
  const email = results[0].email;
  const senha = results[0].senha;
  const types = results[0].types;

  

});
//SISTEMA DE DESCADRAMENTO
app.post('/descadadmin', (req, res) => {
  const { nome, senha, email, type } = req.body;
  const query = 'DELETE FROM tabela WHERE nome = ? AND senha = ? AND email = ? AND type = ?';
  db.query(query, [nome, senha, email, type], (err, result) => {
    if (err) {
      console.error('Erro ao deletar o usuário:', err);
      res.status(500).send('Erro ao deletar o usuário.');
    } else {
      console.log('Usuário deletado com sucesso!');
      res.redirect('/administrador');
    }
  })
});

//////////SISTEMA DE CONSULTAS MASTER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
