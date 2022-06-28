import path from 'path'
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/huddle-buddies-ff/' : '/',
  // plugins: [Vue()],
  plugins: [Vue(), eslintPlugin()],
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}/`
    },
  },
});
