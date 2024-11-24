function validarSessao() {
    if(sessionStorage.length != 0) {
        span_nome_usuario.innerText = sessionStorage.NOME_USUARIO

        const imagemUsuario = sessionStorage.IMAGEM_USUARIO
        const caminhoImagem = `url(assets/imgs/profile/${imagemUsuario})` 

        div_foto_perfil.style.backgroundImage = caminhoImagem

        div_usuario.style.display = 'flex'
    }
}

function limparSessao() {
    sessionStorage.clear()
}