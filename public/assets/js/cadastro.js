function exibirImagem() {
  label_exibicao.removeAttribute('style')

  const imagem = input_perfil.files[0]

  const leitor = new FileReader()

  leitor.onload = function (arquivo) {
    const base64Arquivo = arquivo.target.result

    label_exibicao.style.backgroundImage = `url(${base64Arquivo})`
  }

  leitor.readAsDataURL(imagem)
}

function cadastrarUsuario() {
  const imagem = input_perfil.files[0]
  const usuario = input_usuarie.value;
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

  fetch("/usuarie/cadastrar", {
    method: "POST",
    body: formCadastro
  })
    .then(function (resposta) {
      if (resposta.ok) {
        elemento.style.display = 'block'
        elemento.innerHTML = '<p>cadastro realizado com sucesso! <a href="login.html">vamos ao login?</a></p>'
      }
      
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}