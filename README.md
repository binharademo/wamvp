# WinAudio MVP

Sistema de Gerenciamento Audiométrico - Minimum Viable Product

## 📋 Sobre o Projeto

O WinAudio é um sistema web moderno para gerenciamento de exames audiométricos, desenvolvido especificamente para fonoaudiólogos e clínicas especializadas.

## 🚀 Tecnologias

- **Frontend**: Next.js 14 + TypeScript + Material-UI
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deploy**: Vercel + Supabase
- **Versionamento**: GitHub + GitHub Actions

## 📦 Funcionalidades MVP

### ✅ Fase 1 - Core
- [ ] Autenticação de usuários
- [ ] Cadastro de pacientes
- [ ] Audiometria básica (via aérea)
- [ ] Visualização de audiogramas

### 🔄 Fase 2 - Exames
- [ ] Imitanciometria
- [ ] Relatórios em PDF
- [ ] Histórico de exames

### 📊 Fase 3 - Gestão
- [ ] Dashboard
- [ ] Cadastro de empresas/profissionais
- [ ] Filtros e buscas avançadas

## 🛠️ Instalação

```bash
# Clonar repositório
git clone https://github.com/binharademo/wamvp.git
cd wamvp

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Executar em desenvolvimento
npm run dev
```

## 📁 Estrutura do Projeto

```
wamvp/
├── mockup/                 # Protótipos HTML (atual)
├── src/                    # Código fonte Next.js (futuro)
├── docs/                   # Documentação
└── README.md
```

## 🔐 Segurança

- Dados médicos protegidos por LGPD
- Autenticação JWT via Supabase
- Row Level Security (RLS)
- Backup automático

## 📞 Contato

Desenvolvido para modernizar o atendimento audiológico.

---

**Status**: 🚧 Em desenvolvimento - MVP
