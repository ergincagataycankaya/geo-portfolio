import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Honour PORT so the dev server can share a machine with other Vite projects.
  server: { port: Number(process.env.PORT) || 5173 },
});
