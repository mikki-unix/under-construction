function obterDados() {

    fetch(`/quiz/historico/${sessionStorage.ID_USUARIO}`, { cache: 'no-store' }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {

                plotarGrafico(resposta);
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

                gerarKpis(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
        
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

// Função para plotar o gráfico de barra
function plotarGrafico(dados) {

    const qtdAcertos = [];
    const dias = [];

    // Preenchendo os arrays com os dados
    for (var i = 0; i < dados.length; i++) {
        qtdAcertos.push(dados[i].qtdAcertos);

        const diaHoraFormatados = formatarDataHora(dados[i].dtPartida)
        dias.push(diaHoraFormatados);
    }

    // Capturando o elemento canvas pelo id 
    var ctx = document.getElementById('barra').getContext('2d');
    // Criando o gráfico de barra usando o Chart.js
    var myChart = new Chart(ctx, {
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
    });
}

function formatarDataHora(texto = '') {
    const camposData = ['', '', '', '', '']

    var posicaoCampo = 0
    for (
        var letra = 0;
        letra <= 15;
        letra++
    ) {

        const atualSeparador = texto[letra] == '-' || texto[letra] == 'T' || texto[letra] == ':'
        if (atualSeparador) {
            posicaoCampo++
            letra++
        }

        if (letra == 15) {
            console.log('eita!')
        }

        camposData[posicaoCampo] += texto[letra]
    }

    const dia = camposData[2]
    const mes = camposData[1]
    const ano = camposData[0]

    const hora = Number(camposData[3]) - 3
    const minutos = camposData[4]

    return `${dia}/${mes}/${ano} ${hora}:${minutos}`
}

function gerarKpis(dados) {
    const realizados = dados[0].realizados
    const pontuacao = dados[0].pontuacao
    const perfeitos = dados[0].perfeitos

    const listaKpis = [realizados, pontuacao, perfeitos]
    exibirMultiplosItensElementos(listaKpis, 'strong_kpi')
}