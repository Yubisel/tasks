import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    ...(process.env.VITE_CLIENT_PORT && {port: +process.env.VITE_CLIENT_PORT}),
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.API_PORT || 3000}/`,
        changeOrigin: true,
      },
    },
  },
});
