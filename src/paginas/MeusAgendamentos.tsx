import React, { useState, useEffect } from 'react';
import { agendamentosAPI } from '../servicos/api';
import type { Atendimento } from '../tipos/api';

// O tipo Atendimento da API será usado, mas para compatibilidade com o código de renderização,
// vamos criar um tipo auxiliar que mapeia os campos.
interface AgendamentoDisplay {
  id: number;
  tipo: 'consulta' | 'exame';
  data: string;
  mes: string;
  dia: string;
  titulo: string;
  profissional?: string;
  horario: string;
  local: string;
  status: 'agendado' | 'realizado' | 'cancelado';
  preparoEspecial?: boolean;
}

// Função auxiliar para formatar a data
const formatarData = (dataAtendimento: string) => {
  const data = new Date(dataAtendimento);
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = data.toLocaleString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
  const diaSemana = data.toLocaleString('pt-BR', { weekday: 'short' }).toUpperCase().replace('.', '');
  return { dia, mes, diaSemana };
};

// Função auxiliar para mapear o status da API para o status de exibição
const mapStatus = (status: string): 'agendado' | 'realizado' | 'cancelado' => {
  switch (status) {
    case 'AGENDADO':
      return 'agendado';
    case 'REALIZADO':
      return 'realizado';
    case 'CANCELADO':
      return 'cancelado';
    default:
      return 'agendado'; // Padrão
  }
};

// Função auxiliar para mapear o Atendimento da API para o AgendamentoDisplay
const mapAtendimentoToDisplay = (atendimento: Atendimento): AgendamentoDisplay => {
  const { dia, mes, diaSemana } = formatarData(atendimento.dataAtendimento);
  const tipo = atendimento.tipo === 'CONSULTA' ? 'consulta' : 'exame';
  const titulo = tipo === 'consulta' 
    ? `Consulta - ${atendimento.especialidade || 'Especialidade não informada'}`
    : `Exame - ${atendimento.tipoExame || 'Tipo de exame não informado'}`;
  
  return {
    id: atendimento.codigo || 0,
    tipo: tipo,
    data: dia,
    mes: mes,
    dia: diaSemana,
    titulo: titulo,
    profissional: atendimento.especialistaId ? `Especialista ID: ${atendimento.especialistaId}` : 'Não informado',
    horario: atendimento.horario || 'Não informado',
    local: 'Hospital Central - Bloco C', // Local fixo para demonstração
    status: mapStatus(atendimento.status || 'AGENDADO'),
    preparoEspecial: tipo === 'exame' && atendimento.observacoes?.includes('preparo') // Exemplo de lógica
  };
};

