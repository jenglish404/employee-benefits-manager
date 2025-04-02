import { pathsToModuleNameMapper } from "ts-jest";
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('ts-jest').JestConfigWithTsJest} **/
const config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest", { diagnostics: { ignoreCodes: ["TS151001"] } }],
  },
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
