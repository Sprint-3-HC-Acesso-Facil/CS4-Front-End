// Tipos para os membros da equipe
export interface MembroEquipe {
  id: string
  nome: string
  rm: string
  turma: string
  funcao: string
  descricao: string
  foto: string
  github?: string
  linkedin?: string
}

// Tipos para itens do FAQ
export interface ItemFAQ {
  id: string
  pergunta: string
  resposta: string
  categoria: string
}

// Tipos para formulário de contato
export interface DadosFormularioContato {
  nome: string
  email: string
  telefone?: string
  assunto: string
  mensagem: string
}

// Tipos para navegação
export interface ItemNavegacao {
  caminho: string
  rotulo: string
  ativo?: boolean
}
