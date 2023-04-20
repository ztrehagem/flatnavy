import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  root: path.resolve("src"),

  envDir: path.resolve(),

  publicDir: path.resolve("public"),

  plugins: [react(), vanillaExtractPlugin()],

  build: {
    outDir: path.resolve("dist"),
    emptyOutDir: true,
    target: ["es2022"],
  },
});
