import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados WinAudio
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          nome: string
          email: string
          tipo_usuario: 'admin' | 'fonoaudiologo' | 'assistente'
          crfa: string | null
          telefone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          nome: string
          email: string
          tipo_usuario?: 'admin' | 'fonoaudiologo' | 'assistente'
          crfa?: string | null
          telefone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          email?: string
          tipo_usuario?: 'admin' | 'fonoaudiologo' | 'assistente'
          crfa?: string | null
          telefone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cad_paciente: {
        Row: {
          pac_codigo: string
          pac_nome: string
          pac_sexo: 'M' | 'F' | null
          pac_nascimento: string | null
          pac_idade: number | null
          pac_endereco: string | null
          pac_bairro: string | null
          pac_cidade: string | null
          pac_uf: string | null
          pac_cep: string | null
          pac_telefone: string | null
          pac_celular: string | null
          pac_email: string | null
          pac_cpf: string | null
          pac_rg: string | null
          pac_empresa: string | null
          pac_cargo: string | null
          pac_setor: string | null
          pac_admissao: string | null
          pac_demissao: string | null
          pac_convenio: string | null
          pac_carteirinha: string | null
          pac_validade: string | null
          pac_obs: string | null
          pac_ctps: string | null
          created_at: string
          created_by: string
          updated_at: string
        }
        Insert: {
          pac_codigo?: string
          pac_nome: string
          pac_sexo?: 'M' | 'F' | null
          pac_nascimento?: string | null
          pac_idade?: number | null
          pac_endereco?: string | null
          pac_bairro?: string | null
          pac_cidade?: string | null
          pac_uf?: string | null
          pac_cep?: string | null
          pac_telefone?: string | null
          pac_celular?: string | null
          pac_email?: string | null
          pac_cpf?: string | null
          pac_rg?: string | null
          pac_empresa?: string | null
          pac_cargo?: string | null
          pac_setor?: string | null
          pac_admissao?: string | null
          pac_demissao?: string | null
          pac_convenio?: string | null
          pac_carteirinha?: string | null
          pac_validade?: string | null
          pac_obs?: string | null
          pac_ctps?: string | null
          created_at?: string
          created_by: string
          updated_at?: string
        }
        Update: {
          pac_codigo?: string
          pac_nome?: string
          pac_sexo?: 'M' | 'F' | null
          pac_nascimento?: string | null
          pac_idade?: number | null
          pac_endereco?: string | null
          pac_bairro?: string | null
          pac_cidade?: string | null
          pac_uf?: string | null
          pac_cep?: string | null
          pac_telefone?: string | null
          pac_celular?: string | null
          pac_email?: string | null
          pac_cpf?: string | null
          pac_rg?: string | null
          pac_empresa?: string | null
          pac_cargo?: string | null
          pac_setor?: string | null
          pac_admissao?: string | null
          pac_demissao?: string | null
          pac_convenio?: string | null
          pac_carteirinha?: string | null
          pac_validade?: string | null
          pac_obs?: string | null
          pac_ctps?: string | null
          created_at?: string
          created_by?: string
          updated_at?: string
        }
      }
      cad_exame: {
        Row: {
          id: string
          pac_codigo: string
          ex_data: string
          ex_hora: string
          ex_tipo: number
          ex_profissional: string | null
          ex_cabine: boolean | null
          ex_audiometro: string | null
          ex_calibracao: string | null
          ex_repouso: number | null
          ex_queixa: string | null
          ex_observacao: string | null
          ex_conclusao: string | null
          ex_conduta: string | null
          // Via Aérea OD
          ex_va_od_250: number | null
          ex_va_od_500: number | null
          ex_va_od_1000: number | null
          ex_va_od_2000: number | null
          ex_va_od_3000: number | null
          ex_va_od_4000: number | null
          ex_va_od_6000: number | null
          ex_va_od_8000: number | null
          // Via Aérea OE
          ex_va_oe_250: number | null
          ex_va_oe_500: number | null
          ex_va_oe_1000: number | null
          ex_va_oe_2000: number | null
          ex_va_oe_3000: number | null
          ex_va_oe_4000: number | null
          ex_va_oe_6000: number | null
          ex_va_oe_8000: number | null
          // Via Óssea OD
          ex_vo_od_250: number | null
          ex_vo_od_500: number | null
          ex_vo_od_1000: number | null
          ex_vo_od_2000: number | null
          ex_vo_od_3000: number | null
          ex_vo_od_4000: number | null
          // Via Óssea OE
          ex_vo_oe_250: number | null
          ex_vo_oe_500: number | null
          ex_vo_oe_1000: number | null
          ex_vo_oe_2000: number | null
          ex_vo_oe_3000: number | null
          ex_vo_oe_4000: number | null
          created_at: string
          created_by: string
          updated_at: string
        }
        Insert: {
          id?: string
          pac_codigo: string
          ex_data?: string
          ex_hora?: string
          ex_tipo?: number
          ex_profissional?: string | null
          ex_cabine?: boolean | null
          ex_audiometro?: string | null
          ex_calibracao?: string | null
          ex_repouso?: number | null
          ex_queixa?: string | null
          ex_observacao?: string | null
          ex_conclusao?: string | null
          ex_conduta?: string | null
          // Via Aérea OD
          ex_va_od_250?: number | null
          ex_va_od_500?: number | null
          ex_va_od_1000?: number | null
          ex_va_od_2000?: number | null
          ex_va_od_3000?: number | null
          ex_va_od_4000?: number | null
          ex_va_od_6000?: number | null
          ex_va_od_8000?: number | null
          // Via Aérea OE
          ex_va_oe_250?: number | null
          ex_va_oe_500?: number | null
          ex_va_oe_1000?: number | null
          ex_va_oe_2000?: number | null
          ex_va_oe_3000?: number | null
          ex_va_oe_4000?: number | null
          ex_va_oe_6000?: number | null
          ex_va_oe_8000?: number | null
          // Via Óssea OD
          ex_vo_od_250?: number | null
          ex_vo_od_500?: number | null
          ex_vo_od_1000?: number | null
          ex_vo_od_2000?: number | null
          ex_vo_od_3000?: number | null
          ex_vo_od_4000?: number | null
          // Via Óssea OE
          ex_vo_oe_250?: number | null
          ex_vo_oe_500?: number | null
          ex_vo_oe_1000?: number | null
          ex_vo_oe_2000?: number | null
          ex_vo_oe_3000?: number | null
          ex_vo_oe_4000?: number | null
          created_at?: string
          created_by: string
          updated_at?: string
        }
        Update: {
          id?: string
          pac_codigo?: string
          ex_data?: string
          ex_hora?: string
          ex_tipo?: number
          ex_profissional?: string | null
          ex_cabine?: boolean | null
          ex_audiometro?: string | null
          ex_calibracao?: string | null
          ex_repouso?: number | null
          ex_queixa?: string | null
          ex_observacao?: string | null
          ex_conclusao?: string | null
          ex_conduta?: string | null
          // Via Aérea OD
          ex_va_od_250?: number | null
          ex_va_od_500?: number | null
          ex_va_od_1000?: number | null
          ex_va_od_2000?: number | null
          ex_va_od_3000?: number | null
          ex_va_od_4000?: number | null
          ex_va_od_6000?: number | null
          ex_va_od_8000?: number | null
          // Via Aérea OE
          ex_va_oe_250?: number | null
          ex_va_oe_500?: number | null
          ex_va_oe_1000?: number | null
          ex_va_oe_2000?: number | null
          ex_va_oe_3000?: number | null
          ex_va_oe_4000?: number | null
          ex_va_oe_6000?: number | null
          ex_va_oe_8000?: number | null
          // Via Óssea OD
          ex_vo_od_250?: number | null
          ex_vo_od_500?: number | null
          ex_vo_od_1000?: number | null
          ex_vo_od_2000?: number | null
          ex_vo_od_3000?: number | null
          ex_vo_od_4000?: number | null
          // Via Óssea OE
          ex_vo_oe_250?: number | null
          ex_vo_oe_500?: number | null
          ex_vo_oe_1000?: number | null
          ex_vo_oe_2000?: number | null
          ex_vo_oe_3000?: number | null
          ex_vo_oe_4000?: number | null
          created_at?: string
          created_by?: string
          updated_at?: string
        }
      }
      cad_empresa: {
        Row: {
          emp_codigo: string
          emp_nome: string
          emp_nome_reduzido: string | null
          emp_endereco: string | null
          emp_bairro: string | null
          emp_cidade: string | null
          emp_uf: string | null
          emp_cep: string | null
          emp_telefone: string | null
          emp_fax: string | null
          emp_email: string | null
          emp_contato: string | null
          emp_cnpj: string | null
          emp_ie: string | null
          emp_obs: string | null
          emp_ramo: string | null
          emp_cnae: string | null
          emp_gfip: string | null
          emp_grau_risco: number | null
          emp_convenio: string | null
          created_at: string
          created_by: string
        }
        Insert: {
          emp_codigo?: string
          emp_nome: string
          emp_nome_reduzido?: string | null
          emp_endereco?: string | null
          emp_bairro?: string | null
          emp_cidade?: string | null
          emp_uf?: string | null
          emp_cep?: string | null
          emp_telefone?: string | null
          emp_fax?: string | null
          emp_email?: string | null
          emp_contato?: string | null
          emp_cnpj?: string | null
          emp_ie?: string | null
          emp_obs?: string | null
          emp_ramo?: string | null
          emp_cnae?: string | null
          emp_gfip?: string | null
          emp_grau_risco?: number | null
          emp_convenio?: string | null
          created_at?: string
          created_by: string
        }
        Update: {
          emp_codigo?: string
          emp_nome?: string
          emp_nome_reduzido?: string | null
          emp_endereco?: string | null
          emp_bairro?: string | null
          emp_cidade?: string | null
          emp_uf?: string | null
          emp_cep?: string | null
          emp_telefone?: string | null
          emp_fax?: string | null
          emp_email?: string | null
          emp_contato?: string | null
          emp_cnpj?: string | null
          emp_ie?: string | null
          emp_obs?: string | null
          emp_ramo?: string | null
          emp_cnae?: string | null
          emp_gfip?: string | null
          emp_grau_risco?: number | null
          emp_convenio?: string | null
          created_at?: string
          created_by?: string
        }
      }
    }
  }
}

// Tipos auxiliares para uso na aplicação
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Paciente = Database['public']['Tables']['cad_paciente']['Row']
export type Exame = Database['public']['Tables']['cad_exame']['Row']
export type Empresa = Database['public']['Tables']['cad_empresa']['Row']

// Tipos para inserção
export type PacienteInsert = Database['public']['Tables']['cad_paciente']['Insert']
export type ExameInsert = Database['public']['Tables']['cad_exame']['Insert']
export type EmpresaInsert = Database['public']['Tables']['cad_empresa']['Insert']
