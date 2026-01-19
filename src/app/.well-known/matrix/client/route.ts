import { NextResponse } from 'next/server';

export async function GET() {
  const json = { "m.server": "matrix.zoe.rocks:443" };
  return NextResponse.json(json, {
    headers: { 'Content-Type': 'application/json' },
  });
}
