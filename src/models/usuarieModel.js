const database = require("../database/config")

function cadastrar(nome, email, senha, imagem) {
    
    const instrucaoSql = `
        INSERT INTO usuarie (nome, email, senha, imagem) VALUES 
            ('${nome}', '${email}', MD5('${senha}'), '${imagem}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(nome, senha) {

    const instrucaoSql = `
        SELECT 
            idUsuarie as id, 
            nome as usuarie,
            imagem 
                FROM usuarie 
                WHERE nome = '${nome}' AND senha = MD5('${senha}')
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    autenticar
};