const perguntas = [
    {
        enunciado: 'Quem introduziu o termo gênero?',
        alternativas: ['John Money', 'Robert Stoller', 'Simone de Beauvoir']
    },

    {
        enunciado: 'Quem fez a primeira distinção entre o social e o biológico?',
        alternativas: ['Simone de Beauvoir', 'John Money', 'Robert Stoller']
    },

    {
        enunciado: 'O que melhor define gênero?',
        alternativas: ['papel social', 'biologia', 'atração']
    },

    {
        enunciado: 'O que melhor define uma identidade de gênero?',
        alternativas: ['sentimento interno de gênero', 'expectativa alheia', 'atribuição ao nascer']
    },

    {
        enunciado: 'Qual característica melhor descreve o gênero na teoria do espectro?',
        alternativas: ['bimodal', 'binário', 'unitário']
    },

    {
        enunciado: 'O gênero pode ser considerado...',
        alternativas: ['mutável e ilimitado', 'fixo e binário', 'atribuição alheia']
    },

    {
        enunciado: 'Qual a relação do gênero de uma pessoa transgênero?',
        alternativas: ['difere do designado', 'igual ao atribuído', 'igual ao sexo']
    },

    {
        enunciado: 'Como é o processo de transição de gênero?',
        alternativas: ['pode diferir por pessoa', 'padrão fixo', 'cirúrgico']
    },

    {
        enunciado: `Termo que define "desconforto pela incongruência entre a identidade de gênero e o gênero designado a pessoa"`,
        alternativas: ['disforia de gênero', 'euforia de gênero', 'transgeneridade']
    },

    {
        enunciado: 'O que é euforia de gênero?',
        alternativas: ['conforto com a identidade de gênero', 'desconforto com o corpo', 'desconforto com o gênero']
    }
]

var qtdAcertos = 0;
var qtdQuestoes = 0

function comecarQuiz() {
    qtdAcertos = 0
    qtdQuestoes = 0

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

function sortearPergunta() {
    if (checkListPerguntas.length == 0) {
        return terminarQuiz()
    }

    const posicaoAleatoriaChecklist = parseInt(Math.random() * checkListPerguntas.length)
    const numeroPergunta = [checkListPerguntas[posicaoAleatoriaChecklist]]

    checkListPerguntas.splice(posicaoAleatoriaChecklist, 1)

    const enunciadoPergunta = perguntas[numeroPergunta].enunciado    
    span_enunciado.innerText = enunciadoPergunta
    
    qtdQuestoes++
    strong_numero_pergunta.innerText = qtdQuestoes + '.'
    
    sortearAlternativas(numeroPergunta)
}

function sortearAlternativas(numeroPergunta) {
    const checklistSpan = [0, 1, 2]
    const checklistAlternativas = [0, 1, 2]

    for (
        var numeroAlternativa = 0;
        numeroAlternativa <= 2;
        numeroAlternativa++
    ) {
        const numeroAleatorioSpan = parseInt(Math.random() * checklistSpan.length)
        const numeroSpan = checklistSpan[numeroAleatorioSpan]

        checklistSpan.splice(numeroAleatorioSpan, 1)

        const spanSelecionado = document.getElementById(`span_texto_alternativa${numeroSpan}`)
        const btnSelecionado = document.getElementById(`btn_alternativa${numeroSpan}`)

        const numeroAleatorioAlternativa = parseInt(Math.random() * checklistAlternativas.length)
        const numeroAlternativa = checklistAlternativas[numeroAleatorioAlternativa]

        checklistAlternativas.splice(numeroAleatorioAlternativa, 1)

        const textoAlternativa = perguntas[numeroPergunta].alternativas[numeroAlternativa]
        spanSelecionado.innerText = textoAlternativa

        if (numeroAlternativa == 0) {
            btnSelecionado.setAttribute('name', 'correta')
        } else {
            btnSelecionado.setAttribute('name', 'incorreta')
        }
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

    registrar()
}

function registrar() {

    fetch("/quiz/registrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuarie: sessionStorage.ID_USUARIE,
            acertos: qtdAcertos
        }),
    })
        .then(function (resposta) {
            console.log("resposta do registro: ", resposta);
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}