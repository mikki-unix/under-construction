function logarUsuario() {
    const usuario = input_usuario.value;
    const senha = input_senha.value;

    const elemento = document.getElementById('span_erro')

    if (algumErro([usuario, senha], elemento, 'login')) {
        return
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuarioServer: usuario,
            senhaServer: senha
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json); ''
                console.log(JSON.stringify(json));
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.IMAGEM_USUARIO = json.imagem
            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}