// __mocks__/next/navigation.js
// This file will mock the next/navigation module for Jest

export const useRouter = jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
}));

export const useSearchParams = jest.fn(() => ({
    get: jest.fn((param) => {
        // You can customize this to return specific values for specific params
        if (param === 'redirect') {
            return '/dashboard'; // Example: Return a default redirect for tests
        }
        return null;
    }),
}));