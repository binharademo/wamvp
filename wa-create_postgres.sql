-- Script de criação de banco de dados PostgreSQL para WINAUD93
-- Gerado a partir da estrutura do banco de dados Access

-- Criação do esquema
CREATE SCHEMA IF NOT EXISTS winaudio;

-- Configurar o esquema como padrão
SET search_path TO winaudio;

-- Tabela Cad_Cargo
CREATE TABLE Cad_Cargo (
    id SERIAL PRIMARY KEY,
    Emp_Nome_Reduzido VARCHAR(90),
    Car_Descricao VARCHAR(50),
    Car_CBO VARCHAR(30)
);

-- Tabela Cad_Convenio
CREATE TABLE Cad_Convenio (
    Conv_Codigo SERIAL PRIMARY KEY,
    Conv_Nome VARCHAR(50),
    Conv_Endereco VARCHAR(50),
    Conv_Bairro VARCHAR(30),
    Conv_Cidade VARCHAR(30),
    Conv_UF VARCHAR(2),
    Conv_CEP VARCHAR(9),
    Conv_Telefone VARCHAR(30),
    Conv_Fax VARCHAR(30),
    Conv_Email VARCHAR(50),
    Conv_Contato VARCHAR(30),
    Conv_CNPJ VARCHAR(18),
    Conv_IE VARCHAR(15),
    Conv_Obs TEXT
);

-- Tabela Cad_Empresa
CREATE TABLE Cad_Empresa (
    Emp_Codigo SERIAL PRIMARY KEY,
    Emp_Nome VARCHAR(100),
    Emp_Nome_Reduzido VARCHAR(90),
    Emp_Endereco VARCHAR(50),
    Emp_Bairro VARCHAR(30),
    Emp_Cidade VARCHAR(30),
    Emp_UF VARCHAR(2),
    Emp_CEP VARCHAR(9),
    Emp_Telefone VARCHAR(30),
    Emp_Fax VARCHAR(30),
    Emp_Email VARCHAR(50),
    Emp_Contato VARCHAR(30),
    Emp_CNPJ VARCHAR(18),
    Emp_IE VARCHAR(15),
    Emp_Obs TEXT,
    Emp_Ramo VARCHAR(50),
    Emp_CNAE VARCHAR(10),
    Emp_GFIP VARCHAR(10),
    Emp_Grau_Risco SMALLINT,
    Emp_Convenio INTEGER REFERENCES Cad_Convenio(Conv_Codigo)
);

-- Tabela Cad_Patologia
CREATE TABLE Cad_Patologia (
    Pat_Codigo SERIAL PRIMARY KEY,
    Pat_Descricao VARCHAR(100),
    Pat_CID VARCHAR(10)
);

-- Tabela Cad_Profissional
CREATE TABLE Cad_Profissional (
    Prof_Codigo SERIAL PRIMARY KEY,
    Prof_Nome VARCHAR(100),
    Prof_Especialidade VARCHAR(50),
    Prof_Conselho VARCHAR(10),
    Prof_Registro VARCHAR(20),
    Prof_UF VARCHAR(2),
    Prof_CPF VARCHAR(14),
    Prof_Endereco VARCHAR(50),
    Prof_Bairro VARCHAR(30),
    Prof_Cidade VARCHAR(30),
    Prof_UF_End VARCHAR(2),
    Prof_CEP VARCHAR(9),
    Prof_Telefone VARCHAR(30),
    Prof_Celular VARCHAR(30),
    Prof_Email VARCHAR(50),
    Prof_Obs TEXT
);

-- Tabela Cad_Setor
CREATE TABLE Cad_Setor (
    id SERIAL PRIMARY KEY,
    Emp_Nome_Reduzido VARCHAR(90),
    Set_Descricao VARCHAR(50),
    Set_Ruido REAL,
    Set_Exposicao REAL
);

