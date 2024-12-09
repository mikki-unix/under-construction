const express = require("express");
const router = express.Router();
const upload = require('../config/upload');
const usuarioController = require("../controllers/usuarieController");

// upload.single('imagem') vai buscar no json alguma propriedade chamada imagem 
router.post("/cadastrar", upload.single('imagem'), function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;