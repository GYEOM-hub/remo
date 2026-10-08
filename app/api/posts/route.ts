import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getDatabaseUrl() {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.NEON_DATABASE_URL;

  if (!url) {
    const error = new Error('DATABASE_URL, POSTGRES_URL, POSTGRES_URL_NON_POOLING 또는 NEON_DATABASE_URL이 설정되지 않았습니다.');
    (error as Error & { code?: string }).code = 'DB_ENV_MISSING';
    throw error;
  }

  return url;
}

async function getSql() {
  return neon(getDatabaseUrl());
}

async function ensurePostsTable() {
  const sql = await getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id BIGSERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL DEFAULT 'REMO',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  return sql;
}

function errorResponse(error: unknown, fallback: string) {
  console.error(fallback, error);
  const code = error instanceof Error && 'code' in error
    ? String((error as Error & { code?: unknown }).code)
    : 'DB_REQUEST_FAILED';

  return NextResponse.json(
    {
      error: fallback,
      code,
      // 개발/운영 로그에서 원인을 찾기 쉽게 하되 DB 접속정보 자체는 노출하지 않습니다.
      detail: error instanceof Error ? error.message.slice(0, 500) : String(error).slice(0, 500),
    },
    { status: 500, headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function GET() {
  try {
    const sql = await ensurePostsTable();
    const posts = await sql`
      SELECT id, title, content, author, created_at, updated_at
      FROM posts
      ORDER BY created_at DESC, id DESC
    `;

    return NextResponse.json(
      { posts },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    return errorResponse(error, '게시글을 불러오지 못했습니다.');
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const content = typeof body.content === 'string' ? body.content.trim() : '';
    const author = typeof body.author === 'string' && body.author.trim()
      ? body.author.trim()
      : 'REMO';

    if (!title || !content) {
      return NextResponse.json(
        { error: '제목과 내용을 입력해주세요.', code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    if (title.length > 200) {
      return NextResponse.json(
        { error: '제목은 200자 이하로 입력해주세요.', code: 'TITLE_TOO_LONG' },
        { status: 400 }
      );
    }

    if (author.length > 50) {
      return NextResponse.json(
        { error: '작성자는 50자 이하로 입력해주세요.', code: 'AUTHOR_TOO_LONG' },
        { status: 400 }
      );
    }

    const sql = await ensurePostsTable();
    const [post] = await sql`
      INSERT INTO posts (title, content, author)
      VALUES (${title}, ${content}, ${author})
      RETURNING id, title, content, author, created_at, updated_at
    `;

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return errorResponse(error, '게시글 저장에 실패했습니다.');
  }
}
