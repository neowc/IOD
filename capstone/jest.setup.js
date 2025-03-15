// Import jest-dom matchers
import '@testing-library/jest-dom';

// Mock fetch
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  usePathname() {
    return '/mock-path';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  useParams() {
    return { id: '1' };
  },
}));

// Mock next-auth
jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  return {
    __esModule: true,
    ...originalModule,
    signIn: jest.fn(() => Promise.resolve({ ok: true })),
    signOut: jest.fn(() => Promise.resolve(true)),
    useSession: jest.fn(() => ({
      data: {
        user: { id: 'mock-user-id', name: 'Test User', email: 'test@example.com' },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
      status: 'authenticated',
    })),
    getServerSession: jest.fn(() => ({
      user: { id: 'mock-user-id', name: 'Test User', email: 'test@example.com' },
    })),
  };
});

// Mock resize observer
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

// Suppress console errors during tests
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    args[0]?.includes?.('Warning: ReactDOM.render is no longer supported') ||
    args[0]?.includes?.('Warning: The current testing environment is not configured to support act') ||
    args[0]?.includes?.('Warning: An update to') ||
    args[0]?.includes?.('Warning: validateDOMNesting')
  ) {
    return;
  }
  originalConsoleError(...args);
};