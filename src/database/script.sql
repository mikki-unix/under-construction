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
qtdQuestoes int,
dtPartida date
);
-- fim tabelas

-- inserções para testes
insert into usuario value
	(default, 'Mikki', 'mikki@email.com', 'Senha!1');