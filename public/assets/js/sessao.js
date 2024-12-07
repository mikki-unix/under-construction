function validarSessao() {
    if(sessionStorage.NOME_USUARIO != undefined) {
        section_sessao.style.display = 'none'

        span_nome_usuarie.innerText = sessionStorage.NOME_USUARIO

        const imagemUsuario = sessionStorage.IMAGEM_USUARIO
        const caminhoImagem = `url(assets/imgs/profile/${imagemUsuario})` 

        div_foto_perfil.style.backgroundImage = caminhoImagem

        section_usuarie.removeAttribute('style')
    }
}

function deslogarUsuario() {
    sessionStorage.clear()
    window.location = 'index.html'
}