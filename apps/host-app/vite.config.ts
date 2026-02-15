// host-app
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import { jonyTerser } from "@jonyrepo/vite-plugins";

export default defineConfig({
  plugins: [
    vue(),
    jonyTerser({ dropConsole: true }),
    federation({
      name: "host_app",
      remotes: {
        remote_app: "http://localhost:5001/assets/remoteEntry.js",
      },
      shared: ["vue"],
    }),
  ],
});
