import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 750,
    outDir: 'public',
  },
  plugins: [react()],
  publicDir: 'src/static',
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: 'jsdom',
  },
});
