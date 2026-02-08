import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  server: {
    cors: true,
    origin: "http://localhost:5001",
  },
  plugins: [
    vue(),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        "./Widget": "./src/components/HelloWorld.vue",
      },
      shared: ['vue']
    }),
  ],
  build: {
    target: "esnext",
  },
});
