import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    build: {
      outDir: './docs'
    }
  };
});
