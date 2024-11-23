const database = require("../database/config")

function contarRealizados(idUsuario) {
    const instrucaoSql = `
        SELECT count(idQuiz) as qtdRealizados 
            FROM quiz 
            WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function registrar(idQuiz, idUsuario, acertos) {
    const instrucaoSql = `
        INSERT INTO quiz VALUE 
            (${idQuiz}, ${idUsuario}, ${acertos});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterHistoricoUsuario(idUsuario) {
    const instrucaoSql = `
        select 
        idQuiz,
        qtdAcertos,
        dtPartida
            from quiz
            join usuario on idUsuario = fkUsuario
                where fkUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterPontuacaoUsuario(idUsuario) {
    const instrucaoSql = `
        select
        count(idQuiz) as realizados,
            sum(qtdAcertos) as pontuacao,
            count(qtdAcertos = 10) as perfeitos
                from quiz
                join usuario on idUsuario = fkUsuario
                    where fkUsuario = 1
                    order by fkUsuario;
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    contarRealizados,
    registrar,
    obterHistoricoUsuario,
    obterPontuacaoUsuario
};