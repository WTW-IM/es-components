const esComponentsRoot = `<rootDir>/packages/es-components`;

const generateConfig = (rootDir = esComponentsRoot) => ({
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    `${rootDir}/src/build-utils/jest.ts`,
    `${rootDir}/config/jest-setup.ts`,
    `${rootDir}/config/jest-shims.ts`
  ],
  testPathIgnorePatterns: ['es6', 'lib'],
  testEnvironmentOptions: {
    url: 'http://localhost/'
  },
  testRegex: 'specs\\.(js|ts|tsx)$',
  transform: {
    '^.+\\.(j|t)sx?$': [
      'ts-jest',
      {
        tsconfig: `${rootDir}/config/test-tsconfig.json`
      }
    ]
  },
  maxWorkers: '50%',
  moduleNameMapper: {
    '^es-components-via-theme$': `${rootDir}/../es-components-via-theme/src/index.ts`,
    '^es-components-shared-types$': `${rootDir}/../../shared/types/src/index.ts`
  },
  preset: 'ts-jest'
});

module.exports = generateConfig;
