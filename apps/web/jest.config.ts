import nextJest from 'next/jest';
import type { Config } from '@jest/types';

const createJestConfig = nextJest({
    dir: './',
});


const customJestConfig: Config.InitialOptions = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', '<rootDir>/'],
    // Only look inside src/
    testMatch: ['**/src/**/*.test.[jt]s?(x)'],
    // Ignore the e2e tests
    testPathIgnorePatterns: ['/node_modules/', '/tests/e2e/'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    // transform: {
    //     '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Or ts-jest if you prefer
    // },
};

export default createJestConfig(customJestConfig);
