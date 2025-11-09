import { Link } from 'react-router-dom'
import { Calendar, Stethoscope, FileText, Video, Heart } from 'lucide-react'






export function Agendamentos() {
  const opcoesAgendamento = [
    { 
      nome: 'Agendar consulta', 
      icone: '/images/icons/consulta-icon.png', 
      iconeLucide: Stethoscope,
      link: '/agendamentos/consulta',
      descricao: 'Agende sua consulta médica com especialistas',
      cor: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    { 
      nome: 'Agendar exame', 
      icone: '/images/icons/exame-icon.png', 
      iconeLucide: FileText,
      link: '/agendamentos/exame',
      descricao: 'Marque seus exames laboratoriais e de imagem',
      cor: 'bg-green-50 hover:bg-green-100 border-green-200'
    },

    { 
      nome: 'Telemedicina', 
      icone: '/images/icons/telemedicina-icon.png', 
      iconeLucide: Video,
      link: '/agendamentos/telemedicina',
      descricao: 'Consultas médicas online por videoconferência',
      cor: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
    },
    { 
      nome: 'Solicitar PAT', 
      icone: '/images/icons/pat-icon.png', 
      iconeLucide: Heart,
      link: '/agendamentos/pat',
      descricao: 'Programa de Apoio ao Trabalhador',
      cor: 'bg-red-50 hover:bg-red-100 border-red-200'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container-responsivo">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Agendamentos
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Gerencie seus agendamentos médicos de forma rápida e prática. 
            Escolha uma das opções abaixo para continuar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {opcoesAgendamento.map((opcao, index) => {
            const IconeLucide = opcao.iconeLucide
            
            return (
              <Link 
                key={index} 
                to={opcao.link}
                className={`group flex flex-col items-center justify-center rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border-2 ${opcao.cor} transform hover:scale-105`}
              >
                <div className="flex items-center justify-center w-16 h-16 mb-4 relative">
                  {/* Tentar carregar ícone personalizado primeiro */}
                  <img 
                    src={opcao.icone} 
                    alt={opcao.nome} 
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      // Se a imagem não carregar, esconder e mostrar ícone Lucide
                      e.currentTarget.style.display = 'none'
                      const lucideIcon = e.currentTarget.nextElementSibling as HTMLElement
                      if (lucideIcon) {
                        lucideIcon.style.display = 'block'
                      }
                    }}
                  />
                  {/* Ícone Lucide como fallback */}
                  <IconeLucide 
                    className="w-12 h-12 text-blue-600 hidden" 
                    style={{ display: 'none' }}
                  />
                </div>
                
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {opcao.nome}
                </h2>
                
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {opcao.descricao}
                </p>
                
                <div className="mt-4 px-4 py-2 bg-white rounded-full text-xs font-medium text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                  Acessar
                </div>
              </Link>
            )
          })}
        </div>

        {/* Informações adicionais */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-4 text-center">
            Informações Importantes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">📅 Horários de Atendimento</h4>
              <p className="leading-relaxed">
                Segunda a sexta: 7h às 17h<br />
                Sábados: 7h às 12h<br />
                Emergências: 24h
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📋 Documentos Necessários</h4>
              <p className="leading-relaxed">
                • RG e CPF<br />
                • Cartão SUS<br />
                • Comprovante de residência<br />
                • Encaminhamento médico (quando necessário)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
