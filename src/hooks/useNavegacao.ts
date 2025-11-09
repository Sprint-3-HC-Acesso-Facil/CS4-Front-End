import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function useNavegacao() {
  const navegar = useNavigate()
  const localizacao = useLocation()
  const [caminhoAtual, setCaminhoAtual] = useState(localizacao.pathname)

  useEffect(() => {
    setCaminhoAtual(localizacao.pathname)
  }, [localizacao.pathname])

  const navegarPara = (caminho: string) => {
    navegar(caminho)
  }

  const voltarPagina = () => {
    navegar(-1)
  }

  const avancarPagina = () => {
    navegar(1)
  }

  const verificarCaminhoAtual = (caminho: string) => {
    return caminhoAtual === caminho
  }

  return {
    navegar: navegarPara,
    voltarPagina,
    avancarPagina,
    caminhoAtual,
    verificarCaminhoAtual,
    localizacao
  }
}
