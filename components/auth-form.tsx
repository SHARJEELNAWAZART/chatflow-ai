'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

type Props = { mode: 'login' | 'register' };
export default function AuthForm({ mode }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const isRegister = mode === 'register';

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    const form = new FormData(event.currentTarget);
    try {
      const supabase = createSupabaseBrowserClient();
      const email = String(form.get('email') || '').trim();
      const password = String(form.get('password') || '');
      if (isRegister) {
        const fullName = String(form.get('name') || '').trim();
        const { data, error: authError } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName }, emailRedirectTo: `${location.origin}/auth/callback` } });
        if (authError) throw authError;
        if (!data.session) { setNotice('Account created. Check your email to confirm your address, then log in.'); return; }
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
      }
      router.replace('/dashboard'); router.refresh();
    } catch (e) { setError(e instanceof Error ? e.message : 'Authentication failed.'); }
    finally { setBusy(false); }
  }

  return <main className="container-shell grid min-h-[65vh] place-items-center py-16"><section className="card w-full max-w-md">
    <h1 className="text-2xl font-bold">{isRegister ? 'Create your account' : 'Welcome back'}</h1>
    <p className="mt-2 text-sm text-slate-600">{isRegister ? 'Start building your business support assistant.' : 'Log in to manage your workspace.'}</p>
    <form onSubmit={submit} className="mt-6 space-y-4">
      {isRegister && <label className="block text-sm font-medium">Name<input required name="name" autoComplete="name" className="mt-1 w-full" placeholder="Your name" /></label>}
      <label className="block text-sm font-medium">Email<input required name="email" type="email" autoComplete="email" className="mt-1 w-full" placeholder="you@company.com" /></label>
      <label className="block text-sm font-medium">Password<input required name="password" minLength={8} type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} className="mt-1 w-full" placeholder="At least 8 characters" /></label>
      {!isRegister && <div className="text-right"><Link className="text-sm text-blue-600 hover:underline" href="/forgot-password">Forgot password?</Link></div>}
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {notice && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{notice}</p>}
      <button disabled={busy} className="btn-primary w-full disabled:opacity-60">{busy ? 'Please wait…' : isRegister ? 'Create account' : 'Log in'}</button>
    </form>
    <p className="mt-5 text-center text-sm text-slate-600">{isRegister ? 'Already have an account?' : 'New to ChatFlow?'} <Link className="text-blue-600" href={isRegister ? '/login' : '/register'}>{isRegister ? 'Log in' : 'Create account'}</Link></p>
  </section></main>;
}
