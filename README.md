# ChatFlow AI

Initial Next.js + TypeScript scaffold for ChatFlow AI, a business-specific AI customer-support platform. This is an early development repository, not a production-ready SaaS yet.

## Included now
- Responsive marketing landing page with clearly labelled interactive demo preview (no real AI calls).
- Initial public routes: About, Contact, FAQ, Privacy, Terms, Login, Register.
- Tailwind/Next.js application configuration and SEO metadata.
- Supabase PostgreSQL initial schema with tenant-oriented tables, indexes, and RLS policies.
- Environment variable template with server-only service role and Gemini secrets.

## Not implemented yet
Authentication forms are placeholders. Dashboard, actual document processing/embeddings, Gemini retrieval endpoint, secure public widget API, rate limiting, billing/webhooks, admin console, support workflows, production privacy/terms, and automated tests still need implementation. Do not collect customer data or deploy as a production service until these are completed and reviewed.

## Local setup
1. Install Node.js 20+ and npm.
2. Clone this repo and run `npm install`.
3. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, and `NEXT_PUBLIC_APP_URL`.
4. Create a Supabase project; enable `vector` extension and apply `supabase/migrations/202611060001_initial_schema.sql` in the SQL editor. Configure auth email verification and a private storage bucket before enabling uploads.
5. Run `npm run dev`, then visit http://localhost:3000.

Never expose `SUPABASE_SERVICE_ROLE_KEY` or `GEMINI_API_KEY` in browser code. Review and test RLS policies and migrations in a non-production project first. Public widget traffic needs origin validation, rate limiting, abuse controls, and privacy review before release.
