'use client';
import { FormEvent, useEffect, useState } from 'react';

type Post = {
 id: number;
 title: string;
 content: string;
 author: string;
 created_at: string;
};

const nav=['팀','프로젝트','학습','포트폴리오','아카이브','캘린더','커뮤니티','관리'];
const projects=[
 {title:'MU:D ARCHIVE',tag:'브랜드',desc:'감정을 기록하고 표현하는 패션 프로젝트',img:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'},
 {title:'AI CONTENT',tag:'콘텐츠',desc:'AI를 활용한 콘텐츠 제작 실험',img:'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80'},
 {title:'PROJECT 03',tag:'서비스',desc:'새로운 문제를 발견하고 검증하는 프로젝트',img:'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80'},
 {title:'PROJECT 04',tag:'비즈니스',desc:'시장과 고객을 통해 답을 찾아가는 프로젝트',img:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80'}
];
const members=['김민지','이준호','박서연','최도윤','정민겸','이수민'];

export default function Home(){
 const [menu,setMenu]=useState(false);
 const [posts,setPosts]=useState<Post[]>([]);
 const [showWrite,setShowWrite]=useState(false);
 const [title,setTitle]=useState('');
 const [content,setContent]=useState('');
 const [author,setAuthor]=useState('REMO');
 const [saving,setSaving]=useState(false);
 const [loadingPosts,setLoadingPosts]=useState(true);
 const [postError,setPostError]=useState('');

 useEffect(()=>{
  let cancelled=false;
  fetch('/api/posts',{cache:'no-store'})
   .then(async r=>{
    const data=await r.json();
    if(!r.ok) throw new Error([data.error, data.code ? `(${data.code})` : '', data.detail ? `- ${data.detail}` : ''].filter(Boolean).join(' '));
    return data;
   })
   .then(data=>{if(!cancelled)setPosts(data.posts ?? [])})
   .catch(err=>{if(!cancelled)setPostError(err.message)})
   .finally(()=>{if(!cancelled)setLoadingPosts(false)});
  return ()=>{cancelled=true};
 },[]);

 const submitPost=async(e:FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  setPostError('');
  if(!title.trim() || !content.trim()){setPostError('제목과 내용을 입력해주세요.');return;}
  setSaving(true);
  try{
   const res=await fetch('/api/posts',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({title,content,author})
   });
   const data=await res.json();
   if(!res.ok) throw new Error([data.error, data.code ? `(${data.code})` : '', data.detail ? `- ${data.detail}` : ''].filter(Boolean).join(' '));
   setPosts(prev=>[data.post,...prev]);
   setTitle(''); setContent(''); setAuthor('REMO'); setShowWrite(false);
  }catch(err){
   setPostError(err instanceof Error ? err.message : '게시글 저장에 실패했습니다.');
  }finally{setSaving(false);}
 };

 const formatDate=(value:string)=>new Intl.DateTimeFormat('ko-KR',{year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value)).replaceAll(' ','');
 return <main>
  <header className="header"><a className="brand" href="#"><img src="/remo-logo.png" alt="REMO"/></a><nav>{nav.map(x=><a key={x} href={'#'+x}>{x}</a>)}</nav><div className="actions"><button className="icon">⌕</button><button className="login">로그인</button><button className="hamb" onClick={()=>setMenu(!menu)}>☰</button></div></header>
  {menu && <div className="mobileNav">{nav.map(x=><a key={x} href={'#'+x} onClick={()=>setMenu(false)}>{x}</a>)}<a>회원가입</a></div>}

  <section className="hero"><div className="heroImg"/><div className="heroShade"/><div className="heroContent"><p className="eyebrow">REMO TEAM · 2026</p><h1>Together,<br/>We Grow.</h1><p>우리는 함께 배우고, 만들고, 성장합니다.</p><button className="circleBtn">↗</button></div></section>

  <section className="section" id="프로젝트"><div className="sectionHead"><div><span className="eyebrow">PROJECTS</span><h2>우리가 만들고 있는 것</h2></div><a href="#">전체 보기 ↗</a></div><div className="grid projects">{projects.map(p=><a className="card project" key={p.title} href={p.title==='MU:D ARCHIVE'?'/mud-archive/':'#'}><img src={p.img}/><div className="cardBody"><div><span className="pill">{p.tag}</span><h3>{p.title}</h3><p>{p.desc}</p></div><span className="arrow">↗</span></div></a>)}</div></section>

  <section className="section split" id="팀"><div className="intro"><span className="eyebrow">ABOUT REMO</span><h2>혼자가 아닌,<br/>팀으로 성장합니다.</h2><p>각자의 관심과 역량을 연결하고, 실제 프로젝트를 통해 배우며, 시장의 평가 속에서 성장하는 팀입니다.</p><button className="darkBtn">팀 소개 보기 ↗</button></div><div className="teamVisual"><div className="teamPhoto"/><div className="stat"><strong>11</strong><span>TEAM MEMBERS</span></div><div className="stat"><strong>6</strong><span>PROJECTS</span></div></div></section>

  <section className="section" id="학습"><div className="sectionHead"><div><span className="eyebrow">LEARNING</span><h2>배우고, 기록하고, 다시 실행합니다.</h2></div></div><div className="learning"><div className="learningFeature"><img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80"/><div><span>LEARNING RECORD</span><h3>오늘 배운 것을<br/>내일의 실행으로.</h3></div></div><div className="learningList">{['영상 편집 학습','시장조사 실습','팀 숙론 세션','브랜드 콘텐츠 분석'].map((x,i)=><div className="listItem" key={x}><span>0{i+1}</span><div><b>{x}</b><small>2026.09.{17-i}</small></div><i>↗</i></div>)}</div></div></section>

  <section className="section darkSection" id="포트폴리오"><div className="sectionHead"><div><span className="eyebrow">PORTFOLIO</span><h2>우리가 만든 결과물</h2></div><a href="#">포트폴리오 보기 ↗</a></div><div className="portfolioRow">{projects.slice(0,3).map(p=><div className="portfolioItem" key={p.title}><img src={p.img}/><span>{p.title}</span></div>)}</div></section>

  <section className="section" id="캘린더"><div className="sectionHead"><div><span className="eyebrow">CALENDAR</span><h2>이번 주 REMO 일정</h2></div></div><div className="calendar"><div className="month"><b>2026. 09</b><span>← &nbsp; →</span></div><div className="days">{['MON','TUE','WED','THU','FRI','SAT','SUN'].map(d=><span key={d}>{d}</span>)}</div><div className="dates">{Array.from({length:35},(_,i)=><div className={i===16?'today':''} key={i}>{i<1?'':((i-1)%30)+1}{[16,20,25].includes(i)&&<em/>}</div>)}</div></div></section>

  <section className="section" id="커뮤니티"><div className="sectionHead"><div><span className="eyebrow">COMMUNITY</span><h2>팀의 이야기를 나눕니다.</h2></div><button className="darkBtn small" onClick={()=>{setPostError('');setShowWrite(true)}}>글쓰기 +</button></div><div className="posts">{loadingPosts ? <div className="postEmpty">게시글을 불러오는 중입니다.</div> : posts.length===0 ? <div className="postEmpty">아직 작성된 게시글이 없습니다. 첫 글을 작성해보세요.</div> : posts.map((post,i)=><div className="post" key={post.id}><span>{String(i+1).padStart(2,'0')}</span><div><b>{post.title}</b><small>{post.author} · {formatDate(post.created_at)}</small></div><i>↗</i></div>)}</div>{postError && !showWrite && <p className="postError">{postError}</p>}</section>

  {showWrite && <div className="modalBackdrop" onMouseDown={e=>{if(e.currentTarget===e.target && !saving)setShowWrite(false)}}><form className="writeModal" onSubmit={submitPost}><div className="modalHead"><div><span className="eyebrow">NEW POST</span><h3>게시글 작성</h3></div><button type="button" className="modalClose" onClick={()=>setShowWrite(false)} disabled={saving}>×</button></div><label>작성자<input value={author} onChange={e=>setAuthor(e.target.value)} maxLength={50} /></label><label>제목<input value={title} onChange={e=>setTitle(e.target.value)} maxLength={200} required /></label><label>내용<textarea value={content} onChange={e=>setContent(e.target.value)} rows={8} required /></label>{postError && <p className="postError">{postError}</p>}<div className="modalActions"><button type="button" onClick={()=>setShowWrite(false)} disabled={saving}>취소</button><button type="submit" className="darkBtn" disabled={saving}>{saving?'저장 중...':'게시글 저장'}</button></div></form></div>}

  <section className="cta"><img src="/remo-logo.png" alt="REMO"/><h2>Learn. Make. Fail. Repeat.</h2><p>함께 시도하고, 함께 성장합니다.</p><button>REMO 알아보기 ↗</button></section>
  <footer><img src="/remo-logo.png" alt="REMO"/><div>{nav.map(x=><a key={x}>{x}</a>)}</div><span>© 2026 REMO · LEINN KOREA</span></footer>
 </main>
}
