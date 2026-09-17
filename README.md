# remo
REMO 홈페이지 SW 개발 안내서

1. 프로젝트 개요

프로젝트명

REMO 홈페이지

개발 목적

REMO의 팀 활동, 프로젝트, 학습, 포트폴리오, 성과 및 팀원들의 기록을 하나의 웹사이트에서 관리하고 공유한다.

도메인

REMO_com.leinnkorean.com

Hosting

Vercel

Repository

GitHub – REMO

Database

Neon (Vercel 연동)

File Storage

Vercel Blob

관리자 계정

remo_admin

⸻

2. SW 개발 프로세스

전체 개발은 다음 프로세스로 진행한다.

① 요구사항 정의
        ↓
② 서비스 구조 설계
        ↓
③ UI / UX 설계
        ↓
④ DB 설계
        ↓
⑤ 개발환경 구축
        ↓
⑥ 기능 개발
        ↓
⑦ GitHub 코드 관리
        ↓
⑧ 테스트 / 디버깅
        ↓
⑨ Vercel 배포
        ↓
⑩ 운영 및 유지보수

⸻

3. 요구사항 정의

3-1. 기본 기능

회원

* 회원가입
* 로그인
* 로그아웃
* 마이페이지
* 회원정보 수정

팀

* 팀 소개
* 팀원 소개
* 팀 조직도
* 팀 MVC

프로젝트

* 프로젝트 목록
* 프로젝트 상세페이지
* 진행 중인 프로젝트
* 프로젝트 성과

학습

* 학습 기록
* 개인 학습
* 팀 학습
* 학습 자료
* 회고록

포트폴리오

* 팀 포트폴리오
* 개인 포트폴리오
* 프로젝트 결과물
* 제작물 / 콘텐츠
* 결과

Archive

* 팀 뉴스
* 활동 기록
* 사진 / 영상

일정

* 팀 캘린더
* 프로젝트별 일정
* 팀 행사
* 회의 일정

Community

* 팀 게시판
* 자유게시판
* 프로젝트별 게시판
* 자료 공유
* 피드백

Management

* OKR
* 목표 / 성과
* 출석 / 활동 기록

Contact

* 문의
* 협업 문의
* SNS
* 이용약관
* 개인정보처리방침

⸻

4. 사이트 구조

REMO
│
├── HOME
│
├── ABOUT
│   ├── 팀 소개
│   ├── 팀원 소개
│   ├── 팀 조직도
│   └── 팀 MVC
│
├── PROJECT
│   ├── 프로젝트 목록
│   ├── 프로젝트 상세
│   └── 진행 중인 성과
│
├── LEARNING
│   ├── 학습 기록
│   ├── 개인 학습
│   ├── 팀 학습
│   ├── 학습 자료
│   └── 회고록
│
├── PORTFOLIO
│   ├── 팀 포트폴리오
│   ├── 개인 포트폴리오
│   ├── 프로젝트 결과물
│   ├── 제작물 / 콘텐츠
│   └── 결과
│
├── ARCHIVE
│   ├── 팀 뉴스
│   ├── 활동 기록
│   └── 사진 / 영상
│
├── CALENDAR
│   ├── 팀 캘린더
│   ├── 프로젝트별 일정
│   ├── 팀 행사
│   └── 회의 일정
│
├── COMMUNITY
│   ├── 팀 게시판
│   ├── 자유게시판
│   ├── 프로젝트별 게시판
│   ├── 자료 공유
│   └── 피드백
│
├── MANAGEMENT
│   ├── OKR
│   ├── 목표 / 성과
│   └── 출석 / 활동 기록
│
└── CONTACT
    ├── 문의
    ├── 협업 문의
    ├── SNS
    ├── 이용약관
    └── 개인정보처리방침

⸻

5. 사용자 권한

홈페이지는 비회원 / 일반 회원 / REMO 팀원 / 관리자로 구분한다.

권한	주요 기능
비회원	공개 페이지 조회
회원	로그인, 마이페이지, 게시판 등
팀원	프로젝트·학습·포트폴리오 작성 및 관리
관리자	전체 콘텐츠 및 회원 관리

공개 영역

* 홈
* 팀 소개
* 팀원 소개
* 프로젝트
* 포트폴리오
* 팀 뉴스
* 활동 기록
* 사진 / 영상
* 문의
* 협업 문의

로그인 필요 영역

* 마이페이지
* 학습 기록
* 개인 학습
* 팀 학습
* 회고록
* 팀 게시판
* 프로젝트 게시판
* 자료 공유
* 피드백
* 일정
* OKR
* 목표 / 성과
* 출석 / 활동 기록

⸻

6. DB 설계

Neon Database를 사용한다.

주요 데이터 테이블은 다음과 같이 구성한다.

users
members
projects
project_members
learning
team_learning
learning_materials
retrospectives
team_portfolios
personal_portfolios
project_results
contents
news
activities
media
calendar
project_schedules
events
meetings
posts
project_posts
materials
feedback
okr
goals
achievements
attendance
inquiries
collaboration_requests

각 데이터는 서로 연결될 수 있도록 사용자 ID / 프로젝트 ID / 게시글 ID 등 Primary Key와 Foreign Key를 기준으로 설계한다.

⸻

7. 파일 저장

이미지, 영상, PDF 및 기타 업로드 파일은 Vercel Blob을 사용한다.

