import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'html'],
  // TODO: Add coverageThreshold when we start writing real tests
  // coverageThreshold: {
  //   global: {
  //     statements: 90,
  //     lines: 90,
  //     branches: 80,
  //     functions: 80,
  //   },
  // },
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(config)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      // Workaround to put our SVG mock first
      '\\.svg$': '<rootDir>/src/testUtils/svgMock.tsx',
      ...nextJestConfig.moduleNameMapper,
    },
  };
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default jestConfig;
