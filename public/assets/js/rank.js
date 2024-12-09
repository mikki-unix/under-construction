obterPlacar()

function obterPlacar() {
    fetch('/quiz/ranquear', { cache: 'no-store' }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {

                exibirPlacar(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }

    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function exibirPlacar(dados) {
    const listaNomes = criarListaPorChave(dados, 'usuarie')
    const listaPontuacoes = criarListaPorChave(dados, 'pontuacao')
    const listaImagnes = criarListaPorChave(dados, 'imagem')

    exibirPosicoesCoincidentes(listaNomes, 'span_nome')
    exibirPosicoesCoincidentes(listaPontuacoes, 'span_pontuacao')
    exibirPosicoesCoincidentes(listaImagnes, 'div_perfil', 'perfil')
}