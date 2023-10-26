import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const REPOSITORY_NAME = 'svg-zoom-pan-pinch';

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'development' ? '' : `/${REPOSITORY_NAME}/`,
  server: {
    host: true,
  },
}));
