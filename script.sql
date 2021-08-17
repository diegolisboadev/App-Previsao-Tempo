-- Tabela 
create table previsao_dados (
	id serial primary key,
	identificador_cidade integer not null,
	cidade varchar(255) null,
	temperatura integer null,
	descricao varchar(255) null,
	data_previsao date null
);

-- Opção para criar a própria sequence (Caso Opte)
CREATE SEQUENCE previsao_dados_id_seq OWNED BY previsao_dados.id;
ALTER TABLE previsao_dados ALTER COLUMN id SET DEFAULT nextval('previsao_dados_id_seq');