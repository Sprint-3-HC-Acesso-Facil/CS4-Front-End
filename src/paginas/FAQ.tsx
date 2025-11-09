import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEstadoLocal } from '@/hooks/useEstadoLocal'
import { useSearchParams } from 'react-router-dom'
import type { ItemFAQ } from '@/tipos'

const dadosFAQ: ItemFAQ[] = [
  {
    id: '1',
    categoria: 'Problemas de Login',
    pergunta: 'Não consigo acessar minha conta. O que devo fazer',
    resposta: 'Verifique se você está inserindo o CPF e a senha corretamente. Caso continue com problemas, clique em "Esqueci senha" na página de login para redefinir sua senha ou entre em contato com nosso suporte.'
  },
  {
    id: '2',
    categoria: 'Problemas de Login',
    pergunta: 'Esqueci minha senha. Como posso redefini-la?',
    resposta: 'Na página de login, clique em "Esqueci senha". Você receberá instruções para redefinir sua senha no e-mail cadastrado. Se não receber o e-mail, verifique sua pasta de spam ou entre em contato com nosso suporte.'
  },
  {
    id: '3',
    categoria: 'Faltas e Consultas Online',
    pergunta: 'Perdi minha consulta online. O que acontece agora?',
    resposta: 'Entre em contato com a central de atendimento para verificar a possibilidade de reagendamento. Lembre-se que faltas não justificadas podem afetar futuros agendamentos no sistema.'
  },
  {
    id: '4',
    categoria: 'Faltas e Consultas Online',
    pergunta: 'O que devo fazer se não puder comparecer a uma consulta?',
    resposta: 'Caso não possa comparecer, cancele sua consulta com pelo menos 24 horas de antecedência através do sistema ou entrando em contato com a central de atendimento. Isso permite que outros pacientes possam utilizar o horário.'
  },
  {
    id: '5',
    categoria: 'Dúvidas Técnicas sobre a Plataforma',
    pergunta: 'Quais dispositivos posso usar para realizar uma consulta online?',
    resposta: 'Você pode utilizar computadores, notebooks, tablets ou smartphones com acesso à internet. Recomendamos dispositivos com câmera e microfone funcionando adequadamente para melhor experiência.'
  },
  {
    id: '6',
    categoria: 'Dúvidas Técnicas sobre a Plataforma',
    pergunta: 'Preciso instalar algum aplicativo para acessar a consulta?',
    resposta: 'Não é necessário instalar aplicativos específicos. Nossa plataforma funciona diretamente pelo navegador. Recomendamos o uso de navegadores atualizados como Chrome, Firefox, Safari ou Edge para melhor compatibilidade.'
  }
]

interface ComponenteItemFAQProps {
  item: ItemFAQ
  aberto: boolean
  aoAlternar: () => void
}

function ComponenteItemFAQ({ item, aberto, aoAlternar }: ComponenteItemFAQProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3 overflow-hidden">
      <button 
        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          aoAlternar()
        }}
        type="button"
        aria-expanded={aberto}
        aria-controls={`faq-resposta-${item.id}`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-sm sm:text-base font-medium text-gray-800 pr-4 leading-relaxed">
            {item.pergunta}
          </h3>
          <div className="flex-shrink-0 ml-2">
            {aberto ? (
              <ChevronUp className="h-4 w-4 text-blue-600" />
            ) : (
              <ChevronDown className="h-4 w-4 text-blue-600" />
            )}
          </div>
        </div>
      </button>
      {aberto && (
        <div 
          id={`faq-resposta-${item.id}`}
          className="px-4 pb-3 border-t border-gray-100"
        >
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-3">
            {item.resposta}
          </p>
        </div>
      )}
    </div>
  )
}

export function FAQ() {
  // useState para controlar itens abertos
  const [itensAbertos, setItensAbertos] = useState<Set<string>>(new Set())
  
  // useSearchParams do React Router para gerenciar parâmetros URL
  const [searchParams, setSearchParams] = useSearchParams()
  
  // useEstadoLocal para persistir preferências do usuário
  const [preferenciasUsuario, setPreferenciasUsuario] = useEstadoLocal('preferencias-faq', {
    ultimaVisita: '',
    categoriaFavorita: ''
  })

  // useEffect para abrir item específico baseado na URL
  useEffect(() => {
    const idItem = searchParams.get('item')
    if (idItem && dadosFAQ.find(item => item.id === idItem)) {
      setItensAbertos(new Set([idItem]))
    }
  }, [searchParams])

  // useEffect para salvar última visita (apenas uma vez)
  useEffect(() => {
    const agora = new Date().toISOString()
    const hoje = agora.split('T')[0]
    
    if (preferenciasUsuario.ultimaVisita !== hoje) {
      setPreferenciasUsuario(prev => ({
        ...prev,
        ultimaVisita: hoje
      }))
    }
  }, []) // Array vazio para executar apenas uma vez

  const alternarItem = (id: string) => {
    const novosItensAbertos = new Set(itensAbertos)
    
    if (novosItensAbertos.has(id)) {
      // Fechar item
      novosItensAbertos.delete(id)
      // Remover parâmetro da URL
      const novoSearchParams = new URLSearchParams(searchParams)
      novoSearchParams.delete('item')
      setSearchParams(novoSearchParams, { replace: true })
    } else {
      // Fechar outros itens e abrir apenas o clicado
      novosItensAbertos.clear()
      novosItensAbertos.add(id)
      // Atualizar parâmetro na URL
      const novoSearchParams = new URLSearchParams(searchParams)
      novoSearchParams.set('item', id)
      setSearchParams(novoSearchParams, { replace: true })
    }
    
    setItensAbertos(novosItensAbertos)
  }

  // Agrupar FAQs por categoria
  const faqsAgrupados = dadosFAQ.reduce((acc, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = []
    }
    acc[item.categoria].push(item)
    return acc
  }, {} as Record<string, ItemFAQ[]>)

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container-responsivo">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Perguntas Frequentes
        </h1>

        <div className="max-w-3xl mx-auto">
          {Object.entries(faqsAgrupados).map(([categoria, itens]) => (
            <div key={categoria} className="mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-600 mb-4">
                {categoria}
              </h2>
              {itens.map((item) => (
                <ComponenteItemFAQ
                  key={item.id}
                  item={item}
                  aberto={itensAbertos.has(item.id)}
                  aoAlternar={() => alternarItem(item.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
