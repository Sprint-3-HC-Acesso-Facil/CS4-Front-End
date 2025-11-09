/**
 * Script de teste da integração com a API
 * Execute com: node test-api.js
 */

const API_BASE_URL = 'https://hc-acesso-facil.onrender.com';

// Função auxiliar para fazer requisições
async function testarEndpoint(metodo, endpoint, dados = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`\n🔍 Testando ${metodo} ${endpoint}`);
  
  try {
    const options = {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
    
    if (dados) {
      options.body = JSON.stringify(dados);
    }
    
    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type');
    
    let resultado;
    if (contentType && contentType.includes('application/json')) {
      resultado = await response.json();
    } else {
      resultado = await response.text();
    }
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    console.log(`   Resposta:`, resultado);
    
    return { sucesso: response.ok, status: response.status, dados: resultado };
  } catch (error) {
    console.log(`   ❌ Erro: ${error.message}`);
    return { sucesso: false, erro: error.message };
  }
}

// Função principal de teste
async function executarTestes() {
  console.log('='.repeat(60));
  console.log('🧪 TESTE DE INTEGRAÇÃO COM A API');
  console.log('='.repeat(60));
  console.log(`API Base URL: ${API_BASE_URL}`);
  
  // Teste 1: Endpoint raiz
  await testarEndpoint('GET', '/');
  
  // Teste 2: Listar consultas
  await testarEndpoint('GET', '/consultas');
  
  // Teste 3: Listar exames
  await testarEndpoint('GET', '/exames');
  
  // Teste 4: Listar agendamentos
  await testarEndpoint('GET', '/agendamentos');
  
  // Teste 5: Criar uma consulta (POST)
  const dadosConsulta = {
    nomePaciente: 'João Silva Teste',
    cpfPaciente: '12345678900',
    dataNascimento: '1990-01-01',
    telefonePaciente: '11987654321',
    emailPaciente: 'joao.teste@email.com',
    convenio: 'unimed',
    especialidade: 'cardiologia',
    medico: 'Dr. Carlos Silva',
    dataConsulta: '2025-11-15',
    horarioConsulta: '14:00',
  };
  
  await testarEndpoint('POST', '/consultas', dadosConsulta);
  
  // Teste 6: Criar um exame (POST)
  const dadosExame = {
    nomePaciente: 'Maria Santos Teste',
    cpfPaciente: '98765432100',
    dataNascimento: '1985-05-10',
    telefonePaciente: '11912345678',
    emailPaciente: 'maria.teste@email.com',
    convenio: 'amil',
    tipoExame: 'sangue',
    dataExame: '2025-11-20',
    periodoExame: 'manha',
  };
  
  await testarEndpoint('POST', '/exames', dadosExame);
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Testes concluídos!');
  console.log('='.repeat(60));
  console.log('\n📝 Observações:');
  console.log('   - Se a API retornar erro 500, pode estar em cold start (inicializando)');
  console.log('   - O sistema de retry implementado no front-end lida com isso automaticamente');
  console.log('   - Aguarde alguns segundos e tente novamente se necessário');
  console.log('\n');
}

// Executar testes
executarTestes().catch(error => {
  console.error('Erro ao executar testes:', error);
  process.exit(1);
});
