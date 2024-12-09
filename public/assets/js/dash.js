obterDados()

function obterDados() {

    fetch(`/quiz/historico/${sessionStorage.ID_USUARIE}`, { cache: 'no-store' }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {

                plotarGraficoAcertos(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }

    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

    fetch(`/quiz/pontuacao/${sessionStorage.ID_USUARIE}`, { cache: 'no-store' }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {

                exibirKpisUsuarie(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
        
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function plotarGraficoAcertos(dados) {

    const qtdAcertos = [];
    const dias = [];

    if (dados != undefined) {
        for (var i = 0; i < dados.length; i++) {
            qtdAcertos.push(dados[i].qtdAcertos);
    
            const diaHoraFormatados = formatarDataHora(dados[i].dtPartida)
            dias.push(diaHoraFormatados);
        }
    } else {
        qtdAcertos.push(2, 4, 6, 7)
        dias.push(1, 2, 3, 4)
    }

    const elementoGrafico = document.getElementById('grafico_acertos').getContext('2d');    
    new Chart(elementoGrafico, {
        type: 'bar',
        
        data: {
            labels: dias,
            datasets: [{
                label: 'Acertos',
                data: qtdAcertos,
                backgroundColor: [
                    '#fec6ec',
                ],
                borderColor: [
                    '#f779ce',
                ],
                borderWidth: 1
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function formatarDataHora(textoData = '') {
    const camposData = ['', '', '', '', '']

    var posicaoCampo = 0
    for (
        var caracter = 0;
        caracter <= 15;
        caracter++
    ) {

        const atualSeparador = textoData[caracter] == '-' || textoData[caracter] == 'T' || textoData[caracter] == ':'
        if (atualSeparador) {
            posicaoCampo++
            caracter++
        }

        camposData[posicaoCampo] += textoData[caracter]
    }

    const dia = camposData[2]
    const mes = camposData[1]
    const ano = camposData[0]

    const hora = Number(camposData[3]) - 3
    const minutos = camposData[4]

    return `${dia}/${mes}/${ano} ${hora}:${minutos}`
}

function exibirKpisUsuarie(dados) {
    const realizados = dados[0].realizados
    const pontuacao = dados[0].pontuacao
    const perfeitos = dados[0].perfeitos

    const listaKpis = [realizados, pontuacao, perfeitos]
    exibirPosicoesCoincidentes(listaKpis, 'strong_kpi')
}