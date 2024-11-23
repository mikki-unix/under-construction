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

    exibirMultiplosItensElementos(listaNomes, 'span_nome')
    exibirMultiplosItensElementos(listaPontuacoes, 'span_pontuacao')
}