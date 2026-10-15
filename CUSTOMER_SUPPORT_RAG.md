REMO 고객상담 RAG 챗봇 설정

기능: 우측 하단 채팅 위젯, 메뉴의 고객상담 항목 및 /customer-support 페이지, Google Docs 텍스트를 청크로 나누고 키워드 검색 후 Gemini에 전달하는 RAG 방식.

Vercel 환경변수:
- GEMINI_API_KEY: Google Gemini API 키
- GEMINI_MODEL: gemini-3.5-flash-lite
- CUSTOMER_SUPPORT_DOC_ID: 기본값은 제공된 문서 ID라 생략 가능

Google Docs 문서 export를 읽으므로 링크가 있는 사용자에게 보기 권한이 필요할 수 있습니다. 비공개 문서라면 문서 내용을 CUSTOMER_SUPPORT_KNOWLEDGE 환경변수에 넣어 대체할 수 있습니다. API 키를 코드/GitHub에 넣지 마세요.

검색은 가벼운 키워드 기반 RAG입니다. 배포 후 문서 권한, API 키, 모델 호출을 실제 테스트해야 합니다.