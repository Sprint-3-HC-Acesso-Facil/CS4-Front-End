// src/servicos/config.ts

/**
 * Configurações da API Java hospedada no Render
 */

// URL base da API Java (SEM /api no final)
export const API_BASE_URL = 'https://hc-acesso-facil.onrender.com';

// Timeout para requisições (em milissegundos)
export const API_TIMEOUT = 30000; // 30 segundos

// Número máximo de tentativas em caso de erro
export const MAX_RETRIES = 3;

// Delay entre tentativas (em milissegundos)
export const RETRY_DELAY = 2000; // 2 segundos

// Headers padrão para requisições
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Endpoints da API Java (caminhos diretos sem /api)
export const ENDPOINTS = {
  // Clientes (Pacientes)
  CLIENTES: '/clientes',
  CLIENTE_POR_ID: (id: string | number) => `/clientes/${id}`,
  
  // Atendimentos (Consultas e Exames)
  ATENDIMENTOS: '/atendimentos',
  ATENDIMENTO_POR_ID: (id: string | number) => `/atendimentos/${id}`,
  ATENDIMENTOS_POR_CLIENTE: (clienteId: string | number) => `/atendimentos/cliente/${clienteId}`,
  
  // Especialistas (Médicos)
  ESPECIALISTAS: '/especialistas',
  ESPECIALISTA_POR_ID: (id: string | number) => `/especialistas/${id}`,
  ESPECIALISTAS_POR_ESPECIALIDADE: (especialidade: string) => `/especialistas/especialidade/${especialidade}`,
};
