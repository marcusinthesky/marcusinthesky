import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [storybookTest()],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            provider: playwright({
              launchOptions: process.env.PLAYWRIGHT_EXECUTABLE_PATH
                ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
                : undefined,
            }),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
