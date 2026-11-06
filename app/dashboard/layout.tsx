import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const nav = [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/chatbots', label: 'My Chatbots' },
    { href: '/dashboard/chatbots/new', label: 'Create Chatbot' },
    { href: '/dashboard/knowledge-base', label: 'Knowledge Base' },
    { href: '/dashboard/conversations', label: 'Conversations' },
    { href: '/dashboard/analytics', label: 'Analytics' },
    { href: '/dashboard/subscription', label: 'Subscription' },
    { href: '/dashboard/settings', label: 'Settings' },
    { href: '/dashboard/help', label: 'Help and Support' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-shell py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 p-2.5 text-white">CF</div>
              <div>
                <p className="font-bold text-slate-900">ChatFlow AI</p>
                <p className="text-xs text-slate-500">Customer dashboard</p>
              </div>
            </div>
            <nav className="space-y-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 border-t border-slate-200 pt-5">
              <Link href="/" className="block rounded-xl border border-slate-200 px-3 py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-50">
                Logout
              </Link>
            </div>
          </aside>
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
