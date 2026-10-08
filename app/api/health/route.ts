import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.NEON_DATABASE_URL
  );
}

export async function GET() {
  const url = getDatabaseUrl();

  if (!url) {
    return NextResponse.json(
      { ok: false, code: 'DB_ENV_MISSING', message: 'Vercel Production 환경변수에서 DB 연결 변수를 찾지 못했습니다.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const sql = neon(url);
    const result = await sql`SELECT NOW() AS now`;
    return NextResponse.json(
      { ok: true, database: 'connected', now: result[0]?.now ?? null },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('GET /api/health failed:', error);
    return NextResponse.json(
      {
        ok: false,
        code: 'DB_CONNECTION_FAILED',
        message: error instanceof Error ? error.message.slice(0, 500) : String(error).slice(0, 500),
      },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
