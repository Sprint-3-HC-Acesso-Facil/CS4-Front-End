import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimated, setIsAnimated] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Precisa de ajuda?', isBot: true }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Adicionar mensagem do usuário
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        isBot: false
      }
      setMessages(prev => [...prev, newMessage])
      setInputMessage('')

      // Animar avatar do bot
      setIsAnimated(true)
      
      // Simular resposta do bot após um delay
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: 'Obrigada pela sua mensagem! Em breve nossa equipe entrará em contato.',
          isBot: true
        }
        setMessages(prev => [...prev, botResponse])
        
        // Parar animação após resposta
        setTimeout(() => {
          setIsAnimated(false)
        }, 2000)
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Animar avatar quando abrir o chat
      setIsAnimated(true)
      setTimeout(() => {
        setIsAnimated(false)
      }, 2000)
    }
  }

  return (
    <>
      {/* Botão flutuante do chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          onMouseEnter={() => setIsAnimated(true)}
          onMouseLeave={() => setIsAnimated(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1">
                <img
                  src={isAnimated ? '/src/assets/image/assistente/assistente-falando.gif' : '/src/assets/image/assistente/assistente-estatico.png'}
                  alt="Assistente Digital"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <MessageCircle size={20} className="md:hidden" />
              <span className="hidden md:inline-block font-medium">Precisa de ajuda?</span>
            </div>
          )}
        </button>
      </div>

      {/* Janela do chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header do chat */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-1">
              <img
                src={isAnimated ? '/src/assets/image/assistente/assistente-falando.gif' : '/src/assets/image/assistente/assistente-estatico.png'}
                alt="Assistente Digital"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h3 className="font-semibold">Assistente Digital</h3>
              <p className="text-xs text-blue-100">Online</p>
            </div>
          </div>

          {/* Área de mensagens */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                {message.isBot && (
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 p-1 mr-2 flex-shrink-0">
                    <img
                      src={isAnimated ? '/src/assets/image/assistente/assistente-falando.gif' : '/src/assets/image/assistente/assistente-estatico.png'}
                      alt="Assistente"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                )}
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-white text-gray-800 border border-gray-200'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input de mensagem */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
