# remo
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