저장 대상

* 팀원 프로필 이미지
* 프로젝트 이미지
* 프로젝트 결과물
* 포트폴리오
* 학습 자료
* 회고록 첨부파일
* 사진 / 영상
* 게시판 첨부파일

DB에는 파일 자체를 저장하지 않고,

파일 → Vercel Blob
파일 URL → Neon DB

형태로 관리한다.

⸻

8. GitHub 개발 환경

Repository

REMO

GitHub
└── REMO

Branch 구조

main
│
└── develop
    │
    ├── feature/auth
    ├── feature/team
    ├── feature/project
    ├── feature/learning
    ├── feature/portfolio
    ├── feature/archive
    ├── feature/calendar
    ├── feature/community
    └── feature/admin

Branch 규칙

main

* 실제 서비스 배포용
* 안정적인 코드만 Merge

develop

* 개발 기능 통합

feature/

* 각각의 기능 개발

⸻

9. GitHub 작업 방식

개발자는 기능 단위로 Branch를 생성한다.

develop
   ↓
feature/project
   ↓
기능 개발
   ↓
Commit
   ↓
Pull Request
   ↓
Code Review
   ↓
develop Merge
   ↓
Test
   ↓
main Merge
   ↓
Vercel Deploy

Commit Convention

feat: 새로운 기능
fix: 오류 수정
style: UI / 스타일 수정
refactor: 코드 구조 개선
docs: 문서 수정
chore: 설정 및 기타 작업

예시:

feat: 프로젝트 등록 기능 추가
feat: 회원가입 기능 구현
fix: 로그인 오류 수정
style: 프로젝트 상세페이지 UI 수정
docs: README 업데이트

⸻

10. 개발 우선순위

Phase 1 — 기본 시스템

* 프로젝트 초기 세팅
* GitHub Repository 연결
* Vercel 연결
* Neon DB 연결
* Vercel Blob 연결
* 도메인 연결
* 회원가입 / 로그인
* 관리자 권한

⸻

Phase 2 — 핵심 콘텐츠

* 홈
* 팀 소개
* 팀원 소개
* 팀 조직도
* MVC
* 프로젝트
* 포트폴리오

⸻

Phase 3 — Learning

* 학습 기록
* 개인 학습
* 팀 학습
* 학습 자료
* 회고록

⸻

Phase 4 — Archive / Schedule

* 팀 뉴스
* 활동 기록
* 사진 / 영상
* 팀 캘린더
* 프로젝트 일정
* 팀 행사
* 회의 일정

⸻

Phase 5 — Community

* 팀 게시판
* 자유게시판
* 프로젝트별 게시판
* 자료 공유
* 피드백

⸻

Phase 6 — Management

* OKR
* 목표 / 성과
* 출석 / 활동 기록
* 관리자 페이지

⸻

11. 관리자 페이지

관리자 계정:

remo_admin

관리자 페이지에서는 다음을 관리한다.

* 회원 관리
* 팀원 관리
* 프로젝트 관리
* 학습 콘텐츠 관리
* 포트폴리오 관리
* 게시글 관리
* 뉴스 / 활동 기록 관리
* 사진 / 영상 관리
* 일정 관리
* OKR 관리
* 성과 관리
* 출석 관리
* 문의 관리
* 협업 문의 관리

⸻

12. 테스트

개발 완료 후 다음 항목을 테스트한다.

기능 테스트

* 회원가입
* 로그인 / 로그아웃
* CRUD
* 파일 업로드
* 게시글 작성 / 수정 / 삭제
* 프로젝트 등록
* 일정 등록
* 관리자 권한

UI 테스트

* PC
* Tablet
* Mobile
* Chrome
* Safari

보안 테스트

* 비밀번호 보안
* 권한별 페이지 접근
* 관리자 페이지 접근 제한
* 파일 업로드 권한
* 개인정보 접근 제한

⸻

13. 배포 환경

Production

GitHub
   ↓
Vercel
   ↓
REMO_com.leinnkorean.com

Database

Vercel
   ↓
Neon

File Storage

Website
   ↓
Vercel Blob

⸻

14. 환경변수

API Key, DB URL, 인증 관련 정보 등 민감한 정보는 GitHub에 직접 업로드하지 않는다.

.env.local

환경변수로 관리하고 GitHub Repository에는 .env 파일을 업로드하지 않는다.

Vercel Production 환경에서는 Vercel Environment Variables를 사용한다.

⸻

15. 최종 개발 산출물

개발 완료 시 다음 결과물을 확보한다.

* REMO 홈페이지
* GitHub Repository REMO
* Vercel 배포 환경
* Neon Database
* Vercel Blob Storage
* 관리자 페이지
* 반응형 웹
* DB Schema
* API 문서
* README
* 개발 문서
* 테스트 결과
* 배포 URL

⸻

전체 구조 한 장 요약

                    REMO 홈페이지
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
      Front             Back             DB
     -end              -end             /Storage
        │                │                │
        │                │          ┌─────┴─────┐
        │                │          ↓           ↓
        │                │        Neon       Blob
        │                │        DB         Storage
        │                │
        └────────────┬───┘
                     ↓
                  GitHub
                 Repository
                    REMO
                     │
                     ↓
                   Vercel
                     │
                     ↓
          REMO_com.leinnkorean.com
