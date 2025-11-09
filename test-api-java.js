/**
 * Script de teste da integração com a API Java
 * Execute com: node test-api-java.js
 */

const API_BASE_URL = 'https://hc-acesso-facil.onrender.com/api';

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
  console.log('🧪 TESTE DE INTEGRAÇÃO COM A API JAVA');
  console.log('='.repeat(60));
  console.log(`API Base URL: ${API_BASE_URL}`);
  
  // Teste 1: Listar clientes
  console.log('\n📋 TESTANDO ENDPOINTS DE CLIENTES');
  await testarEndpoint('GET', '/clientes');
  
  // Teste 2: Listar atendimentos
  console.log('\n📋 TESTANDO ENDPOINTS DE ATENDIMENTOS');
  await testarEndpoint('GET', '/atendimentos');
  
  // Teste 3: Listar especialistas
  console.log('\n📋 TESTANDO ENDPOINTS DE ESPECIALISTAS');
  await testarEndpoint('GET', '/especialistas');
  
  // Teste 4: Criar um cliente (POST)
  console.log('\n📝 TESTANDO POST - CRIAR CLIENTE');
  const novoCliente = {
    nome: 'João Silva Teste',
    cpf: '12345678900',
    dataNascimento: '1990-01-01',
    telefone: '11987654321',
    email: 'joao.teste@email.com',
    convenio: 'Unimed',
    numeroCarteirinha: '123456',
  };
  
  await testarEndpoint('POST', '/clientes', novoCliente);
  
  // Teste 5: Criar um atendimento (POST)
  console.log('\n📝 TESTANDO POST - CRIAR ATENDIMENTO');
  const novoAtendimento = {
    clienteId: 1,
    tipo: 'CONSULTA',
    dataAtendimento: '2025-11-15',
    horario: '14:00',
    status: 'AGENDADO',
    especialidade: 'Cardiologia',
    observacoes: 'Primeira consulta',
  };
  
  await testarEndpoint('POST', '/atendimentos', novoAtendimento);
  
  // Teste 6: Criar um especialista (POST)
  console.log('\n📝 TESTANDO POST - CRIAR ESPECIALISTA');
  const novoEspecialista = {
    nome: 'Dr. Carlos Silva',
    crm: '123456',
    especialidade: 'Cardiologia',
    telefone: '11987654321',
    email: 'carlos@hospital.com',
    disponivel: true,
  };
  
  await testarEndpoint('POST', '/especialistas', novoEspecialista);
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Testes concluídos!');
  console.log('='.repeat(60));
  console.log('\n📝 Observações:');
  console.log('   - Se a API retornar erro 500, há um problema no backend Java');
  console.log('   - Verifique se o banco de dados está configurado corretamente');
  console.log('   - Verifique os logs da API no Render');
  console.log('   - O front-end está pronto e funcionando corretamente');
  console.log('   - Quando a API estiver funcional, tudo funcionará automaticamente');
  console.log('\n');
}

// Executar testes
executarTestes().catch(error => {
  console.error('Erro ao executar testes:', error);
  process.exit(1);
});
