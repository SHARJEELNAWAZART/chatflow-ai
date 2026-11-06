import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const nav = [['/dashboard','Overview'],['/dashboard/chatbots','My Chatbots'],['/dashboard/chatbots/new','Create Chatbot'],['/dashboard/knowledge-base','Knowledge Base'],['/dashboard/conversations','Conversations'],['/dashboard/analytics','Analytics'],['/dashboard/subscription','Subscription'],['/dashboard/settings','Settings'],['/dashboard/help','Help and Support']];
  return <div className="min-h-screen bg-slate-50"><div className="container-shell py-8"><div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]"><aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><Link href="/" className="mb-6 flex items-center gap-3"><span className="rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 p-2.5 font-bold text-white">CF</span><span><b className="block">ChatFlow AI</b><small className="text-slate-500">{user.email}</small></span></Link><nav className="space-y-1">{nav.map(([href,label])=><Link key={href} href={href} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100">{label}</Link>)}</nav><form action="/auth/signout" method="post" className="mt-6 border-t pt-4"><button className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm">Sign out</button></form></aside><main className="min-w-0">{children}</main></div></div></div>;
}
