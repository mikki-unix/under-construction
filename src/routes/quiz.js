const express = require("express");
const router = express.Router();

const quizController = require("../controllers/quizController");

router.post("/registrar", function (req, res) {
    quizController.registrar(req, res)
});

router.get("/historico/:idUsuarie", function (req, res) {
    quizController.obterHistoricoUsuarie(req, res)
});

router.get("/pontuacao/:idUsuarie", function (req, res) {
    quizController.obterPontuacaoUsuarie(req, res)
});

router.get("/ranquear", function(req, res) {
    quizController.obterPlacar(req, res)
});

module.exports = router;