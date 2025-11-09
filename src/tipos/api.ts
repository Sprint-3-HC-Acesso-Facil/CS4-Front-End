// src/tipos/api.ts

/**
 * Tipos para integração com a API Java do Hospital
 * Atualizados conforme estrutura real da API
 */

// Tipos para Cliente (Paciente) - Estrutura real da API
export interface Cliente {
  codigo?: number;  // API usa "codigo" ao invés de "id"
  nome: string;
  cpf: string;
  email: string;
  idade?: number;
  telefone1: string;  // API usa "telefone1" ao invés de "telefone"
  dataNascimento?: string;
  endereco?: string;
  convenio?: string;
  numeroCarteirinha?: string;
  dataCadastro?: string;
}

// Tipos para Especialista (Médico) - Estrutura real da API
export interface Especialista {
  codigo?: number;  // API usa "codigo" ao invés de "id"
  nome: string;
  cpf: string;
  email: string;
  idade?: number;
  telefone1: string;  // API usa "telefone1" ao invés de "telefone"
  crm: string;
  especialidade: string;
  disponivel?: boolean;
}

// Tipos para Atendimento (Consulta/Exame) - Estrutura esperada
export interface Atendimento {
  codigo?: number;  // API usa "codigo" ao invés de "id"
  clienteId?: number;
  clienteCodigo?: number;  // Pode usar "codigo" também
  especialistaId?: number;
  especialistaCodigo?: number;
  tipo: 'CONSULTA' | 'EXAME';
  dataAtendimento: string;
  horario: string;
  status: 'AGENDADO' | 'CONFIRMADO' | 'REALIZADO' | 'CANCELADO';
  especialidade?: string;
  tipoExame?: string;
  observacoes?: string;
  protocolo?: string;
}

// Tipos para respostas de erro da API
export interface ErroAPI {
  mensagem: string;
  codigo?: string;
  detalhes?: string[];
  timestamp?: string;
}

// Tipo para resposta genérica da API
export interface RespostaAPI<T = any> {
  sucesso: boolean;
  dados?: T;
  erro?: ErroAPI;
  mensagem?: string;
}

// Tipos para listagem com paginação
export interface ListagemPaginada<T> {
  dados: T[];
  total: number;
  pagina: number;
  porPagina: number;
  totalPaginas: number;
}

// Tipos para formulários (compatibilidade com código existente)
export interface DadosConsulta {
  nomePaciente: string;
  cpfPaciente: string;
  dataNascimento?: string;
  telefonePaciente: string;
  emailPaciente: string;
  convenio?: string;
  carteirinha?: string;
  especialidade: string;
  medico?: string;
  dataConsulta: string;
  horarioConsulta: string;
  observacoes?: string;
  idade?: number;
}

export interface DadosExame {
  nomePaciente: string;
  cpfPaciente: string;
  dataNascimento?: string;
  telefonePaciente: string;
  emailPaciente: string;
  convenio?: string;
  carteirinha?: string;
  tipoExame: string;
  dataExame: string;
  horarioExame?: string;
  periodoExame?: string;
  observacoes?: string;
  preparo?: string | string[];
  pedidoMedico?: File | null;
  idade?: number;
}

export interface ConsultaResponse {
  codigo?: number;
  protocolo?: string;
  mensagem: string;
  dados?: DadosConsulta;
}

export interface ExameResponse {
  codigo?: number;
  protocolo?: string;
  mensagem: string;
  dados?: DadosExame;
}

// Tipo para agendamento (compatibilidade)
export interface Agendamento {
  id: string;
  tipo: 'consulta' | 'exame';
  protocolo: string;
  nomePaciente: string;
  data: string;
  horario: string;
  status: 'agendado' | 'confirmado' | 'cancelado' | 'realizado';
  especialidade?: string;
  medico?: string;
  tipoExame?: string;
}
