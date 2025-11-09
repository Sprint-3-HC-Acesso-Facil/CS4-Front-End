import { useState, useEffect } from 'react'

export function useEstadoLocal<T>(chave: string, valorInicial: T) {
  // Obter valor inicial do localStorage ou usar o valor padrão
  const [estado, setEstado] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(chave)
      return item ? JSON.parse(item) : valorInicial
    } catch (erro) {
      console.warn(`Erro ao ler localStorage para a chave "${chave}":`, erro)
      return valorInicial
    }
  })

  // Atualizar localStorage sempre que o estado mudar
  useEffect(() => {
    try {
      window.localStorage.setItem(chave, JSON.stringify(estado))
    } catch (erro) {
      console.warn(`Erro ao salvar no localStorage para a chave "${chave}":`, erro)
    }
  }, [chave, estado])

  return [estado, setEstado] as const
}
