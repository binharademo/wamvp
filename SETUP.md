# Configuração do Ambiente de Desenvolvimento - WinAudio MVP

## 1. Configuração das Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://elajvadnwwwboxhszglx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsYWp2YWRud3d3b294aHN6Z2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMjcwODUsImV4cCI6MjA2NTYwMzA4NX0.zkveYi4TQbsXNzTrOAzCJ8DljC_hd-NrB4zHxNWJCgs
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsYWp2YWRud3d3b294aHN6Z2x4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDAyNzA4NSwiZXhwIjoyMDY1NjAzMDg1fQ.jgSgMxyNNXTlL_cQD-23QXPYq9y7hEL3MIdFMAhLc0c

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

## 2. Instalação das Dependências

Execute o comando para instalar todas as dependências:

```bash
npm install
```

## 3. Configuração do Banco de Dados Supabase

### Opção A: Usando o Dashboard do Supabase (Recomendado)

1. Acesse: https://supabase.com/dashboard/project/elajvadnwwwboxhszglx
2. Vá para "SQL Editor"
3. Cole o conteúdo do arquivo `supabase/schema.sql`
4. Execute o script

### Opção B: Usando Supabase CLI (Avançado)

1. Instale o Supabase CLI:
```bash
npm install -g supabase
```

2. Faça login no Supabase:
```bash
supabase login
```

3. Link com o projeto remoto:
```bash
supabase link --project-ref elajvadnwwwboxhszglx
```

4. Execute as migrações:
```bash
supabase db push
```

## 4. Executar o Projeto

Após configurar tudo, execute:

```bash
npm run dev
```

O projeto estará disponível em: http://localhost:3000

## 5. Estrutura do Banco de Dados

O banco foi configurado com as seguintes tabelas principais:

- **profiles**: Perfis de usuários (fonoaudiólogos, assistentes, admin)
- **cad_paciente**: Cadastro de pacientes
- **cad_exame**: Exames audiométricos
- **cad_empresa**: Cadastro de empresas
- **cad_convenio**: Cadastro de convênios
- **cad_profissional**: Cadastro de profissionais
- **par_audiometro**: Configurações de equipamentos

## 6. Autenticação

O sistema usa Supabase Auth com:
- Login por email/senha
- Perfis de usuário (admin, fonoaudiologo, assistente)
- Row Level Security (RLS) para isolamento de dados

## 7. Próximos Passos

1. Configurar autenticação no frontend
2. Criar páginas de cadastro de pacientes
3. Implementar formulários de exames
4. Desenvolver dashboard com gráficos
5. Adicionar geração de relatórios PDF

## Troubleshooting

### Erro de módulo não encontrado
Se aparecer erro sobre `@supabase/supabase-js`, execute:
```bash
npm install @supabase/supabase-js
```

### Erro de tipos Node.js
Se aparecer erro sobre tipos do Node.js, execute:
```bash
npm install --save-dev @types/node
```

### Problemas de conexão com Supabase
Verifique se as variáveis de ambiente estão corretas no arquivo `.env.local`
