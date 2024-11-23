const quizModel = require("../models/quizModel");

function registrar(req, res) {
    const idUsuario = req.body.idServer;
    const acertos = req.body.acertosServer;

    var idQuiz = 0

    quizModel.contarRealizados(idUsuario)
        .then(
            function (resultado) {
                idQuiz = resultado[0].qtdRealizados + 1
                console.log('\nBaseado no result do MySQL, o id deste quiz será ' + idQuiz + '\n')
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );

    setTimeout(function() {
        // timeout para obter o valor de idQuiz
        quizModel.registrar(idQuiz, idUsuario, acertos)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );

    }, 1000)

}

function obterHistoricoUsuario(req, res) {
    const idUsuario = req.params.idUsuario

    quizModel.obterHistoricoUsuario(idUsuario).then(function (resultado) {
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

function obterPontuacaoUsuario(req, res) {
    const idUsuario = req.params.idUsuario

    quizModel.obterPontuacaoUsuario(idUsuario).then(function (resultado) {
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

module.exports = {
    registrar,
    obterHistoricoUsuario,
    obterPontuacaoUsuario
}