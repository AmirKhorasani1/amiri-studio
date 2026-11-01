import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
      "/socket.io": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  build: {
    cssCodeSplit: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@common": path.resolve(__dirname, "./src/components/common"),
      "@layouts": path.resolve(__dirname, "./src/components/layouts"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@animation": path.resolve(__dirname, "./src/animation"),
      "@templates": path.resolve(__dirname, "./src/components/templates"),
      "@admin": path.resolve(__dirname, "./src/components/templates/admin"),
      "@home": path.resolve(__dirname, "./src/components/templates/home"),
      "@tools": path.resolve(__dirname, "./src/components/templates/tools"),
      "@projects": path.resolve(__dirname, "./src/components/templates/projects"),
      "@dev-notes": path.resolve(__dirname, "./src/components/templates/dev-notes"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },
});
