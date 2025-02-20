import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["ys6cmd-5173.csb.app"], // Substitua pelo domínio correto
    /*guia do Lucas: http://localhost:5173*/
  },
});
