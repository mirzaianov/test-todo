import { ViteUserConfig, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() as ViteUserConfig['plugins']],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
});
