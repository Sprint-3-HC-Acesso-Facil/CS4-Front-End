// src/servicos/httpClient.ts

import { API_BASE_URL, API_TIMEOUT, DEFAULT_HEADERS, MAX_RETRIES, RETRY_DELAY } from './config';
import type { RespostaAPI, ErroAPI } from '../tipos/api';

/**
 * Classe de erro personalizada para erros da API
 */
export class ErroAPIException extends Error {
  public readonly codigo?: string;
  public readonly detalhes?: string[];
  public readonly statusCode?: number;

  constructor(mensagem: string, codigo?: string, detalhes?: string[], statusCode?: number) {
    super(mensagem);
    this.name = 'ErroAPIException';
    this.codigo = codigo;
    this.detalhes = detalhes;
    this.statusCode = statusCode;
  }
}

/**
 * Função auxiliar para adicionar timeout a uma Promise
 */
function comTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout: A requisição demorou muito para responder')), timeoutMs)
    ),
  ]);
}

/**
 * Função auxiliar para aguardar um tempo específico
 */
function aguardar(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Função auxiliar para fazer requisições HTTP com retry
 */
async function requisicaoComRetry(
  url: string,
  options: RequestInit,
  tentativasRestantes: number = MAX_RETRIES
): Promise<Response> {
  try {
    const response = await comTimeout(fetch(url, options), API_TIMEOUT);
    
    // Se a resposta for 5xx (erro do servidor), tenta novamente
    if (response.status >= 500 && tentativasRestantes > 0) {
      console.warn(`Erro ${response.status} no servidor. Tentando novamente... (${tentativasRestantes} tentativas restantes)`);
      await aguardar(RETRY_DELAY);
      return requisicaoComRetry(url, options, tentativasRestantes - 1);
    }
    
    return response;
  } catch (error) {
    // Em caso de erro de rede, tenta novamente
    if (tentativasRestantes > 0) {
      console.warn(`Erro de rede. Tentando novamente... (${tentativasRestantes} tentativas restantes)`);
      await aguardar(RETRY_DELAY);
      return requisicaoComRetry(url, options, tentativasRestantes - 1);
    }
    throw error;
  }
}

/**
 * Função auxiliar para processar a resposta da API
 */
async function processarResposta<T>(response: Response): Promise<RespostaAPI<T>> {
  const contentType = response.headers.get('content-type');
  
  // Verifica se a resposta é JSON
  if (contentType && contentType.includes('application/json')) {
    const dados = await response.json();
    
    if (!response.ok) {
      // Trata erros da API
      const erro: ErroAPI = {
        mensagem: dados.mensagem || dados.message || 'Erro desconhecido na API',
        codigo: dados.codigo || dados.code,
        detalhes: dados.detalhes || dados.details,
      };
      
      throw new ErroAPIException(
        erro.mensagem,
        erro.codigo,
        erro.detalhes,
        response.status
      );
    }
    
    return {
      sucesso: true,
      dados: dados.dados || dados.data || dados,
      mensagem: dados.mensagem || dados.message,
    };
  }
  
  // Se não for JSON, tenta obter o texto
  const texto = await response.text();
  
  if (!response.ok) {
    throw new ErroAPIException(
      texto || `Erro HTTP ${response.status}: ${response.statusText}`,
      undefined,
      undefined,
      response.status
    );
  }
  
  return {
    sucesso: true,
    dados: texto as any,
  };
}

/**
 * Cliente HTTP para fazer requisições à API
 */
export const httpClient = {
  /**
   * Requisição GET
   */
  async get<T = any>(endpoint: string, params?: Record<string, string>): Promise<RespostaAPI<T>> {
    try {
      let url = `${API_BASE_URL}${endpoint}`;
      
      // Adiciona query parameters se fornecidos
      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }
      
      const response = await requisicaoComRetry(url, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      return await processarResposta<T>(response);
    } catch (error) {
      if (error instanceof ErroAPIException) {
        throw error;
      }
      throw new ErroAPIException(
        error instanceof Error ? error.message : 'Erro desconhecido ao fazer requisição GET'
      );
    }
  },

  /**
   * Requisição POST
   */
  async post<T = any>(endpoint: string, dados: any): Promise<RespostaAPI<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      const response = await requisicaoComRetry(url, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(dados),
      });
      
      return await processarResposta<T>(response);
    } catch (error) {
      if (error instanceof ErroAPIException) {
        throw error;
      }
      throw new ErroAPIException(
        error instanceof Error ? error.message : 'Erro desconhecido ao fazer requisição POST'
      );
    }
  },

  /**
   * Requisição PUT
   */
  async put<T = any>(endpoint: string, dados: any): Promise<RespostaAPI<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      const response = await requisicaoComRetry(url, {
        method: 'PUT',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(dados),
      });
      
      return await processarResposta<T>(response);
    } catch (error) {
      if (error instanceof ErroAPIException) {
        throw error;
      }
      throw new ErroAPIException(
        error instanceof Error ? error.message : 'Erro desconhecido ao fazer requisição PUT'
      );
    }
  },

  /**
   * Requisição DELETE
   */
  async delete<T = any>(endpoint: string): Promise<RespostaAPI<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      const response = await requisicaoComRetry(url, {
        method: 'DELETE',
        headers: DEFAULT_HEADERS,
      });
      
      return await processarResposta<T>(response);
    } catch (error) {
      if (error instanceof ErroAPIException) {
        throw error;
      }
      throw new ErroAPIException(
        error instanceof Error ? error.message : 'Erro desconhecido ao fazer requisição DELETE'
      );
    }
  },

  /**
   * Requisição PATCH
   */
  async patch<T = any>(endpoint: string, dados: any): Promise<RespostaAPI<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      const response = await requisicaoComRetry(url, {
        method: 'PATCH',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(dados),
      });
      
      return await processarResposta<T>(response);
    } catch (error) {
      if (error instanceof ErroAPIException) {
        throw error;
      }
      throw new ErroAPIException(
        error instanceof Error ? error.message : 'Erro desconhecido ao fazer requisição PATCH'
      );
    }
  },
};
