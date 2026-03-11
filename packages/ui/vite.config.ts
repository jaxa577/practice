import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@jonyrepo/i18n": path.resolve(__current_dir, "../i18n/index.ts"),
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
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
