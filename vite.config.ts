/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: "istanbul", // or 'v8'
      include: ["src/components/**/*.{js,jsx,ts,tsx}"],
    },
    globals: true,
    environment: "jsdom",
    cache: false,
  },
});
