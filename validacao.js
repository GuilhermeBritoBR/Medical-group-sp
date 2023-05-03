
    function senha() {
        var dados ={
            'usuarios': ['cleuza@gmail.com'],
            'senha': ['mari123'],
            'cpf': ['23987144403'],
        }
        var senha = document.getElementById("senha");
    var users = document.getElementById("user");
    var cpfs = document.getElementById("cpf")
    if ( users.value == dados.usuarios[0])    
    if ( senha.value == dados.senha[0])
    if( cpfs.value == dados.cpf[0]) {
        window.location.assign("user.html");
        window.location.replace("user.html");
    } else{
        window.alert("Senha ou usuário incorretos");
    } else{
        window.alert("senha ou usuário incorretos");
    }
    else{
        window.alert("senha ou usuário incorretos");
    }
    }

