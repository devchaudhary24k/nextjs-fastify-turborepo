import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/app.ts"], // main entry file
  outDir: "dist", // output directory
  target: "node18", // modern Node.js runtime
  format: ["cjs"], // CommonJS output (standard for Node apps)
  splitting: true, // allow multiple output files if needed
  sourcemap: true, // generate source maps for debugging
  clean: true, // clean dist before building
  dts: false, // no types needed in runtime
  minify: true, // minify JS files to save size
  treeshake: true, // remove dead code
  skipNodeModulesBundle: false, // 🔥 Bundle ALL node_modules into output
  external: [".env"], // only .env file stays external
});