-- Tabela Par_Audiometro
CREATE TABLE Par_Audiometro (
    id SERIAL PRIMARY KEY,
    Nome_Audiometro VARCHAR(100),
    Fabricante VARCHAR(50),
    Modelo VARCHAR(50),
    Data_Calibracao TIMESTAMP,
    Lim_Inferior_VA SMALLINT,
    Lim_Superior_VA SMALLINT,
    Lim_Inferior_VO SMALLINT,
    Lim_Superior_VO SMALLINT,
    Lim_Inferior_VA250 SMALLINT,
    Lim_Superior_VA250 SMALLINT,
    Lim_Inferior_VA500 SMALLINT,
    Lim_Superior_VA500 SMALLINT,
    Lim_Inferior_VA1000 SMALLINT,
    Lim_Superior_VA1000 SMALLINT,
    Lim_Inferior_VA2000 SMALLINT,
    Lim_Superior_VA2000 SMALLINT,
    Lim_Inferior_VA3000 SMALLINT,
    Lim_Superior_VA3000 SMALLINT,
    Lim_Inferior_VA4000 SMALLINT,
    Lim_Superior_VA4000 SMALLINT,
    Lim_Inferior_VA6000 SMALLINT,
    Lim_Superior_VA6000 SMALLINT,
    Lim_Inferior_VA8000 SMALLINT,
    Lim_Superior_VA8000 SMALLINT,
    Lim_Inferior_VO250 SMALLINT,
    Lim_Superior_VO250 SMALLINT,
    Lim_Inferior_VO500 SMALLINT,
    Lim_Superior_VO500 SMALLINT,
    Lim_Inferior_VO1000 SMALLINT,
    Lim_Superior_VO1000 SMALLINT,
    Lim_Inferior_VO2000 SMALLINT,
    Lim_Superior_VO2000 SMALLINT,
    Lim_Inferior_VO3000 SMALLINT,
    Lim_Superior_VO3000 SMALLINT,
    Lim_Inferior_VO4000 SMALLINT,
    Lim_Superior_VO4000 SMALLINT
);

-- Tabela Par_Imitanciometro
CREATE TABLE Par_Imitanciometro (
    id SERIAL PRIMARY KEY,
    Nome_Imitanciometro VARCHAR(100),
    Fabricante VARCHAR(50),
    Modelo VARCHAR(50),
    Data_Calibracao TIMESTAMP
);

-- Tabela Par_TextoPadrao
CREATE TABLE Par_TextoPadrao (
    Cod_Texto SERIAL PRIMARY KEY,
    Descricao VARCHAR(50),
    Texto TEXT
);

-- Tabela Par_Anamnese
CREATE TABLE Par_Anamnese (
    Cod_Anamnese SERIAL PRIMARY KEY,
    Descricao VARCHAR(50),
    Pergunta TEXT,
    Tipo SMALLINT,
    Opcoes TEXT
);

-- Tabela Par_ConfigPagina
CREATE TABLE Par_ConfigPagina (
    id SERIAL PRIMARY KEY,
    Nome_Config VARCHAR(50),
    Papel_Largura SMALLINT,
    Papel_Altura SMALLINT,
    Margem_Superior SMALLINT,
    Margem_Inferior SMALLINT,
    Margem_Esquerda SMALLINT,
    Margem_Direita SMALLINT,
    Fonte_Nome VARCHAR(50),
    Fonte_Tamanho SMALLINT,
    Fonte_Negrito BOOLEAN,
    Fonte_Italico BOOLEAN,
    Fonte_Sublinhado BOOLEAN,
    Imprime_Empresa_NomeCompleto BOOLEAN
);

-- Tabela Par_Configs
CREATE TABLE Par_Configs (
    id SERIAL PRIMARY KEY,
    Empresa_Padrao INTEGER,
    Profissional_Padrao INTEGER,
    Audiometro_Padrao VARCHAR(100),
    Imitanciometro_Padrao VARCHAR(100),
    Config_Pagina VARCHAR(50)
);

