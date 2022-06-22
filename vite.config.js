import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import eslintPlugin from "vite-plugin-eslint";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? '/huddle-buddies-ff/' : '/',
  plugins: [vue()],
  // plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
