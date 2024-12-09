create database underconstruction;
use underconstruction;
--

-- criando tabelas
create table usuarie (
idUsuarie int primary key auto_increment,
nome varchar(45) unique,
email varchar(45) unique,
senha varchar(255),
imagem char(12)
);

create table quiz (
idQuiz int,
fkUsuarie int,
	constraint fkQuizUsuarie
		foreign key (fkUsuarie) references usuarie(idUsuarie),
	constraint pkComposta
		primary key (idQuiz, fkUsuarie),
qtdAcertos int,
dtPartida datetime default current_timestamp
);
-- fim tabelas

-- inserções padroes
insert into usuarie values
	(default, 'Mikki', 'mikki@email.com', MD5('Senha!1'), '4fc16a4a.png'),
    (default, 'Maya', 'maya@email.com', MD5('Uwu123!'), '7b1fe352.png');
    
insert into quiz(idQuiz, fkUsuarie, qtdAcertos) values
	(1, 1, 10),
    (1, 2, 8);
-- fim insercoes

-- selects
select 
	idQuiz,
	qtdAcertos,
    dtPartida
		from quiz
		join usuarie on idUsuarie = fkUsuarie
			where fkUsuarie = 1;
            
select
	count(idQuiz) as realizados,
	sum(qtdAcertos) as pontuacao,
    count(qtdAcertos = 10) as perfeitos
		from quiz
        join usuarie on idUsuarie = fkUsuarie
			where fkUsuarie = 1;
            
select
	nome as usuarie,
	sum(qtdAcertos) as pontuacao
		from quiz
        join usuarie on idUsuarie = fkUsuarie
            group by fkUsuarie
            order by pontuacao;
-- fim selects