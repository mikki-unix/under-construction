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
                sessionStorage.ID_USUARIE = json.id;
                sessionStorage.NOME_USUARIE = json.nome;
                sessionStorage.IMAGEM_USUARIE = json.imagem
            });

            recarregarPaginaAtual()

        } else {
            console.log("Houve um erro ao tentar realizar o login!");
            console.log(resposta)
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}