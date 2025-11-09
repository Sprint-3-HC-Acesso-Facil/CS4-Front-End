import React, { useState } from 'react';

export function SolicitarPAT() {
  const [formData, setFormData] = useState({
    nomePaciente: '',
    cpfPaciente: '',
    dataNascimento: '',
    telefonePaciente: '',
    emailPaciente: '',
    convenio: '',
    carteirinha: '',
    especialidade: '',
    diagnostico: '',
    laudoMedico: null as File | null,
    receitaMedica: null as File | null,
    observacoes: ''
  });

  const convenios = [
    { value: 'sus', label: 'SUS' },
    { value: 'amil', label: 'Amil' },
    { value: 'bradesco', label: 'Bradesco Saúde' },
    { value: 'unimed', label: 'Unimed' },
    { value: 'sulamerica', label: 'SulAmérica' },
    { value: 'particular', label: 'Particular' }
  ];

  const especialidades = [
    { value: 'cardiologia', label: 'Cardiologia' },
    { value: 'dermatologia', label: 'Dermatologia' },
    { value: 'endocrinologia', label: 'Endocrinologia' },
    { value: 'fisioterapia', label: 'Fisioterapia' },
    { value: 'fonoaudiologia', label: 'Fonoaudiologia' },
    { value: 'neurologia', label: 'Neurologia' },
    { value: 'oncologia', label: 'Oncologia' },
    { value: 'ortopedia', label: 'Ortopedia' },
    { value: 'psicologia', label: 'Psicologia' },
    { value: 'terapia-ocupacional', label: 'Terapia Ocupacional' }
  ];

  const beneficios = [
    'Acompanhamento personalizado',
    'Orientação sobre medicamentos e tratamentos',
    'Suporte multidisciplinar',
    'Monitoramento contínuo da evolução do paciente',
    'Acesso facilitado a especialistas'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [name]: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Solicitação de PAT enviada com sucesso! Você receberá uma confirmação por e-mail em até 48 horas.');
    console.log('Dados da solicitação PAT:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container-responsivo">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          SOLICITAR PAT
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Programa de Assistência Terapêutica (PAT)</h2>
            <p className="text-gray-700 text-lg mb-6">
              O Programa de Assistência Terapêutica (PAT) oferece suporte e acompanhamento especializado para pacientes que necessitam de tratamentos contínuos ou específicos.
            </p>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Benefícios do PAT</h3>
              <ul className="space-y-2">
                {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Formulário de Solicitação</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nomePaciente" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo do paciente:
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

                <div>
                  <label htmlFor="especialidade" className="block text-sm font-medium text-gray-700 mb-1">
                    Especialidade relacionada:
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
                  <label htmlFor="diagnostico" className="block text-sm font-medium text-gray-700 mb-1">
                    Diagnóstico:
                  </label>
                  <input
                    type="text"
                    id="diagnostico"
                    name="diagnostico"
                    value={formData.diagnostico}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="laudoMedico" className="block text-sm font-medium text-gray-700 mb-1">
                    Laudo médico:
                  </label>
                  <input
                    type="file"
                    id="laudoMedico"
                    name="laudoMedico"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <small className="text-gray-500 text-xs">Formatos aceitos: PDF, JPG, JPEG, PNG</small>
                </div>

                <div>
                  <label htmlFor="receitaMedica" className="block text-sm font-medium text-gray-700 mb-1">
                    Receita médica:
                  </label>
                  <input
                    type="file"
                    id="receitaMedica"
                    name="receitaMedica"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <small className="text-gray-500 text-xs">Formatos aceitos: PDF, JPG, JPEG, PNG</small>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">
                    Observações adicionais:
                  </label>
                  <textarea
                    id="observacoes"
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Descreva informações adicionais relevantes para sua solicitação..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Enviar solicitação
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

