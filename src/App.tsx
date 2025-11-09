import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Cabecalho } from './componentes/Cabecalho'
import { Rodape } from './componentes/Rodape'
import VLibras from './componentes/VLibras'
import { Chatbot } from './componentes/Chatbot'
import { Inicial } from './paginas/Inicial'
import { Integrantes } from './paginas/Integrantes'
import { Sobre } from './paginas/Sobre'
import { FAQ } from './paginas/FAQ'
import { Contato } from './paginas/Contato'
import { Agendamentos } from './paginas/Agendamentos'
import { AgendarConsulta } from './paginas/AgendarConsulta'
import { AgendarExame } from './paginas/AgendarExame'
import { MeusAgendamentos } from './paginas/MeusAgendamentos'
import { Telemedicina } from './paginas/Telemedicina'
import { SolicitarPAT } from './paginas/SolicitarPAT'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Cabecalho />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Inicial />} />
            <Route path="/integrantes" element={<Integrantes />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
            <Route path="/agendamentos/consulta" element={<AgendarConsulta />} />
            <Route path="/agendamentos/exame" element={<AgendarExame />} />
            <Route path="/agendamentos/meus" element={<MeusAgendamentos />} />
            <Route path="/agendamentos/telemedicina" element={<Telemedicina />} />
            <Route path="/agendamentos/pat" element={<SolicitarPAT />} />
          </Routes>
        </main>
        <Rodape />
        <VLibras />
        <Chatbot />
      </div>
    </Router>
  )
}

export default App
