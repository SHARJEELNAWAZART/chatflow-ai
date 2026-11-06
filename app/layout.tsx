import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Bot } from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: { default: 'ChatFlow AI — AI support, always on', template: '%s | ChatFlow AI' },
  description: 'Build business-trained AI support chatbots and serve your customers around the clock.',
  openGraph: { title: 'ChatFlow AI', description: 'Your AI Customer Support Agent, Working 24/7', type: 'website' }
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
 return <html lang="en"><body><header className="border-b border-slate-200 bg-white/90 backdrop-blur"><nav className="container-shell flex h-16 items-center justify-between"><Link href="/" className="flex items-center gap-2 font-bold"><span className="rounded-lg bg-blue-600 p-2 text-white"><Bot size={19}/></span>ChatFlow <span className="text-blue-600">AI</span></Link><div className="hidden items-center gap-7 text-sm text-slate-600 md:flex"><Link href="/#features">Features</Link><Link href="/#pricing">Pricing</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div><div className="flex gap-3"><Link className="px-3 py-2 text-sm font-medium" href="/login">Log in</Link><Link className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white" href="/register">Get started</Link></div></nav></header>{children}<footer className="mt-16 border-t border-slate-200 bg-white"><div className="container-shell flex flex-col justify-between gap-5 py-8 text-sm text-slate-500 md:flex-row"><span>© {new Date().getFullYear()} ChatFlow AI</span><div className="flex gap-5"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/faq">FAQ</Link></div></div></footer></body></html>
}
