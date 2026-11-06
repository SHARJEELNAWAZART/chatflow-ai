export async function GET() {
  const script = `
    (function () {
      const STYLE = \`
        * { box-sizing: border-box; }
        body { font-family: Inter, Arial, sans-serif; }
        .cf-chat-widget {
          position: fixed; right: 20px; bottom: 20px; z-index: 9999;
          font-family: Arial, sans-serif;
        }
        .cf-chat-toggle {
          width: 64px; height: 64px; border: 0; border-radius: 9999px;
          background: linear-gradient(135deg, #2563eb, #8b5cf6);
          color: white; box-shadow: 0 16px 48px rgba(37,99,235,.25);
          cursor: pointer; font-size: 28px;
        }
        .cf-chat-box {
          position: absolute; right: 0; bottom: 78px; width: 360px; max-width: calc(100vw - 28px);
          border-radius: 24px; border: 1px solid #e2e8f0; background: white; box-shadow: 0 20px 50px rgba(15,23,42,.15); overflow: hidden;
          display: none;
        }
        .cf-chat-box.open { display: block; }
        .cf-chat-header { display:flex; align-items:center; justify-content:space-between; padding: 16px 18px; background: linear-gradient(135deg, #eff6ff, #f5f3ff); border-bottom: 1px solid #e2e8f0; }
        .cf-chat-header h3 { margin: 0; font-size: 16px; color: #0f172a; }
        .cf-chat-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; max-height: 380px; overflow-y: auto; background: #f8fafc; }
        .cf-msg { max-width: 82%; padding: 10px 12px; border-radius: 16px; font-size: 14px; line-height: 1.5; }
        .cf-msg.user { align-self: flex-end; background: #2563eb; color: white; border-bottom-right-radius: 6px; }
        .cf-msg.bot { align-self: flex-start; background: white; border: 1px solid #e2e8f0; color: #0f172a; border-bottom-left-radius: 6px; }
        .cf-chat-form { display:flex; gap: 8px; padding: 12px; border-top: 1px solid #e2e8f0; background: white; }
        .cf-chat-form input { flex: 1; border: 1px solid #dbe4f0; border-radius: 12px; padding: 10px 12px; font-size: 14px; }
        .cf-chat-form button { border: 0; border-radius: 12px; background: #2563eb; color: white; padding: 10px 14px; cursor: pointer; }
      \`;
      const style = document.createElement('style'); style.textContent = STYLE; document.head.appendChild(style);

      const root = document.createElement('div'); root.className = 'cf-chat-widget';
      const box = document.createElement('div'); box.className = 'cf-chat-box';
      box.innerHTML = `
        <div class="cf-chat-header">
          <h3>ChatFlow AI</h3>
          <button type="button" class="cf-close" style="border:0;background:transparent;color:#334155;font-size:22px;cursor:pointer;">×</button>
        </div>
        <div class="cf-chat-body">
          <div class="cf-msg bot">Hi! I can help answer questions about your business. Ask me anything.</div>
        </div>
        <form class="cf-chat-form">
          <input type="text" placeholder="Type your message..." aria-label="Type your message" />
          <button type="submit">Send</button>
        </form>
      `;

      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'cf-chat-toggle';
      toggle.textContent = '💬';

      const closeBtn = box.querySelector('.cf-close');
      closeBtn.addEventListener('click', () => { box.classList.remove('open'); });
      toggle.addEventListener('click', () => { box.classList.toggle('open'); });

      box.querySelector('.cf-chat-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const input = box.querySelector('input');
        const text = input.value.trim();
        if (!text) return;

        const body = box.querySelector('.cf-chat-body');
        const userMessage = document.createElement('div');
        userMessage.className = 'cf-msg user';
        userMessage.textContent = text;
        body.appendChild(userMessage);

        input.value = '';

        const botReply = document.createElement('div');
        botReply.className = 'cf-msg bot';
        botReply.textContent = 'Thinking...';
        body.appendChild(botReply);

        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text, chatbotId: 'demo-widget' }),
          });
          const data = await response.json();
          botReply.textContent = data.reply || 'I do not have an answer for that yet.';
        } catch (err) {
          botReply.textContent = 'Unable to reach the AI service right now.';
        }

        body.scrollTop = body.scrollHeight;
      });

      root.appendChild(box);
      root.appendChild(toggle);
      document.body.appendChild(root);
    })();
  `;

  return new Response(script, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
