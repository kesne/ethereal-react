import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "ethical-react": "../src",
    },
  },
  define: {
    'global': 'globalThis',
  }
});
