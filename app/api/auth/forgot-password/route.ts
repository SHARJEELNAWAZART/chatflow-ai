import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
export async function POST(request: NextRequest) {
  const { email } = await request.json().catch(() => ({}));
  if (typeof email !== 'string' || !email.includes('@')) return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${request.nextUrl.origin}/auth/callback` });
  if (error) return NextResponse.json({ error: 'Unable to send reset email. Check auth configuration and try again.' }, { status: 400 });
  return NextResponse.json({ success: true });
}
