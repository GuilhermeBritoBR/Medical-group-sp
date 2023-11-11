
const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
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
  res.render('user2'); 
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
      const SQL = 'SELECT * FROM tabela WHERE nome = ? ';
      db.query(SQL, [nome], (err, result)=>{
        if(err){
          console.log('Erro no cadastro!');
          res.status(500).send('Erro ao cadastrar o usuário.');
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
app.get('/user', (req, res) => {
  res.render('user2');
  
});
//login
//aqui serve para renderizar a pagina de login NÃO REMOVER, ESSENCIAL
app.get('/login', (req, res) => {
    res.render('login');
  });
  //rota para index do admin
  app.get('/index_admin',(req,res)=>{
    res.render('./admin/index2.ejs');
  });
  //rota para voltar para index do adm

  app.get('/index_admin_volta',(req,res)=>{
    res.render('./admin/index2.ejs');
  });
  ////////
  app.post('/login', (req, res) => {
    const { nome, senha } = req.body;
    const query = 'SELECT * FROM tabela WHERE nome = ? AND senha = ?';
    
    db.query(query, [nome, senha], (err, result) => {
      if (err) {
          console.error('Erro ao verificar o login:', err);
          
          res.redirect('login', Error);
      } else if (result.length > 0) {
          // O login foi bem-sucedido, obtenha o valor "type" do resultado.
          const userType = result[0].type;
          
          // Redirecione com base no valor de "type".
          switch (userType) {
              case 'Administrador':
                  res.render('admin/index', {data:result});
                  break;
              case 'Doutor':
                  res.render('doctor/index', {data:result});
                  break;
              default:
                  console.log('Tipo de usuário desconhecido');
                  res.render('user', {data:result});
                  break;
          }
      } else {
          console.log('Credenciais inválidas');
          
          res.status(401).send('Credenciais inválidas');
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
  const query = "INSERT INTO tabela (nome, senha, email, type) VALUES (?,?,?, SHA2(?,256))";
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
app.get('/agendamento',(req,res)=>{
  res.render('./agendamento');
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
      res.render('doctor/consultas', { data: rows });
      
  });
});



//////////////////////////////////
////ROTAS!!!!!!!!!!!!!!!!
//rota de user para ver consultas marcadas
/* app.get('/consultas',(req,res)=>{
  res.render('./consultas');
}); */
///rota para consultas do adm
app.get('/consultashtml', (req, res) => {
  interno.query('SELECT nome , idade, especialidade, motivo, dia, hora, deficiencia  FROM Pacientes', (err, rows) => {
      if (err) throw err;
      res.render('admin/consultas', { data: rows });
      
  });
});
app.get('/consultashtml',(req,res)=>{
  res.render('admin/consultas');
});
///rota para medicos
app.get('/index_doctor',(req,res)=>{
  res.render('doctor/index2');
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
app.get('/selectconsultas',(req,res)=>{
  res.render('select_consulta');

});
app.post('/select',(req,res)=>{
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
      res.render('consultas.ejs',{dados: row});
  });
    
  }
  
 })
});
//rota para ir para resultados do médico no DOCTOR!!!!!!!!!!!!!!!
app.get('/resultados_doctor',(req,res)=>{
  res.render('doctor/resultados_doctor');
});



///rota para acessar exames do médico
app.get('/exames_doctor',(req,res)=>{
  res.render('doctor/exames');
})
app.post('/system_exames',(req,res)=>{
  const SQL = 'INSERT into Exames (nome, type , data, horas, obs) VALUES (?,?,?,?,?);';
  const {nome,type,data,horas,obs} = req.body;
  console.log({nome,type,data,horas,obs});
  interno.query(SQL, [nome, type,data,horas,obs], (err,result)=>{
  if(err){
    console.log("Erro em inserir dados de exame!");
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
app.get('/result_exames',(req,res)=>{
  res.render('resultados');
});
app.post('/definir_exames',(req,res)=>{
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
        res.render('result_user.ejs',{data: row})});
     
      
    }
  })
});

app.get('/view_exames_all', (err,res)=>{
  const SQL = 'SELECT * FROM Exames ';
  interno.query(SQL,(err,row)=>{
    if(err)throw err;
    console.log(row);
    res.render('doctor/resultados_doctor', {data:row});
  })
})
