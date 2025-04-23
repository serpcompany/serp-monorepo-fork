import { d1Query } from '../../../utils/oauth';

export default defineEventHandler(async (event) => {
  try {
    const { email } = await readBody(event);

    if (!email) return { status: 400, message: 'Email is required' };
    if (!email.includes('@')) return { status: 400, message: 'Invalid email' };

    const insertSql = `INSERT INTO mcp_newsletter (email) VALUES (?) ON CONFLICT DO NOTHING`;
    await d1Query(insertSql, [email]);
    return { status: 200, message: 'success' };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      'Error subscribing to the mcp newsletter:',
      (error as Error).message
    );
    return { status: 401, message: (error as Error).message };
  }
});
