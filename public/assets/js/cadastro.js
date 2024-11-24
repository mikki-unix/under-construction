function exibirImagem() {
  label_exibicao.removeAttribute('style')

  const imagem = input_upload.files[0]

  const leitor = new FileReader() // estabelece a conexão com a API nativa do JS

  // "onload" é necessário para que a função abaixo só seja executada depois que o arquivo seja lido
  leitor.onload = function (arquivo) { // "arquivo" é a imagem que será passada
    const base64Arquivo = arquivo.target.result // como é uma File, ela tem propriedades específicas. o target.result é justamente uma URL base64

    label_exibicao.style.backgroundImage = `url(${base64Arquivo})` // exibindo na label
  }

  leitor.readAsDataURL(imagem) // chama a função
}

function cadastrarUsuario() {
  const imagem = input_imagem.files[0]
  const usuario = input_usuario.value;
  const email = input_email.value;
  const senha = input_senha.value;
  const confirmarSenha = input_confirmar_senha.value;

  const elemento = document.getElementById('span_erro')

  if (algumErro([usuario, email, senha, confirmarSenha], elemento)) {
    return
  }

  const formCadastro = new FormData();
    formCadastro.append('imagem', imagem)
    formCadastro.append('usuario', usuario)
    formCadastro.append('email', email)
    formCadastro.append('senha', senha)

  fetch("/usuarios/cadastrar", {
    method: "POST",
    body: formCadastro
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