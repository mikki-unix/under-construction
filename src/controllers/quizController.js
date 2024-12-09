const quizModel = require("../models/quizModel");

function registrar(req, res) {
    const idUsuarie = req.body.idUsuarie;
    const acertos = req.body.acertos;

    var idQuiz = 0

    quizModel.contarRealizados(idUsuarie).then(function (resultado) {
        idQuiz = resultado[0].qtdRealizados + 1
        console.log('\nBaseado no result do MySQL, o id deste quiz será ' + idQuiz + '\n')
    }
    ).catch(
        function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    );

    setTimeout(function () {
        quizModel.registrar(idQuiz, idUsuarie, acertos).then(function (resultado) {
            res.json(resultado);
        }
        ).catch(
            function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }, 1000)

}

function obterHistoricoUsuarie(req, res) {
    const idUsuario = req.params.idUsuarie

    quizModel.obterHistoricoUsuarie(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterPontuacaoUsuarie(req, res) {
    const idUsuarie = req.params.idUsuarie

    quizModel.obterPontuacaoUsuarie(idUsuarie).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterPlacar(req, res) {
    quizModel.obterPlacar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    registrar,
    obterHistoricoUsuarie,
    obterPontuacaoUsuarie,
    obterPlacar
}