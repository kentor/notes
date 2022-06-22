import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 750,
    outDir: 'public',
  },
  plugins: [react(), tsconfigPaths({root: __dirname})],
  publicDir: 'src/static',
});
