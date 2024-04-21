module.exports = {
    roots: ["<rootDir>/src"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    moduleNameMapper: {
      "\\.(css|scss)$": "identity-obj-proxy",
    },
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
      "^.+\\.(js|jsx)$": "babel-jest",
      "^.+\\.(css|scss)$": "jest-css-modules-transform",
    },
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
    testEnvironment: "jsdom",
    transformIgnorePatterns: [
      "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base)/"
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  };

  