-- Tabela Par_Parametros
CREATE TABLE Par_Parametros (
    id SERIAL PRIMARY KEY,
    Versao VARCHAR(4),
    Cab_Titulo VARCHAR(100),
    Cab_Subtitulo VARCHAR(100),
    Cab_Endereco VARCHAR(100),
    Cab_Telefone VARCHAR(50),
    Cab_Email VARCHAR(50),
    Cab_Logo BYTEA,
    Cab_Titulo_Fonte VARCHAR(5),
    Cab_Titulo_Tamanho SMALLINT,
    Cab_Titulo_Negrito BOOLEAN,
    Cab_Titulo_Italico BOOLEAN,
    Cab_Titulo_Sublinhado BOOLEAN,
    Cab_Subtitulo_Fonte VARCHAR(5),
    Cab_Subtitulo_Tamanho SMALLINT,
    Cab_Subtitulo_Negrito BOOLEAN,
    Cab_Subtitulo_Italico BOOLEAN,
    Cab_Subtitulo_Sublinhado BOOLEAN,
    Cab_End_Fonte VARCHAR(5),
    Cab_End_Tamanho SMALLINT,
    Cab_End_Negrito BOOLEAN,
    Cab_End_Italico BOOLEAN,
    Cab_End_Sublinhado BOOLEAN,
    Cab_Usu_UsarProfissional BOOLEAN
);

-- Tabela Par_Habilitacao
CREATE TABLE Par_Habilitacao (
    id SERIAL PRIMARY KEY,
    Codigo_Habilitacao VARCHAR(50),
    Data_Habilitacao TIMESTAMP,
    Data_Expiracao TIMESTAMP,
    Tipo_Habilitacao SMALLINT
);

-- Tabela Cad_Paciente
CREATE TABLE Cad_Paciente (
    Pac_Codigo SERIAL PRIMARY KEY,
    Pac_Nome VARCHAR(100),
    Pac_Sexo VARCHAR(1),
    Pac_Data_Nasc TIMESTAMP,
    Pac_Endereco VARCHAR(50),
    Pac_Bairro VARCHAR(30),
    Pac_Cidade VARCHAR(30),
    Pac_UF VARCHAR(2),
    Pac_CEP VARCHAR(9),
    Pac_Telefone VARCHAR(30),
    Pac_Celular VARCHAR(30),
    Pac_Email VARCHAR(50),
    Pac_RG VARCHAR(20),
    Pac_CPF VARCHAR(14),
    Pac_Empresa INTEGER REFERENCES Cad_Empresa(Emp_Codigo),
    Pac_Setor INTEGER,
    Pac_Cargo VARCHAR(50),
    Pac_Data_Admissao TIMESTAMP,
    Pac_Matricula VARCHAR(20),
    Pac_Convenio INTEGER REFERENCES Cad_Convenio(Conv_Codigo),
    Pac_Plano VARCHAR(30),
    Pac_Carteirinha VARCHAR(30),
    Pac_Validade TIMESTAMP,
    Pac_Obs TEXT,
    Pac_CTPS VARCHAR(50)
);

-- Tabela Cad_Paciente_ApAud
CREATE TABLE Cad_Paciente_ApAud (
    id SERIAL PRIMARY KEY,
    Pac_Codigo INTEGER REFERENCES Cad_Paciente(Pac_Codigo),
    MarcaOD VARCHAR(30),
    ModeloOD VARCHAR(30),
    TipoOD VARCHAR(30),
    SerieOD VARCHAR(30),
    MarcaOE VARCHAR(30),
    ModeloOE VARCHAR(30),
    TipoOE VARCHAR(30),
    SerieOE VARCHAR(30),
    Data_Adaptacao TIMESTAMP,
    Observacao TEXT,
    MarcaOD_2 VARCHAR(30),
    ModeloOD_2 VARCHAR(30),
    TipoOD_2 VARCHAR(30),
    SerieOD_2 VARCHAR(30),
    MarcaOE_2 VARCHAR(30),
    ModeloOE_2 VARCHAR(30),
    TipoOE_2 VARCHAR(30),
    SerieOE_2 VARCHAR(30)
);

