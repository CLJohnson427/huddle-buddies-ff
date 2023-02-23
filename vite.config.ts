import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  // base: process.env.NODE_ENV === 'production' ? '/huddle-buddies-ff/' : '/',
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}/`
    },
  },
  plugins: [
    // https://github.com/vitejs/vite
    Vue(),

    // https://github.com/gxmari007/vite-plugin-eslint
    eslintPlugin(),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/]
    }),
  ],
  server: {
    host: 'localhost',
    port: 3000,
    open: true
  }
});
