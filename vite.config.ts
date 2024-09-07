import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 750,
    outDir: 'public',
  },
  plugins: [react(), tsconfigPaths()],
  publicDir: 'src/static',
  test: {
    environment: 'jsdom',
  },
});
