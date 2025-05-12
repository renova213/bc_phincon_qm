module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["src/test/**/*.test.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
