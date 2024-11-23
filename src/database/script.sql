create database underconstruction;
use underconstruction;
--

-- criando tabelas
create table usuario (
idUsuario int primary key auto_increment,
nome varchar(45) unique,
email varchar(45) unique,
senha varchar(25)
);

create table quiz (
idQuiz int,
fkUsuario int,
	constraint fkQuizUsuario
		foreign key (fkUsuario) references usuario(idUsuario),
	constraint pkComposta
		primary key (idQuiz, fkUsuario),
qtdAcertos int,
dtPartida datetime default current_timestamp
);
-- fim tabelas

-- selects
select * from usuario;
select * from quiz;

select 
	idQuiz,
	qtdAcertos,
    dtPartida
		from quiz
		join usuario on idUsuario = fkUsuario
			where fkUsuario = 1;
            
select
	count(idQuiz) as realizados,
	sum(qtdAcertos) as pontuacao,
    count(qtdAcertos = 10) as perfeitos
		from quiz
        join usuario on idUsuario = fkUsuario
			where fkUsuario = 1
            order by fkUsuario;
-- fim selects

-- inserções para testes
insert into usuario value
	(default, 'Mikki', 'mikki@email.com', 'Senha!1');
    
insert into quiz(idQuiz, fkUsuario, qtdAcertos) value
	(1, 1, 2);