export default function WidgetDemoPage() {
  return (
    <main className="container-shell py-20">
      <div className="card max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900">Widget testing page</h1>
        <p className="mt-3 text-slate-600">This page demonstrates how the chat widget loads on a third-party website.</p>
        <script src="/widget.js" data-chatbot-id="demo-chatflow-widget" />
      </div>
    </main>
  );
}
