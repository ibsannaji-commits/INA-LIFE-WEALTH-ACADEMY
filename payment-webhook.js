const crypto = require('crypto');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
  // Provider-neutral placeholder. Verify the provider signature using the raw request body.
  // Then use a server-only Supabase client to: idempotency-check transaction_ref,
  // insert/update payments, and set the matching enrollment to active.
  const signature = event.headers['x-webhook-signature'] || event.headers['X-Webhook-Signature'];
  if (!signature || !process.env.PAYMENT_WEBHOOK_SECRET) return { statusCode: 401, body: 'Webhook not configured' };
  const expected = crypto.createHmac('sha256', process.env.PAYMENT_WEBHOOK_SECRET).update(event.body || '').digest('hex');
  if (signature !== expected) return { statusCode: 401, body: 'Invalid signature' };
  return { statusCode: 200, body: JSON.stringify({ received: true, note: 'Add provider-specific verification and Supabase update before production' }) };
};
