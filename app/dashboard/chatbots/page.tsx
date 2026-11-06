import Link from 'next/link';

const items = [
  { name: 'Crest Support', status: 'Active', messages: '1,240 msgs this month' },
  { name: 'Nordic Travel', status: 'Draft', messages: 'Needs final knowledge upload' },
  { name: 'Casa Bloom', status: 'Paused', messages: 'Paused for content refresh' },
];

export default function ChatbotsPage() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Chatbots</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your customer support agents and deployment status.</p>
        </div>
        <Link href="/dashboard/chatbots/new" className="btn-primary">Create chatbot</Link>
      </div>

      <div className="mt-8 space-y-4">
        {items.map((chatbot) => (
          <div key={chatbot.name} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-900">{chatbot.name}</p>
              <p className="text-sm text-slate-500">{chatbot.messages}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${chatbot.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : chatbot.status === 'Draft' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>
                {chatbot.status}
              </span>
              <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">Edit</button>
              <button className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white">Open</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
