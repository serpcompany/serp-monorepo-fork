import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockMessagesCreate } from '../../../setup';
import type { SendEmailOptions } from '@serp/types';

vi.mock('../../../../server/utils/providers/mailgun', async () => {
  const actual = await vi.importActual(
    '../../../../server/utils/providers/mailgun'
  );
  return {
    ...actual,
    sendMailgunEmail: vi.fn().mockImplementation(async (options) => {
      return { id: 'mock-mail-id', message: 'Queued' };
    })
  };
});

describe('Mail Utility', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    process.env.MAIL_PROVIDER = 'mailgun';
    process.env.MAILGUN_API_KEY = 'test-api-key';
    process.env.MAILGUN_DOMAIN = 'test.domain.com';
    process.env.MAILGUN_FROM = 'test@example.com';
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe('sendEmail', () => {
    it('should use mailgun as the default provider', async () => {
      delete process.env.MAIL_PROVIDER;

      const { sendEmail } = await import('../../../../server/utils/mail');
      const { sendMailgunEmail } = await import(
        '../../../../server/utils/providers/mailgun'
      );

      const emailOptions: SendEmailOptions = {
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test content'
      };

      await sendEmail(emailOptions);

      expect(sendMailgunEmail).toHaveBeenCalledWith(emailOptions);
    });

    it('should use mailgun when specified in MAIL_PROVIDER', async () => {
      process.env.MAIL_PROVIDER = 'mailgun';

      const { sendEmail } = await import('../../../../server/utils/mail');
      const { sendMailgunEmail } = await import(
        '../../../../server/utils/providers/mailgun'
      );

      const emailOptions: SendEmailOptions = {
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test content'
      };

      await sendEmail(emailOptions);

      expect(sendMailgunEmail).toHaveBeenCalledWith(emailOptions);
    });

    it('should be case-insensitive when checking providers', async () => {
      process.env.MAIL_PROVIDER = 'MAILGUN';

      const { sendEmail } = await import('../../../../server/utils/mail');
      const { sendMailgunEmail } = await import(
        '../../../../server/utils/providers/mailgun'
      );

      const emailOptions: SendEmailOptions = {
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test content'
      };

      await sendEmail(emailOptions);

      expect(sendMailgunEmail).toHaveBeenCalledWith(emailOptions);
    });

    it('should throw an error for unsupported mail providers', async () => {
      process.env.MAIL_PROVIDER = 'unsupported-provider';

      const { sendEmail } = await import('../../../../server/utils/mail');

      const emailOptions: SendEmailOptions = {
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test content'
      };

      await expect(sendEmail(emailOptions)).rejects.toThrow(
        'Unsupported mail provider'
      );
    });

    it('should return the response from the mail provider', async () => {
      const { sendEmail } = await import('../../../../server/utils/mail');

      const emailOptions: SendEmailOptions = {
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test content'
      };

      const response = await sendEmail(emailOptions);

      expect(response).toEqual({ id: 'mock-mail-id', message: 'Queued' });
    });
  });
});
