import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    ...(process.env.VITE_CLIENT_PORT && {port: +process.env.VITE_CLIENT_PORT}),
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.PORT || 3000}/`,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '$': path.resolve(__dirname, './src'),
      '$api': path.resolve(__dirname, './src/api'),
      '$store': path.resolve(__dirname, './src/store'),
      '$types': path.resolve(__dirname, './src/types'),
      '$assets': path.resolve(__dirname, './src/assets'),
      '$cmp': path.resolve(__dirname, './src/components'),
      '$ui': path.resolve(__dirname, './src/components/ui'),
    },
  },
});
