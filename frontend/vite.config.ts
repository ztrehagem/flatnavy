import * as path from "path";
import { defineConfig } from "vite";
import vueTsx from "@vitejs/plugin-vue-jsx";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  root: path.resolve("src"),

  envDir: path.resolve(),

  publicDir: path.resolve("public"),

  plugins: [vueTsx(), vanillaExtractPlugin()],

  build: {
    outDir: path.resolve("dist"),
    emptyOutDir: true,
  },
});
