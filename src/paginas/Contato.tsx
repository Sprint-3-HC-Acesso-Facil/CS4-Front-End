import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useEstadoLocal } from '@/hooks/useEstadoLocal'
import type { DadosFormularioContato } from '@/tipos'

export function Contato() {
  // useState para controlar estado do envio
  const [enviandoFormulario, setEnviandoFormulario] = useState(false)
  const [mensagemSucesso, setMensagemSucesso] = useState('')

  // useEstadoLocal para salvar rascunho do formulári
  const [rascunhoFormulario, setRascunhoFormulario] = useEstadoLocal<Partial<DadosFormularioContato>>('rascunho-contato', {})

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
    setValue
  } = useForm<DadosFormularioContato>({
    mode: 'onChange',
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      assunto: '',
      mensagem: ''
    }
  })

  // Observar mudanças no formulário para salvar rascunho
  const dadosFormulario = watch()

  // useEffect para carregar rascunho salvo
  useEffect(() => {
    if (rascunhoFormulario && Object.keys(rascunhoFormulario).length > 0) {
      Object.entries(rascunhoFormulario).forEach(([campo, valor]) => {
        if (valor) {
          setValue(campo as keyof DadosFormularioContato, valor)
        }
      })
    }
  }, [rascunhoFormulario, setValue])

  // useEffect para salvar rascunho automaticamente
  useEffect(() => {
    const timer = setTimeout(() => {
      if (dadosFormulario.nome || dadosFormulario.email || dadosFormulario.mensagem) {
        setRascunhoFormulario(dadosFormulario)
      }
    }, 1000) // Salvar após 1 segundo de inatividade

    return () => clearTimeout(timer)
  }, [dadosFormulario, setRascunhoFormulario])

  const aoEnviarFormulario = async (dados: DadosFormularioContato) => {
    setEnviandoFormulario(true)
    setMensagemSucesso('')

    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Dados do formulário:', dados)
      
      setMensagemSucesso('Mensagem enviada com sucesso! Entraremos em contato em breve.')
      
      // Limpar formulário e rascunho após envio bem-sucedido
      reset()
      setRascunhoFormulario({})
      
    } catch (erro) {
      console.error('Erro ao enviar formulário:', erro)
      alert('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setEnviandoFormulario(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsivo">
        <h1 className="titulo-responsivo text-center text-gray-800 mb-12">
          Entre em Contato
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Informações de contato */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="subtitulo-responsivo text-blue-600 mb-6">
                Informações de Contato
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Endereço</h3>
                    <p className="texto-responsivo text-gray-600">
                      Av. Dr. Enéas Carvalho de Aguiar, 255<br />
                      Cerqueira César - São Paulo/SP<br />
                      CEP: 05403-000
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Telefone</h3>
                    <p className="texto-responsivo text-gray-600">
                      (11) 2661-0000
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">E-mail</h3>
                    <p className="texto-responsivo text-gray-600">
                      contato@hc.fm.usp.br
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="subtitulo-responsivo text-blue-600 mb-4">
                Horário de Atendimento
              </h3>
              <div className="space-y-2 texto-responsivo text-gray-600">
                <p><strong>Segunda a Sexta:</strong> 7h às 19h</p>
                <p><strong>Sábados:</strong> 7h às 12h</p>
                <p><strong>Domingos e Feriados:</strong> Emergência 24h</p>
              </div>
            </div>
          </div>

          {/* Formulário de contato */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="subtitulo-responsivo text-blue-600 mb-6">
              Envie sua Mensagem
            </h2>

            {mensagemSucesso && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800 texto-responsivo">{mensagemSucesso}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(aoEnviarFormulario)} className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  id="nome"
                  type="text"
                  {...register('nome', {
                    required: 'Nome é obrigatório',
                    minLength: {
                      value: 2,
                      message: 'Nome deve ter pelo menos 2 caracteres'
                    }
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.nome ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={enviandoFormulario}
                />
                {errors.nome && (
                  <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'E-mail é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'E-mail inválido'
                    }
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={enviandoFormulario}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  id="telefone"
                  type="tel"
                  {...register('telefone', {
                    pattern: {
                      value: /^[\d\s\(\)\-\+]+$/,
                      message: 'Telefone inválido'
                    }
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.telefone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={enviandoFormulario}
                  placeholder="(11) 99999-9999"
                />
                {errors.telefone && (
                  <p className="mt-1 text-sm text-red-600">{errors.telefone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-1">
                  Assunto *
                </label>
                <select
                  id="assunto"
                  {...register('assunto', {
                    required: 'Assunto é obrigatório'
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.assunto ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={enviandoFormulario}
                >
                  <option value="">Selecione um assunto</option>
                  <option value="agendamento">Agendamento de Consulta</option>
                  <option value="resultados">Resultados de Exames</option>
                  <option value="suporte">Suporte Técnico</option>
                  <option value="reclamacao">Reclamação</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="outros">Outros</option>
                </select>
                {errors.assunto && (
                  <p className="mt-1 text-sm text-red-600">{errors.assunto.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem *
                </label>
                <textarea
                  id="mensagem"
                  rows={5}
                  {...register('mensagem', {
                    required: 'Mensagem é obrigatória',
                    minLength: {
                      value: 10,
                      message: 'Mensagem deve ter pelo menos 10 caracteres'
                    }
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
                    errors.mensagem ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={enviandoFormulario}
                  placeholder="Descreva sua solicitação ou dúvida..."
                />
                {errors.mensagem && (
                  <p className="mt-1 text-sm text-red-600">{errors.mensagem.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={enviandoFormulario || !isValid}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {enviandoFormulario ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
