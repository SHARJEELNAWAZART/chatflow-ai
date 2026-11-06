import { Activity, Bot, MessageSquareText, Sparkles, TrendingUp, Users } from 'lucide-react';
import { demoStats, recentActivity, recentConversations } from '@/lib/dashboard-data';

const cards = [
  { label: 'Total Chatbots', value: demoStats.totalChatbots, icon: Bot },
  { label: 'Total Conversations', value: demoStats.totalConversations, icon: MessageSquareText },
  { label: 'Total Messages', value: demoStats.totalMessages, icon: Activity },
  { label: 'Monthly AI Usage', value: `${demoStats.monthlyAiUsage} msgs`, icon: Sparkles },
  { label: 'Active Chatbots', value: demoStats.activeChatbots, icon: TrendingUp },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-600 to-violet-600 p-6 text-white shadow-soft">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Overview</p>
        <h1 className="mt-3 text-3xl font-bold">Good morning, business team</h1>
        <p className="mt-2 max-w-xl text-blue-100">Your AI support operations are running smoothly. Review recent customer activity and optimize support coverage.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">{label}</span>
              <span className="rounded-lg bg-blue-50 p-2 text-blue-600"><Icon className="h-4 w-4" /></span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent conversations</h2>
            <button className="text-sm font-medium text-blue-600">View all</button>
          </div>
          <div className="mt-5 space-y-4">
            {recentConversations.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-3">
                <div>
                  <p className="font-semibold text-slate-800">{item.customer}</p>
                  <p className="text-sm text-slate-500">{item.chatbot} · {item.createdAt}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.status === 'Open' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Recent activity</h2>
          <div className="mt-5 space-y-4">
            {recentActivity.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
                <p className="text-sm text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Usage charts</h2>
          <div className="mt-5 flex h-52 items-end gap-3">
            {[38, 52, 46, 68, 75, 80, 95].map((height, index) => (
              <div key={index} className="flex-1 rounded-t-2xl bg-gradient-to-t from-blue-600 to-violet-500" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Quick actions</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white">Create chatbot</button>
            <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">Upload docs</button>
            <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">Review analytics</button>
            <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">Manage plan</button>
          </div>
        </div>
      </section>
    </div>
  );
}
