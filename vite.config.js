import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/fluid-meter/' : '/',
    build: {
      outDir: './docs'
    }
  };
});
