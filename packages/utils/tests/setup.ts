import { vi } from 'vitest';

// Mock navigateTo function
export const mockNavigateTo = vi.fn();
vi.stubGlobal('navigateTo', mockNavigateTo);

// Mock defineNuxtRouteMiddleware function
export const mockDefineNuxtRouteMiddleware = vi.fn((handler) => handler);
vi.stubGlobal('defineNuxtRouteMiddleware', mockDefineNuxtRouteMiddleware);

// Create a mock redirects.json file
vi.mock('@/redirects.json', () => ({
  default: {
    '/old-path': '/new-path',
    '/blog': '/posts',
    '/about-us': '/about'
  }
}));
