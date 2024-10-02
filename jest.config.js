import utilsPkg from './packages/util-common/package.json'

export default {
  rootDir: './',
  preset: 'ts-jest',
  transform: {
    // '^.+\\.m?js$': 'babel-jest' // default on future
  },
  collectCoverage: true,
  setupFiles: ['<rootDir>/setupTests.js'],
  moduleFileExtensions: ['ts', 'js', 'jsx', 'json', 'node', 'mts', 'mjs'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/coverage/',
  ],
  projects: [
    {
      displayName: utilsPkg.name,
      testMatch: ['<rootDir>/packages/util-common/**/*.test.[mj|t]s?(x)'],
      testEnvironment: 'jsdom',
    },
  ],
}
