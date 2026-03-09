import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";

export function jonyTerser(
  options = { dropConsole: true, removeComments: true },
): Plugin {
  return {
    name: "vite-plugin-jony-terser",
    apply: "build",

    // 1. Обработка JS/TS/Vue кода
    transform(code, id) {
      // Игнорируем виртуальные модули и node_modules
      const isVirtual = id.startsWith("\0") || id.includes("virtual:");
      const isSourceFile =
        /\.(js|ts|vue)$/.test(id) && !id.includes("node_modules");

      if (isSourceFile && !isVirtual) {
        let transformed = code;

        if (options.dropConsole) {
          transformed = transformed.replace(
            /console\.log\s*\([\s\S]*?\);?/g,
            "",
          );
        }

        if (options.removeComments) {
          transformed = transformed.replace(/\/\*[\s\S]*?\*\//g, "");
          transformed = transformed.replace(/(^|\s)\/\/.*/g, "$1");
        }

        transformed = transformed
          .replace(/debugger;?/g, "")
          .replace(/\btrue\b/g, "!0")
          .replace(/\bfalse\b/g, "!1");

        return { code: transformed, map: null };
      }
    },

    // 2. Инъекция в HTML
    transformIndexHtml(html) {
      const date = new Date().toISOString().split("T")[0];
      const time = new Date().toLocaleTimeString();

      let version = "unknown";
      try {
        const pkg = JSON.parse(
          fs.readFileSync(path.join(process.cwd(), "package.json"), "utf-8"),
        );
        version = pkg.version;
      } catch (e) {
        /* ignore */
      }

      const metaComment = `
    `;

      return html.replace("</head>", `${metaComment}\n</head>`);
    },
  };
}
