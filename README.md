# INA LWA Backend Starter

Starter backend integration for the single-file INA LWA website.

## Included
- Supabase SQL schema and RLS starter policies
- Browser frontend integration example
- Netlify serverless enrollment endpoint
- Certificate verification endpoint
- Payment webhook placeholder
- Environment variable template

## Setup
1. Create a Supabase project.
2. Run `supabase/schema.sql` in Supabase SQL Editor.
3. Add courses using the seed section in the SQL file.
4. Copy `.env.example` to `.env` and fill server-only values.
5. Put your HTML file in `public/index.html`.
6. Replace the demo form code with `public/app.js` or copy its functions.
7. Deploy the functions on Netlify or adapt them to another server.
8. Configure your payment provider webhook to `/\.netlify/functions/payment-webhook`.

## Security
Never put SUPABASE_SERVICE_ROLE_KEY, webhook secrets, or payment secret keys in browser HTML. Use server environment variables. Test RLS and webhook signatures before production.

The payment webhook is intentionally provider-neutral. Add the exact verification code required by your approved payment provider before accepting real payments.
