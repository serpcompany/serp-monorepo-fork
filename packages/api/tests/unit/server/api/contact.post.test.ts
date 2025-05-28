import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockReadBody } from '../../../setup';

// Mock the mail module
const mockSendEmail = vi.fn().mockResolvedValue({});
vi.mock('@serp/utils/server', () => ({
  sendEmail: mockSendEmail
}));

describe('Contact Form API', () => {
  let handler;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    // Set environment variable
    process.env.CONTACT_EMAIL = 'test@example.com';

    // Import handler
    handler = (await import('../../../../server/api/contact.post')).default;
  });

  it('should validate required fields', async () => {
    // Missing all fields
    mockReadBody.mockResolvedValueOnce({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    let result = await handler({});
    expect(result).toEqual({ error: 'name is required' });

    // Missing email
    mockReadBody.mockResolvedValueOnce({
      name: 'Test User',
      email: '',
      subject: '',
      message: ''
    });

    result = await handler({});
    expect(result).toEqual({ error: 'email is required' });

    // Invalid email
    mockReadBody.mockResolvedValueOnce({
      name: 'Test User',
      email: 'invalid-email',
      subject: '',
      message: ''
    });

    result = await handler({});
    expect(result).toEqual({ error: 'email is invalid' });

    // Missing subject
    mockReadBody.mockResolvedValueOnce({
      name: 'Test User',
      email: 'user@example.com',
      subject: '',
      message: ''
    });

    result = await handler({});
    expect(result).toEqual({ error: 'subject is required' });

    // Missing message
    mockReadBody.mockResolvedValueOnce({
      name: 'Test User',
      email: 'user@example.com',
      subject: 'Test Subject',
      message: ''
    });

    result = await handler({});
    expect(result).toEqual({ error: 'message is required' });
  });

  it('should handle whitespace in required fields', async () => {
    mockReadBody.mockResolvedValueOnce({
      name: '   ',
      email: 'user@example.com',
      subject: 'Test Subject',
      message: 'Hello world'
    });

    const result = await handler({});
    expect(result).toEqual({ error: 'name is required' });
  });

  it('should send an email with valid form data', async () => {
    const formData = {
      name: 'Test User',
      email: 'user@example.com',
      subject: 'Test Subject',
      message: 'This is a test message'
    };

    mockReadBody.mockResolvedValueOnce(formData);

    const result = await handler({});

    expect(result).toEqual({ ok: true });
    expect(mockSendEmail).toHaveBeenCalledWith({
      to: 'test@example.com',
      subject: 'Contact Form Submission From `Test User`',
      text: expect.stringContaining('Test User'),
      html: expect.stringContaining('Test User')
    });
    expect(mockSendEmail).toHaveBeenCalledTimes(1);
  });

  it('should use default contact email if env variable is not set', async () => {
    // Clear environment variable
    delete process.env.CONTACT_EMAIL;

    const formData = {
      name: 'Test User',
      email: 'user@example.com',
      subject: 'Test Subject',
      message: 'This is a test message'
    };

    mockReadBody.mockResolvedValueOnce(formData);

    const result = await handler({});

    expect(result).toEqual({ ok: true });
    expect(mockSendEmail).toHaveBeenCalledWith({
      to: 'contact@serp.co',
      subject: expect.any(String),
      text: expect.any(String),
      html: expect.any(String)
    });
  });

  it('should handle errors from email service', async () => {
    const formData = {
      name: 'Test User',
      email: 'user@example.com',
      subject: 'Test Subject',
      message: 'This is a test message'
    };

    mockReadBody.mockResolvedValueOnce(formData);

    // Simulate email service error
    mockSendEmail.mockRejectedValueOnce(new Error('Email service error'));

    await expect(handler({})).rejects.toThrow('Email service error');
  });
});