-- Tabela Cad_Paciente_P19
CREATE TABLE Cad_Paciente_P19 (
    id SERIAL PRIMARY KEY,
    Pac_Codigo INTEGER REFERENCES Cad_Paciente(Pac_Codigo),
    Resp_Anamnese_1 BOOLEAN,
    Resp_Anamnese_2 BOOLEAN,
    Resp_Anamnese_3 BOOLEAN,
    Resp_Anamnese_4 BOOLEAN,
    Resp_Anamnese_5 BOOLEAN,
    Resp_Anamnese_6 BOOLEAN,
    Resp_Anamnese_7 BOOLEAN,
    Resp_Anamnese_8 BOOLEAN,
    Resp_Anamnese_9 BOOLEAN,
    Resp_Anamnese_10 BOOLEAN,
    Resp_Anamnese_11 BOOLEAN,
    Resp_Anamnese_12 BOOLEAN,
    Resp_Anamnese_13 BOOLEAN,
    Resp_Anamnese_14 BOOLEAN,
    Resp_Anamnese_15 BOOLEAN,
    Resp_Anamnese_16 BOOLEAN,
    Resp_Anamnese_17 BOOLEAN,
    Resp_Anamnese_18 BOOLEAN,
    Resp_Anamnese_19 BOOLEAN
);

-- Tabela Cad_Meatoscopia
CREATE TABLE Cad_Meatoscopia (
    id SERIAL PRIMARY KEY,
    Pac_Codigo INTEGER REFERENCES Cad_Paciente(Pac_Codigo),
    Meat_Data TIMESTAMP,
    Meat_Hora TIMESTAMP,
    Meat_OD TEXT,
    Meat_OE TEXT,
    Meat_Observacao TEXT
);

-- Tabela Cad_PAIR
CREATE TABLE Cad_PAIR (
    id SERIAL PRIMARY KEY,
    Pac_Codigo INTEGER REFERENCES Cad_Paciente(Pac_Codigo),
    PAIR_Data TIMESTAMP,
    PAIR_Classificacao SMALLINT,
    PAIR_Observacao TEXT
);

