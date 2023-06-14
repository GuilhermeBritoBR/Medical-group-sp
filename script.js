function validacao() {
    var dados ={
        'usuarios': ['cleuza@gmail.com', "admin"],
        'senha': ['mari', "admin"],
        'cpf': ['23987144403'],
    }
    localStorage.setItem("dados", dados);
    var senha = document.getElementById("senha");
var users = document.getElementById("email");
if ( users.value == dados.usuarios[0])    
if ( senha.value == dados.senha[0])
 {window.location.assign("user.html");
    window.location.replace("user.html");
    localStorage.setItem("user", users).value;
    localStorage.setItem("senha",  senha).value;
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
    var marcou = "Você marcou uma consulta no dia " + dia + " com a " + especialidade + "!";
    window.alert("Você marcou uma consulta no dia " + dia + " com a " + especialidade + "!");
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
        var resultadotext = 'O/A ' + paciente + ' marcou consulta no dia ' + dia + " com a " + especialidade + ' por estar com dor no ' + dor;
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
        
        function admin() {
            var dados ={
                'usuarios': ['cleuza@gmail.com'],
                'senha': ['mari'],
                'cpf': ['23987144403'],
            }
         var userPrint = document.getElementById("user_print");
         var senha_print = document.getElementById("senha_print");
         let senha = localStorage.getItem("senha");
         senha_print.textContent= "Senhas: " + dados.senha[0];
         var result_text = "Usuários: " + dados.usuarios[0];
         userPrint.textContent = result_text ;
        }
        
