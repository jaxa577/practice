@jonyrepo/vite-plugins 🛠️
A collection of high-performance Vite plugins for the JonyRepo monorepo. Built with TypeScript and tsup.

Installation
Bash
pnpm add @jonyrepo/vite-plugins@workspace:* -D
Plugins
1. jonyTerser
A lightweight alternative to Terser for code optimization and metadata injection.

Features:

Drop Console: Removes all console.log statements in production builds.

Debugger Removal: Automatically strips debugger; statements.

Boolean Compression: Compresses true to !0 and false to !1.

Version Injection: Injects build metadata (version, date) into the index.html header.

Usage:

TypeScript
// vite.config.ts
import { jonyTerser } from '@jonyrepo/vite-plugins';

export default defineConfig({
  plugins: [
    jonyTerser({ 
      dropConsole: true // Set to false to keep logs in build
    })
  ]
});
Build & Development
The package uses tsup for bundling to ensure compatibility with Node.js ESM.

pnpm build: Compiles the plugin to dist/ with type definitions.

pnpm dev: Starts watching files for changes and re-builds on the fly.