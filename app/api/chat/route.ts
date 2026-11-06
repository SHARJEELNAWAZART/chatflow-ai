import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const systemInstruction = `You are a professional customer support assistant for a specific business. Answer using the business's verified knowledge base. Be helpful, polite and concise. Never invent prices, policies, contact details or services. If the answer is unavailable, clearly tell the customer to contact the business.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        reply: 'Demo mode is active. Configure GEMINI_API_KEY in your environment to enable live AI responses from Google Gemini.',
        mode: 'demo',
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      { role: 'user', parts: [{ text: systemInstruction }] },
      { role: 'user', parts: [{ text: message }] },
    ]);

    const responseText = await result.response.text();

    return NextResponse.json({ reply: responseText, mode: 'live' });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { reply: 'I’m having trouble responding right now. Please try again in a moment.', mode: 'error' },
      { status: 500 }
    );
  }
}
