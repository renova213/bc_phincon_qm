import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["../tests"],
  // testMatch: ["../tests/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

export default config;
