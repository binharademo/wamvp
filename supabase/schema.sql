-- Schema do WinAudio MVP - Compatível com versão desktop
-- Adaptado para Supabase com Row Level Security

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Configurar esquema
SET search_path TO public;

-- ============================================================================
-- TABELAS DE AUTENTICAÇÃO E PERFIS
-- ============================================================================

-- Tabela de perfis (estende auth.users do Supabase)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    tipo_usuario VARCHAR(20) CHECK (tipo_usuario IN ('admin', 'fonoaudiologo', 'assistente')) DEFAULT 'fonoaudiologo',
    crfa VARCHAR(20),
    telefone VARCHAR(30),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABELAS DE CADASTROS BÁSICOS
-- ============================================================================

-- Tabela Cad_Convenio
CREATE TABLE cad_convenio (
    conv_codigo UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conv_nome VARCHAR(50) NOT NULL,
    conv_endereco VARCHAR(50),
    conv_bairro VARCHAR(30),
    conv_cidade VARCHAR(30),
    conv_uf VARCHAR(2),
    conv_cep VARCHAR(9),
    conv_telefone VARCHAR(30),
    conv_fax VARCHAR(30),
    conv_email VARCHAR(50),
    conv_contato VARCHAR(30),
    conv_cnpj VARCHAR(18),
    conv_ie VARCHAR(15),
    conv_obs TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES profiles(id)
);

-- Tabela Cad_Empresa
CREATE TABLE cad_empresa (
    emp_codigo UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    emp_nome VARCHAR(100) NOT NULL,
    emp_nome_reduzido VARCHAR(90),
    emp_endereco VARCHAR(50),
    emp_bairro VARCHAR(30),
    emp_cidade VARCHAR(30),
    emp_uf VARCHAR(2),
    emp_cep VARCHAR(9),
    emp_telefone VARCHAR(30),
    emp_fax VARCHAR(30),
    emp_email VARCHAR(50),
    emp_contato VARCHAR(30),
    emp_cnpj VARCHAR(18),
    emp_ie VARCHAR(15),
    emp_obs TEXT,
    emp_ramo VARCHAR(50),
    emp_cnae VARCHAR(10),
    emp_gfip VARCHAR(10),
    emp_grau_risco SMALLINT,
    emp_convenio UUID REFERENCES cad_convenio(conv_codigo),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES profiles(id)
);

-- Tabela Cad_Profissional
CREATE TABLE cad_profissional (
    prof_codigo UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    prof_nome VARCHAR(100) NOT NULL,
    prof_especialidade VARCHAR(50),
    prof_conselho VARCHAR(10),
    prof_registro VARCHAR(20),
    prof_uf VARCHAR(2),
    prof_cpf VARCHAR(14),
    prof_endereco VARCHAR(50),
    prof_bairro VARCHAR(30),
    prof_cidade VARCHAR(30),
    prof_uf_end VARCHAR(2),
    prof_cep VARCHAR(9),
    prof_telefone VARCHAR(30),
    prof_celular VARCHAR(30),
    prof_email VARCHAR(50),
    prof_obs TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES profiles(id)
);

-- Tabela Cad_Patologia
CREATE TABLE cad_patologia (
    pat_codigo UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pat_descricao VARCHAR(100) NOT NULL,
    pat_cid VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES profiles(id)
);

-- Tabela Cad_Cargo
CREATE TABLE cad_cargo (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    emp_nome_reduzido VARCHAR(90),
    car_descricao VARCHAR(50) NOT NULL,
    car_cbo VARCHAR(30),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES profiles(id)
);

-- Tabela Cad_Setor
CREATE TABLE cad_setor (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    emp_nome_reduzido VARCHAR(90),
    set_descricao VARCHAR(50) NOT NULL,
    set_ruido REAL,
    set_exposicao REAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES profiles(id)
);

-- ============================================================================
-- TABELA DE PACIENTES
-- ============================================================================

