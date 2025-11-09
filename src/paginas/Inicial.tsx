import { useState, useEffect } from 'react'
import { useNavegacao } from '@/hooks/useNavegacao'
import { useEstadoLocal } from '@/hooks/useEstadoLocal'

export function Inicial() {
  // useState para controlar estado do formulário de login
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [carregandoLogin, setCarregandoLogin] = useState(false)

  // useEstadoLocal para lembrar último CPF usado (sem a senha por segurança)
  const [ultimoCpf, setUltimoCpf] = useEstadoLocal('ultimo-cpf', '')

  // useNavegacao para navegação programática
  const { navegar } = useNavegacao()

  // useEffect para carregar último CPF usado
  useEffect(() => {
    if (ultimoCpf) {
      setCpf(ultimoCpf)
    }
  }, [ultimoCpf])

  // useEffect para demonstrar uso do hook
  useEffect(() => {
    console.log('Página Inicial carregada')
    
    // Cleanup function
    return () => {
      console.log('Página Inicial desmontada')
    }
  }, [])

  const manipularLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregandoLogin(true)
    
    try {
      // Simular processo de login
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Salvar último CPF usado (sem a senha)
      setUltimoCpf(cpf)
      
      console.log('Tentativa de login:', { cpf, senha: '***' })
      
      // Simular redirecionamento após login bem-sucedido
      alert('Login realizado com sucesso!')
      
      // Limpar senha por segurança
      setSenha('')
      
    } catch (erro) {
      console.error('Erro no login:', erro)
      alert('Erro ao fazer login. Tente novamente.')
    } finally {
      setCarregandoLogin(false)
    }
  }

  const manipularLoginGovBr = () => {
    console.log('Login com gov.br')
    alert('Redirecionando para gov.br...')
  }

  const navegarParaContato = () => {
    // Exemplo de uso do useNavigate
    navegar('/contato')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container-responsivo py-4 sm:py-6 lg:py-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="titulo-responsivo text-gray-800 mb-4 sm:mb-6 px-2">
            BEM-VINDO AO PORTAL DO HOSPITAL DAS CLÍNICAS
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
          {/* Informações sobre cadastro */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6">
              <h2 className="subtitulo-responsivo text-blue-600 mb-4">
                Por que fazer o cadastro?
              </h2>
              <p className="texto-responsivo text-gray-700 mb-4">
                Cadastre-se no Portal do Hospital das Clínicas e tenha acesso a serviços digitais 
                que facilitam sua jornada de saúde. Com sua conta, você poderá:
              </p>
              <ul className="space-y-2 sm:space-y-3 text-gray-700">
                <li className="flex items-start texto-responsivo">
                  <span className="text-blue-600 mr-2 mt-1 flex-shrink-0">•</span>
                  <span>Agendar consultas e exames online</span>
                </li>
                <li className="flex items-start texto-responsivo">
                  <span className="text-blue-600 mr-2 mt-1 flex-shrink-0">•</span>
                  <span>Consultar resultados com segurança</span>
                </li>
                <li className="flex items-start texto-responsivo">
                  <span className="text-blue-600 mr-2 mt-1 flex-shrink-0">•</span>
                  <span>Receber lembretes e orientações médicas</span>
                </li>
                <li className="flex items-start texto-responsivo">
                  <span className="text-blue-600 mr-2 mt-1 flex-shrink-0">•</span>
                  <span>Solicitar renovação de receitas</span>
                </li>
                <li className="flex items-start texto-responsivo">
                  <span className="text-blue-600 mr-2 mt-1 flex-shrink-0">•</span>
                  <span>Organizar seu histórico médico</span>
                </li>
              </ul>
              <p className="texto-responsivo text-gray-700 mt-4">
                Nosso objetivo é oferecer um atendimento mais humanizado, ágil e acessível.
              </p>
              <div className="mt-4 sm:mt-6">
                <button 
                  onClick={navegarParaContato}
                  className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 hover:scale-105 transition-all duration-200"
                >
                  Precisa de ajuda? Entre em contato
                </button>
              </div>
            </div>
          </div>

          {/* Área de login */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6">
              <div className="text-center mb-6">
                <img 
                  src="/src/assets/image/logohc.png" 
                  alt="FMUSP" 
                  className="h-12 sm:h-14 lg:h-16 w-auto mx-auto mb-4"
                />
                <h2 className="subtitulo-responsivo">Acesse sua conta</h2>
                {ultimoCpf && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">
                    Último acesso: {ultimoCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.***.***-$4')}
                  </p>
                )}
              </div>
              <form onSubmit={manipularLogin} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-sm"
                    disabled={carregandoLogin}
                    maxLength={11}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-sm"
                    disabled={carregandoLogin}
                  />
                </div>
                <div className="text-right">
                  <a href="#" className="text-xs sm:text-sm text-blue-600 hover:underline">
                    Esqueci senha
                  </a>
                </div>
                <button 
                  type="submit" 
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={carregandoLogin || !cpf || !senha}
                >
                  {carregandoLogin ? 'Acessando...' : 'Acessar'}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6">
              <div className="text-center">
                <p className="texto-responsivo mb-4">Acesse sua conta pela</p>
                <img 
                  src="/src/assets/image/govbrlogo.webp" 
                  alt="gov.br" 
                  className="h-8 sm:h-10 lg:h-12 w-auto mx-auto mb-4"
                />
                <button 
                  onClick={manipularLoginGovBr}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                  disabled={carregandoLogin}
                >
                  Entrar com gov.br
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
