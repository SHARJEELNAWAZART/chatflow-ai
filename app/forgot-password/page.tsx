'use client';
import { FormEvent, useState } from 'react';
export default function ForgotPasswordPage() {
 const [message,setMessage]=useState(''); const [error,setError]=useState('');
 async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setMessage('');setError('');const email=String(new FormData(event.currentTarget).get('email')||'');const r=await fetch('/api/auth/forgot-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})});const d=await r.json();if(!r.ok)setError(d.error||'Unable to send reset email.');else setMessage('If the address is registered, a password reset email will arrive shortly.');}
 return <main className="container-shell grid min-h-[65vh] place-items-center py-16"><section className="card w-full max-w-md"><h1 className="text-2xl font-bold">Reset your password</h1><p className="mt-2 text-sm text-slate-600">We will email you a secure password reset link.</p><form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm font-medium">Email<input required type="email" name="email" className="mt-1 w-full"/></label>{error&&<p role="alert" className="text-sm text-red-600">{error}</p>}{message&&<p role="status" className="text-sm text-emerald-700">{message}</p>}<button className="btn-primary w-full">Send reset link</button></form></section></main>
}