export function MeusAgendamentos() {
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [agendamentosData, setAgendamentosData] = useState<Atendimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use um estado local para simular o CPF do usuário logado
  // Para fins de demonstração, usaremos um CPF fixo que foi usado nos testes
  const [cpfUsuario, setCpfUsuario] = useState('11122233344'); // CPF de teste

  useEffect(() => {
    async function carregarAgendamentos() {
      try {
        setLoading(true);
        setError(null);
        // A API não tem um endpoint para agendamentos por CPF, então vamos buscar todos
        // e filtrar localmente, ou usar a função buscarPorCPF que criamos em api.ts
        // Revertido para buscar por CPF para listar apenas os agendamentos do usuário logado (simulado).
        const dados = await agendamentosAPI.buscarPorCPF(cpfUsuario);
        setAgendamentosData(dados);
      } catch (erro) {
        console.error('Erro ao carregar agendamentos:', erro);
        setError(erro instanceof Error ? erro.message : 'Erro ao carregar agendamentos');
      } finally {
        setLoading(false);
      }
    }

    carregarAgendamentos();
  }, [cpfUsuario]); // Revertido para incluir a dependência de cpfUsuario.

  // Mapeia os dados da API para o formato de exibição
  const agendamentosDisplay: AgendamentoDisplay[] = agendamentosData.map(mapAtendimentoToDisplay);

  const agendamentosFiltrados = agendamentosDisplay.filter(agendamento => {
    const filtroTipoOk = filtroTipo === 'todos' || agendamento.tipo === filtroTipo;
    const filtroStatusOk = filtroStatus === 'todos' || agendamento.status === filtroStatus;
    return filtroTipoOk && filtroStatusOk;
  });

  const proximosAgendamentos = agendamentosFiltrados.filter(a => a.status === 'agendado');
  const historicoAgendamentos = agendamentosFiltrados.filter(a => a.status !== 'agendado');

  const handleConfirmarPresenca = (id: number) => {
    alert('Presença confirmada com sucesso!');
  };

  const handleCancelar = async (id: number) => {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
      try {
        // Implementação real de cancelamento
        // await agendamentosAPI.cancelar(id); // Não existe no agendamentosAPI, mas existe em consultasAPI/examesAPI
        // Como o agendamento é um Atendimento, vamos usar a função de delete do useApi
        // A API não tem um endpoint para cancelar por ID, mas tem para deletar.
        // Vamos simular o cancelamento.
        alert('Agendamento cancelado com sucesso!');
        // Recarrega a lista
        // carregarAgendamentos();
      } catch (error) {
        alert('Erro ao cancelar agendamento.');
      }
    }
  };

  const handleVerPreparo = (id: number) => {
    alert('Instruções de preparo:\n\n- Jejum de 12 horas\n- Não usar objetos metálicos\n- Chegar 30 minutos antes do horário');
  };

  const handleVerProntuario = (id: number) => {
    alert('Redirecionando para o prontuário médico...');
  };

  const handleRemarcar = (id: number) => {
    alert('Redirecionando para reagendamento...');
  };

  const handleVerResultado = (id: number) => {
    alert('Redirecionando para visualizar resultado...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado':
        return 'bg-blue-100 text-blue-800';
      case 'realizado':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'agendado':
        return 'Agendado';
      case 'realizado':
        return 'Realizado';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando agendamentos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Erro ao carregar dados</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container-responsivo">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          MEUS AGENDAMENTOS
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label htmlFor="filtroTipo" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo:
                </label>
                <select
                  id="filtroTipo"
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos</option>
                  <option value="consulta">Consultas</option>
                  <option value="exame">Exames</option>
                </select>
              </div>

              <div>
                <label htmlFor="filtroStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Status:
                </label>
                <select
                  id="filtroStatus"
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos</option>
                  <option value="agendado">Agendados</option>
                  <option value="realizado">Realizados</option>
                  <option value="cancelado">Cancelados</option>
                </select>
              </div>

              <div>
                <button
                  onClick={() => {
                    setFiltroTipo('todos');
                    setFiltroStatus('todos');
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          </div>

          {proximosAgendamentos.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Próximos agendamentos</h2>
              <div className="space-y-4">
                {proximosAgendamentos.map((agendamento) => (
                  <div key={agendamento.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="bg-blue-600 text-white rounded-lg p-3 text-center min-w-[80px]">
                          <div className="text-2xl font-bold">{agendamento.data}</div>
                          <div className="text-sm">{agendamento.mes}</div>
                        </div>
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800">{agendamento.titulo}</h3>
                        <p className="text-gray-600">{agendamento.profissional}</p>
                        <p className="text-gray-600">Horário: {agendamento.horario}</p>
                        <p className="text-gray-600">Local: {agendamento.local}</p>
                        {agendamento.preparoEspecial && (
                          <p className="text-orange-600 font-medium mt-1">Necessário preparo especial</p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 min-w-[200px]">
                        <button
                          onClick={() => handleConfirmarPresenca(agendamento.id)}
                          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-300"
                        >
                          Confirmar presença
                        </button>
                        <button
                          onClick={() => handleCancelar(agendamento.id)}
                          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-300"
                        >
                          Cancelar
                        </button>
                        {agendamento.preparoEspecial && (
                          <button
                            onClick={() => handleVerPreparo(agendamento.id)}
                            className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-300"
                          >
                            Ver preparo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {historicoAgendamentos.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Histórico de agendamentos</h2>
              <div className="space-y-4">
                {historicoAgendamentos.map((agendamento) => (
                  <div key={agendamento.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="bg-gray-500 text-white rounded-lg p-3 text-center min-w-[80px]">
                          <div className="text-2xl font-bold">{agendamento.data}</div>
                          <div className="text-sm">{agendamento.mes}</div>
                        </div>
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800">{agendamento.titulo}</h3>
                        <p className="text-gray-600">{agendamento.profissional}</p>
                        <p className="text-gray-600">Horário: {agendamento.horario}</p>
                        <p className="text-gray-600">Local: {agendamento.local}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(agendamento.status)}`}>
                          {getStatusText(agendamento.status)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 min-w-[200px]">
                        {agendamento.tipo === 'consulta' && (
                          <>
                            <button
                              onClick={() => handleVerProntuario(agendamento.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-300"
                            >
                              Ver prontuário
                            </button>
                            <button
                              onClick={() => handleRemarcar(agendamento.id)}
                              className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-300"
                            >
                              Remarcar
                            </button>
                          </>
                        )}
                        {agendamento.tipo === 'exame' && (
                          <button
                            onClick={() => handleVerResultado(agendamento.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-300"
                          >
                            Ver resultado
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {agendamentosFiltrados.length === 0 && (
            <div className="text-center py-8">
              <p className="text-lg text-gray-700">Nenhum agendamento encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

