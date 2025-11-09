import React from 'react';
import { Link } from 'react-router-dom';

export function Telemedicina() {
  const vantagens = [
    'Consultas sem deslocamento',
    'Economia de tempo',
    'Acesso a especialistas de qualquer lugar',
    'Redução do risco de contágio',
    'Acompanhamento contínuo de pacientes crônicos'
  ];

  const requisitos = [
    'Dispositivo com câmera e microfone (computador, tablet ou smartphone)',
    'Conexão estável com a internet',
    'Local silencioso e bem iluminado',
    'Navegador atualizado (Chrome, Firefox, Safari ou Edge)'
  ];

  const especialidades = [
    'Clínica Geral',
    'Cardiologia',
    'Dermatologia',
    'Endocrinologia',
    'Geriatria',
    'Neurologia',
    'Nutrição',
    'Psicologia',
    'Psiquiatria'
  ];

  const handleAgendarConsulta = () => {
    alert('Redirecionando para agendamento de consulta online...');
  };

  const handleEntrarSala = () => {
    alert('Verificando consultas agendadas...\n\nNenhuma consulta encontrada para hoje.');
  };

  const handleTestarEquipamento = () => {
    alert('Iniciando teste de equipamento...\n\n✓ Câmera: Funcionando\n✓ Microfone: Funcionando\n✓ Conexão: Estável');
  };

  const handleVerHistorico = () => {
    alert('Redirecionando para histórico de consultas online...');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container-responsivo">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          TELEMEDICINA
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Consultas online com nossos especialistas</h2>
            <p className="text-gray-700 text-lg">
              A telemedicina permite que você consulte nossos médicos sem sair de casa, de forma segura e prática.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Vantagens da Telemedicina</h3>
              <ul className="space-y-2">
                {vantagens.map((vantagem, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">{vantagem}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Requisitos para consulta online</h3>
              <ul className="space-y-2">
                {requisitos.map((requisito, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">•</span>
                    <span className="text-gray-700">{requisito}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Agendar consulta online</h3>
              <p className="text-gray-600 mb-4">
                Marque uma consulta com nossos especialistas através da plataforma de telemedicina.
              </p>
              <Link to="/agendamentos/consulta">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                  Agendar agora
                </button>
              </Link>
            </div>

            <div className="bg-green-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Acessar consulta agendada</h3>
              <p className="text-gray-600 mb-4">
                Entre na sala virtual para sua consulta já agendada.
              </p>
              <button 
                onClick={handleEntrarSala}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Entrar na sala
              </button>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Testar equipamento</h3>
              <p className="text-gray-600 mb-4">
                Verifique se sua câmera e microfone estão funcionando corretamente.
              </p>
              <button 
                onClick={handleTestarEquipamento}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Iniciar teste
              </button>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Consultas anteriores</h3>
              <p className="text-gray-600 mb-4">
                Acesse o histórico de suas consultas online anteriores.
              </p>
              <button 
                onClick={handleVerHistorico}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Ver histórico
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Especialidades disponíveis para telemedicina</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {especialidades.map((especialidade, index) => (
                <div 
                  key={index} 
                  className="bg-gray-100 hover:bg-gray-200 rounded-lg p-3 text-center transition-colors cursor-pointer"
                >
                  <span className="text-gray-700 font-medium">{especialidade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

