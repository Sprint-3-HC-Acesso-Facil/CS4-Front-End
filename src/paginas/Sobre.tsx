import { useState } from 'react'

export function Sobre() {
  // useState para controlar seção ativa
  const [secaoAtiva, setSecaoAtiva] = useState('historia')

  const secoes = [
    { id: 'historia', titulo: 'Nossa História' },
    { id: 'missao', titulo: 'Missão e Valores' },
    { id: 'estrutura', titulo: 'Estrutura' },
    { id: 'inovacao', titulo: 'Inovação' },
    { id: 'localizacao', titulo: 'Localização' }
  ]

  const renderizarConteudoSecao = () => {
    switch (secaoAtiva) {
      case 'historia':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">
                  Fundação e Crescimento
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                  O Hospital das Clínicas da Faculdade de Medicina da Universidade de São Paulo (HCFMUSP) 
                  foi fundado em 1944, sendo um dos maiores complexos hospitalares da América Latina. 
                  Desde sua criação, tem sido referência em assistência médica, ensino e pesquisa.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Ao longo de suas quase oito décadas de existência, o HC tem se destacado pela 
                  excelência no atendimento e pela formação de profissionais de saúde altamente 
                  qualificados, contribuindo significativamente para o avanço da medicina no Brasil.
                </p>
              </div>
              <div>
                <img 
                  src="/src/assets/image/hospital/fachada_hc.jpg" 
                  alt="Fachada do Hospital das Clínicas" 
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    // Fallback para imagem alternativa se não carregar
                    e.currentTarget.src = '/src/assets/image/hospital/hcentrada.jpg'
                  }}
                />
              </div>
            </div>
          </div>
        )

      case 'missao':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-4">Missão</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Prestar assistência médico-hospitalar de alta complexidade, desenvolver 
                  ensino e pesquisa na área da saúde, contribuindo para a melhoria da 
                  qualidade de vida da população.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-green-600 mb-4">Visão</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Ser reconhecido como centro de excelência em assistência, ensino e 
                  pesquisa, referência nacional e internacional em saúde.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-purple-600 mb-4">Valores</h3>
                <ul className="text-sm sm:text-base text-gray-700 space-y-1 leading-relaxed">
                  <li>• Ética e transparência</li>
                  <li>• Excelência técnica</li>
                  <li>• Humanização</li>
                  <li>• Inovação</li>
                  <li>• Responsabilidade social</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 'estrutura':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">2.200</div>
                <div className="text-sm sm:text-base text-gray-700">Leitos</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">78</div>
                <div className="text-sm sm:text-base text-gray-700">Salas Cirúrgicas</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">25.000</div>
                <div className="text-sm sm:text-base text-gray-700">Funcionários</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">1.5M</div>
                <div className="text-sm sm:text-base text-gray-700">Atendimentos/ano</div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 text-center leading-relaxed">
              O complexo hospitalar é composto por diversos institutos especializados, 
              oferecendo atendimento em todas as especialidades médicas com tecnologia 
              de ponta e equipe multidisciplinar altamente qualificada.
            </p>
          </div>
        )

      case 'inovacao':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-4">
                  Pesquisa e Desenvolvimento
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                  O HC é um dos maiores centros de pesquisa médica do país, com mais de 
                  3.000 projetos de pesquisa em andamento. Nossos pesquisadores trabalham 
                  constantemente no desenvolvimento de novos tratamentos e tecnologias.
                </p>
                <ul className="text-sm sm:text-base text-gray-700 space-y-2 leading-relaxed">
                  <li>• Centro de Medicina Nuclear</li>
                  <li>• Instituto de Radiologia</li>
                  <li>• Laboratório de Investigação Médica</li>
                  <li>• Centro de Terapia Celular</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-4">
                  Tecnologia Digital
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                  Investimos continuamente em tecnologia para melhorar a experiência 
                  do paciente e a eficiência dos processos médicos.
                </p>
                <ul className="text-sm sm:text-base text-gray-700 space-y-2 leading-relaxed">
                  <li>• Prontuário Eletrônico</li>
                  <li>• Telemedicina</li>
                  <li>• Inteligência Artificial</li>
                  <li>• Portal do Paciente</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 'localizacao':
        return (
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-4 text-center">
              Onde Estamos Localizados
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-6 text-center leading-relaxed">
              O Hospital das Clínicas está localizado no coração de São Paulo, 
              oferecendo fácil acesso para pacientes de toda a região metropolitana.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7314.592629757024!2d-46.66986!3d-23.557799!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59b00d3aa487%3A0xfe715b43e354f823!2sHospital%20das%20Cl%C3%ADnicas%20FMUSP!5e0!3m2!1spt-BR!2sbr!4v1748002236829!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="400" 
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Hospital das Clínicas FMUSP"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                <strong>Endereço:</strong> Av. Dr. Enéas Carvalho de Aguiar, 255 - Cerqueira César, São Paulo - SP
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container-responsivo">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Quem Somos
        </h1>

        {/* Navegação por abas */}
        <div className="flex flex-wrap justify-center mb-6 bg-white rounded-lg shadow-md p-2">
          {secoes.map((secao) => (
            <button
              key={secao.id}
              onClick={() => setSecaoAtiva(secao.id)}
              className={`px-3 py-2 m-1 rounded-md transition-all duration-200 text-sm sm:text-base ${
                secaoAtiva === secao.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {secao.titulo}
            </button>
          ))}
        </div>

        {/* Conteúdo da seção ativa */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
          {renderizarConteudoSecao()}
        </div>
      </div>
    </div>
  )
}
