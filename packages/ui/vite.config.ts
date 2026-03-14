import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@jonyrepo/i18n": resolve(__dirname, "../i18n/index.ts"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "JonyUI",
      fileName: "jony-ui",
      formats: ["es"],
    },
    rollupOptions: {

      
      external: ["vue", "vue-i18n"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
