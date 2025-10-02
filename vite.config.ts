import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        { src: "./manifest.json", dest: "./" },
        { src: "./popup.html", dest: "./" },
        { src: "./popup.js", dest: "./" },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // build: {
  //   rollupOptions: {
  //     input: {
  //       content: resolve(__dirname, "src/main.tsx"),
  //       // background: resolve(__dirname, 'src/background.ts'),
  //       // panel: resolve(__dirname, 'src/panel.tsx'),
  //     },
  //     output: {
  //       entryFileNames: "[name].js",
  //       assetFileNames: "[name].[ext]",
  //       // format: '',
  //     },
  //   },
  //   outDir: "dist",
  //   emptyOutDir: true,
  // },
});
