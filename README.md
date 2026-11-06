# ChatFlow AI

ChatFlow AI is an early-stage Next.js SaaS MVP. The repository includes public marketing pages, Supabase email/password auth wiring, a protected dashboard shell, chatbot creation, a public website widget, and a Gemini-backed response endpoint that only answers when matching knowledge chunks exist. It is not a finished production service: document ingestion, payment processing, admin workflows, durable shared rate limiting, and end-to-end testing remain to be completed.

## Requirements and local setup
1. Node.js 20+ and npm.
2. `npm install` then copy `.env.example` to `.env.local`.
3. Configure Supabase URL and anon key, service role key (server-only), Gemini API key, and app URL.
4. In Supabase, enable `vector` and apply `supabase/migrations/202611060001_initial_schema.sql`. Configure email confirmation. Create a private `knowledge` storage bucket before implementing uploads.
5. Run `npm run dev`. Register an account; confirmed users can access `/dashboard`.

## Security notes
- Never put `SUPABASE_SERVICE_ROLE_KEY` or `GEMINI_API_KEY` in any `NEXT_PUBLIC_*` variable or browser code.
- The service-role key is used only in the public widget API to load an active bot, persist messages, and retrieve tenant-scoped chunks. The route validates bot ID, status, message size, origin allowlist (when configured), and applies only a per-instance development throttle. Deploy a shared rate limiter and abuse monitoring before public launch.
- User dashboard pages use Supabase auth and RLS. Review policies in a staging project. Do not assign admin role from client-controlled metadata.
- The chat retrieval is lexical MVP retrieval, not vector similarity. No PDF/TXT ingestion UI is implemented yet; without verified chunks the API returns a no-knowledge fallback rather than inventing an answer.
- Billing plans are limits/architecture only; no payment is claimed or activated by a payment provider.

## Widget
Activate a chatbot after adding trusted knowledge, then embed it using `<script src="https://YOUR-DOMAIN/widget.js" data-chatbot-id="PUBLIC_ID"></script>`. Configure allowed origins on the chatbot before production use. Test from a separate local HTML page served over HTTP, not `file://`.

## Build and verification
`npm run lint` and `npm run build`. These require installing dependencies. Add integration tests and verify Supabase RLS, auth email configuration, CORS/origin handling, storage policies, rate limits, and Gemini API behavior in a staging project before launch.
