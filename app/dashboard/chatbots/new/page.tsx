export default function NewChatbotPage() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">Create Chatbot</h1>
      <p className="mt-1 text-sm text-slate-500">Set up a new AI support agent for your business.</p>

      <form className="mt-8 space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Chatbot name
            <input className="mt-2 w-full" placeholder="Crest Support" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Business name
            <input className="mt-2 w-full" placeholder="Crest & Co." />
          </label>
          <label className="block text-sm font-medium text-slate-700 md:col-span-2">
            Business description
            <textarea className="mt-2 min-h-[110px] w-full" placeholder="Describe your business and support coverage." />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Website
            <input className="mt-2 w-full" placeholder="https://example.com" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Business category
            <select className="mt-2 w-full">
              <option>Retail</option>
              <option>Travel</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Other</option>
            </select>
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" className="btn-secondary">Save draft</button>
          <button type="button" className="btn-primary">Continue</button>
        </div>
      </form>
    </div>
  );
}
