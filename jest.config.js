module.exports = {
  moduleFileExtensions: ['js', 'ts', 'json', 'tsx'],
  setupFilesAfterEnv: ['./jest-setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  transform: {
    '.*.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
}