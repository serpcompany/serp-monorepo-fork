import { vi } from 'vitest';

// Mock mailgun.js
const mockMessagesCreate = vi.fn().mockResolvedValue({ id: 'test-message-id' });
const mockMailgunClient = {
  messages: {
    create: mockMessagesCreate
  }
};

const mockMailgunInstance = {
  client: vi.fn().mockReturnValue(mockMailgunClient)
};

vi.mock('mailgun.js', () => ({
  default: vi.fn().mockImplementation(() => mockMailgunInstance)
}));

export { mockMessagesCreate, mockMailgunClient, mockMailgunInstance };

// Mock FormData
vi.mock('form-data', () => ({
  default: vi.fn().mockImplementation(() => ({}))
}));
