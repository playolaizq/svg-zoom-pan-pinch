import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const REPOSITORY_NAME = 'svg-zoom-pan-pinch';

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => ({
  plugins: [react(), svgr()],
  base: mode === 'development' ? '' : `/${REPOSITORY_NAME}/`,
  server: {
    host: true,
  },
}));
