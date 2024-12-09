function abrirFecharMenu(nomeMenu = '') {
    const elemento = document.getElementById(`aside_menu_${nomeMenu}`) 

    elemento.style.display = elemento.style.display == 'none' ? '' : 'none'
}

function recarregarPaginaAtual() {
    window.location = window.location
}

function exibirPosicoesCoincidentes(lista = [], idElemento = '', operacao = '') {
    for (
        var posicao = 0;
        posicao < lista.length;
        posicao++
    ) {
        const conteudoLista = lista[posicao]
        const elemento = document.getElementById(`${idElemento}${posicao}`)

        if (operacao == 'perfil') {
            elemento.style.backgroundImage = `url(assets/imgs/profile/${conteudoLista})`
        } else {
            elemento.innerText = conteudoLista
        }
    }
}

function criarListaPorChave(listaJsons = [{nome: 'Maça'}, {nome: 'Banana'}], chave = 'nome') {
    const novaLista = []

    listaJsons.forEach(objeto => {
        const conteudoChave = objeto[chave]
        
        novaLista.push(conteudoChave)
    });

    return novaLista
}