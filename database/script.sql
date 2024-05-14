create database db_acme_filmes_turma_aa;
use db_acme_filmes_turma_aa;

create table tbl_filme(
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    sinopse text not null,
    duracao time not null,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(400) not null,
    valor_unitario float not null,
    id_classificacao int not null,
	index fk_tbl_filme_tbl_classificacao (id_classificacao asc),
    constraint fk_tbl_filme_tbl_classificacao
    foreign key (id_classificacao)
    references tbl_classificacao(id)
);

create table tbl_classificacao(
	id int not null auto_increment,
    caracteristicas varchar(150) not null,
	faixa_etaria varchar(2) not null,
    classificacao varchar(45) not null,
    primary key (id)
);

create table tbl_genero (
	id int not null auto_increment,
    nome varchar(45) not null,
    primary key(id)
);

create table tbl_nacionalidade(
	id int not null auto_increment,
    nome varchar(50) not null,
	primary key(id)
);

create table tbl_sexo (
	id int not null auto_increment,
    sigla varchar(2) not null,
    nome varchar(45) not null,
    primary key (id)
);

create table tbl_diretor (
	id int not null auto_increment,
    nome varchar(200) not null,
    biografia text null,
    data_nascimento date not null,
	tbl_sexo_id int not null,
    primary key(id),
    index fk_tbl_diretor_tbl_sexo1_sexo1_idx(tbl_sexo_id asc),
    constraint fk_tbl_diretor_tbl_sexo1
    foreign key(tbl_sexo_id)
    references tbl_sexo(id)
);

create table tbl_ator(
	id int not null auto_increment,
    nome varchar(100) not null,
    foto varchar(300) not null,
    biografia text null,
	data_nascimento date not null,
    tbl_sexo_id int not null,
    primary key(id),
    index fk_tbl_ator_sexo1_idx(tbl_sexo_id asc),
    constraint fk_tbl_ator_tbl_sexo1
    foreign key(tbl_sexo_id)
    references tbl_sexo(id)
);

drop table tbl_ator;


create table tbl_filme_ator (
	id int not null auto_increment,
    tbl_filme_id int not null,
    tbl_ator_id int not null,
	primary key(id),
    index fk_tbl_tbl_ator_tbl_filme1_idx(tbl_filme_id asc),
    index fk_tbl_filme_ator_tbl_ator1_idx(tbl_ator_id asc),
    constraint fk_tbl_filme_ator_tbl_filme
    foreign key(tbl_filme_id)
    references tbl_filme(id),
    constraint fk_tbl_filme_ator_tbl_ator
    foreign key(tbl_ator_id)
    references tbl_ator (id)
);

create table tbl_ator_nacionalidade (
	id int not null auto_increment,
    tbl_nacionalidade int not null,
    tbl_ator_id int not null,
    primary key(id),
    index fk_tbl_ator_nacionalidade_tbl_nacionalidade1_idx(tbl_nacionalidade asc),
    index fk_tbl_ator_nacionalidade_tbl_ator1_idx(tbl_ator_id asc),
    constraint fk_tbl_ator_nacionalidade_tbl_nacionalidade1
    foreign key(tbl_nacionalidade)
    references tbl_nacionalidade(id),
    constraint fk_tbl_ator_nacionalidade_tbl_ator1
    foreign key(tbl_ator_id)
    references tbl_ator(id)
);

create table tbl_diretor_nacionalidade(
    id int not null auto_increment,
    tbl_nacionalidade_id int not null,
    tbl_diretor_id int not null,
    primary key(id),
    index fk_tbl_diretor_nacionalidade_tbl_nacionalidade1_idx(tbl_nacionalidade_id asc),
    index fk_tbl_diretor_nacionalidade_tbl_diretor1_idx(tbl_diretor_id asc),
    constraint fk_tbl_diretor_nacionalidade_tbl_nacionalidade1
    foreign key(tbl_nacionalidade_id)
    references tbl_nacionalidade(id),
    constraint fk_tbl_diretor_nacionalidade_tbl_diretor1
    foreign key (tbl_diretor_id)
    references tbl_diretor(id)
);

