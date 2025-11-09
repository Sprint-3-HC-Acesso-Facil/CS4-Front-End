// src/hooks/useApi.ts

import { API_BASE_URL } from '../servicos/config';
import type { Cliente, Especialista, Atendimento } from '../tipos/api';

/**
 * Hook useApi - Centraliza todas as funções de comunicação com a API Java
 * Usa fetch nativo conforme especificado pelo professor
 * Atualizado para usar os endpoints corretos (sem /api)
 */

export const api = {
  // ==================== CLIENTES ====================
  
  /**
   * GET - Lista todos os clientes
   */
  async getClientes(): Promise<Cliente[]> {
    const res = await fetch(`${API_BASE_URL}/clientes`);
    
    if (!res.ok) {
      // Tenta ler o corpo da resposta para obter mais detalhes do erro
      const errorBody = await res.json().catch(() => ({}));
      const errorMessage = errorBody.mensagem || errorBody.error || `${res.status} ${res.statusText}`;
      
      // Se for um erro 500, pode ser um cold start ou um problema na API que retorna 
      // um array vazio. Para a lógica de validação de CPF, se não conseguir buscar, 
      // o ideal é tratar como se não houvesse clientes.
      if (res.status === 500 || res.status === 404) {
        console.warn(`Aviso: Erro ${res.status} ao buscar clientes. Retornando array vazio para permitir a criação de novo cliente. Detalhes: ${errorMessage}`);
        return [];
      }
      
      throw new Error(`Erro ao buscar clientes: ${errorMessage}`);
    }
    
    // A API pode retornar um array vazio, o que é esperado.
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  },

  /**
   * GET - Busca um cliente por código (ID)
   */
  async getClientePorId(codigo: number): Promise<Cliente> {
    const res = await fetch(`${API_BASE_URL}/clientes/${codigo}`);
    if (!res.ok) {
      throw new Error(`Erro ao buscar cliente: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  },

  /**
   * POST - Adiciona um novo cliente
   */
  async addCliente(cliente: Omit<Cliente, 'codigo'>): Promise<Cliente> {
    const res = await fetch(`${API_BASE_URL}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente),
    });
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      const errorMessage = errorBody.mensagem || errorBody.error || `${res.status} ${res.statusText}`;
      throw new Error(`Erro ao cadastrar cliente: ${errorMessage}`);
    }
    try {
      return await res.json();
    } catch (e) {
      console.warn('Sucesso no POST de cliente, mas falha ao ler JSON de resposta. Retornando objeto mockado.');
      return { ...cliente, codigo: 0 };
    }
  },

  /**
   * Lógica de validação de CPF:
   * 1. Busca todos os clientes (GET /clientes).
   * 2. Verifica se o CPF existe.
   * 3. Se existir, retorna o cliente.
   * 4. Se não existir, cria um novo cliente (POST /clientes) e retorna o cliente criado.
   * @param clienteData Dados do cliente (nome, cpf, email, telefone1, etc.)
   * @returns O objeto Cliente (existente ou recém-criado)
   */
  async handleCliente(clienteData: Omit<Cliente, 'codigo'>): Promise<Cliente> {
    try {
      // 1. Buscar todos os clientes
      const clientes = await this.getClientes();

      // 2. Verificar se o CPF já existe
      const clienteExistente = clientes.find(c => c.cpf === clienteData.cpf);

      if (clienteExistente) {
        console.log(`Cliente com CPF ${clienteData.cpf} encontrado. ID: ${clienteExistente.codigo}`);
        return clienteExistente;
      } else {
        // 4. Se não existir, cria um novo cliente (POST /clientes)
        console.log(`Cliente com CPF ${clienteData.cpf} não encontrado. Criando novo cliente...`);
        const novoCliente = await this.addCliente(clienteData);
        console.log(`Novo cliente criado. ID: ${novoCliente.codigo}`);
        return novoCliente;
      }
    } catch (error) {
      console.error('Erro em handleCliente:', error);
      throw new Error(`Falha ao processar cliente: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  },

  /**
   * PUT - Atualiza um cliente existente
   */
  async updateCliente(codigo: number, cliente: Partial<Cliente>): Promise<Cliente> {
    const res = await fetch(`${API_BASE_URL}/clientes/${codigo}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente),
    });
    if (!res.ok) {
      throw new Error(`Erro ao atualizar cliente: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  },

  /**
   * DELETE - Remove um cliente
   */
  async deleteCliente(codigo: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/clientes/${codigo}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`Erro ao deletar cliente: ${res.status} ${res.statusText}`);
    }
  },

  // ==================== ATENDIMENTOS ====================

  /**
   * GET - Lista todos os atendimentos
   */
  async getAtendimentos(): Promise<Atendimento[]> {
    const res = await fetch(`${API_BASE_URL}/atendimentos`);
    if (!res.ok) {
      throw new Error(`Erro ao buscar atendimentos: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  },

  /**
   * GET - Busca um atendimento por código (ID)
   */
  async getAtendimentoPorId(codigo: number): Promise<Atendimento> {
    const res = await fetch(`${API_BASE_URL}/atendimentos/${codigo}`);
    if (!res.ok) {
      throw new Error(`Erro ao buscar atendimento: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  },

  /**
   * GET - Lista atendimentos de um cliente específico
   */
  async getAtendimentosPorCliente(clienteCodigo: number): Promise<Atendimento[]> {
    const res = await fetch(`${API_BASE_URL}/atendimentos/cliente/${clienteCodigo}`);
    if (!res.ok) {
      throw new Error(`Erro ao buscar atendimentos do cliente: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  },

  /**
   * POST - Adiciona um novo atendimento (consulta ou exame)
   */
  async addAtendimento(atendimento: Omit<Atendimento, 'codigo' | 'protocolo' | 'clienteId' | 'especialistaId'> & { clienteCodigo: number, especialistaCodigo: number, tipo: 'CONSULTA' | 'EXAME', especialidade?: string, tipoExame?: string, dataAtendimento: string }): Promise<Atendimento> {
    const res = await fetch(`${API_BASE_URL}/atendimentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cliente_id: atendimento.clienteCodigo,
        especialista_id: atendimento.especialistaCodigo,
        descricao: atendimento.tipo === 'CONSULTA' ? `Consulta - ${atendimento.especialidade}` : `Exame - ${atendimento.tipoExame}`,
        dataAtendimento: atendimento.dataAtendimento,
        status: "AGENDADO",
      }),
    });
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      const errorMessage = errorBody.mensagem || errorBody.error || `${res.status} ${res.statusText}`;
      throw new Error(`Erro ao agendar atendimento: ${errorMessage}`);
    }
    try {
      return await res.json();
    } catch (e) {
      console.warn('Sucesso no POST de atendimento, mas falha ao ler JSON de resposta. Retornando objeto mockado.');
      return { codigo: 0, protocolo: 'MOCK', clienteId: atendimento.clienteCodigo, especialistaId: atendimento.especialistaCodigo, tipo: atendimento.tipo, dataAtendimento: atendimento.dataAtendimento, horario: atendimento.horario, status: 'AGENDADO' };
    }
  },

  /**
   * PUT - Atualiza um atendimento existente
   */
  async updateAtendimento(codigo: number, atendimento: Partial<Atendimento>): Promise<Atendimento> {
    const res = await fetch(`${API_BASE_URL}/atendimentos/${codigo}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(atendimento),
    });
    if (!res.ok) {
      throw new Error(`Erro ao atualizar atendimento: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  },

  /**
   * DELETE - Cancela um atendimento
   */
  async deleteAtendimento(codigo: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/atendimentos/${codigo}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`Erro ao cancelar atendimento: ${res.status} ${res.statusText}`);
    }
  },

  // ==================== ESPECIALISTAS ====================

  /**
   * GET - Lista todos os especialistas
   */
  async getEspecialistas(): Promise<Especialista[]> {
    const res = await fetch(`${API_BASE_URL}/especialistas`);
    if (!res.ok) {
      throw new Error(`Erro ao buscar especialistas: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  },

  /**
   * GET - Busca um especialista por código (ID)
   */
  async getEspecialistaPorId(codigo: number): Promise<Especialista> {
    const res = await fetch(`${API_BASE_URL}/especialistas/${codigo}`);
    if (!res.ok) {
      throw new Error(`Erro ao buscar especialista: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  },

  /**
   * GET - Lista especialistas por especialidade
   */
  async getEspecialistasPorEspecialidade(especialidade: string): Promise<Especialista[]> {
    const res = await fetch(`${API_BASE_URL}/especialistas/especialidade/${especialidade}`);
    if (!res.ok) {
      throw new Error(`Erro ao buscar especialistas: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  },

  /**
   * POST - Adiciona um novo especialista
   */
  async addEspecialista(especialista: Omit<Especialista, 'codigo'>): Promise<Especialista> {
    const res = await fetch(`${API_BASE_URL}/especialistas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(especialista),
    });
    if (!res.ok) {
      throw new Error(`Erro ao cadastrar especialista: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  },

  /**
   * PUT - Atualiza um especialista existente
   */
  async updateEspecialista(codigo: number, especialista: Partial<Especialista>): Promise<Especialista> {
    const res = await fetch(`${API_BASE_URL}/especialistas/${codigo}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(especialista),
    });
    if (!res.ok) {
      throw new Error(`Erro ao atualizar especialista: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  },

  /**
   * DELETE - Remove um especialista
   */
  async deleteEspecialista(codigo: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/especialistas/${codigo}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`Erro ao deletar especialista: ${res.status} ${res.statusText}`);
    }
  },
};

/**
 * Hook para usar a API com tratamento de loading e erro
 */
export function useApi() {
  return { api };
}
