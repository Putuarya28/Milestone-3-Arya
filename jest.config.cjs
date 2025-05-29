module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
    "^.+\\.(css|scss|sass)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};