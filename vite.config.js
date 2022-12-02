import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mkcert from "vite-plugin-mkcert";

import manifest_build from "./build/manifest_build";
import package_generation from "./build/package_generation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        // ignora os componentes do Aframe
        // sugestão de ajuste - fazer com uma expressão regular
        compilerOptions: {
          isCustomElement: (tag) => {
            return (
              tag === "a-scene" ||
              tag === "a-entity" ||
              tag === "a-marker" ||
              tag === "a-sphere" ||
              tag === "a-assets" ||
              tag === "a-box"
            );
          },
        },
      },
    }),
    manifest_build(),
    package_generation(),
    mkcert(), // necessário para executar o ambiente de desenvolvimento em https
  ],
  build: {
    rollupOptions: {
      // Impede que os artefatos tenham hash
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  experimental: {
    // remove o "/" dos assets no html
    // o scorm nao identifica caminhos como "/assets/index.js"
    // precisa ser "assets/index.js"
    renderBuiltUrl: (filename) => filename,
  },
  server: {
    // abre o server no simulador de lms scorm
    open: "/scorm12.html",
    https: true,
  },
});
