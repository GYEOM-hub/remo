# REMO Site

Next.js + Neon PostgreSQL 기반 REMO 팀 웹사이트입니다.

## 프로젝트 구조

- `app/page.tsx` — 메인 페이지
- `app/globals.css` — 전체 스타일
- `app/api/posts/route.ts` — 게시글 조회/작성 API
- `app/api/health/route.ts` — Neon 연결 상태 확인 API
- `public/remo-logo.png` — REMO 로고
- `schema.sql` — 게시판 `posts` 테이블 SQL

## Vercel 배포

이 프로젝트는 **Next.js App Router** 구조라서 프로젝트 루트 그대로 Vercel에 배포하면 됩니다.

### 1. GitHub

ZIP 파일 자체를 저장소 루트에 올리는 것이 아니라, **ZIP 안의 파일과 폴더를 저장소 루트에 그대로 업로드**하세요.

저장소 최상단에 다음이 보여야 합니다.

```text
app/
public/
package.json
tsconfig.json
next-env.d.ts
schema.sql
.env.example
.gitignore
README.md
```

### 2. Vercel

GitHub 저장소를 Vercel에 연결하고 Framework Preset은 `Next.js`로 둡니다.

### 3. Neon 환경변수

Vercel → Project Settings → Environment Variables에 아래 중 하나를 등록합니다.

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
```

또는

```env
POSTGRES_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
```

**실제 DB 비밀번호가 들어 있는 `.env` 파일은 GitHub에 업로드하지 마세요.**

### 4. 배포 후 확인

- 홈페이지: `/`
- DB 연결 확인: `/api/health`
- 게시글 API: `/api/posts`

홈페이지의 `커뮤니티 → 글쓰기 +`에서 테스트 게시글을 작성한 뒤 새로고침해도 게시글이 남아 있으면 Neon 연동이 정상입니다.

## DB 테이블

`/api/posts`는 최초 요청 시 `posts` 테이블이 없으면 자동으로 생성합니다. DB 사용자에게 CREATE 권한이 없는 경우 Neon SQL Editor에서 `schema.sql`을 한 번 실행하세요.

## 로컬 실행

```bash
npm install
npm run dev
```

로컬에서는 `.env.local`을 만들고 다음처럼 설정합니다.

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
```
