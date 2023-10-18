import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  env: {
    VITE_APP_BASE_URL: process.env.VITE_APP_BASE_URL,
  },
});
