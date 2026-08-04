import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'jind-ui-kit/motion': path.resolve(__dirname, '../../packages/jind-ui-kit/src/motion/index.ts'),
    },
  },
});
