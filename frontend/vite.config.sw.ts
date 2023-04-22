import * as path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: path.resolve("src"),

  envDir: path.resolve(),

  build: {
    target: ["es2022"],

    outDir: path.resolve("dist"),
    emptyOutDir: false,

    rollupOptions: {
      input: {
        sw: path.resolve("src/sw.ts"),
      },
      output: {
        entryFileNames: `[name].js`,
      },
    },
  },
});
