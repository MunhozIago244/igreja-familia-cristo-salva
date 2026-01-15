import { TextEncoder, TextDecoder } from 'node:util';
import "@testing-library/jest-dom";

// Injeta os encoders no escopo global (funciona em Node e JSDOM)
Object.assign(globalThis, { TextEncoder, TextDecoder });

/**
 * Padrão Sênior: Verificação de existência do objeto global.
 * Isso impede o erro "window is not defined" quando rodamos testes em ambiente Node.
 */
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });
}