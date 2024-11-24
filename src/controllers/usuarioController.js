const usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {

    const imagem = req.file.filename
    console.log('\nnome do arquivo para cadastrar:')
    console.log(imagem)
    usuarioModel.cadastrar(usuario, email, senha, imagem)

    const usuario = req.body.usuarioServer;
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;

    usuarioModel.cadastrar(usuario, email, senha, imagem)
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
    const usuario = req.body.usuarioServer;
    const senha = req.body.senhaServer;

    usuarioModel.autenticar(usuario, senha)
        .then(
            function (resultadoAutenticar) {

                if (resultadoAutenticar.length == 1) {

                    res.json({
                        id: resultadoAutenticar[0].id,
                        nome: resultadoAutenticar[0].usuario,
                        imagem: resultadoAutenticar[0].imagem
                    });

                } else {
                    res.status(403).send("Email e/ou senha inválido(s)");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar,
    autenticar
}