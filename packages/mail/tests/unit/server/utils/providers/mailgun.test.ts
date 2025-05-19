import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockMessagesCreate } from '../../../../setup';
import type { SendEmailOptions } from '@serp/types';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';

describe('Mailgun Provider', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    process.env.MAILGUN_API_KEY = 'test-api-key';
    process.env.MAILGUN_DOMAIN = 'test.domain.com';
    process.env.MAILGUN_FROM = 'test@example.com';
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe('sendMailgunEmail', () => {
    it('should send an email with the correct payload', async () => {
      const { sendMailgunEmail } = await import(
        '../../../../../server/utils/providers/mailgun'
      );

      const emailOptions: SendEmailOptions = {
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test plain text content'
      };

      await sendMailgunEmail(emailOptions);

      expect(mockMessagesCreate).toHaveBeenCalledWith('test.domain.com', {
        from: 'test@example.com',
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test plain text content'
      });
    });

    it('should handle HTML content', async () => {
      const { sendMailgunEmail } = await import(
        '../../../../../server/utils/providers/mailgun'
      );

      const emailOptions: SendEmailOptions = {
        to: 'recipient@example.com',
        subject: 'Test Subject',
        html: '<p>Test HTML content</p>'
      };

      await sendMailgunEmail(emailOptions);

      expect(mockMessagesCreate).toHaveBeenCalledWith('test.domain.com', {
        from: 'test@example.com',
        to: 'recipient@example.com',
        subject: 'Test Subject',
        html: '<p>Test HTML content</p>'
      });
    });

    it('should handle both text and HTML content', async () => {
      const { sendMailgunEmail } = await import(
        '../../../../../server/utils/providers/mailgun'
      );

      const emailOptions: SendEmailOptions = {
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test plain text content',
        html: '<p>Test HTML content</p>'
      };

      await sendMailgunEmail(emailOptions);

      expect(mockMessagesCreate).toHaveBeenCalledWith('test.domain.com', {
        from: 'test@example.com',
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test plain text content',
        html: '<p>Test HTML content</p>'
      });
    });

    it('should handle multiple recipients', async () => {
      const { sendMailgunEmail } = await import(
        '../../../../../server/utils/providers/mailgun'
      );

      const emailOptions: SendEmailOptions = {
        to: ['recipient1@example.com', 'recipient2@example.com'],
        subject: 'Test Subject',
        text: 'Test content for multiple recipients'
      };

      await sendMailgunEmail(emailOptions);

      expect(mockMessagesCreate).toHaveBeenCalledWith('test.domain.com', {
        from: 'test@example.com',
        to: ['recipient1@example.com', 'recipient2@example.com'],
        subject: 'Test Subject',
        text: 'Test content for multiple recipients'
      });
    });

    it('should return the response from mailgun', async () => {
      const { sendMailgunEmail } = await import(
        '../../../../../server/utils/providers/mailgun'
      );

      const emailOptions: SendEmailOptions = {
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test content'
      };

      const response = await sendMailgunEmail(emailOptions);

      expect(response).toEqual({ id: 'test-message-id' });
    });

    it('should throw an error if required environment variables are missing', async () => {
      delete process.env.MAILGUN_API_KEY;

      const { sendMailgunEmail } = await import(
        '../../../../../server/utils/providers/mailgun'
      );

      const emailOptions: SendEmailOptions = {
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test content'
      };

      await expect(sendMailgunEmail(emailOptions)).rejects.toThrow(
        'Missing Mailgun env vars'
      );
    });
  });
});
