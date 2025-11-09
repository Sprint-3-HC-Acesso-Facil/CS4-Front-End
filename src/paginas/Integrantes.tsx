import { useState, useEffect } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useParametrosUrl } from '@/hooks/useParametrosUrl'
import type { MembroEquipe } from '@/tipos'

const membrosEquipe: MembroEquipe[] = [
  {
    id: '1',
    nome: 'Gustavo Tavares da Silva',
    rm: '562827',
    turma: '1TDSPI',
    funcao: 'Java e Chatbot',
    descricao: 'Especialista em desenvolvimento Java e criação de chatbots inteligentes. Responsável pela implementação de soluções backend robustas e sistemas de conversação automatizada.',    foto: 
'/images/integrantes/Gustavo.jpeg',
    github: 'https://github.com/gustavaress',
    linkedin: 'https://www.linkedin.com/in/gustavo-tavares-da-silva-b6180a220/'
  },
  {
    id: '2',
    nome: 'Fellipe Costa de Oliveira',
    rm: '564673',
    turma: '1TDSPI',
    funcao: 'Business Model e Python',
    descricao: 'Especialista em modelagem de negócios e desenvolvimento Python. Foca na análise de requisitos, arquitetura de soluções e desenvolvimento de APIs eficientes.',
    foto: '/images/integrantes/Felllipe.jpg',
    github: 'https://github.com/FellipeCostaOliveira',
    linkedin: 'https://www.linkedin.com/in/fellipe-costa-aab114355/'
  },
  {
    id: '3',
    nome: 'Felype Ferreira Maschio',
    rm: '563009',
    turma: '1TDSPI',
    funcao: 'Front-end e Banco de Dados',
    descricao: 'Desenvolvedor especializado em tecnologias front-end modernas e administração de banco de dados. Responsável pela experiência do usuário e gestão de dados.',
    foto: '/images/integrantes/Felype.jpg',
    github: 'https://github.com/FelypeMaschio',
    linkedin: 'https://www.linkedin.com/in/felype-ferreira-maschio-735842286/'
  }
]

interface CartaoMembroProps {
  membro: MembroEquipe
  destacado: boolean
}

function CartaoMembro({ membro, destacado }: CartaoMembroProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full flex flex-col ${
      destacado ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-105'
    }`}>
      <div className="text-center flex-grow flex flex-col">
        <img 
          src={membro.foto} 
          alt={`Foto de ${membro.nome}`}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
          onError={(e) => {
            // Fallback para imagem padrão se a imagem não carregar
            e.currentTarget.src = '/images/placeholder/placeholder-person.png'
          }}
        />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
          {membro.nome}
        </h3>
        <div className="space-y-1 mb-4">
          <p className="text-sm sm:text-base text-blue-600 font-semibold">
            {membro.funcao}
          </p>
          <p className="text-sm sm:text-base text-gray-600">
            RM: {membro.rm} | Turma: {membro.turma}
          </p>
        </div>
        <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed flex-grow">
          {membro.descricao}
        </p>
        
        {/* Links sociais */}
        <div className="flex justify-center space-x-4">
          {membro.github && (
            <a 
              href={membro.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all duration-200"
              aria-label={`GitHub de ${membro.nome}`}
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {membro.linkedin && (
            <a 
              href={membro.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-all duration-200"
              aria-label={`LinkedIn de ${membro.nome}`}
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          <a 
            href={`mailto:${membro.nome.toLowerCase().replace(/\s+/g, '.')}@email.com`}
            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition-all duration-200"
            aria-label={`E-mail de ${membro.nome}`}
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  )
}

export function Integrantes() {
  // useState para controlar membro destacado
  const [membroDestacado, setMembroDestacado] = useState<string | null>(null)
  
  // useParametrosUrl para destacar membro específico via URL
  const { obterParametro, definirParametroBusca } = useParametrosUrl()

  // useEffect para destacar membro baseado na URL
  useEffect(() => {
    const idMembro = obterParametro('membro')
    if (idMembro && membrosEquipe.find(m => m.id === idMembro)) {
      setMembroDestacado(idMembro)
    }
  }, [obterParametro])

  // useEffect para demonstrar uso do hook
  useEffect(() => {
    console.log('Página Integrantes carregada')
    
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      console.log('Dados dos integrantes carregados')
    }, 1000)

    return () => {
      clearTimeout(timer)
      console.log('Página Integrantes desmontada')
    }
  }, [])

  const destacarMembro = (id: string) => {
    if (membroDestacado === id) {
      setMembroDestacado(null)
      definirParametroBusca('membro', '')
    } else {
      setMembroDestacado(id)
      definirParametroBusca('membro', id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container-responsivo">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Nossa Equipe
        </h1>

        {/* Informações sobre o projeto */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-4xl mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-600 mb-4 text-center">
            Projeto Challenge 2025 - Sprint 03
          </h2>
          <p className="text-sm sm:text-base text-gray-700 text-center leading-relaxed">
            Este projeto foi desenvolvido como parte da Sprint 03 do Challenge 2025, 
            focando em Front-End Design Engineering. Utilizamos tecnologias modernas 
            como React, TypeScript, TailwindCSS e Vite para criar uma Single Page 
            Application responsiva e componentizada.
          </p>
        </div>

        {/* Grid de membros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {membrosEquipe.map((membro) => (
            <div key={membro.id} onClick={() => destacarMembro(membro.id)} className="cursor-pointer">
              <CartaoMembro 
                membro={membro}
                destacado={membroDestacado === membro.id}
              />
            </div>
          ))}
        </div>

        {/* Informações técnicas */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-4 text-center">
            Tecnologias Utilizadas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-600 text-sm sm:text-base">React</div>
              <div className="text-xs text-gray-600">18.x</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-600 text-sm sm:text-base">TypeScript</div>
              <div className="text-xs text-gray-600">5.x</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-600 text-sm sm:text-base">TailwindCSS</div>
              <div className="text-xs text-gray-600">3.x</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-600 text-sm sm:text-base">Vite</div>
              <div className="text-xs text-gray-600">7.x</div>
            </div>
          </div>
        </div>

        {/* Distribuição de responsabilidades */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-4 text-center">
            Distribuição de Responsabilidades
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Backend & IA</h4>
              <p className="text-sm text-gray-600">Java, Python, Chatbot</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Negócios & Análise</h4>
              <p className="text-sm text-gray-600">Business Model, Python</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Frontend & Dados</h4>
              <p className="text-sm text-gray-600">React, Banco de Dados</p>
            </div>
          </div>
        </div>

        {/* Instruções de interação */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Clique em um membro da equipe para destacá-lo
          </p>
        </div>
      </div>
    </div>
  )
}
