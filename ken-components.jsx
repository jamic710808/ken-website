// =============================================
// KenLiu 劉炳祥 — Personal Website Components
// =============================================

/* ---------- Scroll Reveal Hook ---------- */
function useScrollReveal(delay = 0) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {setVisible(true);obs.disconnect();}
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const style = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(28px)',
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`
  };
  return { ref, style };
}

/* ---------- Reveal Wrapper ---------- */
const Reveal = ({ children, delay = 0 }) => {
  const { ref, style } = useScrollReveal(delay);
  return <div ref={ref} style={style}>{children}</div>;
};

/* ---------- Icons ---------- */
const GitHubIcon = () =>
<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>;


const LinkIcon = () =>
<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>;


/* ---------- Navigation ---------- */
const KenNav = ({ accentColor }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const accent = accentColor || '#7c3aed';
  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    height: 64,
    background: scrolled ? 'rgba(8,8,24,0.95)' : 'rgba(8,8,24,0.6)',
    backdropFilter: 'blur(20px)',
    borderBottom: `1px solid rgba(139,92,246,${scrolled ? 0.28 : 0.1})`,
    transition: 'all 0.35s',
    display: 'flex', alignItems: 'center', padding: '0 24px'
  };
  const linkBase = { color: '#94a3b8', textDecoration: 'none', fontSize: '0.88rem', padding: '6px 12px', borderRadius: 8, transition: 'all 0.2s' };
  const navLinks = [
  { href: '#about', label: '關於我' },
  { href: '#skills', label: '技能' },
  { href: '#experience', label: '經歷' },
  { href: '#portfolio', label: '作品集' },
  { href: '#powerbi', label: 'Power BI' }];


  return (
    <nav style={navStyle} aria-label="主導航">
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#hero" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', background: 'linear-gradient(135deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>KenLiu</a>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {navLinks.map((l) =>
          <a key={l.href} href={l.href} style={linkBase}
          onMouseEnter={(e) => {e.currentTarget.style.color = '#f1f5f9';e.currentTarget.style.background = 'rgba(255,255,255,0.07)';}}
          onMouseLeave={(e) => {e.currentTarget.style.color = '#94a3b8';e.currentTarget.style.background = 'transparent';}}>
              {l.label}
            </a>
          )}
          <a href="#contact" style={{ marginLeft: 8, padding: '8px 20px', borderRadius: 10, background: accent, color: '#fff', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', transition: 'all 0.2s' }}
          onMouseEnter={(e) => {e.currentTarget.style.opacity = '0.85';e.currentTarget.style.transform = 'translateY(-1px)';}}
          onMouseLeave={(e) => {e.currentTarget.style.opacity = '1';e.currentTarget.style.transform = '';}}>
            聯絡我
          </a>
        </div>
      </div>
    </nav>);

};

/* ---------- Hero ---------- */
const KenHero = ({ accentColor, showParticles }) => {
  const canvasRef = React.useRef(null);
  const animRef = React.useRef(null);
  const accent = accentColor || '#7c3aed';

  // State-based fade-in (replaces @keyframe which can stall in some renderers)
  const [heroVisible, setHeroVisible] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !showParticles) {if (animRef.current) cancelAnimationFrame(animRef.current);return;}
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resize = () => {canvas.width = window.innerWidth;canvas.height = window.innerHeight;};

    const init = () => {
      const count = window.innerWidth < 768 ? 45 : 95;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.6 + 0.4, o: Math.random() * 0.45 + 0.1,
        cyan: Math.random() > 0.72
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rgb = accent === '#22d3ee' ? '34,211,238' : accent === '#10b981' ? '16,185,129' : accent === '#f59e0b' ? '245,158,11' : accent === '#ec4899' ? '236,72,153' : '139,92,246';
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x,dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 135) {
            ctx.beginPath();ctx.moveTo(particles[i].x, particles[i].y);ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${rgb},${0.14 * (1 - d / 135)})`;ctx.lineWidth = 0.55;ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        p.x += p.vx;p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.cyan ? `rgba(34,211,238,${p.o})` : `rgba(${rgb},${p.o})`;ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };

    resize();init();draw();
    window.addEventListener('resize', () => {resize();init();});
    return () => {cancelAnimationFrame(animRef.current);};
  }, [accentColor, showParticles]);

  const fade = (delay) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? 'none' : 'translateY(20px)',
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`
  });

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(135deg,#080818 0%,#0d0628 50%,#080824 100%)' }}>
      <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: showParticles ? 'block' : 'none' }} />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 24px 0' }}>
        {/* Avatar */}
        <div style={{ ...fade(0), display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#22d3ee)', padding: 2.5, boxShadow: '0 0 28px rgba(124,58,237,0.45)' }}>
            <img src="images/smile.webp" alt="KenLiu" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>
        </div>
        {/* Badge */}
        <div style={{ ...fade(0), display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 100, border: '1px solid rgba(139,92,246,0.32)', background: 'rgba(124,58,237,0.12)', color: '#a78bfa', fontSize: '0.82rem', marginBottom: 28 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22d3ee', display: 'inline-block', animation: 'kenPulse 2.2s ease-in-out infinite' }}></span>
          目前接受新機會 · Open to opportunities
        </div>
        {/* Name */}
        <h1 style={{ ...fade(80), fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(3.8rem,11vw,8rem)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.02em', margin: 0 }}>
          <span style={{ background: 'linear-gradient(135deg,#ffffff 0%,#c4b5fd 45%,#22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>KenLiu</span>
        </h1>
        {/* Chinese name */}
        <p style={{ ...fade(160), fontFamily: "'Noto Sans TC',sans-serif", fontSize: 'clamp(1.3rem,3.5vw,2.2rem)', fontWeight: 300, color: 'rgba(148,163,184,0.7)', marginTop: 14, letterSpacing: '0.5em' }}>劉 炳 祥</p>
        {/* Role */}
        <p style={{ ...fade(240), fontSize: 'clamp(0.95rem,2vw,1.2rem)', color: '#a78bfa', marginTop: 22, fontWeight: 500, letterSpacing: '0.04em' }}>
          資深財務會計人 &nbsp;·&nbsp; AI 驅動開發者 &nbsp;·&nbsp; 斜槓工程師
        </p>
        {/* Desc */}
        <p style={{ ...fade(320), color: '#475569', maxWidth: 520, margin: '18px auto 0', fontSize: '1rem', lineHeight: 1.75 }}>
          17+ 年財務資歷 × AI 工程技術，從勤業眾信（Deloitte）到科技大廠，<br />用數字洞察商業，用 AI 與程式解決真實問題。
        </p>
        {/* CTAs */}
        <div style={{ ...fade(400), display: 'flex', gap: 12, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
          {[
          { href: '#portfolio', label: '查看作品集', primary: true },
          { href: 'https://github.com/jamic710808', label: 'GitHub', icon: <GitHubIcon />, external: true },
          { href: '#contact', label: '聯絡我' }].
          map((btn) =>
          <a key={btn.href} href={btn.href} target={btn.external ? '_blank' : undefined} rel={btn.external ? 'noopener noreferrer' : undefined}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '12px 26px', borderRadius: 12, textDecoration: 'none', fontWeight: btn.primary ? 700 : 500, fontSize: '0.95rem', transition: 'all 0.22s', ...(btn.primary ? { background: accent, color: '#fff' } : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.28)', color: '#cbd5e1' }) }}
          onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-2px)';if (btn.primary) e.currentTarget.style.boxShadow = `0 8px 28px ${accent}66`;else e.currentTarget.style.background = 'rgba(255,255,255,0.1)';}}
          onMouseLeave={(e) => {e.currentTarget.style.transform = '';e.currentTarget.style.boxShadow = '';if (!btn.primary) e.currentTarget.style.background = 'rgba(255,255,255,0.06)';}}>
              {btn.icon}{btn.label}
            </a>
          )}
        </div>
      </div>
      {/* Scroll line */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: '#334155', fontSize: '0.72rem', letterSpacing: '0.1em', animation: 'kenFadeIn 1s ease 1.2s both' }}>
        <div style={{ width: 1, height: 52, background: 'linear-gradient(to bottom,#7c3aed,transparent)' }}></div>
        SCROLL
      </div>
    </section>);

};

/* ---------- About ---------- */
const KenAbout = () => {
  const { ref, style } = useScrollReveal();
  const stats = [{ n: '17+', l: '年財務資歷' }, { n: '8+', l: '知名企業歷練' }, { n: '財務×AI', l: '斜槓跨域' }];

  return (
    <section id="about" style={{ background: '#0d0d24', padding: '110px 24px' }}>
      <div ref={ref} style={{ ...style, maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '64px', alignItems: 'center' }}>
        {/* Avatar */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{ background: 'linear-gradient(135deg,#7c3aed,#22d3ee)', padding: 2.5, borderRadius: 28, width: 240, height: 300 }}>
            <img src="images/dark.webp" alt="KenLiu 劉炳祥" loading="lazy" style={{ width: '100%', height: '100%', borderRadius: 26, objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>
          <div style={{ position: 'absolute', inset: -28, background: 'radial-gradient(circle,rgba(124,58,237,0.18) 0%,transparent 70%)', zIndex: -1, borderRadius: '50%' }}></div>
        </div>
        {/* Text */}
        <div>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#22d3ee', marginBottom: 10 }}>About Me</p>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, lineHeight: 1.18, marginBottom: 20 }}>關於我</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 14 }}>
            你好！我是 <strong style={{ color: '#f1f5f9' }}>KenLiu 劉炳祥</strong>，擁有超過 16 年跨國科技製造與醫療體系實務經驗的財務會計高階專業人員，同時也是 AI 驅動的全端開發者。起步於四大 <strong style={{ color: '#c4b5fd' }}>勤業眾信（Deloitte）</strong>，歷任 <strong style={{ color: '#c4b5fd' }}>技嘉科技 (GIGABYTE)、富采投控 (Ennostar)、神腦國際</strong> 等知名企業財務要職，現任恩主公醫院財務課長，帶領 5-8 人財務團隊。
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 14 }}>
            專精 <strong style={{ color: '#e2e8f0' }}>Power BI 進階 DAX 數據建模</strong>、IBCS 高階視覺化儀表板設計，以及 IFRS、跨國稅務與合併報表。熟稔 Oracle、鼎新 TIPTOP 等 ERP 系統。以「財會人員的直覺視角」開發高階分析工具，將複雜商業邏輯轉化為自動化決策支援系統。
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>熟練運用 Claude Code、OpenAI Codex、Gemini CLI 等 AI 工具開發，擅長 Prompt Engineering 與多智能體架構設計。<span style={{ color: '#a78bfa' }}>歡迎探索合作機會！</span></p>
          <div style={{ display: 'flex', gap: 40, marginTop: 36, paddingTop: 32, borderTop: '1px solid rgba(139,92,246,0.18)' }}>
            {stats.map((s) =>
            <div key={s.n}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: s.n.length > 4 ? '1.5rem' : '2.2rem', fontWeight: 700, background: 'linear-gradient(135deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.n}</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 3 }}>{s.l}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

/* ---------- Skills ---------- */
const KenSkills = ({ accentColor }) => {
  const accent = accentColor || '#7c3aed';
  const groups = [
  { title: '財務會計專業', items: ['財務報表分析', '成本 & 毛利計算', 'IFRS / XBRL', '合併報表', '稅務申報 (台灣/中國)', '預算規劃管控', '資金規劃', '內部控制'] },
  { title: '股務管理 / 稅務規劃', items: ['股務作業處理', '公司法 / 證交法規', '公開資訊觀測站申報', '股東會籌備作業', '現金 / 股票股利發放', '配認股作業', '股務稅務申報', '股務人員證照'] },
  { title: '數據 & BI 工具', items: ['Power BI', 'DAX 進階建模', 'Power Query', 'Tableau', 'Excel VBA', 'IBCS 視覺化', 'SSOT 架構'] },
  { title: 'ERP & 系統', items: ['Oracle ERP', '鼎新 TIPTOP', 'Google Apps Script', 'SQL', 'Pandas', 'NumPy'] },
  { title: '前端開發', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML / CSS'] },
  { title: '工具 & 平台', items: ['Git / GitHub', 'Vercel', 'Python', 'REST API', 'Email 自動化', 'Web Scraping'] },
  { title: 'AI 工具', items: ['Claude / Claude Code', 'OpenAI Codex', 'Gemini CLI', 'Antigravity IDE', 'Prompt Engineering', 'Vibe Coding'] },
  { title: 'AI 工程能力', items: ['Multi-Agent 協作', 'MCP 串接', 'AI Workflow 設計', 'AI Code Review', 'AI 測試生成', 'Context 管理'] },
  ];


  return (
    <section id="skills" style={{ background: '#080818', padding: '110px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#22d3ee', marginBottom: 10 }}>Technical Skills</p>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, lineHeight: 1.18, marginBottom: 12 }}>技術技能</h2>
          <p style={{ color: '#475569', marginBottom: 52, maxWidth: 480 }}>涵蓋前端開發、後端整合、財務數據分析與自動化多個領域。</p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
          {groups.map((g, i) =>
          <Reveal key={g.title} delay={i * 75}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(139,92,246,0.18)', borderRadius: 16, padding: 24, transition: 'all 0.25s', height: '100%' }}
            onMouseEnter={(e) => {e.currentTarget.style.borderColor = `${accent}66`;e.currentTarget.style.background = `${accent}0d`;}}
            onMouseLeave={(e) => {e.currentTarget.style.borderColor = 'rgba(139,92,246,0.18)';e.currentTarget.style.background = 'rgba(255,255,255,0.04)';}}>
                <p style={{ fontSize: '0.73rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 16 }}>{g.title}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {g.items.map((item) =>
                <span key={item} style={{ padding: '4px 13px', borderRadius: 100, background: `${accent}18`, border: `1px solid ${accent}30`, color: '#94a3b8', fontSize: '0.83rem' }}>{item}</span>
                )}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

};

/* ---------- Experience ---------- */
const KenExperience = () => {
  const [showAll, setShowAll] = React.useState(false);

  const items = [
    { date: '2023/09 — 現在', title: '財務課長', company: '行天宮醫療志業恩主公醫院', tag: '醫療財團法人 · 500人以上', desc: '規劃及檢討財務會計制度，確保符合會計原則及法規要求。建構各部門預算規劃、成效追蹤及成本分析系統。負責財務及管理報表編製分析，覆核會計作業，並執行醫師工作績效計算及各項主管交辦專案。' },
    { date: '2022/04 — 2023', title: '子公司轉投資會計 · 會計經理', company: '富采投控股份有限公司', tag: '光電產業 · LED上市大廠', desc: '督導子公司帳務及稅務作業，協助製造體系掌握成本動因，進行個體財務報表及合併報表分析。負責稅務申報、成本結算審核及年度預算編製。' },
    { date: '2019/04 — 2022', title: '會計副理', company: '佳邦科技股份有限公司', tag: '消費性電子製造 · 500人以上', desc: '全面負責帳務處理、租稅申報、各類所得扣繳、關係人對帳及合併報表。協助預算彙編與管控，執行成本估計、預測、結算分析，籌辦董事會與股東會。' },
    { date: '2017/07 — 2019', title: '會計副理', company: '技嘉科技股份有限公司 (GIGABYTE)', tag: '電腦硬體製造 · 台灣上市大廠', desc: '主導年度預算彙編、專案預算與設備投資審查。按月/季/年複核財務報表，管控稅務申報，推動企業內部控制改善及 ERP 系統優化。' },
    { date: '2015/01 — 2017', title: '財務課長', company: '瑞智精密股份有限公司', tag: '精密儀器製造 · 500人以上', desc: '編制整體資金規劃報告，預測分析企業資金流向，取得銀行授信額度。負責月/季/年財務報表編制分析、稅務申報審核及年度預算管控，並推行內控制度與 ERP 優化。' },
    { date: '2010/09 — 2015', title: '會計主任', company: '神腦國際股份有限公司', tag: '電子通訊零售 · 台灣知名品牌', desc: '審核大陸地區企所稅及各類稅報，處理 AP 入帳、應收帳款及固定資產入帳。製作每週/月管理報表，執行每週/月營業廳損益推滾計算及毛利分析。' },
    { date: '2008/12 — 2010', title: '財務會計專員', company: '中華映管股份有限公司', tag: '光電產業 · TFT-LCD製造', desc: '執行月結帳費用分攤、財務比率分析，辦理財報及重大訊息公告事項，協助應收帳款業務及股東會相關業務。' },
    { date: '2006/12 — 2008', title: '查帳員', company: '勤業眾信會計師事務所 (Deloitte)', tag: '四大會計師事務所 · 職涯起點', desc: '參與新普科技、全譜科技、力致科技等上市公司審計查核工作，並負責稅務申報及宏森光電上櫃審查內控審查。' },
  ];

  const edu = { date: '2001 — 2005', title: '會計學系 · 大學畢業', company: '中原大學', tag: '財務會計專業學歷' };

  const visible = showAll ? items : items.slice(0, 4);

  return (
    <section id="experience" style={{ background: '#0d0d24', padding: '110px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#22d3ee', marginBottom: 10 }}>Experience & Education</p>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, lineHeight: 1.18, marginBottom: 8 }}>學經歷</h2>
          <p style={{ color: '#475569', marginBottom: 52, fontSize: '0.95rem' }}>17+ 年財務會計歷練，從四大會計師事務所到台灣科技大廠。</p>
        </Reveal>

        <div style={{ position: 'relative', paddingLeft: 32, maxWidth: 780 }}>
          <div style={{ position: 'absolute', left: 0, top: 12, bottom: 24, width: 1, background: 'linear-gradient(to bottom,#7c3aed 0%,rgba(124,58,237,0.08) 100%)' }}></div>

          {visible.map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ position: 'relative', marginBottom: 44 }}>
                <div style={{ position: 'absolute', left: -37, top: 7, width: 12, height: 12, borderRadius: '50%', background: i === 0 ? '#22d3ee' : '#7c3aed', border: '2px solid #0d0d24', boxShadow: `0 0 12px ${i === 0 ? 'rgba(34,211,238,0.8)' : 'rgba(124,58,237,0.7)'}` }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                  <p style={{ fontSize: '0.78rem', color: '#22d3ee', fontWeight: 700, letterSpacing: '0.08em' }}>{item.date}</p>
                  <span style={{ padding: '2px 10px', borderRadius: 100, background: 'rgba(124,58,237,0.15)', color: '#a78bfa', fontSize: '0.7rem', fontWeight: 600 }}>{item.tag}</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.12rem', fontWeight: 700, marginBottom: 3 }}>{item.title}</h3>
                <p style={{ color: '#c4b5fd', fontSize: '0.88rem', marginBottom: 10, fontWeight: 500 }}>{item.company}</p>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}

          {/* Show more / less */}
          {items.length > 4 && (
            <Reveal>
              <button onClick={() => setShowAll(!showAll)} style={{ marginLeft: 0, marginTop: 4, marginBottom: 40, padding: '9px 22px', borderRadius: 10, border: '1px solid rgba(139,92,246,0.3)', background: 'transparent', color: '#a78bfa', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.12)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)'; }}>
                {showAll ? '▲ 收起' : `▼ 展開完整歷程 (共 ${items.length} 段)`}
              </button>
            </Reveal>
          )}

          {/* Education */}
          <Reveal>
            <div style={{ position: 'relative', marginBottom: 0, paddingTop: 8, borderTop: '1px dashed rgba(139,92,246,0.2)' }}>
              <div style={{ position: 'absolute', left: -37, top: 15, width: 12, height: 12, borderRadius: '50%', background: '#10b981', border: '2px solid #0d0d24', boxShadow: '0 0 10px rgba(16,185,129,0.7)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5, marginTop: 8 }}>
                <p style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700, letterSpacing: '0.08em' }}>{edu.date}</p>
                <span style={{ padding: '2px 10px', borderRadius: 100, background: 'rgba(16,185,129,0.15)', color: '#6ee7b7', fontSize: '0.7rem', fontWeight: 600 }}>{edu.tag}</span>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.12rem', fontWeight: 700, marginBottom: 3 }}>{edu.title}</h3>
              <p style={{ color: '#6ee7b7', fontSize: '0.88rem', fontWeight: 500 }}>{edu.company}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>);
};

/* ---------- Portfolio ---------- */
const KenPortfolio = ({ accentColor }) => {
  const accent = accentColor || '#7c3aed';
  const projects = [
  { icon: '📊', tag: 'Live Demo', title: '財務報表分析儀表板', desc: '15 頁互動式財務三表分析系統，含 P&L 瀑布圖、杜邦分解樹、Altman Z-Score、現金循環週期、What-If 情境模擬器、三表連動，以及 AI 分析模組，支援 DAX 公式庫查詢。', tech: ['Power BI', 'DAX', 'React', 'TypeScript'], github: 'https://github.com/jamic710808/financial-analysis-dashboard', demo: 'https://financial-analysis-dashboard-tau.vercel.app/' },
  { icon: '💰', tag: 'Live Demo', title: '費用分析系統', desc: '符合 IBCS 規範的 SVG 高階視覺化費用儀表板，整合多源 ERP 數據，提供動態費用追蹤與異常預警。', tech: ['React', 'TypeScript', 'DAX', 'Power BI'], demo: 'https://expense-analysis-v3.vercel.app/' },
  { icon: '🏭', tag: 'Live Demo', title: '製造業分析儀表板', desc: '製造業多維度 BI 儀表板，涵蓋產線效率、成本動因與毛利分析，將 ERP 數據轉化為管理決策視圖。', tech: ['React', 'TypeScript', 'Power Query', 'Vercel'], demo: 'https://manufacturing-analytics-v2.vercel.app/overview' },
  { icon: '📦', tag: 'Live Demo', title: '存貨分析儀表板', desc: '存貨策略分析平台，支援多維度庫存 KPI 監控、周轉率分析與呆滯料預警，優化供應鏈決策。', tech: ['React', 'Next.js', 'TypeScript', 'API'], demo: 'https://inventory-strategic-os-v3-9efx.vercel.app/' },
  { icon: '🛒', tag: 'Live Demo', title: '採購智能平台', desc: '採購數據分析與供應商管理平台，整合採購成本趨勢、議價分析與供應商績效評估，自動化採購決策。', tech: ['React', 'TypeScript', 'Tailwind', 'Vercel'], demo: 'https://procurement-analytics-v2.vercel.app/' },
  { icon: '🧠', tag: 'Live Demo', title: '智慧數據分析助理', desc: '基於 LangChain + FastAPI + React 建構的智慧資料分析系統，支援自然語言轉 SQL 查詢，實現對話式數據探索。', tech: ['LangChain', 'FastAPI', 'React', 'NL2SQL'], github: 'https://github.com/jamic710808/NL2SQLAgent-HF', demo: 'https://ken19820808-nl2sqlagent-hf.hf.space/' },
  { icon: '☕', tag: 'Live Demo', title: 'Kenken Barista\'s Atelier', desc: '為咖啡愛好者打造的高階電商平台，結合 Glassmorphism 設計、AI 咖啡師個性化建議、完整訂單流程，以及 GAS Webhook 自動通知系統。', tech: ['React 18', 'TypeScript', 'Node.js', 'Prisma', 'GAS'], github: 'https://github.com/jamic710808', demo: 'https://ken19820808-kenkenbaristaatelier.hf.space' },
  { icon: '✍️', tag: 'Live Demo', title: 'AI 文字潤飾器', desc: '貼入原始文字、選擇場景，AI 即時將文字潤色為專業格式。零技術門檻，適合任何需要快速提升文字品質的使用者。', tech: ['React', 'AI API', 'TypeScript', 'Vercel'], github: 'https://github.com/jamic710808/ai-text-polisher', demo: 'https://ai-text-polisher-dusky.vercel.app/' },
  { icon: '🐾', tag: 'Live Demo', title: '泡泡爪 Pet Spa 預約平台', desc: '為貓狗提供洗澡、精修、皮毛護理和幼寵適應服務。透明操作區、低噪吹乾間和獨立消毒工具，讓每次洗護都更安心。', tech: ['React', 'TypeScript', 'Tailwind', 'Vercel'], github: 'https://github.com/jamic710808/pet_care', demo: 'https://petcare-main-one.vercel.app/' },
  { icon: '💬', tag: 'Live Demo', title: 'KenGPT Chat', desc: '個人專屬 AI 問答平台，提供流暢的對話式 AI 互動體驗，整合大語言模型實現智慧問答與知識查詢。', tech: ['React', 'LLM API', 'TypeScript', 'Vercel'], github: 'https://github.com/jamic710808/chatgpt-clone-deepseek', demo: 'https://chatgpt-clone-deepseek.vercel.app/' },
  ];


  return (
    <section id="portfolio" style={{ background: '#080818', padding: '110px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#22d3ee', marginBottom: 10 }}>Portfolio</p>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, lineHeight: 1.18, marginBottom: 12 }}>作品集</h2>
          <p style={{ color: '#475569', marginBottom: 52, maxWidth: 560 }}>真實部署於 Vercel 的財務 BI 系統與 AI 應用，點擊 Live Demo 可直接體驗。</p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(310px,1fr))', gap: 22 }}>
          {projects.map((p, i) =>
          <Reveal key={i} delay={i * 60}>
              <article style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(139,92,246,0.18)', borderRadius: 18, overflow: 'hidden', transition: 'all 0.3s', display: 'flex', flexDirection: 'column' }}
            onMouseEnter={(e) => {e.currentTarget.style.borderColor = `${accent}66`;e.currentTarget.style.transform = 'translateY(-5px)';e.currentTarget.style.boxShadow = `0 16px 48px ${accent}22`;}}
            onMouseLeave={(e) => {e.currentTarget.style.borderColor = 'rgba(139,92,246,0.18)';e.currentTarget.style.transform = '';e.currentTarget.style.boxShadow = '';}}>
                <div style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg,#111132,#1c1c48)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontSize: '3.8rem', opacity: 0.65 }}>{p.icon}</span>
                  <span style={{ position: 'absolute', top: 12, right: 12, padding: '3px 11px', borderRadius: 100, background: p.tag === 'Live Demo' ? 'rgba(34,211,238,0.18)' : `${accent}2a`, color: p.tag === 'Live Demo' ? '#22d3ee' : '#a78bfa', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em' }}>{p.tag === 'Live Demo' ? '🟢 Live Demo' : p.tag}</span>
                </div>
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.05rem', fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.68, marginBottom: 14, flex: 1 }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 15 }}>
                    {p.tech.map((t) => <span key={t} style={{ padding: '3px 9px', borderRadius: 6, background: `${accent}1a`, color: '#a78bfa', fontSize: '0.71rem', fontWeight: 600 }}>{t}</span>)}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a href={p.github || 'https://github.com/jamic710808'} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 13px', borderRadius: 8, border: '1px solid rgba(139,92,246,0.22)', color: '#94a3b8', textDecoration: 'none', fontSize: '0.78rem', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => {e.currentTarget.style.color = '#f1f5f9';e.currentTarget.style.borderColor = `${accent}55`;e.currentTarget.style.background = `${accent}12`;}}
                  onMouseLeave={(e) => {e.currentTarget.style.color = '#94a3b8';e.currentTarget.style.borderColor = 'rgba(139,92,246,0.22)';e.currentTarget.style.background = '';}}>
                      <GitHubIcon />GitHub
                    </a>
                    <a href={p.demo} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 13px', borderRadius: 8, border: `1px solid ${p.tag === 'Live Demo' ? 'rgba(34,211,238,0.35)' : 'rgba(139,92,246,0.22)'}`, color: p.tag === 'Live Demo' ? '#22d3ee' : '#94a3b8', textDecoration: 'none', fontSize: '0.78rem', fontWeight: p.tag === 'Live Demo' ? 600 : 400, transition: 'all 0.2s' }}
                  onMouseEnter={(e) => {e.currentTarget.style.color = '#f1f5f9';e.currentTarget.style.background = p.tag === 'Live Demo' ? 'rgba(34,211,238,0.1)' : `${accent}12`;}}
                  onMouseLeave={(e) => {e.currentTarget.style.color = p.tag === 'Live Demo' ? '#22d3ee' : '#94a3b8';e.currentTarget.style.background = '';}}>
                      <LinkIcon />{p.tag === 'Live Demo' ? 'Live Demo' : 'Demo'}
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

};

/* ---------- Contact ---------- */
const KenContact = ({ accentColor }) => {
  const accent = accentColor || '#7c3aed';
  const cards = [
  { href: 'mailto:jamic710808@hotmail.com', icon: <span style={{ fontSize: '1.1rem' }}>✉</span>, label: 'Hotmail', value: 'jamic710808@hotmail.com' },
  { href: 'mailto:jamic710808@gmail.com', icon: <span style={{ fontSize: '1.1rem' }}>✉</span>, label: 'Gmail', value: 'jamic710808@gmail.com' },
  { href: 'https://line.me/ti/p/~ken19820808', icon: <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>L</span>, label: 'LINE ID', value: 'ken19820808' },
  { href: 'https://github.com/jamic710808', icon: <GitHubIcon />, label: 'GitHub', value: 'jamic710808' },
  { href: 'https://vercel.com/kenliu19820808', icon: <span style={{ fontWeight: 900, fontSize: '1.1rem' }}>▲</span>, label: 'Vercel', value: 'kenliu19820808' }];


  return (
    <section id="contact" style={{ background: '#0d0d24', padding: '110px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <Reveal>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#22d3ee', marginBottom: 10 }}>Get In Touch</p>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, lineHeight: 1.18, marginBottom: 16 }}>聯絡我</h2>
          <p style={{ color: '#475569', maxWidth: 440, margin: '0 auto 52px', lineHeight: 1.8 }}>有合作機會或想聊聊技術？歡迎透過以下方式與我聯繫，我會盡快回覆。</p>
        </Reveal>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {cards.map((c) =>
          <Reveal key={c.label}>
              <a href={c.href} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 28px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(139,92,246,0.2)', color: '#f1f5f9', textDecoration: 'none', transition: 'all 0.25s', minWidth: 220 }}
            onMouseEnter={(e) => {e.currentTarget.style.borderColor = `${accent}55`;e.currentTarget.style.transform = 'translateY(-3px)';e.currentTarget.style.background = `${accent}0d`;e.currentTarget.style.boxShadow = `0 10px 32px ${accent}25`;}}
            onMouseLeave={(e) => {e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)';e.currentTarget.style.transform = '';e.currentTarget.style.background = 'rgba(255,255,255,0.04)';e.currentTarget.style.boxShadow = '';}}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: `${accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', flexShrink: 0 }}>{c.icon}</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 3 }}>{c.label}</div>
                  <div style={{ fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.95rem' }}>{c.value}</div>
                </div>
              </a>
            </Reveal>
          )}
        </div>
        <div style={{ marginTop: 64, paddingTop: 48, borderTop: '1px solid rgba(139,92,246,0.12)', color: '#334155', fontSize: '0.88rem' }}>
          透過 GitHub 與 Vercel 可查看所有公開作品
        </div>
      </div>
    </section>);

};

