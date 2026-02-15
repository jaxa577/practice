import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";

export function jonyTerser(options = { dropConsole: true }): Plugin {
  return {
    name: "vite-plugin-jony-terser",
    apply: "build",

    // Code optiomization
    transform(code, id) {
      // Remove node_mpdules
      if (/\.(js|ts|vue)$/.test(id) && !id.includes("node_modules")) {
        let transformed = code;

        if (options.dropConsole) {
          // Del console.log
          transformed = transformed.replace(
            /console\.log\s*\([\s\S]*?\);?/g,
            "",
          );
        }

        transformed = transformed
          .replace(/debugger;?/g, "")
          .replace(/\btrue\b/g, "!0")
          .replace(/\bfalse\b/g, "!1");

        return { code: transformed, map: null };
      }
    },

    // Meata data injectioon
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
