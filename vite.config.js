import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const REPOSITORY_NAME = 'svg-zoom-pan-pinch';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${REPOSITORY_NAME}/`,
});
