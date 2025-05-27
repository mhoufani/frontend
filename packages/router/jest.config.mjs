export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@mp/util-common/(.*)': '<rootDir>/../util-common/src/$1',
  },
};