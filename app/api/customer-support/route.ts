import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const DEFAULT_DOC_ID = "1cx6NVPrkK_etUo7cfBvAzr7f-nX-m9yPolExK0kfpIo";
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
function words(s: string) { return s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(w => w.length > 1); }
function chunksOf(text: string) { const t = text.replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim(); const out: string[] = []; for (let i = 0; i < t.length; i += 760) { const c = t.slice(i, i + 900).trim(); if (c.length > 80) out.push(c); } return out; }
function retrieve(question: string, chunks: string[]) { const q = new Set(words(question)); return chunks.map(text => ({ text, score: [...q].reduce((n, w) => n + (words(text).includes(w) ? (w.length > 3 ? 2 : 1) : 0), 0) })).filter(x => x.score > 0).sort((a,b) => b.score-a.score).slice(0,4); }
async function readDoc(id: string) { const r = await fetch("https://docs.google.com/document/d/" + encodeURIComponent(id) + "/export?format=txt", { cache: "no-store", signal: AbortSignal.timeout(12000) }); if (!r.ok) throw new Error("참고 문서에 접근할 수 없습니다. Google Docs 공유 권한을 확인해주세요."); const t = await r.text(); if (!t || t.includes("<!DOCTYPE html") || t.includes("accounts.google.com")) throw new Error("참고 문서를 읽을 수 없습니다. 링크가 있는 사용자에게 보기 권한을 허용해주세요."); return t; }
export async function POST(request: Request) {
 try {
  const body = await request.json(); const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question) return NextResponse.json({ error: "질문을 입력해주세요." }, { status: 400 });
  if (question.length > 1000) return NextResponse.json({ error: "질문은 1,000자 이하로 입력해주세요." }, { status: 400 });
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!key) return NextResponse.json({ error: "Vercel에 GEMINI_API_KEY 환경변수를 설정해주세요." }, { status: 503 });
  let doc = process.env.CUSTOMER_SUPPORT_KNOWLEDGE || ""; if (!doc) doc = await readDoc(process.env.CUSTOMER_SUPPORT_DOC_ID || DEFAULT_DOC_ID);
  const matches = retrieve(question, chunksOf(doc));
  if (!matches.length) return NextResponse.json({ answer: "현재 참고 문서에서 질문과 관련된 내용을 찾지 못했어요. 정확한 안내를 위해 REMO 담당자에게 문의해주세요.", sources: [] });
  const context = matches.map((m,i) => "[참고 내용 " + (i+1) + "]\n" + m.text).join("\n\n");
  const prompt = "너는 REMO 웹사이트의 고객상담 담당자다. 아래 참고 내용만 근거로 한국어로 친절하고 명료하게 답한다. 문서에 없는 정책, 가격, 일정, 연락처를 추측하지 않는다. 근거가 부족하면 참고 문서에서 확인할 수 없어 담당자 확인이 필요하다고 말한다. 민감한 정보를 요청하지 않는다.\n\n[참고 문서 발췌]\n" + context + "\n\n[고객 질문]\n" + question;
  const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(MODEL) + ":generateContent?key=" + encodeURIComponent(key), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ systemInstruction: { parts: [{ text: "Use only the retrieved document excerpts to answer customer questions." }] }, contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { temperature: 0.2, maxOutputTokens: 700 } }), signal: AbortSignal.timeout(25000), cache: "no-store" });
  const data = await r.json(); if (!r.ok) { console.error("Gemini API error", r.status, data?.error?.message); return NextResponse.json({ error: "AI 답변 생성에 실패했습니다. Gemini 모델명과 Vercel 환경변수를 확인해주세요." }, { status: 502 }); }
  const answer = data?.candidates?.[0]?.content?.parts?.map((p: {text?: string}) => p.text || "").join("").trim();
  if (!answer) return NextResponse.json({ error: "AI가 답변을 생성하지 못했어요. 다시 시도해주세요." }, { status: 502 });
  return NextResponse.json({ answer, sources: ["REMO 참고 문서"] });
 } catch (e) { const message = e instanceof Error ? e.message : ""; console.error("Customer support error", message); return NextResponse.json({ error: message.includes("문서") || message.includes("권한") ? message : "상담 처리 중 오류가 발생했어요. 잠시 후 다시 시도해주세요." }, { status: 500 }); }
}