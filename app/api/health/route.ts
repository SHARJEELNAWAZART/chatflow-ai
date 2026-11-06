import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    app: 'ChatFlow AI',
    version: '0.1.0',
    notes: 'Service endpoints are ready for Supabase and Gemini configuration.',
  });
}
