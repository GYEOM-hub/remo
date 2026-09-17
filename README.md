# remo
REMO/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── ...
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
export default function Home() {
  return (
    <main>
      <nav className="navbar">
        <div className="logo">REMO</div>

        <div className="nav-links">
          <a href="#about">ABOUT</a>
          <a href="#projects">PROJECTS</a>
          <a href="#learning">LEARNING</a>
          <a href="#portfolio">PORTFOLIO</a>
          <a href="#community">COMMUNITY</a>
        </div>

        <div className="nav-actions">
          <a href="/login">LOGIN</a>
          <a href="/signup" className="signup">
            JOIN
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">LEINN KOREA · REMO</p>

          <h1>
            TOGETHER,
            <br />
            WE GROW.
          </h1>

          <p className="hero-description">
            우리는 함께 배우고,
            <br />
            직접 만들며 성장합니다.
          </p>

          <button className="primary-button">
            EXPLORE REMO →
          </button>
        </div>

        <div className="hero-card">
          <span>REMO</span>
          <p>2026</p>
        </div>
      </section>

      <section id="about" className="section">
        <div className="section-title">
          <span>01</span>
          <h2>WHO WE ARE</h2>
        </div>

        <div className="about-grid">
          <h3>
            가치와 문제를
            <br />
            비즈니스로 풀어냅니다.
          </h3>

          <p>
            REMO는 LEINN Korea에서 함께 배우고 실행하는 팀입니다.
            프로젝트를 통해 문제를 발견하고, 직접 만들고,
            시장에서 검증하며 성장합니다.
          </p>
        </div>
      </section>

      <section id="projects" className="section dark">
        <div className="section-title">
          <span>02</span>
          <h2>PROJECTS</h2>
        </div>

        <div className="project-grid">
          <article className="project-card">
            <div className="project-image">01</div>
            <p>FASHION / BRAND</p>
            <h3>MOODISM</h3>
          </article>

          <article className="project-card">
            <div className="project-image">02</div>
            <p>CONTENT / AI</p>
            <h3>PROJECT 02</h3>
          </article>

          <article className="project-card">
            <div className="project-image">03</div>
            <p>BUSINESS</p>
            <h3>PROJECT 03</h3>
          </article>
        </div>
      </section>

      <section id="learning" className="section">
        <div className="section-title">
          <span>03</span>
          <h2>LEARNING</h2>
        </div>

        <div className="learning-list">
          <div>
            <span>01</span>
            <h3>개인 학습</h3>
            <p>각자의 관심 분야를 탐구합니다.</p>
          </div>

          <div>
            <span>02</span>
            <h3>팀 학습</h3>
            <p>함께 배우고 서로의 경험을 공유합니다.</p>
          </div>

          <div>
            <span>03</span>
            <h3>회고</h3>
            <p>실행을 돌아보고 다음 행동을 설계합니다.</p>
          </div>
        </div>
      </section>

      <section id="portfolio" className="section">
        <div className="section-title">
          <span>04</span>
          <h2>PORTFOLIO</h2>
        </div>

        <div className="portfolio-banner">
          <h2>WHAT WE MADE</h2>
          <p>
            프로젝트와 학습을 통해 만들어낸
            <br />
            우리의 결과물을 기록합니다.
          </p>
        </div>
      </section>

      <section id="community" className="section">
        <div className="section-title">
          <span>05</span>
          <h2>COMMUNITY</h2>
        </div>

        <div className="community-grid">
          <div>
            <h3>TEAM BOARD</h3>
            <p>팀원들과 자유롭게 소통하세요.</p>
          </div>

          <div>
            <h3>CALENDAR</h3>
            <p>팀의 일정과 프로젝트 일정을 확인하세요.</p>
          </div>

          <div>
            <h3>NOTICE</h3>
            <p>REMO의 새로운 소식을 확인하세요.</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-logo">REMO</div>

        <div>
          <p>LEINN KOREA</p>
          <p>Learn. Make. Fail. Repeat.</p>
        </div>

        <p>© 2026 REMO. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #f5f2ec;
  color: #111;
  font-family: Arial, Helvetica, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

.navbar {
  height: 80px;
  padding: 0 5vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd8cf;
  background: #f5f2ec;
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo,
.footer-logo {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -2px;
}

.nav-links {
  display: flex;
  gap: 32px;
  font-size: 12px;
  font-weight: 700;
}

.nav-actions {
  display: flex;
  gap: 16px;
  font-size: 12px;
  font-weight: 700;
}

.signup {
  background: #f4511e;
  color: white;
  padding: 10px 18px;
}

.hero {
  min-height: 720px;
  padding: 100px 5vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
}

.eyebrow {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 30px;
}

.hero h1 {
  font-size: clamp(70px, 11vw, 170px);
  line-height: 0.82;
  letter-spacing: -8px;
  font-weight: 900;
}

.hero-description {
  margin-top: 40px;
  font-size: 20px;
  line-height: 1.5;
}

.primary-button {
  margin-top: 35px;
  border: 0;
  background: #f4511e;
  color: white;
  padding: 17px 25px;
  font-weight: 700;
  cursor: pointer;
}

.hero-card {
  width: 300px;
  height: 400px;
  background: #171717;
  color: white;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hero-card span {
  font-size: 50px;
  font-weight: 900;
  letter-spacing: -4px;
}

.section {
  padding: 120px 5vw;
}

.section.dark {
  background: #171717;
  color: white;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 70px;
}

.section-title span {
  color: #f4511e;
  font-size: 13px;
  font-weight: 700;
}

.section-title h2 {
  font-size: 14px;
  letter-spacing: 2px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10vw;
}

.about-grid h3 {
  font-size: clamp(40px, 5vw, 80px);
  line-height: 0.95;
  letter-spacing: -4px;
}

.about-grid p {
  max-width: 500px;
  font-size: 20px;
  line-height: 1.7;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.project-card p {
  margin-top: 20px;
  font-size: 11px;
  opacity: 0.6;
}

.project-card h3 {
  margin-top: 8px;
  font-size: 32px;
}

.project-image {
  height: 420px;
  background: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  font-weight: 900;
}

.learning-list {
  border-top: 1px solid #ccc;
}

.learning-list > div {
  display: grid;
  grid-template-columns: 80px 1fr 1fr;
  padding: 35px 0;
  border-bottom: 1px solid #ccc;
  align-items: center;
}

.learning-list span {
  color: #f4511e;
}

.learning-list h3 {
  font-size: 35px;
}

.learning-list p {
  font-size: 16px;
}

.portfolio-banner {
  background: #f4511e;
  color: white;
  padding: 80px;
}

.portfolio-banner h2 {
  font-size: clamp(60px, 9vw, 130px);
  letter-spacing: -7px;
}

.portfolio-banner p {
  margin-top: 30px;
  font-size: 18px;
  line-height: 1.5;
}

.community-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.community-grid > div {
  border: 1px solid #ccc;
  padding: 40px;
  min-height: 220px;
}

.community-grid h3 {
  font-size: 25px;
  margin-bottom: 30px;
}

.community-grid p {
  line-height: 1.6;
}

footer {
  background: #111;
  color: white;
  padding: 70px 5vw;
  display: flex;
  justify-content: space-between;
  gap: 40px;
  align-items: flex-end;
}

@media (max-width: 800px) {
  .nav-links {
    display: none;
  }

  .hero {
    flex-direction: column;
    align-items: flex-start;
    min-height: auto;
  }

  .hero-card {
    width: 100%;
    height: 300px;
  }

  .about-grid,
  .project-grid,
  .community-grid {
    grid-template-columns: 1fr;
  }

  .learning-list > div {
    grid-template-columns: 40px 1fr;
    gap: 15px;
  }

  .learning-list p {
    grid-column: 2;
  }

  .portfolio-banner {
    padding: 40px 25px;
  }

  footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
