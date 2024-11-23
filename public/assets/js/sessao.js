function validarSessao() {
    if(sessionStorage.length != 0) {
        span_nome_usuario.innerText = sessionStorage.NOME_USUARIO

        div_usuario.style.display = 'flex'
    }
}

function limparSessao() {
    sessionStorage.clear()
}