create table tbl_filme_diretor(
	id int not null auto_increment primary key,
	id_filme int not null,
    id_diretor int not null,
    
    constraint FK_DIRETOR_FILMEDIRETOR
    foreign key(id_diretor)
    references tbl_diretor(id),
    
    constraint FK_FILME_FILMEDIRETOR
    foreign key(id_filme)
    references tbl_filme(id)
);

create table tbl_filme_genero(
	id int not null auto_increment primary key,
	id_filme int not null,
    id_genero int not null,
    
    constraint FK_GENERO_FILMEGENERO
    foreign key(id_genero)
    references tbl_genero(id),
    
    constraint FK_FILME_FILMEGENERO
    foreign key(id_filme)
    references tbl_filme(id)
);

desc tbl_classificacao;

insert into tbl_classificacao(
	caracteristicas,
	faixa_etaria,
    classificacao
)values(
	"Não expõe crianças a conteúdo potencalmente prejudiciais.",
	"L",
    "Livre"
),(
	"Conteúdo violento ou linguagem inapropriada para crianças, ainda que em menor itensidade.",
	"10",
    "Não recomendado para menores de 10 anos"
),(
	"As cenas podem conter agressão física, consumo de drogas e insinuação sexual.",
	"12",
    "Não recomendado para menores de 12 anos"
),(
	"Conteúdos mais violentos e/ou de linguagem sexual mais acentuada.",
	"14",
    "Não recomendado para menores de 14 anos"
),(
	"Conteúdos mais violentos ou com conteúdo sexual mais intenso, com cenas de tortura, suicídio, estupro ou nudez total.",
	"16",
    "Não recomendado para menores de 16 anos"
),(
	"Conteúdos violentos e sexuais extremos. Cenas de sexo, incesto, ou atos repetidos de tortura, mutilação ou abuso sexual.",
	"18",
    "Não recomendado para menores de 18 anos"
);

desc tbl_filme;
insert into tbl_filme(nome, sinopse, duracao, data_lancamento, data_relancamento, foto_capa, valor_unitario, id_classificacao)values
(
	"flash",
    "Pictures, ele é o décimo terceiro filme do Universo Estendido DC.",
    "02:24:00",
    "2022-03-12",
    null,
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Flegadodadc.com.br%2Fthe-flash-com-liga-da-justica-veja-o-poster-oficial-do-filme%2F&psig=AOvVaw1Oj4H47H_m1vfU9F1C5qAu&ust=1714536400851000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJCWjuaH6YUDFQAAAAAdAAAAABAE",
	"10",
    1
);

desc tbl_sexo;
insert into tbl_sexo(sigla, nome) values (
	"F",
    "Feminino"
), 
(
	"M",
    "Masculino"
);

