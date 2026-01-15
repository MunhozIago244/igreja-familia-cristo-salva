/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import { loadEnv } from 'vite';

// Padrão Sênior: Carregamento manual de variáveis de ambiente no Node
// process.cwd() garante que ele busque na raiz do projeto
const env = loadEnv('', process.cwd(), '');

describe('Inspeção da API do YouTube', () => {
  // Agora buscamos de 'env' que acabamos de carregar manualmente
  const API_KEY = env.VITE_YOUTUBE_API_KEY?.replace(/['"]/g, '');
  const CHANNEL_ID = env.VITE_YOUTUBE_CHANNEL_ID?.replace(/['"]/g, '');

  it('deve realizar a chamada e exibir todos os dados encontrados', async () => {
    // Validação de sanidade
    if (!API_KEY) {
      throw new Error(`API_KEY não encontrada. Variáveis detectadas: ${Object.keys(env).join(', ')}`);
    }
    
    const query = "culto";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=5&q=${query}&type=video&key=${API_KEY}`;
    
    console.log(`🚀 Tentando conexão com Canal: ${CHANNEL_ID}`);

    const response = await fetch(url);
    const data = await response.json() as any;

    if (data.error) {
      console.error("❌ Erro da Google API:", data.error.message);
      throw new Error(data.error.message);
    }

    console.log(`\n✅ SUCESSO! LISTA DE VÍDEOS:`);
    data.items?.forEach((item: any) => {
      console.log(`- ${item.snippet.title}`);
    });

    expect(response.status).toBe(200);
    expect(data.items.length).toBeGreaterThan(0);
  });
});