// src/servicos/api.ts

import { api } from '../hooks/useApi';
import type { DadosConsulta, DadosExame, Cliente, Atendimento } from '../tipos/api';

/**
 * Função auxiliar para buscar o código do especialista pelo nome.
 * A API Java não tem um endpoint para buscar por nome, então listamos todos e filtramos.
 */
async function getEspecialistaPorNome(nome: string): Promise<number> {
  const especialistas = await api.getEspecialistas();
  const especialista = especialistas.find(e => e.nome === nome);

  if (!especialista || !especialista.codigo) {
    // Se não encontrar, lança um erro para ser capturado no agendarConsulta
    throw new Error(`Especialista "${nome}" não encontrado ou sem código.`);
  }
  return especialista.codigo;
}

/**
 * Agenda uma consulta (função auxiliar para compatibilidade)
 * Converte os dados do formulário para o formato da API Java
 */
export async function agendarConsulta(dados: DadosConsulta): Promise<string> {
  try {
    // 1. Processar o cliente (validação de CPF e criação/obtenção)
    const cliente = await api.handleCliente({
      nome: dados.nomePaciente,
      cpf: dados.cpfPaciente,
      email: dados.emailPaciente,
      telefone1: dados.telefonePaciente,
      idade: dados.idade,
      dataNascimento: dados.dataNascimento,
      convenio: dados.convenio,
      numeroCarteirinha: dados.carteirinha,
    });

    if (!cliente.codigo) {
      throw new Error('Não foi possível obter o código do cliente.');
    }

    // 2. Obter o código do especialista pelo nome
    const especialistaCodigo = await getEspecialistaPorNome(dados.medico || '');

    // 3. Criar o atendimento (consulta)
    const atendimento = await api.addAtendimento({
      clienteCodigo: cliente.codigo,
      especialistaCodigo: especialistaCodigo,
      tipo: 'CONSULTA',
      dataAtendimento: `${dados.dataConsulta} ${dados.horarioConsulta}:00`, // Formato esperado: yyyy-MM-dd HH:mm:ss
      horario: dados.horarioConsulta, // Adicionado
      status: 'AGENDADO', // Adicionado
      especialidade: dados.especialidade,
      observacoes: dados.observacoes,
    });

    return `Consulta agendada com sucesso! Protocolo: ${atendimento.protocolo || atendimento.codigo}`;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Erro ao agendar consulta');
  }
}

/**
 * Agenda um exame (função auxiliar para compatibilidade)
 * Converte os dados do formulário para o formato da API Java
 */
export async function agendarExame(dados: DadosExame): Promise<string> {
  try {
    // 1. Processar o cliente (validação de CPF e criação/obtenção)
    const cliente = await api.handleCliente({
      nome: dados.nomePaciente,
      cpf: dados.cpfPaciente,
      email: dados.emailPaciente,
      telefone1: dados.telefonePaciente,
      idade: dados.idade,
      dataNascimento: dados.dataNascimento,
      convenio: dados.convenio,
      numeroCarteirinha: dados.carteirinha,
    });

    if (!cliente.codigo) {
      throw new Error('Não foi possível obter o código do cliente.');
    }

    // 2. Obter o código do especialista (usando um ID fixo para exames, já que não há seleção de médico)
    // O prompt não especifica como lidar com o especialista em exames. Usaremos o primeiro especialista encontrado.
    const especialistas = await api.getEspecialistas();
    const especialistaCodigo = especialistas[0]?.codigo || 1; // Fallback para 1

    // Define o horário baseado no período se não tiver horário específico
    let horario = dados.horarioExame || '08:00';
    if (dados.periodoExame === 'manha') {
      horario = '08:00';
    } else if (dados.periodoExame === 'tarde') {
      horario = '14:00';
    }

    // 3. Criar o atendimento (exame)
    const atendimento = await api.addAtendimento({
      clienteCodigo: cliente.codigo,
      especialistaCodigo: especialistaCodigo,
      tipo: 'EXAME',
      dataAtendimento: `${dados.dataExame} ${horario}:00`, // Formato esperado: yyyy-MM-dd HH:mm:ss
      horario: horario, // Adicionado
      status: 'AGENDADO', // Adicionado
      tipoExame: dados.tipoExame,
      observacoes: dados.observacoes,
    });

    return `Exame agendado com sucesso! Protocolo: ${atendimento.protocolo || atendimento.codigo}`;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Erro ao agendar exame');
  }
}

/**
 * Serviços de API exportados para uso direto
 */
export const consultasAPI = {
  async listar() {
    const atendimentos = await api.getAtendimentos();
    return atendimentos.filter(a => a.tipo === 'CONSULTA');
  },
  
  async buscarPorId(codigo: number) {
    return await api.getAtendimentoPorId(codigo);
  },
  
  async cancelar(codigo: number) {
    return await api.deleteAtendimento(codigo);
  },
};

export const examesAPI = {
  async listar() {
    const atendimentos = await api.getAtendimentos();
    return atendimentos.filter(a => a.tipo === 'EXAME');
  },
  
  async buscarPorId(codigo: number) {
    return await api.getAtendimentoPorId(codigo);
  },
  
  async cancelar(codigo: number) {
    return await api.deleteAtendimento(codigo);
  },
};

export const agendamentosAPI = {
  async listar() {
    return await api.getAtendimentos();
  },
  
  async buscarPorCPF(cpf: string) {
    // Busca o cliente pelo CPF e depois seus atendimentos
    const clientes = await api.getClientes();
    const cliente = clientes.find(c => c.cpf === cpf);
    
    if (!cliente || !cliente.codigo) {
      return [];
    }
    
    return await api.getAtendimentosPorCliente(cliente.codigo);
  },
  
  async buscarPorId(codigo: number) {
    return await api.getAtendimentoPorId(codigo);
  },
};
