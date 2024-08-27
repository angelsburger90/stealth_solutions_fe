import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@datacontext": path.resolve(__dirname, "./src/datacontext"),
      "@page": path.resolve(__dirname, "./src/page"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@model": path.resolve(__dirname, "./src/model"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
  plugins: [react()],
});
