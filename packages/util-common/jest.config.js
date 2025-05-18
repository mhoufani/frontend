export default {
  rootDir: './src',
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    // '^.+\\.m?js$': 'babel-jest' // default on future
  },
  collectCoverage: true,
  // setupFiles: ['<rootDir>/setupTests.js'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^@checker$': '<rootDir>/checker/index.ts',
    '^@storage$': '<rootDir>/storage/index.ts',
    '^@entity$': '<rootDir>/entity/index.ts',
    '^@url$': '<rootDir>/url/index.ts',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
  ],
}
