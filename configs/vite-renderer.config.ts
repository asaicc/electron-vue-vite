import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pkg from "../package.json";

const resolve = (str: string) => path.resolve(__dirname, str);

export default defineConfig({
  mode: process.env.NODE_ENV,
  root: resolve("../src/renderer"),
  plugins: [vue()],
  base: "./",
  resolve: {
    alias: {
      "@": resolve("../src/renderer"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/globalVariable.scss";',
      },
    },
  },
  build: {
    emptyOutDir: true,
    outDir: "../../dist/renderer",
  },
  server: {
    host: pkg.env.HOST,
    port: pkg.env.PORT,
    proxy: {
      "/api": {
        target: "https://",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
