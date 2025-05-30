import { vi } from 'vitest';

// Mock Nuxt auto-imported functions
globalThis.setUserSession = vi.fn();
globalThis.sendRedirect = vi.fn();
globalThis.createError = vi.fn((error) => error);

// Silence console.error in tests
vi.spyOn(console, 'error').mockImplementation(() => {});