-- Tabela Cad_Exame (simplificada devido à grande quantidade de campos)
CREATE TABLE Cad_Exame (
    id SERIAL PRIMARY KEY,
    Pac_Codigo INTEGER REFERENCES Cad_Paciente(Pac_Codigo),
    Ex_Data TIMESTAMP,
    Ex_Hora TIMESTAMP,
    Ex_Tipo SMALLINT,
    Ex_Profissional INTEGER REFERENCES Cad_Profissional(Prof_Codigo),
    Ex_Cabine BOOLEAN,
    Ex_Audiometro VARCHAR(100),
    Ex_Calibracao TIMESTAMP,
    Ex_Repouso SMALLINT,
    Ex_Queixa TEXT,
    Ex_Observacao TEXT,
    Ex_Conclusao TEXT,
    Ex_Conduta TEXT,
    -- Campos de audiometria (VA = Via Aérea, VO = Via Óssea)
    Ex_VA_OD_250 SMALLINT,
    Ex_VA_OD_500 SMALLINT,
    Ex_VA_OD_1000 SMALLINT,
    Ex_VA_OD_2000 SMALLINT,
    Ex_VA_OD_3000 SMALLINT,
    Ex_VA_OD_4000 SMALLINT,
    Ex_VA_OD_6000 SMALLINT,
    Ex_VA_OD_8000 SMALLINT,
    Ex_VA_OE_250 SMALLINT,
    Ex_VA_OE_500 SMALLINT,
    Ex_VA_OE_1000 SMALLINT,
    Ex_VA_OE_2000 SMALLINT,
    Ex_VA_OE_3000 SMALLINT,
    Ex_VA_OE_4000 SMALLINT,
    Ex_VA_OE_6000 SMALLINT,
    Ex_VA_OE_8000 SMALLINT,
    Ex_VO_OD_250 SMALLINT,
    Ex_VO_OD_500 SMALLINT,
    Ex_VO_OD_1000 SMALLINT,
    Ex_VO_OD_2000 SMALLINT,
    Ex_VO_OD_3000 SMALLINT,
    Ex_VO_OD_4000 SMALLINT,
    Ex_VO_OE_250 SMALLINT,
    Ex_VO_OE_500 SMALLINT,
    Ex_VO_OE_1000 SMALLINT,
    Ex_VO_OE_2000 SMALLINT,
    Ex_VO_OE_3000 SMALLINT,
    Ex_VO_OE_4000 SMALLINT,
    -- Mascaramento
    Ex_VA_OD_250_Masc SMALLINT,
    Ex_VA_OD_500_Masc SMALLINT,
    Ex_VA_OD_1000_Masc SMALLINT,
    Ex_VA_OD_2000_Masc SMALLINT,
    Ex_VA_OD_3000_Masc SMALLINT,
    Ex_VA_OD_4000_Masc SMALLINT,
    Ex_VA_OD_6000_Masc SMALLINT,
    Ex_VA_OD_8000_Masc SMALLINT,
    Ex_VA_OE_250_Masc SMALLINT,
    Ex_VA_OE_500_Masc SMALLINT,
    Ex_VA_OE_1000_Masc SMALLINT,
    Ex_VA_OE_2000_Masc SMALLINT,
    Ex_VA_OE_3000_Masc SMALLINT,
    Ex_VA_OE_4000_Masc SMALLINT,
    Ex_VA_OE_6000_Masc SMALLINT,
    Ex_VA_OE_8000_Masc SMALLINT,
    Ex_VO_OD_250_Masc SMALLINT,
    Ex_VO_OD_500_Masc SMALLINT,
    Ex_VO_OD_1000_Masc SMALLINT,
    Ex_VO_OD_2000_Masc SMALLINT,
    Ex_VO_OD_3000_Masc SMALLINT,
    Ex_VO_OD_4000_Masc SMALLINT,
    Ex_VO_OE_250_Masc SMALLINT,
    Ex_VO_OE_500_Masc SMALLINT,
    Ex_VO_OE_1000_Masc SMALLINT,
    Ex_VO_OE_2000_Masc SMALLINT,
    Ex_VO_OE_3000_Masc SMALLINT,
    Ex_VO_OE_4000_Masc SMALLINT
);

-- Tabela Cad_Exame1 (extensão da tabela Cad_Exame para campos adicionais)
CREATE TABLE Cad_Exame1 (
    id SERIAL PRIMARY KEY,
    Pac_Codigo INTEGER REFERENCES Cad_Paciente(Pac_Codigo),
    Ex_Data TIMESTAMP,
    -- Campos adicionais de audiometria
    Ex_VA_OD_125 SMALLINT,
    Ex_VA_OD_750 SMALLINT,
    Ex_VA_OD_1500 SMALLINT,
    Ex_VA_OD_9000 SMALLINT,
    Ex_VA_OD_10000 SMALLINT,
    Ex_VA_OD_11200 SMALLINT,
    Ex_VA_OD_12500 SMALLINT,
    Ex_VA_OD_14000 SMALLINT,
    Ex_VA_OD_16000 SMALLINT,
    Ex_VA_OE_125 SMALLINT,
    Ex_VA_OE_750 SMALLINT,
    Ex_VA_OE_1500 SMALLINT,
    Ex_VA_OE_9000 SMALLINT,
    Ex_VA_OE_10000 SMALLINT,
    Ex_VA_OE_11200 SMALLINT,
    Ex_VA_OE_12500 SMALLINT,
    Ex_VA_OE_14000 SMALLINT,
    Ex_VA_OE_16000 SMALLINT,
    Ex_VO_OD_750 SMALLINT,
    Ex_VO_OD_1500 SMALLINT,
    Ex_VO_OD_6000 SMALLINT,
    Ex_VO_OD_8000 SMALLINT,
    Ex_VO_OE_750 SMALLINT,
    Ex_VO_OE_1500 SMALLINT,
    Ex_VO_OE_6000 SMALLINT,
    Ex_VO_OE_8000 SMALLINT,
    -- Campos para respostas de anamnese
    Resposta_01 VARCHAR(255),
    Resposta_02 VARCHAR(255),
    Resposta_03 VARCHAR(255),
    Resposta_04 VARCHAR(255),
    Resposta_05 VARCHAR(255),
    Resposta_06 VARCHAR(255),
    Resposta_07 VARCHAR(255),
    Resposta_08 VARCHAR(255),
    Resposta_09 VARCHAR(255),
    Resposta_10 VARCHAR(255),
    -- Campos para índices de audiometria
    Ex_MA_Davis_OD INTEGER,
    Ex_MA_Davis_OE INTEGER,
    Ex_MA_NorthernDowns_OD INTEGER,
    Ex_MA_NorthernDowns_OE INTEGER,
    Ex_MA_Andrade_OD INTEGER,
    Ex_MA_Andrade_OE INTEGER
);

