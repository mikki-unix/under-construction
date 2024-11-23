const usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    const usuario = req.body.usuarioServer;
    const senha = req.body.senhaServer;

    usuarioModel.autenticar(usuario, senha)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                if (resultadoAutenticar.length == 1) {
                    console.log(resultadoAutenticar);
                    res.json({
                        id: resultadoAutenticar[0].id,
                        nome: resultadoAutenticar[0].usuario
                    });

                } else if (resultadoAutenticar.length == 0) {
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

function cadastrar(req, res) {
    const usuario = req.body.usuarioServer;
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrar(usuario, email, senha)
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
}

module.exports = {
    autenticar,
    cadastrar
}