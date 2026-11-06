import Link from 'next/link';
import { Activity, Bot, MessageSquareText, Sparkles } from 'lucide-react';
import { createSupabaseServerClient } from '@/lib/supabase/server';
export default async function DashboardPage() {
 const supabase=createSupabaseServerClient(); const {data:{user}}=await supabase.auth.getUser();
 const {data:bots}=await supabase.from('chatbots').select('id,status').eq('owner_id',user!.id);
 const ids=(bots||[]).map(b=>b.id);
 const {count:conversations}=ids.length?await supabase.from('conversations').select('id',{count:'exact',head:true}).in('chatbot_id',ids):{count:0};
 const {count:messages}=ids.length?await supabase.from('messages').select('id',{count:'exact',head:true}).in('conversation_id',(await supabase.from('conversations').select('id').in('chatbot_id',ids)).data?.map(c=>c.id)||[]):{count:0};
 const stats=[['Chatbots',bots?.length||0,Bot],['Conversations',conversations||0,MessageSquareText],['Messages',messages||0,Activity],['Active chatbots',bots?.filter(b=>b.status==='active').length||0,Sparkles]] as const;
 return <div className="space-y-7"><section className="rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 p-7 text-white"><p className="text-sm text-blue-100">Workspace overview</p><h1 className="mt-2 text-3xl font-bold">Welcome to ChatFlow AI</h1><p className="mt-2 text-blue-100">Your dashboard reflects your Supabase workspace data.</p></section><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([label,value,Icon])=><article key={label} className="rounded-2xl border bg-white p-5"><div className="flex justify-between text-sm text-slate-500">{label}<Icon size={18} className="text-blue-600"/></div><p className="mt-4 text-3xl font-bold">{value}</p></article>)}</section><section className="rounded-3xl border bg-white p-6"><h2 className="text-xl font-bold">Get started</h2><p className="mt-2 text-sm text-slate-600">Create a chatbot, add trusted information, then install its website widget.</p><div className="mt-5 flex flex-wrap gap-3"><Link className="btn-primary" href="/dashboard/chatbots/new">Create a chatbot</Link><Link className="btn-secondary" href="/dashboard/chatbots">Manage chatbots</Link></div></section></div>;
}
