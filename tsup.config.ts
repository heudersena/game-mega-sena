import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src",'!src/**/*.sql','!src/**/*.SQL','!src/**/*.html','!src/zod/**/*'],
  splitting: false,
  sourcemap: false,
  clean: true,
  outDir: "/dist",
  minify: true,
  dts: false,
  minifyWhitespace: true,
  legacyOutput: true,
  
});
