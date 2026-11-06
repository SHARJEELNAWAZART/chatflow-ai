import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';

    if (!name) {
      return NextResponse.json({ error: 'Chatbot name is required.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      chatbot: {
        id: `bot_${Date.now()}`,
        name,
        status: 'draft',
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Chatbot creation failed:', error);
    return NextResponse.json({ error: 'Unable to create chatbot.' }, { status: 500 });
  }
}
