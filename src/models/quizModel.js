const database = require("../database/config")

function contarRealizados(idUsuarie) {
    const instrucaoSql = `
        SELECT count(idQuiz) as qtdRealizados 
            FROM quiz 
            WHERE fkUsuarie = ${idUsuarie};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function registrar(idQuiz, idUsuarie, acertos) {
    const instrucaoSql = `
        INSERT INTO quiz (idQuiz, fkUsuarie, qtdAcertos) VALUE 
            (${idQuiz}, ${idUsuarie}, ${acertos});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterHistoricoUsuarie(idUsuario) {
    const instrucaoSql = `
        select 
        idQuiz,
        qtdAcertos,
        dtPartida
            from quiz
            join usuarie on idUsuarie = fkUsuarie
                where fkUsuarie = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterPontuacaoUsuarie(idUsuarie) {
    const instrucaoSql = `
        select
        count(idQuiz) as realizados,
            sum(qtdAcertos) as pontuacao,
            count(case when qtdAcertos = 10 then 1 end) as perfeitos
                from quiz
                join usuarie on idUsuarie = fkUsuarie
                    where fkUsuarie = ${idUsuarie};
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterPlacar() {
    const instrucaoSql = `
        select
            nome as usuarie,
            sum(qtdAcertos) as pontuacao,
            imagem
                from quiz
                join usuarie on idUsuarie = fkUsuarie
                    group by fkUsuarie
                    order by pontuacao desc;
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    contarRealizados,
    registrar,
    obterHistoricoUsuarie,
    obterPontuacaoUsuarie,
    obterPlacar
};