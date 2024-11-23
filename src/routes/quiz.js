const express = require("express");
const router = express.Router();

const quizController = require("../controllers/quizController");

router.post("/registrar", function (req, res) {
    quizController.registrar(req, res)
});

router.get("/historico/:idUsuario", function (req, res) {
    quizController.obterHistoricoUsuario(req, res)
});

router.get("/pontuacao/:idUsuario", function (req, res) {
    quizController.obterPontuacaoUsuario(req, res)
});

router.get("/ranquear", function(req, res) {
    quizController.obterPontuacoesGerais(req, res)
});

module.exports = router;