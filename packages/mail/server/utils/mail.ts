import type { SendEmailOptions } from '@serp/types';
import { sendMailgunEmail } from './providers/mailgun';

// Simple provider selection
export async function sendEmail(options: SendEmailOptions) {
  // Default to mailgun, but we can add more providers later
  const provider = process.env.MAIL_PROVIDER || 'mailgun';

  switch (provider.toLowerCase()) {
    case 'mailgun':
      return sendMailgunEmail(options);
    // Add other providers here as they're implemented
    // case 'sendgrid':
    //   return sendSendgridEmail(options);
    default:
      throw new Error(`Unsupported mail provider: ${provider}`);
  }
}
