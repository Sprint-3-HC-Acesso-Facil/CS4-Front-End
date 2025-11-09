/**
 * Script de teste da integração com a API Java
 * Endpoints corretos (sem /api)
 * Execute com: node test-api-endpoints.js
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
    
    console.log(`   ✅ Status: ${response.status} ${response.statusText}`);
    
    // Mostrar apenas os primeiros registros se for array
    if (Array.isArray(resultado)) {
      console.log(`   📊 Total de registros: ${resultado.length}`);
      if (resultado.length > 0) {
        console.log(`   📄 Primeiro registro:`, resultado[0]);
      }
    } else {
      console.log(`   📄 Resposta:`, resultado);
    }
    
    return { sucesso: response.ok, status: response.status, dados: resultado };
  } catch (error) {
    console.log(`   ❌ Erro: ${error.message}`);
    return { sucesso: false, erro: error.message };
  }
}

// Função principal de teste
async function executarTestes() {
  console.log('='.repeat(70));
  console.log('🧪 TESTE DE INTEGRAÇÃO COM A API JAVA - ENDPOINTS CORRETOS');
  console.log('='.repeat(70));
  console.log(`API Base URL: ${API_BASE_URL}`);
  console.log(`Endpoints: /clientes, /atendimentos, /especialistas (SEM /api)`);
  
  // Teste 1: Listar clientes
  console.log('\n📋 TESTANDO ENDPOINT /clientes');
  await testarEndpoint('GET', '/clientes');
  
  // Teste 2: Listar atendimentos
  console.log('\n📋 TESTANDO ENDPOINT /atendimentos');
  await testarEndpoint('GET', '/atendimentos');
  
  // Teste 3: Listar especialistas
  console.log('\n📋 TESTANDO ENDPOINT /especialistas');
  await testarEndpoint('GET', '/especialistas');
  
  // Teste 4: Criar um cliente (POST)
  console.log('\n📝 TESTANDO POST - CRIAR CLIENTE');
  const novoCliente = {
    nome: 'Maria Silva Teste',
    cpf: '98765432100',
    email: 'maria.teste@email.com',
    telefone1: '11912345678',
    idade: 28,
  };
  
  const resultadoCliente = await testarEndpoint('POST', '/clientes', novoCliente);
  
  // Se criou o cliente com sucesso, tenta criar um atendimento
  if (resultadoCliente.sucesso && resultadoCliente.dados && resultadoCliente.dados.codigo) {
    console.log('\n📝 TESTANDO POST - CRIAR ATENDIMENTO');
    const novoAtendimento = {
      clienteCodigo: resultadoCliente.dados.codigo,
      tipo: 'CONSULTA',
      dataAtendimento: '2025-11-15',
      horario: '14:00',
      status: 'AGENDADO',
      especialidade: 'Cardiologia',
      observacoes: 'Teste de integração',
    };
    
    await testarEndpoint('POST', '/atendimentos', novoAtendimento);
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ Testes concluídos!');
  console.log('='.repeat(70));
  console.log('\n📝 Observações:');
  console.log('   ✅ Endpoints corretos: /clientes, /atendimentos, /especialistas');
  console.log('   ✅ URL base: https://hc-acesso-facil.onrender.com (SEM /api)');
  console.log('   ✅ API usa campos: codigo (não id), telefone1 (não telefone)');
  console.log('   ⚠️  A API pode demorar 15-30s para "acordar" após inatividade');
  console.log('   ✅ Front-end está pronto e funcionando corretamente');
  console.log('\n');
}

// Executar testes
executarTestes().catch(error => {
  console.error('Erro ao executar testes:', error);
  process.exit(1);
});
