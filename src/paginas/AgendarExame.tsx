import React, { useState } from 'react';
import { agendarExame } from '../servicos/api';

export function AgendarExame() {
  const initialFormData = {
    nomePaciente: '',
    cpfPaciente: '',
    dataNascimento: '',
    telefonePaciente: '',
    emailPaciente: '',
    convenio: '',
    carteirinha: '',
    tipoExame: '',
    pedidoMedico: null as File | null,
    dataExame: '',
    periodoExame: '',
    observacoes: '',
    preparo: [] as string[]
  };
  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const convenios = [
    { value: 'sus', label: 'SUS' },
    { value: 'amil', label: 'Amil' },
    { value: 'bradesco', label: 'Bradesco Saúde' },
    { value: 'unimed', label: 'Unimed' },
    { value: 'sulamerica', label: 'SulAmérica' },
    { value: 'particular', label: 'Particular' }
  ];

  const tiposExame = [
    { value: 'sangue', label: 'Exame de sangue' },
    { value: 'urina', label: 'Exame de urina' },
    { value: 'fezes', label: 'Exame de fezes' },
    { value: 'raio-x', label: 'Raio-X' },
    { value: 'ultrassom', label: 'Ultrassom' },
    { value: 'tomografia', label: 'Tomografia' },
    { value: 'ressonancia', label: 'Ressonância Magnética' },
    { value: 'eletrocardiograma', label: 'Eletrocardiograma' },
    { value: 'eletroencefalograma', label: 'Eletroencefalograma' }
  ];

  const periodos = [
    { value: 'manha', label: 'Manhã (08:00 - 12:00)' },
    { value: 'tarde', label: 'Tarde (13:00 - 17:00)' }
  ];

  const preparoOpcoes = [
    { value: 'jejum', label: 'Jejum' },
    { value: 'suspensao-medicamentos', label: 'Suspensão de medicamentos' },
    { value: 'dieta-especial', label: 'Dieta especial' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      pedidoMedico: file
    }));
  };

  const handlePreparoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      preparo: checked 
        ? [...prev.preparo, value]
        : prev.preparo.filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await agendarExame(formData);
      setSuccessMessage(response);
      // Opcional: Limpar o formulário após o sucesso
      // setFormData({ ...initialFormData });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido ao agendar o exame.');
    } finally {
      setLoading(false);
    }
  };

  return (
	    <div className="min-h-screen bg-gray-100 py-6">
	      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          AGENDAR EXAME
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
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Dados do Exame</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tipoExame" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de exame:
                  </label>
                  <select
                    id="tipoExame"
                    name="tipoExame"
                    value={formData.tipoExame}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione um tipo de exame</option>
                    {tiposExame.map(tipo => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="pedidoMedico" className="block text-sm font-medium text-gray-700 mb-1">
                    Pedido médico:
                  </label>
                  <input
                    type="file"
                    id="pedidoMedico"
                    name="pedidoMedico"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <small className="text-gray-500 text-xs">Formatos aceitos: PDF, JPG, JPEG, PNG</small>
                </div>

                <div>
                  <label htmlFor="dataExame" className="block text-sm font-medium text-gray-700 mb-1">
                    Data preferencial:
                  </label>
                  <input
                    type="date"
                    id="dataExame"
                    name="dataExame"
                    value={formData.dataExame}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="periodoExame" className="block text-sm font-medium text-gray-700 mb-1">
                    Período preferencial:
                  </label>
                  <select
                    id="periodoExame"
                    name="periodoExame"
                    value={formData.periodoExame}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione um período</option>
                    {periodos.map(periodo => (
                      <option key={periodo.value} value={periodo.value}>
                        {periodo.label}
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

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preparo especial:
                  </label>
                  <div className="space-y-2">
                    {preparoOpcoes.map(opcao => (
                      <div key={opcao.value} className="flex items-center">
                        <input
                          type="checkbox"
                          id={opcao.value}
                          value={opcao.value}
                          checked={formData.preparo.includes(opcao.value)}
                          onChange={handlePreparoChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={opcao.value} className="ml-2 text-sm text-gray-700">
                          {opcao.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
	              <button
	                type="submit"
	                disabled={loading}
	                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed"
	              >
	                {loading ? 'Agendando...' : 'Agendar exame'}
	              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

