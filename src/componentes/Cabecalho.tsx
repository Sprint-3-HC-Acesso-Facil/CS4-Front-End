import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import type { ItemNavegacao } from '@/tipos'

const itensNavegacao: ItemNavegacao[] = [
  { caminho: '/', rotulo: 'Início' },
  { caminho: '/integrantes', rotulo: 'Integrantes' },
  { caminho: '/sobre', rotulo: 'Quem Somos' },
  { caminho: '/faq', rotulo: 'FAQ' },  { caminho: 
'/contato', rotulo: 'Contato' },
  { caminho: 
'/agendamentos', rotulo: 'Agendamentos' },
]

export function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false)
  const localizacao = useLocation()

  const alternarMenu = () => setMenuAberto(!menuAberto)

  const verificarCaminhoAtivo = (caminho: string) => {
    return localizacao.pathname === caminho
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-responsivo">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/images/logohc.png" 
              alt="Logo FMUSP" 
              className="h-8 sm:h-10 lg:h-12 w-auto"
            />
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex space-x-2 lg:space-x-8">
            {itensNavegacao.map((item) => (
              <Link
                key={item.caminho}
                to={item.caminho}
                className={`px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  verificarCaminhoAtivo(item.caminho)
                    ? 'text-blue-600 bg-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.rotulo}
              </Link>
            ))}
          </nav>

          {/* Botão do menu mobile */}
          <button
            onClick={alternarMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
            aria-label="Alternar menu"
          >
            {menuAberto ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navegação Mobile */}
        {menuAberto && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-1">
              {itensNavegacao.map((item) => (
                <Link
                  key={item.caminho}
                  to={item.caminho}
                  onClick={() => setMenuAberto(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                    verificarCaminhoAtivo(item.caminho)
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.rotulo}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
