function validacao() {
    var dados ={
        'usuarios': ['cleuza@gmail.com'],
        'senha': ['mari123'],
        'cpf': ['23987144403'],
    }
    localStorage.setItem("dados", dados)
    var user_save = toString(dados.usuarios[0]);
    var pass_save = toString(dados.senha[0]);
    localStorage.setItem("pass_save", pass_save);
    localStorage.setItem("user_save", user_save);
    var senha = document.getElementById("senha");
var users = document.getElementById("email");
if ( users.value == dados.usuarios[0])    
if ( senha.value == dados.senha[0])
 {window.location.assign("user.html");
    window.location.replace("user.html");
} else{
    window.alert("Senha ou usuário incorretos");
} else{
    window.alert("senha ou usuário incorretos");
}
}
function consulta()    {
    var paciente = document.getElementById("paciente").value;
    var dor = document.getElementById("dor").value;
    var dia = document.getElementById("dia").value;
    var especialidade = document.getElementById("especialidade").value;
    var marcou = "Você marcou uma consulta no dia " + dia + "com a " + especialidade + "!";
    window.alert("Você marcou uma consulta no dia " + dia + "com a " + especialidade + "!");
    localStorage.setItem("marcou", marcou);
    localStorage.setItem('dia', dia);
   localStorage.setItem('paciente', paciente);
    localStorage.setItem('dor', dor);
  localStorage.setItem('especialidade', especialidade);
    
    }

    function vil()  {
        
        window.alert("Veja as consultas marcadas!");
        var paciente = localStorage.getItem("paciente");
        var dor = localStorage.getItem("dor");
        var especialidade = localStorage.getItem("especialidade");
        var dia = localStorage.getItem("dia");
        var resultadotext = 'O ' + paciente + ' marcou consulta no dia ' + dia + " com a " + especialidade + ' por estar com ' + dor;
      var resultado = document.getElementById("resultado_consulta");
      resultado.innerText = resultadotext;
       
       
    }
    function marcar()  {
        var definidor = document.getElementById("definidor").value;
        localStorage.setItem("problema", definidor );
        window.alert("Seu diagnóstico foi salvo!");
    }
    function resultado()    {
        let problema = localStorage.getItem("problema");
        let print = document.getElementById("problema-resultado");
        let result = "Seu diagnóstico: " + problema;
        print.innerText = result;
    }
        function calendar()   {
            var marcou = localStorage.getItem("marcou");
            var text = document.getElementById("consulta1");
            text.innerText = marcou;



        }
        function admin()  {
            let nome_text = document.getElementById("user_print");
            let senha_text = document.getElementById("senha_print");
            let user = localStorage.getItem("user_save");
            let pass = localStorage.getItem("pass_save");
            let result_user = "o/a " + user + " "+ pass;
            nome_text.innerText= result_user;
            document.getElementById("user_print").innerText= result_user;
            
        }
