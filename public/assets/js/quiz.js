var qtdAcertos = 0;

const perguntas = [
    {
        enunciado: 'Quem foi gege..?',
        alternativas: ['não sei', 'profissional', 'alguém']
    },
    {
        enunciado: 'Quem foi Gigi?',
        alternativas: ['professora', 'profissional', 'aluna']
    }
]

function sortearPergunta() {
    /* 
        Precisa de uma forma para aleatorizar a alternativa correta e sua posição, além de saber quais perguntas já foram feitas (pensei numa espécie de checklist).

        Depois terá um for que também sorteia onde colocará todas as alternativas e dará "names" para elas...
    */
}

function verificarResposta(numero = '') {
    const alternativa = document.getElementById(`btn_alternativa${numero}`)

    const nameAlternativa = alternativa.getAttribute('name')
    const imgAlternativa = document.getElementById(`img_alternativa${numero}`)

    if(nameAlternativa == 'correta') {
        alternativa.classList.toggle(nameAlternativa)
        imgAlternativa.setAttribute('src', 'assets/icons/check.svg')
    } else {
        alternativa.classList.toggle(nameAlternativa)
        imgAlternativa.setAttribute('src', 'assets/icons/cross.svg')
    }

    setTimeout(function() {
        alternativa.classList.toggle(nameAlternativa)
        imgAlternativa.removeAttribute('src')

        sortearPergunta()
    }, 2000)
}