/* ---------- Footer ---------- */
const KenFooter = () =>
<footer style={{ background: '#080818', borderTop: '1px solid rgba(139,92,246,0.12)', padding: '32px 24px', textAlign: 'center', color: '#334155', fontSize: '0.85rem' }}>
    <p>© 2026 <a href="#hero" style={{ color: '#a78bfa', textDecoration: 'none' }}>KenLiu 劉炳祥</a> · 用技術驅動，用熱情打造</p>
  </footer>;


/* ---------- Power BI Showcase ---------- */
const KenPowerBI = ({ accentColor }) => {
  const pbiColor = '#F2C811';
  const [activeReport, setActiveReport] = React.useState(0);
  const [activeIdx, setActiveIdx] = React.useState(null);

  const reports = [
    {
      title: '人力資源分析報告',
      en: 'HR Analytics',
      icon: '👥',
      link: 'https://app.powerbi.com/view?r=eyJrIjoiZDY5NjdjODItYjNlMy00YmI0LWJjOTAtMTkyY2RhMTllOGNmIiwidCI6IjE2ZGVlZGU4LTc5ZTktNGUzMy05OWU2LTlkOGQzOTQyZDc5NiIsImMiOjEwfQ%3D%3D',
      desc: '運用 Power BI 進階 DAX 建模，以五大分析架構全面解析企業人力資本，將複雜的 HR 數據轉化為高階管理決策視圖。',
      frameworks: [
        { no:'01', icon:'👥', title:'員工結構分析', en:'Employee Structure', kpis:['在職人數','平均年齡','公司年資','性別比例','管理配比'], q:'公司現有人力狀況如何？' },
        { no:'02', icon:'🎯', title:'人才招聘分析', en:'Talent Acquisition', kpis:['需求完成率','面試通過率','Offer 接受率','招聘週期'], q:'招聘效率與漏斗轉化如何？' },
        { no:'03', icon:'🔄', title:'人員流動分析', en:'Staff Turnover', kpis:['離職率','主被動離職','月入離職人數'], q:'人員異動趨勢是否健康？' },
        { no:'04', icon:'📚', title:'員工培訓分析', en:'Employee Training', kpis:['培訓人次','完成率','人均費用','培訓類型分布'], q:'培訓投入是否有效產出 (ROI)？' },
        { no:'05', icon:'💵', title:'薪酬分析', en:'Compensation', kpis:['平均薪資','薪資中位數','與市場對比','部門分布'], q:'薪酬結構是否具備競爭力？' },
      ],
      mockTabs: ['員工結構','招聘','流動','培訓','薪酬'],
      mockKPIs: [{l:'在職人數',v:'1,248',u:'人'},{l:'平均年齡',v:'34.2',u:'歲'},{l:'離職率',v:'12.3',u:'%'}],
      mockBars: [65,40,80,55,92,45,72,60,85,38,70,50],
      mockBarLabel: '月度人員異動趨勢',
      mockRing: { v:'87%', l:'完成率' },
    },
    {
      title: '銷售業務分析報告',
      en: 'Sales Business Analytics',
      icon: '📈',
      link: 'https://app.powerbi.com/view?r=eyJrIjoiM2FmYTUxMTQtNzI0OC00ZDEzLWE5ZjMtNmM5ZDFkNmZjNDY3IiwidCI6IjE2ZGVlZGU4LTc5ZTktNGUzMy05OWU2LTlkOGQzOTQyZDc5NiIsImMiOjEwfQ%3D%3D',
      desc: '8 大分析模組涵蓋執行摘要、時間趨勢、產品效能、客戶洞察、市場購物籃分析（MBA）、業務員績效、資料品質監控，大量自訂 SVG KPI 卡片與進階時間智能 DAX。',
      frameworks: [
        { no:'01', icon:'📊', title:'執行摘要 / KPI 儀表板', en:'Executive Dashboard', kpis:['總銷售額','總利潤','客戶數','訂單量','客單價','平均訂單金額'], q:'業務關鍵指標一目了然，自訂 SVG KPI 卡片視覺化呈現。' },
        { no:'02', icon:'📉', title:'時間趨勢與績效分析', en:'Time Intelligence', kpis:['YTD 銷售額','同比 YoY','環比 MoM','累計占比','異常偵測'], q:'銷售與利潤的時間趨勢，含最高/最低點標記與銷售異常警示。' },
        { no:'03', icon:'🏆', title:'產品效能分析', en:'Product Performance', kpis:['TOP3 產品','ABC 分類','A/B/C類數量','產品類別構成'], q:'識別最佳與最差產品，進行 ABC 貢獻度分類分析。' },
        { no:'04', icon:'🧑‍🤝‍🧑', title:'客戶洞察與留存', en:'Customer & RFM', kpis:['新客戶數','CLV','客戶留存率','RFM 分析','平均發貨天數'], q:'RFM 模型分析客戶行為、忠誠度與流失風險。' },
        { no:'05', icon:'🛒', title:'購物籃關聯分析', en:'Market Basket Analysis', kpis:['提升度 Lift','支持度','置信度','共現訂單數'], q:'識別交叉銷售機會，動態切片器控制焦點產品分析。' },
        { no:'06', icon:'🧑‍💼', title:'業務員績效', en:'Sales Rep Performance', kpis:['業務員銷售額','業務員排名'], q:'評估和排名業務員的銷售貢獻，識別頂尖業務人員。' },
        { no:'07', icon:'🔍', title:'資料品質監控', en:'Data Quality', kpis:['銷售異常標記','異常計數','品質比例'], q:'監控數據異常值，確保分析基礎的準確性。' },
        { no:'08', icon:'📦', title:'產品目錄清單', en:'Product Catalog', kpis:['零售價','採購價','單位利潤','產品類別','產品圖片'], q:'產品主資料完整清單，含圖片與利潤明細。' },
      ],
      mockTabs: ['KPI總覽','時間趨勢','產品','客戶','購物籃'],
      mockKPIs: [{l:'總銷售額',v:'4,872',u:'萬'},{l:'總利潤',v:'1,243',u:'萬'},{l:'客戶數',v:'3,861',u:'位'}],
      mockBars: [42,68,55,78,91,63,74,85,60,77,88,72],
      mockBarLabel: '月度銷售額趨勢',
      mockRing: { v:'25.5%', l:'利潤率' },
    },
    {
      title: '財務報表分析',
      en: 'Financial Statement Analytics',
      icon: '📋',
      link: 'https://app.powerbi.com/view?r=eyJrIjoiZjBmZGU4OTEtZTgyYS00NmQ0LWFmNzYtZjhmY2VhNWFkMjZkIiwidCI6IjE2ZGVlZGU4LTc5ZTktNGUzMy05OWU2LTlkOGQzOTQyZDc5NiIsImMiOjEwfQ%3D%3D',
      desc: '星型架構數據模型，以財務三表為核心，整合杜邦分析、時間智能 DAX、多層次 Drill Down，涵蓋獲利能力、安全性、營運能力與現金流量全方位分析，共 7 大視覺化頁面。',
      frameworks: [
        { no:'01', icon:'💹', title:'財務摘要儀表板', en:'Financial Summary', kpis:['KPI 卡片','HTML 文字卡','長條圖','公司選擇器'], q:'一頁綜覽企業財務健康狀況，快速導航至各細部分析頁面。' },
        { no:'02', icon:'⚖️', title:'資產負債表分析', en:'Balance Sheet', kpis:['資產結構圖','負債結構圖','流動比率','速動比率','資產負債率'], q:'透視表 + 餅圖呈現資產/負債結構，多層次 Drill Down 至科目明細。' },
        { no:'03', icon:'📉', title:'損益表分析', en:'Income Statement', kpis:['瀑布圖','毛利率','淨利潤率','營業利潤','面積圖趨勢'], q:'瀑布圖直覺呈現收益→成本→利潤流向，支援年/季/月時間維度切換。' },
        { no:'04', icon:'💧', title:'現金流量表分析', en:'Cash Flow Statement', kpis:['經營活動 CF','投資活動 CF','籌資活動 CF','自由現金流'], q:'三大現金流向視覺化，評估企業現金創造與資金運用能力。' },
        { no:'05', icon:'🔄', title:'營運能力分析', en:'Operating Efficiency', kpis:['應收帳款天數','存貨天數','應付帳款天數','CCC 現金循環'], q:'折線趨勢圖追蹤週轉效率，計算淨營運週期 (CCC) 評估資金效率。' },
        { no:'06', icon:'🌳', title:'杜邦分析分解樹', en:'DuPont Analysis', kpis:['ROE','ROA','權益乘數','淨利潤率','資產周轉率'], q:'分解樹視覺化拆解 ROE 驅動因子，呈現盈利能力、效率與槓桿的三角關係。' },
        { no:'07', icon:'🗂️', title:'星型架構數據模型', en:'Star Schema Model', kpis:['事實表','日期維度','公司維度','利潤表結構','杜邦結構'], q:'核心事實表 × 6 大維度表，支援跨表 DAX 計算與動態切片篩選。' },
      ],
      mockTabs: ['財務摘要','資產負債','損益表','現金流','杜邦分析'],
      mockKPIs: [{l:'營業收入',v:'8,432',u:'萬'},{l:'淨利潤率',v:'18.6',u:'%'},{l:'ROE',v:'24.3',u:'%'}],
      mockBars: [58,72,65,80,74,88,70,82,77,91,68,85],
      mockBarLabel: '季度營業收入趨勢',
      mockRing: { v:'7頁', l:'分析頁面' },
    },
    {
      title: '應收帳款分析',
      en: 'Accounts Receivable Analytics',
      icon: '🧾',
      link: 'https://app.powerbi.com/view?r=eyJrIjoiODgzMDdiMzQtZTI1OS00NTFjLTk1NWMtYzYzMzc4NmI5NjYyIiwidCI6IjE2ZGVlZGU4LTc5ZTktNGUzMy05OWU2LTlkOGQzOTQyZDc5NiIsImMiOjEwfQ%3D%3D',
      desc: '企業應收帳款全方位管理平台，以星型架構整合銷售事實表與實收事實表，涵蓋帳齡管控、風險量化（合作頻率 × 違約率 × 資金成本）與逾期紀錄追蹤，共 4 大視覺化分析頁面。',
      frameworks: [
        { no:'01', icon:'📊', title:'應收概況', en:'AR Overview', kpis:['開票金額','回款金額','期末應收','應收客戶數','賒銷率','客戶應收平均值'], q:'組合圖呈現開票/回款/應收趨勢，長條圖分析客戶維度，折線圖追蹤客戶數量與平均應收金額變化。' },
        { no:'02', icon:'⏳', title:'帳齡管控', en:'Aging Control', kpis:['加權平均帳齡','客戶最高帳齡','期末應收餘額','帳齡區間分布','預計壞帳損失'], q:'100% 堆疊面積圖 + 散點圖 + 環形圖，定義 0-30 / 31-60 / 61-90 / 90+ 天帳齡區間與壞帳損失率。' },
        { no:'03', icon:'⚠️', title:'風險管控', en:'Risk Management', kpis:['違約次數','違約率','信用資金成本','資金成本率','風險類別','風險客戶數'], q:'五級風險分類（無風險→超高風險），結合違約率、合作頻率、資金成本多維度評估客戶信用。' },
        { no:'04', icon:'📋', title:'逾期紀錄', en:'Overdue Records', kpis:['逾期發票明細','到期日','逾期天數','未收金額'], q:'表格視覺化呈現每張逾期發票的詳細資訊，支援客戶與業務員切片篩選追蹤。' },
        { no:'05', icon:'🗄️', title:'星型數據模型', en:'Star Schema', kpis:['F 銷售表','F 實收表','D 日期表','D 客戶表','D 業務員表','帳齡分類輔助'], q:'雙事實表架構：銷售表（發票資料）× 實收表（收款記錄），周圍環繞 5 大維度表 + 4 輔助表。' },
      ],
      mockTabs: ['應收概況','帳齡管控','風險管控','逾期紀錄'],
      mockKPIs: [{l:'期末應收',v:'3,256',u:'萬'},{l:'回款率',v:'82.4',u:'%'},{l:'壞帳風險',v:'12.6',u:'萬'}],
      mockBars: [70,55,80,65,90,50,75,60,85,45,72,58],
      mockBarLabel: '月度開票 vs 回款趨勢',
      mockRing: { v:'4頁', l:'分析頁面' },
    },
  ];

  const r = reports[activeReport];

  return (
    <section id="powerbi" style={{ background: '#07071a', padding: '110px 24px', borderTop: '1px solid rgba(242,200,17,0.12)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          {/* Header badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 16px', borderRadius: 100, border: '1px solid rgba(242,200,17,0.3)', background: 'rgba(242,200,17,0.08)', marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={pbiColor}><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>
            <span style={{ color: pbiColor, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Power BI 專輯</span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: 32 }}>商業智能儀表板</h2>

          {/* Report Tabs */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
            {reports.map((rep, i) => (
              <button key={i} onClick={() => { setActiveReport(i); setActiveIdx(null); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', borderRadius: 12, border: `1px solid ${activeReport === i ? 'rgba(242,200,17,0.6)' : 'rgba(242,200,17,0.15)'}`, background: activeReport === i ? 'rgba(242,200,17,0.12)' : 'transparent', color: activeReport === i ? pbiColor : '#64748b', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.22s' }}
                onMouseEnter={e => { if (activeReport !== i) e.currentTarget.style.borderColor = 'rgba(242,200,17,0.35)'; }}
                onMouseLeave={e => { if (activeReport !== i) e.currentTarget.style.borderColor = 'rgba(242,200,17,0.15)'; }}>
                <span>{rep.icon}</span>{rep.title}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Active report header */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 36, padding: '24px 28px', borderRadius: 16, background: 'rgba(242,200,17,0.05)', border: '1px solid rgba(242,200,17,0.15)' }}>
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: pbiColor, marginBottom: 8 }}>{r.en} · {r.frameworks.length} 大分析模組</p>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.35rem', fontWeight: 700, marginBottom: 10 }}>{r.icon} {r.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.75, maxWidth: 620 }}>{r.desc}</p>
            </div>
            <a href={r.link} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 12, background: pbiColor, color: '#1a1a00', fontWeight: 800, fontSize: '0.88rem', textDecoration: 'none', transition: 'all 0.22s', whiteSpace: 'nowrap', alignSelf: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(242,200,17,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>
              查看完整報告
            </a>
          </div>
        </Reveal>

        {/* Framework Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 40 }}>
          {r.frameworks.map((f, i) => (
            <Reveal key={`${activeReport}-${i}`} delay={i * 55}>
              <div onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                style={{ background: activeIdx === i ? 'rgba(242,200,17,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${activeIdx === i ? 'rgba(242,200,17,0.5)' : 'rgba(242,200,17,0.1)'}`, borderRadius: 14, padding: '18px 16px', cursor: 'pointer', transition: 'all 0.22s' }}
                onMouseEnter={e => { if (activeIdx !== i) { e.currentTarget.style.borderColor = 'rgba(242,200,17,0.28)'; e.currentTarget.style.background = 'rgba(242,200,17,0.04)'; } }}
                onMouseLeave={e => { if (activeIdx !== i) { e.currentTarget.style.borderColor = 'rgba(242,200,17,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; } }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: '1.5rem' }}>{f.icon}</span>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.65rem', fontWeight: 700, color: pbiColor, opacity: 0.45 }}>{f.no}</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.88rem', fontWeight: 700, marginBottom: 3, color: '#e2e8f0' }}>{f.title}</h3>
                <p style={{ fontSize: '0.68rem', color: '#475569', marginBottom: 10 }}>{f.en}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {f.kpis.map(k => <span key={k} style={{ padding: '2px 7px', borderRadius: 5, background: 'rgba(242,200,17,0.1)', color: '#f2c811', fontSize: '0.63rem', fontWeight: 600 }}>{k}</span>)}
                </div>
                {activeIdx === i && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(242,200,17,0.15)', fontSize: '0.77rem', color: '#94a3b8', lineHeight: 1.65 }}>
                    <span style={{ color: pbiColor, fontWeight: 700 }}>核心問題：</span><br />{f.q}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mock dashboard preview */}
        <Reveal delay={180}>
          <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(242,200,17,0.18)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
            <div style={{ background: 'linear-gradient(135deg,#0d0d20,#141424)', padding: '32px 28px', display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 250 }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 18, flexWrap: 'wrap' }}>
                  {r.mockTabs.map((t, i) => (
                    <div key={i} style={{ padding: '4px 10px', borderRadius: 6, background: i === 0 ? pbiColor : 'rgba(255,255,255,0.06)', color: i === 0 ? '#1a1a00' : '#64748b', fontSize: '0.68rem', fontWeight: 600 }}>{t}</div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 18 }}>
                  {r.mockKPIs.map(k => (
                    <div key={k.l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(242,200,17,0.1)' }}>
                      <div style={{ fontSize: '0.62rem', color: '#64748b', marginBottom: 3 }}>{k.l}</div>
                      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.25rem', fontWeight: 700, color: pbiColor }}>{k.v}<span style={{ fontSize: '0.65rem', color: '#64748b', marginLeft: 2 }}>{k.u}</span></div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 52 }}>
                  {r.mockBars.map((h, i) => (
                    <div key={i} style={{ flex: 1, background: `rgba(242,200,17,${0.15 + (h/100)*0.6})`, height: `${h}%`, borderRadius: '3px 3px 0 0' }}></div>
                  ))}
                </div>
                <div style={{ fontSize: '0.62rem', color: '#334155', marginTop: 4 }}>{r.mockBarLabel}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 90, height: 90, borderRadius: '50%', border: '7px solid rgba(242,200,17,0.15)', borderTopColor: pbiColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.2rem', fontWeight: 700, color: pbiColor }}>{r.mockRing.v}</div>
                    <div style={{ fontSize: '0.58rem', color: '#64748b' }}>{r.mockRing.l}</div>
                  </div>
                </div>
                <a href={r.link} target="_blank" rel="noopener noreferrer"
                  style={{ padding: '8px 18px', borderRadius: 10, background: 'rgba(242,200,17,0.15)', border: '1px solid rgba(242,200,17,0.35)', color: pbiColor, fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s', textAlign: 'center' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(242,200,17,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(242,200,17,0.15)'}>
                  開啟互動報告 →
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

Object.assign(window, { KenNav, KenHero, KenAbout, KenSkills, KenExperience, KenPortfolio, KenPowerBI, KenContact, KenFooter });
