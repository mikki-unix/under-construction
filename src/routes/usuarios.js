const express = require("express");
const router = express.Router();
const upload = require('../config/upload');
const usuarioController = require("../controllers/usuarioController");

// upload.single('imagem') vai buscar no json alguma propriedade chamada imagem 
router.post("/cadastrar", upload.single('imagem'), function (req, res) {
    console.log(`\n
        tamanho da requisição (em bytes):\n
        ${req.headers['content-length']}    
    `)

    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;