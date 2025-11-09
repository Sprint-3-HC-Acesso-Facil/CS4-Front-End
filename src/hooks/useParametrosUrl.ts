import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function useParametrosUrl() {
  const parametros = useParams()
  const [parametrosBusca, setParametrosBusca] = useSearchParams()
  const [todosParametros, setTodosParametros] = useState<Record<string, string>>({})

  useEffect(() => {
    // Combinar parâmetros de rota e query string
    const combinados = {
      ...parametros,
      ...Object.fromEntries(parametrosBusca.entries())
    }
    setTodosParametros(combinados)
  }, [parametros, parametrosBusca])

  const obterParametro = (chave: string): string | undefined => {
    return todosParametros[chave]
  }

  const definirParametroBusca = (chave: string, valor: string) => {
    const novosParametrosBusca = new URLSearchParams(parametrosBusca)
    novosParametrosBusca.set(chave, valor)
    setParametrosBusca(novosParametrosBusca)
  }

  const removerParametroBusca = (chave: string) => {
    const novosParametrosBusca = new URLSearchParams(parametrosBusca)
    novosParametrosBusca.delete(chave)
    setParametrosBusca(novosParametrosBusca)
  }

  const limparTodosParametrosBusca = () => {
    setParametrosBusca({})
  }

  return {
    parametros,
    parametrosBusca,
    todosParametros,
    obterParametro,
    definirParametroBusca,
    removerParametroBusca,
    limparTodosParametrosBusca
  }
}
