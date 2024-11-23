function cadastrarUsuario() {
    const usuario = input_usuario.value;
    const email = input_email.value;
    const senha = input_senha.value;
    const confirmarSenha = input_confirmar_senha.value;

    const elemento = document.getElementById('div_erro')

    if (algumErro([usuario, email, senha, confirmarSenha], elemento)) {
      return 
    }

    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuarioServer: usuario,
        emailServer: email,
        senhaServer: senha,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          elemento.style.display = 'block'
          elemento.innerHTML = '<p>cadastro realizado com sucesso! <a href="login.html">vamos ao login?</a></p>'

        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  }