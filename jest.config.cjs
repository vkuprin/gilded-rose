module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/*.test.ts?(x)'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
};
