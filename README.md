# CS4-Front-End: Portal de Agendamento Hospitalar

Este projeto consiste no desenvolvimento de um portal de agendamento de consultas e exames para um hospital, utilizando uma arquitetura moderna e eficiente. O projeto original foi desenvolvido como parte do Challenge 2025 (Sprint 03) e foi atualizado para incluir a simulação de integração com APIs RESTful e garantir a responsividade completa.

## 🚀 Tecnologias Utilizadas

O projeto foi estruturado com foco em modularidade, escalabilidade e manutenção, utilizando as seguintes tecnologias. **As versões foram mantidas conforme o projeto original, atendendo à solicitação de não alteração.**

| Categoria | Tecnologia | Versão | Propósito |
| :--- | :--- | :--- | :--- |
| **Framework** | React | `^19.1.1` | Biblioteca JavaScript para construção de interfaces de usuário. |
| **Tooling** | Vite | `^7.1.7` | Ferramenta de construção rápida e moderna. |
| **Linguagem** | TypeScript | `~5.8.3` | Superset de JavaScript que adiciona tipagem estática. |
| **Estilização** | Tailwind CSS | `^4.1.13` | Framework CSS *utility-first* para criação de designs responsivos. |
| **Roteamento** | `react-router-dom` | `^7.9.3` | Gerenciamento de rotas e navegação na aplicação. |
| **Formulários** | `react-hook-form` | `^7.63.0` | Biblioteca para validação de formulários. |

## 👥 Integrantes

| Nome | RM | Turma |
|:-----|:---|:------|
| **Fellipe Costa de Oliveira** | 564673 | 1TDSPI |
| **Felype Ferreira Maschio** | 563009 | 1TDSPI |
| **Gustavo Tavares da Silva** | 562827 | 1TDSPI |

---

## 🎥 Vídeo de Apresentação

O vídeo de demonstração do projeto pode ser acessado através do link abaixo:

🔗 **Link do vídeo no YouTube:**  
[https://youtube.com/SEU-LINK-AQUI]

## 📂 Estrutura do Projeto

A estrutura do projeto segue o padrão de aplicações React com Vite, garantindo a separação de responsabilidades:

```
CS3-Front-End/
├── node_modules/
├── public/
├── src/
│   ├── assets/           # Arquivos estáticos (imagens, CSS, etc.)
│   ├── componentes/      # Componentes reutilizáveis (Cabeçalho, Rodapé, Chatbot, etc.)
│   ├── hooks/            # Hooks customizados
│   ├── paginas/          # Componentes de página (Inicial, Agendamentos, etc.)
│   ├── servicos/         # Módulos de serviço (API) - **NOVO**
│   ├── tipos/            # Definições de tipos TypeScript
│   ├── App.tsx           # Componente principal e configuração de rotas
│   ├── main.tsx          # Ponto de entrada da aplicação
│   └── index.css         # Estilos globais
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🛠️ Atualizações e Implementações

### 1. Integração de APIs (Simulada)

A integração com a API RESTful foi implementada de forma modular no diretório `src/servicos/api.ts`. Para fins de demonstração e devido à ausência de um endpoint de API real, foram criadas funções assíncronas que **simulam** a chamada de API, incluindo um *delay* de rede e tratamento de sucesso/erro.

Os componentes de agendamento (`AgendarConsulta.tsx` e `AgendarExame.tsx`) foram atualizados para utilizar essas funções de serviço, garantindo uma separação clara entre a lógica de apresentação e a lógica de comunicação com o backend.

### 2. Responsividade com Tailwind CSS

O projeto utiliza o Tailwind CSS para garantir a **responsividade** em diferentes dispositivos (pequenos, médios e grandes). As classes utilitárias do Tailwind foram aplicadas e revisadas nos principais componentes de formulário para garantir uma adaptação correta do layout e uma experiência de usuário otimizada em *mobile* e *desktop*.

## 🔗 Versionamento no GitHub

O controle de versão do projeto foi realizado utilizando Git e GitHub.

**Link do Repositório:**
[https://github.com/Sprint-3-HC-Acesso-Facil/CS4-Front-End](https://github.com/Sprint-3-HC-Acesso-Facil/CS4-Front-End)

**Nota:** O código foi comitado localmente. Devido a problemas de autenticação no ambiente de execução, o *push* para o repositório acima deve ser realizado manualmente pelo professor ou responsável, utilizando o código fornecido neste pacote ZIP.

## ⚙️ Como Rodar o Projeto Localmente

Para configurar e rodar o projeto em seu ambiente local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o **Node.js** (versão 18 ou superior) e o **npm** (ou `yarn`, `pnpm`) instalados em sua máquina.

### Instalação

1.  **Clone o repositório** (ou descompacte o arquivo ZIP):
    ```bash
    # Se estiver clonando do repositório
    git clone https://github.com/Sprint-3-HC-Acesso-Facil/CS4-Front-End.git
    cd CS4-Front-End
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Execução

1.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O aplicativo estará acessível em `http://localhost:5173` (ou na porta indicada pelo Vite).

2.  **Para construir a versão de produção:**
    ```bash
    npm run build
    ```

---

