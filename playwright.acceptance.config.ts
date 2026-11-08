import { defineConfig, devices } from "@playwright/test";

// Browser specs of the acceptance suite (tests/acceptance/<capability>/e2e/).
// Red until the Build phase makes them pass, so they run apart from the default
// e2e tier. Same dev server and port as playwright.config.ts.
const PORT = 5178;

export default defineConfig({
  testDir: "./tests/acceptance",
  testMatch: "**/e2e/**/*.spec.ts",
  globalSetup: "./e2e/global-setup.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // The merge gate reads one run; a retry would hide an unreliable test.
  retries: 0,
  // A flow that signs in and checks out takes several seconds on a CI runner.
  timeout: 15_000,
  expect: { timeout: 5_000 },
  reporter: process.env.CI
    ? [
        ["list"],
        [
          "junit",
          {
            outputFile:
              process.env.PLAYWRIGHT_JUNIT_OUTPUT_NAME ??
              ".vortex-results/acceptance/e2e-junit.xml",
          },
        ],
      ]
    : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    // An agent container's small /dev/shm hangs Chromium.
    launchOptions: { args: ["--disable-dev-shm-usage"] },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `bun --bun ./node_modules/vite/bin/vite.js --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: "pipe",
  },
});