insert into tbl_ator(nome, data_nascimento, biografia, foto, tbl_sexo_id)values
(	'Ezra Miller',
	'1992-09-30',
	'Ezra Matthew Miller é um ator estadunidense que trabalha como intérprete de artes cênicas, cancionista, musicista e modelo.',
    'https://pt.wikipedia.org/wiki/Ficheiro:Ezra_Miller_by_Gage_Skidmore_2.jpg',
    2
),
(	'Maribel Verdú',
	'1970-10-2',
	'Maribel Verdú é uma atriz espanhola.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Premios_Goya_2018_-_Maribel_Verd%C3%BA.jpg/200px-Premios_Goya_2018_-_Maribel_Verd%C3%BA.jpg',
    1
),
(	'Ron Livingston',
	'1967-06-05',
	'Ronald Joseph "Ron" Livingston é um ator norte-americano. Seus papéis incluem um empregado descontente no filme Office Space, um escritor sarcástico em uma relação com Carrie Bradshaw na série de TV Sex and the City e Capitão Lewis Nixon na minissérie Band of Brothers.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/RonLivingstonMay10.jpg/230px-RonLivingstonMay10.jpg',
    2
),
(	'Ben Affleck',
	'1972-05-15',
	'Benjamin Géza "Ben" Affleck-Boldt é um ator, diretor, roteirista e produtor norte-americano. Começou sua carreira como ator mirim, protagonista na série educativa The Voyage of the Mimi e The Second Voyage of the Mimi da PBS.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ben_Affleck_by_Gage_Skidmore_3.jpg/200px-Ben_Affleck_by_Gage_Skidmore_3.jpg',
    2
),
(	'Amber Heard',
	'1986-04-22',
	'Amber Laura Heard é uma atriz norte-americana. Desempenhou o papel principal e personagem-título em All the Boys Love Mandy Lane que estreou no Festival Internacional de Cinema de Toronto em 2006.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Amber_Heard_%2843723454772%29.jpg/200px-Amber_Heard_%2843723454772%29.jpg',
    1
),
(	'Jason Momoa',
	'1979-05-01',
    'Joseph Jason Namakaeha Momoa é um ator, modelo, roteirista, diretor e produtor norte-americano. Filho único de pai havaiano e mãe de ascendência alemã e irlandesa, foi criado em Norwalk, Iowa, por sua mãe. Seu tio é o famoso surfista Brian Keaulana',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Jason_Momoa_by_Gage_Skidmore_2.jpg/200px-Jason_Momoa_by_Gage_Skidmore_2.jpg',
    2
),
(	'Vincent Regan',
	'1965-05-16',
	'Vincent Regan é um ator de cinema e televisão britânico nascido no País de Gales. É filho de imigrantes irlandeses e, quando ele era um adulto jovem, os pais voltaram a viver na Irlanda, e Vincent os acompanhou. É casado com a atriz Amelia Curtis e eles têm duas filhas, Chloe e Esme.',
    'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/36/20/62/19337057.jpg',
    2
),
(	'Matthew McConaughey',
	'1969-11-04',
	'Matthew David McConaughey é um ator, produtor, realizador, cenógrafo e professor estadunidense vencedor do Oscar de Melhor Ator.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Matthew_McConaughey_2019_%2848648344772%29_%28cropped%29.jpg/230px-Matthew_McConaughey_2019_%2848648344772%29_%28cropped%29.jpg',
    2
),
(	'Jessica Chastain',
	'1998-05-06',
	'Jessica Michelle Chastain é uma atriz, profissional de dublagem e produtora norte-americana. Chastain nasceu e cresceu no norte da Califórnia, desenvolvendo desde cedo um interesse pela atuação. Ela estreou profissionalmente no teatro em 1998 como Julieta em uma produção de Romeu e Julieta.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/RonLivingstonMay10.jpg/230px-RonLivingstonMay10.jpg',
    1
),
(	'Chris Hemsworth',
	'1983-05-11',
	'Christopher Hemsworth é um ator australiano, sendo mais conhecido por interpretar Thor no Universo Cinematográfico Marvel. ',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Chris_Hemsworth_by_Gage_Skidmore_2_%28cropped%29.jpg/230px-Chris_Hemsworth_by_Gage_Skidmore_2_%28cropped%29.jpg',
    2
),
(	'Tom Hiddleston',
	'1981-02-09',
	'Thomas "Tom" William Hiddleston é um ator britânico, conhecido pelo papel de Loki no Multiverso Cinematográfico Marvel. Em 2017 recebeu o Globo de Ouro de melhor ator em minissérie ou filme para a televisão por sua atuação na minissérie The Night Manager. Foi indicado ao Emmy pelo mesmo papel.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tom_Hiddleston_%2848468962561%29_%28cropped%29.jpg/230px-Tom_Hiddleston_%2848468962561%29_%28cropped%29.jpg',
    2
),
(	'Zoë Saldaña',
	'1978-06-19',
	'Zoe Saldana-Perego, nascida Zoë Yadira Saldaña Nazario, é uma atriz americana. Após apresentações com o grupo de teatro Faces, ela fez sua estreia nas telas em um episódio de Law & Order do ano de 1999. Sua carreira no cinema iniciou um ano depois com o filme Center Stage, seguido por Crossroads.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Avatar_The_Way_of_Water_Tokyo_Press_Conference_Zoe_Salda%C3%B1a_%2852563431865%29_%28cropped2%29.jpg/220px-Avatar_The_Way_of_Water_Tokyo_Press_Conference_Zoe_Salda%C3%B1a_%2852563431865%29_%28cropped2%29.jpg',
    1
),
(	'Sam Worthington',
	'1976-05-02',
	'Samuel Henry John "Sam" Worthington é um ator australiano nascido na Inglaterra. Se tornou conhecido principalmente por seus papéis no cinema como Jake Sully no premiado Avatar, Marcus Wright em Terminator Salvation e como Perseu no remake de 2010 Clash of the Titans.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Avatar_The_Way_of_Water_Tokyo_Press_Conference_Sam_Worthington_%2852563252594%29_%28cropped%29.jpg/220px-Avatar_The_Way_of_Water_Tokyo_Press_Conference_Sam_Worthington_%2852563252594%29_%28cropped%29.jpg',
    2
);

