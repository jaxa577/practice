// remote-app
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import { visualizer } from "rollup-plugin-visualizer";
import { jonyTerser } from "@jonyrepo/vite-plugins";

export default defineConfig({
  server: {
    port: 5001,
    strictPort: true,
    host: true,
    cors: true,
    origin: "http://localhost:5001",
  },
  plugins: [
    vue(),
    jonyTerser({ dropConsole: true, removeComments: true }),
    visualizer({
      filename: "./dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        "./Widget": "./src/components/Widget.vue",
      },
      shared: ["vue"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
