function obterDados() {

    fetch(`/quiz/historico/${sessionStorage.ID_USUARIO}`, { cache: 'no-store' }).then(function (response) {

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

    fetch(`/quiz/pontuacao/${sessionStorage.ID_USUARIO}`, { cache: 'no-store' }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {

                exibirKpisUsuario(resposta);
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
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
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

function exibirKpisUsuario(dados) {
    const realizados = dados[0].realizados
    const pontuacao = dados[0].pontuacao
    const perfeitos = dados[0].perfeitos

    const listaKpis = [realizados, pontuacao, perfeitos]
    exibirPosicoesCoincidentes(listaKpis, 'strong_kpi')
}