-- Comentários nas tabelas
COMMENT ON TABLE Cad_Cargo IS 'Cadastro de cargos profissionais';
COMMENT ON TABLE Cad_Convenio IS 'Cadastro de convênios médicos';
COMMENT ON TABLE Cad_Empresa IS 'Cadastro de empresas';
COMMENT ON TABLE Cad_Exame IS 'Cadastro de exames audiométricos (parte 1)';
COMMENT ON TABLE Cad_Exame1 IS 'Cadastro de exames audiométricos (parte 2)';
COMMENT ON TABLE Cad_Meatoscopia IS 'Cadastro de exames de meatoscopia';
COMMENT ON TABLE Cad_Paciente IS 'Cadastro de pacientes';
COMMENT ON TABLE Cad_Paciente_ApAud IS 'Cadastro de aparelhos auditivos dos pacientes';
COMMENT ON TABLE Cad_Paciente_P19 IS 'Informações adicionais de pacientes';
COMMENT ON TABLE Cad_PAIR IS 'Cadastro relacionado à Perda Auditiva Induzida por Ruído';
COMMENT ON TABLE Cad_Patologia IS 'Cadastro de patologias';
COMMENT ON TABLE Cad_Profissional IS 'Cadastro de profissionais';
COMMENT ON TABLE Cad_Setor IS 'Cadastro de setores empresariais';
COMMENT ON TABLE Par_Anamnese IS 'Parâmetros de anamnese (entrevista clínica)';
COMMENT ON TABLE Par_Audiometro IS 'Configurações de audiômetro';
COMMENT ON TABLE Par_ConfigPagina IS 'Configurações de página para impressão';
COMMENT ON TABLE Par_Configs IS 'Configurações gerais do sistema';
COMMENT ON TABLE Par_Habilitacao IS 'Parâmetros de habilitação do sistema';
COMMENT ON TABLE Par_Imitanciometro IS 'Configurações de imitanciômetro';
COMMENT ON TABLE Par_Parametros IS 'Parâmetros diversos do sistema';
COMMENT ON TABLE Par_TextoPadrao IS 'Textos padrão utilizados no sistema';

-- Índices para melhorar a performance
CREATE INDEX idx_paciente_nome ON Cad_Paciente(Pac_Nome);
CREATE INDEX idx_paciente_cpf ON Cad_Paciente(Pac_CPF);
CREATE INDEX idx_empresa_nome ON Cad_Empresa(Emp_Nome);
CREATE INDEX idx_empresa_cnpj ON Cad_Empresa(Emp_CNPJ);
CREATE INDEX idx_exame_paciente ON Cad_Exame(Pac_Codigo);
CREATE INDEX idx_exame_data ON Cad_Exame(Ex_Data);
CREATE INDEX idx_exame1_paciente ON Cad_Exame1(Pac_Codigo);
CREATE INDEX idx_profissional_nome ON Cad_Profissional(Prof_Nome);
CREATE INDEX idx_convenio_nome ON Cad_Convenio(Conv_Nome);
