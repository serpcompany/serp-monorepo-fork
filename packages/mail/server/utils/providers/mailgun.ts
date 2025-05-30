import FormData from 'form-data';
import type { Client } from 'mailgun.js';
import Mailgun from 'mailgun.js';
import type { SendEmailOptions } from '@serp/types';

// cache the client so we don't re-init on every call
let mgClient: Client | null = null;

function getMailgunClient(): Client {
  if (mgClient) return mgClient;

  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const from = process.env.MAILGUN_FROM;

  if (!apiKey || !domain || !from) {
    throw new Error(
      'Missing Mailgun env vars. Make sure MAILGUN_API_KEY, MAILGUN_DOMAIN & MAILGUN_FROM are set'
    );
  }

  const mailgun = new Mailgun(FormData);
  mgClient = mailgun.client({
    username: 'api',
    key: apiKey
  });
  return mgClient;
}

export async function sendMailgunEmail(options: SendEmailOptions) {
  const { to, subject, text, html } = options;
  const client = getMailgunClient();

  const payload: Record<string, unknown> = {
    from: process.env.MAILGUN_FROM,
    to,
    subject
  };
  if (text) payload.text = text;
  if (html) payload.html = html;

  const resp = await client.messages.create(
    process.env.MAILGUN_DOMAIN as string,
    payload
  );
  return resp;
}
