
const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 7000;
//devo lembrar que o mysql deve ser sempre o 2, utilizar o maria db para manejamento de dados
//Grupo: Antunes, Brito, MATHEUS E MILENA
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

app.use(session({
  secret: 'flamengo',
  resave: false,
  saveUninitialized: true
}));
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
// app.get('/user', (req, res) => {
//   res.render('user2'); 
//   app.use(express.static('views'));
//   res.render('styles.css');
//   });
  
// Rota de cadastro e sistema de cadastramento funcional NÃO REMOVER ESSENCIAL
//lembrar que o DB QUERY só funciona se no HTML estiver sinalizado os marcadores <Name ="nome"> POR EXEMPLO
app.post('/cadastro', (req, res) => {
  const { nome, senha, email, cpf } = req.body;
  const query = 'INSERT INTO tabela (nome, senha, email, cpf, type) VALUES (?, ?, ? , ?, "Leitor")';
  db.query(query, [nome, senha, email, cpf], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar o usuário:', err);
      res.status(500).send('Erro ao cadastrar o usuário.');
      
    } else {
      const SQL = 'SELECT * FROM tabela WHERE nome = ? ';
      db.query(SQL, [nome], (err, result)=>{
        if(err){
          console.log('Erro no cadastro!');
          res.render('error')
        }else{
          console.log('Usuário cadastrado com sucesso!');
      res.render('user', {data:result});
        }
      })
      ;
      
    }
  });
});
//Aqui tambem para renderizar a userpage pós validação
app.get('/user', isUserAuthenticated ,(req, res) => {
  res.render('user2'),{data: req.session.user };
  
});

//login
//aqui serve para renderizar a pagina de login NÃO REMOVER, ESSENCIAL
app.get('/login', (req, res) => {
    res.render('login');
  });
  //rota para index do admin

 

  app.get('/index_admin', isAuthenticated,(req,res)=>{
    
    res.render('./admin/index2.ejs', { data: req.session.user });
  });
  //rota para voltar para index do adm

  app.get('/index_admin_volta',isAuthenticated,(req,res)=>{
    res.render('./admin/index2.ejs',{ data: req.session.user } );
  });
  ////////
// Rota para fazer logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
    console.log('Desconectado')
  });
});
////////////

// Middleware de autenticação
function isAuthenticated(req, res, next) {
  // Verifique se a sessão contém informações do usuário
  if (req.session && req.session.user && req.session.user.tipo.toLowerCase() === 'administrador')  {
      return next();
  } else {
      // Redirecione para a página de login se não estiver autenticado
      res.redirect('/login');
  }
}
function isDoctorAuthenticated(req, res, next) {
  // Verifique se a sessão contém informações do usuário
  if (req.session && req.session.user && req.session.user.tipo.toLowerCase() === 'doutor')  {
      return next();
  } else {
      // Redirecione para a página de login se não estiver autenticado
      res.redirect('/login');
  }
}

