const database = require("../database/config")

function cadastrar(nome, email, senha, imagem) {
    
    const instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES 
            ('${nome}', '${email}', '${senha}', '${imagem}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(nome, senha) {

    const instrucaoSql = `
        SELECT 
            idUsuario as id, 
            nome as usuario,
            imagem 
                FROM usuario 
                WHERE nome = '${nome}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};