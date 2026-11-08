import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

// Runs only the acceptance unit tests (`bun run test:acceptance`). The default
// run in vitest.config.ts excludes tests/acceptance/**. Browser specs under
// tests/acceptance/<capability>/e2e/ belong to Playwright, not to this runner.
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: ["react", "react-router"],
      dts: "./auto-imports.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: false,
    include: ["tests/acceptance/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "dist", ".output", "tests/acceptance/**/e2e/**"],
  },
});
