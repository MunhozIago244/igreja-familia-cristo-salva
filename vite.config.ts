import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./src/test/setup.ts"],
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
      env: env,
      server: {
        deps: {
          inline: [/^(?!.*vitest).*$/],
        },
      },
    },
    resolve: {
      alias: {
        // No Node modern, use fileURLToPath se __dirname falhar, 
        // mas com @types/node instalado, path.resolve funcionará.
        "@": path.resolve(process.cwd(), "./src"), 
      },
    },
  };
});