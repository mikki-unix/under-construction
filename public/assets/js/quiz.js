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


var qtdAcertos = 0;

function comecarQuiz() {
    qtdAcertos = 0

    article_instrucoes.style.display == '' ? article_instrucoes.style.display = 'none' : article_relatorio.style.display = 'none' 
    
    criarCheckListPerguntas()
    sortearPergunta()
    
    article_quiz.style.display = ''
}

const checkListPerguntas = []
function criarCheckListPerguntas() {
    for (
        var numeroPergunta = 0; 
        numeroPergunta < perguntas.length;
        numeroPergunta++
    ) {
        checkListPerguntas.push(numeroPergunta)
    }
}

var qtdQuestoes = 0
function sortearPergunta() {
    if (checkListPerguntas.length == 0) {
        return terminarQuiz()
    }

    const posicaoPergunta = parseInt(Math.random() * checkListPerguntas.length)

    const enunciadoPergunta = perguntas[checkListPerguntas[posicaoPergunta]].enunciado

    checkListPerguntas.splice(posicaoPergunta, 1)

    span_enunciado.innerText = enunciadoPergunta

    qtdQuestoes++
    strong_numero_pergunta.innerText = qtdQuestoes + '.'

    sortearAlternativas(posicaoPergunta)
}

function sortearAlternativas(posicaoPergunta) {
    const checkListSpan = [0, 1, 2]
    const checklistTextoAlternativa = [0, 1, 2]

    for (
        var numeroAlternativa = 0;
        numeroAlternativa <= 2;
        numeroAlternativa++ 
    ) {
        const numeroAleatorioSpan = parseInt(Math.random() * checkListSpan.length)
        
        const spanSelecionado = document.getElementById(`span_texto_alternativa${checkListSpan[numeroAleatorioSpan]}`)
        const btnSelecionado = document.getElementById(`btn_alternativa${checkListSpan[numeroAleatorioSpan]}`)
        
        checkListSpan.splice(numeroAleatorioSpan, 1)

        const numeroAleatorioTexto = parseInt(Math.random() * checklistTextoAlternativa.length)
        spanSelecionado.innerText = perguntas[posicaoPergunta].alternativas[checklistTextoAlternativa[numeroAleatorioTexto]]
        
        if (checklistTextoAlternativa[numeroAleatorioTexto] == 0) {
            btnSelecionado.setAttribute('name', 'correta')
        } else {
            btnSelecionado.setAttribute('name', 'incorreta')
        }

        checklistTextoAlternativa.splice(numeroAleatorioTexto, 1)
    }
}

function verificarResposta(numero = '') {
    const alternativa = document.getElementById(`btn_alternativa${numero}`)

    const nameAlternativa = alternativa.getAttribute('name')
    const imgAlternativa = document.getElementById(`img_alternativa${numero}`)

    if (nameAlternativa == 'correta') {
        alternativa.classList.toggle(nameAlternativa)
        imgAlternativa.setAttribute('src', 'assets/icons/check.svg')

        qtdAcertos++
    } else {
        alternativa.classList.toggle(nameAlternativa)
        imgAlternativa.setAttribute('src', 'assets/icons/cross.svg')
    }

    setTimeout(function () {
        alternativa.classList.toggle(nameAlternativa)
        imgAlternativa.removeAttribute('src')

        sortearPergunta()
    }, 2000)
}

function terminarQuiz() {
   article_quiz.style.display = 'none'

    span_n_acertos.innerText = qtdAcertos
    span_n_questoes.innerText = qtdQuestoes

   article_relatorio.style.display = ''
}