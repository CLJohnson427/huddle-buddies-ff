
import vue from '@vitejs/plugin-vue';
import path from 'path';
// import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

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
    vue(),

    // https://github.com/gxmari007/vite-plugin-eslint
    eslint(),

    // https://github.com/antfu/unplugin-vue-components
    // Components({
    //   extensions: ['vue'],
    //   include: [/\.vue$/, /\.vue\?vue/]
    // }),
  ],
  server: {
    host: 'localhost',
    port: 3000,
    open: false
  }
});
