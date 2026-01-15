import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente do arquivo .env
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./src/test/setup.ts"],
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
      env: env,
      
      // Padrão Vitest 4: Opções de pool agora são de nível superior
      pool: 'threads',
      isolate: false, // Resolve o conflito TextEncoder vs JSDOM
      fileParallelism: false, // Evita corrupção de cache no Windows
      
      server: {
        deps: {
          inline: [/^(?!.*vitest).*$/],
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "./src"),
      },
    },
  };
});