function isUserAuthenticated(req, res, next) {
  const userSession = req.session.user;
  if (userSession && userSession.tipo.toLowerCase() === 'leitor') {
      return next();
  } else {
      res.redirect('/login');
  }
}
app.use('/user', isUserAuthenticated);
app.use('/index_admin', isAuthenticated);
// Use o middleware para proteger rotas administrativas

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
    console.log('Desconectado')
  });
});


  app.post('/login', (req, res) => {
    const { nome, senha } = req.body;
    const query = 'SELECT * FROM tabela WHERE nome = ? AND senha = ?';
    
    db.query(query, [nome, senha], (err, result) => {
      if (err) {
          console.error('Erro ao verificar o login:', err);
          
          res.redirect('login', Error);
      } else if (result.length > 0) {
          // O login foi bem-sucedido, obtenha o valor "type" do resultado.
         
            // Autenticação bem-sucedida
       
          const userType = result[0].type;
          
          req.session.user = {
            nome: result[0].nome,
            tipo: userType
            // Adicione outras informações necessárias
        };



          // Redirecione com base no valor de "type".
          switch (userType.toLowerCase()) {
              case 'administrador':
                  res.render('admin/index', {data:result});
                  break;
              case 'doutor':
                  res.render('doctor/index', {data:result});
                  break;
              case 'leitor':
                  console.log('Tipo de usuário desconhecido');
                  res.render('user', {data:result});
                  break;
          }
      } else {
          console.log('Credenciais inválidas');
          
          res.render('error')
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
  app.get('/administrador',isAuthenticated, (req, res) => {
    
    res.render('../views/admin/users'), { data: req.session.user };
    

  });
  
//rota que leva a página de vizualição
app.get('/view',(req,res)=>{
  res.render('./admin/vies.ejs');
})




db.connect();
app.get('/viewadmin',isAuthenticated, (req, res) => {
  db.query('SELECT nome , senha, email, type, cpf  FROM tabela', (err, rows) => {
      if (err) throw err;
      res.render('admin/vies', { data: req.session.user,data: rows });
  });
});







///////cadastro pelo adm
app.post('/cadadmin', (req, res) => {
  const { nome, senha, email, type, cpf } = req.body;
/*   "INSERT INTO tabela (nome, senha, email, type) VALUES (?,?,?, SHA2(?,256))"; */
  const query = "INSERT INTO tabela (nome, senha, email, type, cpf) VALUES (?,?,?,?,?)";
  db.query(query, [nome, senha, email, type, cpf], (err, result) => {
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
  const { nome, senha, email, type, cpf } = req.body;
  const query = 'DELETE FROM tabela WHERE nome = ? AND senha = ? AND email = ? AND type = ? AND cpf = ?';
  db.query(query, [nome, senha, email, type, cpf], (err, result) => {
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
//OUTRO BANCO DE DADOS COM NOVA CONEXÃO
const interno = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'flamengo',
  database: 'Interno',
});
//sem o db conect, o servidor não é ativado, lembrar-se 
interno.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados INTERNO estabelecida com sucesso!');
  }
});
//vamos la, vou capturar os dados de agendamento do paciente
//rota para isso
app.get('/agendamento', isUserAuthenticated,(req,res)=>{
  res.render('./agendamento', {data: req.session.user} );
});
app.post('/consulta',(req,res)=>{
  const { nome, idade, especialidade, motivo , dia , hora, deficiencia } = req.body;
  const query = 'INSERT INTO Pacientes (nome, idade, especialidade, motivo, dia, hora, deficiencia) VALUES (?, ?, ?, ? , ? , ?, ?)';
  interno.query(query, [nome, idade, especialidade, motivo, dia, hora, deficiencia], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar consulta:', err);
      res.status(500).send('Erro ao cadastrar consulta.');
    } else {
      console.log('Consulta cadastrada com sucesso!');
      res.redirect('/agendamento');
    }
  })
})
///rota para consultas do lado do médico
app.get('/agendamentorota',(req,res)=>{
  res.render('doctor/consultas');
});
///vizualização das consultas
interno.connect();
app.get('/agendamentoview', (req, res) => {
  interno.query('SELECT nome , idade, especialidade, motivo, dia, hora, deficiencia  FROM Pacientes', (err, rows) => {
      if (err) throw err;
      res.render('doctor/consultas', {data: req.session.user ,data: rows });
      
  });
});



//////////////////////////////////
////ROTAS!!!!!!!!!!!!!!!!
//rota de user para ver consultas marcadas
/* app.get('/consultas',(req,res)=>{
  res.render('./consultas');
}); */
///rota para consultas do adm
app.get('/consultashtml', isAuthenticated,(req, res) => {
  interno.query('SELECT nome , idade, especialidade, motivo, dia, hora, deficiencia  FROM Pacientes', (err, rows) => {
      if (err) throw err;
      res.render('admin/consultas', { data: req.session.user ,  data: rows });
      
  });
});

///rota para medicos
app.get('/index_doctor',isDoctorAuthenticated, (req,res)=>{
  res.render('doctor/index2', { data: req.session.user });
});
//sistema para o usuário vizualizar suas própias consultas
interno.connect();
app.get('/consultas', (req, res) => {
  interno.query('SELECT nome , idade, especialidade, motivo, dia, hora, deficiencia  FROM Pacientes', (err, rows) => {
      if (err) throw err;
      res.render('consultas', { data: rows });
  });
});
//rota para ir para a página que seleciona a consulta
app.get('/selectconsultas',isUserAuthenticated,(req,res)=>{
  res.render('select_consulta', {data: req.session.user });

});
app.post('/select',isUserAuthenticated,(req,res)=>{
 const{nome} = req.body;
 const SQL = 'SELECT * FROM Pacientes WHERE nome = ?';
 interno.query(SQL, [nome] ,(err,result)=>{
  if(err){
    console.error('Erro ao verificar o login:', err);
    res.status(500).send('Erro ao verificar.');
  }else{
    const query = 'SELECT * FROM Pacientes WHERE nome = ?';
    interno.query(query, [nome ], (err,row)=>{
      if(err)throw err;
      console.log(row)
      res.render('consultas.ejs',{data: req.session.user ,dados: row});
  });
    
  }
  
 })
});
//rota para ir para resultados do médico no DOCTOR!!!!!!!!!!!!!!!
app.get('/resultados_doctor',(req,res)=>{
  res.render('doctor/resultados_doctor');
});



///rota para acessar exames do médico
app.get('/exames_doctor', isDoctorAuthenticated,(req,res)=>{
  res.render('doctor/exames', {data: req.session.user});
})
app.post('/system_exames',(req,res)=>{
  const SQL = 'INSERT into Exames (nome, type , data, horas, obs) VALUES (?,?,?,?,?);';
  const {nome,type,data,horas,obs} = req.body;
  console.log({nome,type,data,horas,obs});
  interno.query(SQL, [nome, type,data,horas,obs], (err,result)=>{
  if(err){
    console.log("Erro em inserir dados de exame!", err);
    res.sendStatus(251),("Erro ao inserir dados de exame!");
  }else{
    res.redirect('/index_doctor');
  }
  
  
  }) 
});
///rota para levar para a página de exames do usuário!!!!!!!!!!!!!!!!!
app.get('/exames_user',(req,res)=>{
  res.render('select-user');
});
///sistema para vizualizar os exames pelo usuário
app.post('/select_user_exame',(req,res)=>{
  const SQL = 'SELECT * FROM Exames WHERE nome = ?';
  const {nome} =req.body;
  interno.query(SQL,[nome],(err,result)=>{
    if(err){
      console.log("erro ao selecionar nome ");
      res.sendStatus(251, "Nome não existente!");
    }else{
      const query = 'SELECT * FROM Exames WHERE nome =  ?';
      interno.query(SQL, [nome], (err,row)=>{
        if(err)throw err;
        console.log(row);
        res.render('exames-user.ejs',{data: row})});
     
      
    }
  })
});
//rota para página de exames do usuario
app.get('/exames-user',(req,res)=>{
  res.render('exames-user');
});
app.get('/back',(req,res)=>{

  res.sendfile('../index.html');
});
//rota para chegar na página de buscar exames
app.get('/result_exames',isUserAuthenticated,(req,res)=>{
  res.render('resultados', {data: req.session.user });
});
app.post('/definir_exames',isUserAuthenticated,(req,res)=>{
  const SQL = 'SELECT * FROM Exames WHERE nome = ?';
  const {nome} =req.body;
  interno.query(SQL,[nome],(err,result)=>{
    if(err){
      console.log("erro ao selecionar nome ");
      res.sendStatus(251, "Nome não existente!");
    }else{
      const query = 'SELECT * FROM Exames WHERE nome =  ?';
      interno.query(SQL, [nome], (err,row)=>{
        if(err)throw err;
        console.log(row);
        res.render('result_user.ejs',{data: req.session.user ,data: row})});
     
      
    }
  })
});

app.get('/view_exames_all', isDoctorAuthenticated,(req,res)=>{
  const SQL = 'SELECT * FROM Exames ';
  interno.query(SQL,(err,row)=>{
    if(err)throw err;
    console.log(row);
    res.render('doctor/resultados_doctor', {data: req.session.user , data:row});
  })
})
app.get('/planos_user', isUserAuthenticated,(req,res)=>{
  res.render('planos-user', {data: req.session.user });
})