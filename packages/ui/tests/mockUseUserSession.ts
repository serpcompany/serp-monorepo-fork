import { vi } from 'vitest';
import { ref } from 'vue';

(globalThis as unknown).useUserSession = () => ({
  loggedIn: ref(true),
  user: ref({ name: 'Test User', email: 'test@test.com' }),
  clear: vi.fn()
});
