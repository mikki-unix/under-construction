function exibirMultiplosItensElementos(lista = [], idElemento = '') {
    for (
        var posicao = 0;
        posicao < lista.length;
        posicao++
    ) {
        const conteudoPosicao = lista[posicao]
        const elemento = document.getElementById(`${idElemento}${posicao}`)

        elemento.innerText = conteudoPosicao
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