CREATE TABLE cad_paciente (
    pac_codigo UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pac_nome VARCHAR(100) NOT NULL,
    pac_sexo VARCHAR(1) CHECK (pac_sexo IN ('M', 'F')),
    pac_nascimento DATE,
    pac_idade SMALLINT,
    pac_endereco VARCHAR(50),
    pac_bairro VARCHAR(30),
    pac_cidade VARCHAR(30),
    pac_uf VARCHAR(2),
    pac_cep VARCHAR(9),
    pac_telefone VARCHAR(30),
    pac_celular VARCHAR(30),
    pac_email VARCHAR(50),
    pac_cpf VARCHAR(14),
    pac_rg VARCHAR(20),
    pac_empresa UUID REFERENCES cad_empresa(emp_codigo),
    pac_cargo VARCHAR(50),
    pac_setor VARCHAR(50),
    pac_admissao DATE,
    pac_demissao DATE,
    pac_convenio UUID REFERENCES cad_convenio(conv_codigo),
    pac_carteirinha VARCHAR(30),
    pac_validade DATE,
    pac_obs TEXT,
    pac_ctps VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES profiles(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABELAS DE EXAMES
-- ============================================================================

CREATE TABLE cad_exame (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pac_codigo UUID REFERENCES cad_paciente(pac_codigo) ON DELETE CASCADE,
    ex_data DATE DEFAULT CURRENT_DATE,
    ex_hora TIME DEFAULT CURRENT_TIME,
    ex_tipo SMALLINT DEFAULT 1, -- 1=Audiometria, 2=Imitanciometria, etc
    ex_profissional UUID REFERENCES cad_profissional(prof_codigo),
    ex_cabine BOOLEAN DEFAULT true,
    ex_audiometro VARCHAR(100),
    ex_calibracao DATE,
    ex_repouso SMALLINT,
    ex_queixa TEXT,
    ex_observacao TEXT,
    ex_conclusao TEXT,
    ex_conduta TEXT,
    
    -- Audiometria Via Aérea - Ouvido Direito
    ex_va_od_250 SMALLINT,
    ex_va_od_500 SMALLINT,
    ex_va_od_1000 SMALLINT,
    ex_va_od_2000 SMALLINT,
    ex_va_od_3000 SMALLINT,
    ex_va_od_4000 SMALLINT,
    ex_va_od_6000 SMALLINT,
    ex_va_od_8000 SMALLINT,
    
    -- Audiometria Via Aérea - Ouvido Esquerdo
    ex_va_oe_250 SMALLINT,
    ex_va_oe_500 SMALLINT,
    ex_va_oe_1000 SMALLINT,
    ex_va_oe_2000 SMALLINT,
    ex_va_oe_3000 SMALLINT,
    ex_va_oe_4000 SMALLINT,
    ex_va_oe_6000 SMALLINT,
    ex_va_oe_8000 SMALLINT,
    
    -- Audiometria Via Óssea - Ouvido Direito
    ex_vo_od_250 SMALLINT,
    ex_vo_od_500 SMALLINT,
    ex_vo_od_1000 SMALLINT,
    ex_vo_od_2000 SMALLINT,
    ex_vo_od_3000 SMALLINT,
    ex_vo_od_4000 SMALLINT,
    
    -- Audiometria Via Óssea - Ouvido Esquerdo
    ex_vo_oe_250 SMALLINT,
    ex_vo_oe_500 SMALLINT,
    ex_vo_oe_1000 SMALLINT,
    ex_vo_oe_2000 SMALLINT,
    ex_vo_oe_3000 SMALLINT,
    ex_vo_oe_4000 SMALLINT,
    
    -- Imitanciometria
    ex_imit_od_compliance REAL,
    ex_imit_od_volume REAL,
    ex_imit_od_pressao SMALLINT,
    ex_imit_oe_compliance REAL,
    ex_imit_oe_volume REAL,
    ex_imit_oe_pressao SMALLINT,
    
    -- Reflexos Acústicos
    ex_refl_od_500 SMALLINT,
    ex_refl_od_1000 SMALLINT,
    ex_refl_od_2000 SMALLINT,
    ex_refl_od_4000 SMALLINT,
    ex_refl_oe_500 SMALLINT,
    ex_refl_oe_1000 SMALLINT,
    ex_refl_oe_2000 SMALLINT,
    ex_refl_oe_4000 SMALLINT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES profiles(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela Cad_Meatoscopia
CREATE TABLE cad_meatoscopia (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pac_codigo UUID REFERENCES cad_paciente(pac_codigo) ON DELETE CASCADE,
    meat_data DATE DEFAULT CURRENT_DATE,
    meat_hora TIME DEFAULT CURRENT_TIME,
    meat_od TEXT,
    meat_oe TEXT,
    meat_observacao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES profiles(id)
);

-- ============================================================================
-- TABELAS DE PARÂMETROS E CONFIGURAÇÕES
-- ============================================================================

CREATE TABLE par_audiometro (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome_audiometro VARCHAR(100) NOT NULL,
    fabricante VARCHAR(50),
    modelo VARCHAR(50),
    data_calibracao DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES profiles(id)
);

CREATE TABLE par_imitanciometro (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome_imitanciometro VARCHAR(100) NOT NULL,
    fabricante VARCHAR(50),
    modelo VARCHAR(50),
    data_calibracao DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES profiles(id)
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cad_convenio ENABLE ROW LEVEL SECURITY;
ALTER TABLE cad_empresa ENABLE ROW LEVEL SECURITY;
ALTER TABLE cad_profissional ENABLE ROW LEVEL SECURITY;
ALTER TABLE cad_patologia ENABLE ROW LEVEL SECURITY;
ALTER TABLE cad_cargo ENABLE ROW LEVEL SECURITY;
ALTER TABLE cad_setor ENABLE ROW LEVEL SECURITY;
ALTER TABLE cad_paciente ENABLE ROW LEVEL SECURITY;
ALTER TABLE cad_exame ENABLE ROW LEVEL SECURITY;
ALTER TABLE cad_meatoscopia ENABLE ROW LEVEL SECURITY;
ALTER TABLE par_audiometro ENABLE ROW LEVEL SECURITY;
ALTER TABLE par_imitanciometro ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para profiles
CREATE POLICY "Usuários podem ver seu próprio perfil" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Políticas para pacientes (usuários só veem seus próprios pacientes)
CREATE POLICY "Profissionais veem seus próprios pacientes" ON cad_paciente
    FOR ALL USING (created_by = auth.uid());

-- Políticas para exames
CREATE POLICY "Profissionais veem seus próprios exames" ON cad_exame
    FOR ALL USING (created_by = auth.uid());

-- Políticas para outras tabelas (mesmo padrão)
CREATE POLICY "Acesso por criador - convenios" ON cad_convenio
    FOR ALL USING (created_by = auth.uid());

CREATE POLICY "Acesso por criador - empresas" ON cad_empresa
    FOR ALL USING (created_by = auth.uid());

CREATE POLICY "Acesso por criador - profissionais" ON cad_profissional
    FOR ALL USING (created_by = auth.uid());

-- ============================================================================
-- TRIGGERS PARA UPDATED_AT
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_paciente_updated_at BEFORE UPDATE ON cad_paciente
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exame_updated_at BEFORE UPDATE ON cad_exame
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNÇÃO PARA CRIAR PERFIL AUTOMATICAMENTE
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, nome, email)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'nome', NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- COMENTÁRIOS DAS TABELAS
-- ============================================================================

COMMENT ON TABLE profiles IS 'Perfis de usuários do sistema';
COMMENT ON TABLE cad_paciente IS 'Cadastro de pacientes';
COMMENT ON TABLE cad_exame IS 'Exames audiométricos realizados';
COMMENT ON TABLE cad_empresa IS 'Cadastro de empresas';
COMMENT ON TABLE cad_convenio IS 'Cadastro de convênios médicos';
COMMENT ON TABLE cad_profissional IS 'Cadastro de profissionais fonoaudiólogos';
COMMENT ON TABLE cad_meatoscopia IS 'Exames de meatoscopia';
COMMENT ON TABLE par_audiometro IS 'Configurações de audiômetros';
COMMENT ON TABLE par_imitanciometro IS 'Configurações de imitanciômetros';
