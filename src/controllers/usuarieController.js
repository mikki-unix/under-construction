const usuarieModel = require("../models/usuarieModel");

function cadastrar(req, res) {

    const usuarie = req.body.usuarie;
    const email = req.body.email;
    const senha = req.body.senhaS;
    const imagem = req.file.filename

    usuarieModel.cadastrar(usuarie, email, senha, imagem)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function autenticar(req, res) {
    const usuarie = req.body.usuarie;
    const senha = req.body.senha;

    usuarieModel.autenticar(usuarie, senha)
        .then(function (consulta) {
                if (consulta.length == 1) {
                    res.json({
                        id: consulta[0].id,
                        nome: consulta[0].usuarie,
                        imagem: consulta[0].imagem
                    });
                } else {
                    res.status(403).send("Email e/ou senha inválido(s)");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar,
    autenticar
}