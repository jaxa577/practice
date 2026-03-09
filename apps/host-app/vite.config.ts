// apps/host-app/vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import { jonyTerser } from "@jonyrepo/vite-plugins";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    vue(),
    jonyTerser({ dropConsole: true, removeComments: true }),
    federation({
      name: "host_app",
      remotes: {
        remote_app: "http://localhost:5001/assets/remoteEntry.js",
      },
      shared: ["vue"],
    }),
    visualizer({
      filename: "./dist/jonystats.html",  
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
