function algumErro(campos = [], elemento, operacao = '') {
    const descricaoErro = determinarErro(campos, operacao)

    if (descricaoErro != undefined) {
        elemento.style.display = 'block'
        elemento.innerHTML = descricaoErro
        return true
    }

    return false
}

function determinarErro(campos = [], operacao = 'cadastro') {
    if (algumCampoVazio(campos)) {
        return '<p>preencha todos os campos</p>'

    } else if (operacao == 'cadastro') {
        const usuario = campos[0]
        const email = campos[1]
        const senhas = [campos[2], campos[3]]

        if (usuarioEhCurto(usuario)) {
            return '<p>usuário muito curto</p>'
        } else if (emailEhInvalido(email)) {
            return '<p>e-mail inválido</p>'
        } else if (algumaSenhaInvalida(senhas)) {
            return
        }
    }

    return undefined
}

function algumCampoVazio(campos = []) {
    for (
        var posicao = 0;
        posicao < campos.length;
        posicao++
    ) {
        const campoAtual = campos[posicao]
        if (campoAtual == '') {
            return true
        }
    }

    return false
}

function usuarioEhCurto(usuario = '') {
    if (usuario.length < 2) {

        return true
    }

    return false
}

function emailEhInvalido(email = '') {
    for (
        var posicao = 0;
        posicao < email.length;
        posicao++
    ) {
        const letraAtual = email[posicao]
        if (letraAtual == '@') {
            return false
        }
    }

    return true
}

function algumaSenhaInvalida(senhas = []) {
    if (senhas[0] != senhas[1]) {

    }
}