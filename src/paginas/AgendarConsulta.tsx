import React, { useState, useEffect } from 'react';
import { agendarConsulta } from '../servicos/api';
import { useApi } from '../hooks/useApi';
import type { Especialista } from '../tipos/api';

export function AgendarConsulta() {
  const initialFormData = {
    nomePaciente: '',
    cpfPaciente: '',
    dataNascimento: '',
    telefonePaciente: '',
    emailPaciente: '',
    convenio: '',
    carteirinha: '',
    especialidade: '',
    medico: '',
    dataConsulta: '',
    horarioConsulta: '',
    observacoes: ''
  };
  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { api } = useApi();
  const [medicosDisponiveis, setMedicosDisponiveis] = useState<Especialista[]>([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([]);
  const [todosEspecialistas, setTodosEspecialistas] = useState<Especialista[]>([]);
  const [loadingEspecialistas, setLoadingEspecialistas] = useState(true);

  const especialidades = [
    { value: 'cardiologia', label: 'Cardiologia' },
    { value: 'dermatologia', label: 'Dermatologia' },
    { value: 'endocrinologia', label: 'Endocrinologia' },
    { value: 'ginecologia', label: 'Ginecologia' },
    { value: 'neurologia', label: 'Neuroloia' },
    { value: 'oftalmologia', label: 'Oftalmologia' },
    { value: 'ortopedia', label: 'Ortopedia' },
    { value: 'pediatria', label: 'Pediatria' },
    { value: 'psiquiatria', label: 'Psiquiatria' }
  ];

  const convenios = [
    { value: 'sus', label: 'SUS' },
    { value: 'amil', label: 'Amil' },
    { value: 'bradesco', label: 'Bradesco Saúde' },
    { value: 'unimed', label: 'Unimed' },
    { value: 'sulamerica', label: 'SulAmérica' },
    { value: 'particular', label: 'Particular' }
  ];

  // Removendo o mock de médicos, pois usaremos a API
  // const medicos = { ... };

  const horarios = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  useEffect(() => {
    async function fetchEspecialistas() {
      try {
        const data = await api.getEspecialistas();
        setTodosEspecialistas(data);
      } catch (err) {
        console.error('Erro ao carregar especialistas:', err);
        setError('Não foi possível carregar a lista de especialistas.');
      } finally {
        setLoadingEspecialistas(false);
      }
    }
    fetchEspecialistas();
  }, [api]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'especialidade') {
      const especialidadeSelecionada = value;
      const medicosFiltrados = todosEspecialistas.filter(e => e.especialidade.toLowerCase() === especialidadeSelecionada.toLowerCase());
      setMedicosDisponiveis(medicosFiltrados);
      setFormData(prev => ({ ...prev, medico: '', horarioConsulta: '' }));
      setHorariosDisponiveis([]);
    }

    if (name === 'medico' && value) {
      setHorariosDisponiveis(horarios);
      setFormData(prev => ({ ...prev, horarioConsulta: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await agendarConsulta(formData);
      setSuccessMessage(response);
      // Opcional: Limpar o formulário após o sucesso
      // setFormData({ ...initialFormData });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido ao agendar a consulta.');
    } finally {
      setLoading(false);
    }
  };

  return (
	    <div className="min-h-screen bg-gray-100 py-6">
	      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          AGENDAR CONSULTA
        </h1>
        
  	        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
	          {successMessage && (
	            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
	              <p className="font-bold">Sucesso!</p>
	              <p>{successMessage}</p>
	            </div>
	          )}
	          {error && (
	            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
	              <p className="font-bold">Erro!</p>
	              <p>{error}</p>
	            </div>
	          )}
		          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Dados do Paciente</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nomePaciente" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo:
                  </label>
                  <input
                    type="text"
                    id="nomePaciente"
                    name="nomePaciente"
                    value={formData.nomePaciente}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="cpfPaciente" className="block text-sm font-medium text-gray-700 mb-1">
                    CPF:
                  </label>
                  <input
                    type="text"
                    id="cpfPaciente"
                    name="cpfPaciente"
                    value={formData.cpfPaciente}
                    onChange={handleInputChange}
                    placeholder="000.000.000-00"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700 mb-1">
                    Data de nascimento:
                  </label>
                  <input
                    type="date"
                    id="dataNascimento"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="telefonePaciente" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone:
                  </label>
                  <input
                    type="tel"
                    id="telefonePaciente"
                    name="telefonePaciente"
                    value={formData.telefonePaciente}
                    onChange={handleInputChange}
                    placeholder="(00) 00000-0000"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="emailPaciente" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail:
                  </label>
                  <input
                    type="email"
                    id="emailPaciente"
                    name="emailPaciente"
                    value={formData.emailPaciente}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="convenio" className="block text-sm font-medium text-gray-700 mb-1">
                    Convênio:
                  </label>
                  <select
                    id="convenio"
                    name="convenio"
                    value={formData.convenio}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione uma opção</option>
                    {convenios.map(convenio => (
                      <option key={convenio.value} value={convenio.value}>
                        {convenio.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="carteirinha" className="block text-sm font-medium text-gray-700 mb-1">
                    Número da carteirinha:
                  </label>
                  <input
                    type="text"
                    id="carteirinha"
                    name="carteirinha"
                    value={formData.carteirinha}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Dados da Consulta</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="especialidade" className="block text-sm font-medium text-gray-700 mb-1">
                    Especialidade:
                  </label>
                  <select
                    id="especialidade"
                    name="especialidade"
                    value={formData.especialidade}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione uma especialidade</option>
                    {especialidades.map(especialidade => (
                      <option key={especialidade.value} value={especialidade.value}>
                        {especialidade.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="medico" className="block text-sm font-medium text-gray-700 mb-1">
                    Médico:
                  </label>
                  <select
                    id="medico"
                    name="medico"
                    value={formData.medico}
                    onChange={handleInputChange}
                    disabled={!formData.especialidade || loadingEspecialistas}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">{loadingEspecialistas ? 'Carregando...' : 'Selecione um médico'}</option>
                    {medicosDisponiveis.map(medico => (
                      <option key={medico.codigo} value={medico.nome}>
                        {medico.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="dataConsulta" className="block text-sm font-medium text-gray-700 mb-1">
                    Data da consulta:
                  </label>
                  <input
                    type="date"
                    id="dataConsulta"
                    name="dataConsulta"
                    value={formData.dataConsulta}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="horarioConsulta" className="block text-sm font-medium text-gray-700 mb-1">
                    Horário:
                  </label>
                  <select
                    id="horarioConsulta"
                    name="horarioConsulta"
                    value={formData.horarioConsulta}
                    onChange={handleInputChange}
                    disabled={!formData.medico}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">Selecione um horário</option>
                    {horariosDisponiveis.map(horario => (
                      <option key={horario} value={horario}>
                        {horario}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">
                    Observações:
                  </label>
                  <textarea
                    id="observacoes"
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
	              <button
	                type="submit"
	                disabled={loading}
	                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed"
	              >
	                {loading ? 'Agendando...' : 'Agendar consulta'}
	              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