insert into tbl_nacionalidade(nome)values
(
"Brasileiro"
),
(
"Estadunidense"
),
(	
"Espanhol"
),
(
"Argentino"
);

select * from tbl_diretor;
insert into tbl_diretor(
	nome,
    biografia,
    data_nascimento,
    tbl_sexo_id
)values(
	"Andy Muschietti",
    "Andy Muschietti, é um cineasta argentino que alcançou amplo reconhecimento com o filme Mama que ele fez com Neil Cross e sua irmã, produtora e roteirista Barbara Muschietti, baseada em seu curta de três minutos de mesmo nome",
    "1973-08-26",
    2
),
(
	"James Wan",
    "James Wan é um diretor, roteirista e produtor de cinema australiano.",
    "1977-02-26",
    2
),
(
	"James Cameron",
    "Andy Muschietti, é um cineasta argentino que alcançou amplo reconhecimento com o filme Mama que ele fez com Neil Cross e sua irmã, produtora e roteirista Barbara Muschietti, baseada em seu curta de três minutos de mesmo nome",
    "1954-08-16",
    2
),
(
	"Alan Taylor",
    "Alan Taylor é um diretor, produtor e roteirista de televisão e cinema norte-americano.",
    "1959-01-13",
    2
),
(
	"Christopher Nolan",
    "Christopher Nolan, CBE é um diretor de cinema, roteirista e produtor britânico. Seus doze longas-metragens já arrecadaram o equivalente a mais de 6 bilhões de dólares em todo o mundo",
    "1970-07-30",
    2
);

insert into tbl_genero(
	nome
)values(
	'Terror'
),(
	'Suspense'
),(
	'Comédia'
),(
	'Romance'
),(
	'Ação'
),(
	'Ficcção Científica'
),(
	'Documentário'
),(
	'Musical'
),(
	'Aventura'
),(
	'Guerra'
),(
	'Thriller'
),(
	'Animação'
),(
	'Mistério'
),(
	'Drama'
),(
	'Filme Policial'
);

insert into tbl_ator_nacionalidade(
	tbl_nacionalidade,
    tbl_ator_id
)values(
	2,
    1
);

insert into tbl_diretor_nacionalidade(
	tbl_nacionalidade_id,
    tbl_diretor_id
)values(
	4,
    1
);

insert into tbl_filme_diretor(
	id_filme,
    id_diretor
)values(
	1,
    1
);

insert into tbl_filme_ator(
	tbl_filme_id,
    tbl_ator_id
)values(
	1,
    1
);

insert into tbl_filme_genero(
	id_filme,
    id_genero
)values(
	1,
    5
);

 select * from tbl_ator;