import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";
import stylelint from 'vite-plugin-stylelint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    stylelint({
      files: ['src/**/*.{ts,tsx,html,css,scss}'],
      cache: false,
      fix: false
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "@testing-library/jest-dom",
		mockReset: true,
	},
});
