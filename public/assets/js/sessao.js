validarSessao()

function validarSessao() {
    if(sessionStorage.NOME_USUARIE) {
        section_sessao.style.display = 'none'

        span_nome_usuarie.innerText = sessionStorage.NOME_USUARIE

        const imagemUsuario = sessionStorage.IMAGEM_USUARIE
        const caminhoImagem = `url(assets/imgs/profile/${imagemUsuario})` 

        div_foto_perfil.style.backgroundImage = caminhoImagem

        section_usuarie.removeAttribute('style')
    }
}

function deslogar() {
    sessionStorage.clear()
    window.location = 'index.html'
}