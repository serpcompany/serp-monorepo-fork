import { defineEventHandler, readBody } from 'h3';
import { sendEmail } from '../utils/mailGun';

const hasText = (v: string) => v.trim() !== '';
const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default defineEventHandler(async (event) => {
  const { name, email, subject, message } = (await readBody(event)) as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  if (!hasText(name)) {
    return { error: 'name is required' };
  }
  if (!hasText(email)) {
    return { error: 'email is required' };
  }
  if (!isValidEmail(email)) {
    return { error: 'email is invalid' };
  }
  if (!hasText(subject)) {
    return { error: 'subject is required' };
  }
  if (!hasText(message)) {
    return { error: 'message is required' };
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <title>New Contact Request</title>
    </head>
    <body style="font-family: sans-serif; line-height: 1.4;">
        <h2 style="color: #333;">📬 New Contact Request</h2>
        <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        <tr>
            <td style="font-weight: bold; border-bottom: 1px solid #ddd;">Name:</td>
            <td style="border-bottom: 1px solid #ddd;">${name}</td>
        </tr>
        <tr>
            <td style="font-weight: bold; border-bottom: 1px solid #ddd;">Email:</td>
            <td style="border-bottom: 1px solid #ddd;">${email}</td>
        </tr>
        <tr>
            <td style="font-weight: bold; border-bottom: 1px solid #ddd;">Subject:</td>
            <td style="border-bottom: 1px solid #ddd;">${subject || '(none)'}</td>
        </tr>
        <tr>
            <td colspan="2" style="padding-top: 12px; font-weight: bold;">Message:</td>
        </tr>
        <tr>
            <td colspan="2" style="white-space: pre-wrap;">${message}</td>
        </tr>
        </table>
    </body>
    </html>
    `;

  const text = `
    🆕 New Contact Request

    Name: ${name}
    Email: ${email}
    Subject: ${subject || '(none)'}

    Message:
    ${message}
    `.trim();

  await sendEmail({
    to: process.env.CONTACT_EMAIL || 'contact@serp.co',
    subject: 'Contact Form Submission From `' + name + '`',
    text,
    html
  });

  return { ok: true };
});
