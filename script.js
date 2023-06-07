function validacao() {
    var dados ={
        'usuarios': ['cleuza@gmail.com'],
        'senha': ['mari123'],
        'cpf': ['23987144403'],
    }
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
        var resultadotext = 'O ' + paciente + ' Marcou consulta no dia ' + dia + " com a " + especialidade + ' por estar com dor ' + dor;
      var resultado = document.getElementById("resultado_consulta");
      resultado.innerText = resultadotext;
       
       
    }
