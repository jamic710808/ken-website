(() => {
  'use strict';
  const data = window.KEN_BRAND;
  const reports = window.KEN_REPORTS || [];
  const aiProjects = window.AI_PROJECTS || [];
  const reportPreviews = window.KEN_REPORT_PREVIEWS || [];
  const styles = { editorial: ['顧問誌', '以專業資歷建立信任'], systems: ['系統構築', '讓商業理解與工程實作交會'], gallery: ['作品索引', '讓實際作品先說話'], island: ['知識小島', '在溫暖的小島，探索我的跨域實作'] };
  const root = document.documentElement;
  styles.classic = ['原始版', '完整保留原有內容與互動'];
  const header = document.querySelector('.site-header');
  if ('ResizeObserver' in window) new ResizeObserver(() => root.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`)).observe(header);
  const hero = document.getElementById('home');
  const classicShell = document.getElementById('classic-shell');
  const classicFrame = document.getElementById('classic-frame');
  const classicLoading = document.getElementById('classic-loading');
  const classicFallback = document.getElementById('classic-fallback');
  let classicReady = false;
  let classicTimer;
  const classicAnchors = { home: 'hero', main: 'hero', projects: 'portfolio', expertise: 'skills' };
  function scrollClassic(hash) {
    const name = hash.replace(/^#/, '') || 'home';
    classicFrame.contentDocument?.getElementById(classicAnchors[name] || name)?.scrollIntoView();
  }
  function loadClassic() {
    if (classicFrame.hasAttribute('src')) return;
    classicFrame.src = classicFrame.dataset.src;
    classicTimer = setTimeout(() => { if (!classicReady) { classicLoading.hidden = true; classicFallback.hidden = false; } }, 20000);
  }
  classicFrame.addEventListener('load', () => {
    const doc = classicFrame.contentDocument;
    if (!doc || !doc.getElementById('root')) return;
    // The parent supplies navigation; the original components keep their own layout and behavior.
    const embedStyle = doc.createElement('style');
    embedStyle.textContent = 'nav[aria-label="主導航"]{display:none!important}html{scroll-padding-top:12px}';
    doc.head.append(embedStyle);
    const observeReady = () => {
      if (!doc.querySelector('#root h1') || !doc.querySelector('#powerbi')) return false;
      classicReady = true;
      clearTimeout(classicTimer);
      classicLoading.hidden = true;
      classicFallback.hidden = true;
      classicFrame.setAttribute('aria-busy', 'false');
      doc.querySelectorAll('a[href="ai-projects.html"]').forEach(a => { a.target = '_blank'; a.rel = 'noopener noreferrer'; });
      if (root.dataset.style === 'classic' && location.hash) scrollClassic(location.hash);
      return true;
    };
    if (!observeReady()) { const observer = new MutationObserver(() => { if (observeReady()) observer.disconnect(); }); observer.observe(doc.getElementById('root'), { childList: true, subtree: true }); }
  });
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const anchor = (href, label) => `<a href="${escape(href)}" target="_blank" rel="noopener noreferrer">${escape(label)} <span aria-hidden="true">↗</span></a>`;
  let toastTimer, heroAnimation;
  let requestedStyle = root.dataset.style;
  const toast = message => { const el = document.querySelector('.toast'); el.textContent = message; el.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.hidden = true; }, 3500); };
  function applyStyle(style, { remember = false, announce = false } = {}) {
    if (!styles[style]) style = 'classic';
    root.dataset.style = style;
    const classic = style === 'classic';
    document.getElementById('main').hidden = classic;
    document.querySelector('.site-footer').hidden = classic;
    document.querySelector('.back-top').hidden = classic || window.scrollY < 400;
    classicShell.hidden = !classic;
    if (classic) { loadClassic(); if (classicReady && location.hash) scrollClassic(location.hash); }
    else hero.innerHTML = window.KEN_HERO_TEMPLATES[style];
    hero.querySelectorAll('[data-copy]').forEach(el => {
      if (el.dataset.copy === 'headline') {
        el.replaceChildren(...[data.headlineFirst, data.headlineSecond].map(text => { const phrase = document.createElement('span'); phrase.className = 'headline-phrase'; phrase.textContent = text; return phrase; }));
      } else el.textContent = el.dataset.copy === 'projectCount' ? aiProjects.length : data[el.dataset.copy] ?? '';
    });
    document.querySelectorAll('[data-style-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.styleChoice === style)));
    document.getElementById('style-hint').textContent = styles[style][1];
    document.querySelector('meta[name=color-scheme]').content = classic || style === 'systems' ? 'dark' : 'light';
    // No stored preference: every fresh visit opens the original version; ?style= still deep-links.
    if (announce) document.getElementById('style-status').textContent = `已切換為${styles[style][0]}風格`;
  }
  const styleStatus = document.createElement('span'); styleStatus.id = 'style-status'; styleStatus.className = 'visually-hidden'; styleStatus.setAttribute('role', 'status'); document.body.append(styleStatus);
  applyStyle(root.dataset.style);
  document.querySelectorAll('[data-style-choice]').forEach(button => button.addEventListener('click', () => {
    const style = button.dataset.styleChoice;
    if (style === requestedStyle) return;
    requestedStyle = style;
    const url = new URL(location.href); url.searchParams.set('style', style);
    history.pushState(null, '', url);
    applyStyle(style, { remember: true, announce: true });
    if (heroAnimation) heroAnimation.cancel();
    if (style !== 'classic' && !reduceMotion.matches && hero.animate) heroAnimation = hero.animate([{ opacity: .72, transform: 'translateY(5px)' }, { opacity: 1, transform: 'none' }], { duration: 220, easing: 'cubic-bezier(.16,1,.3,1)' });
  }));
  window.addEventListener('popstate', () => { requestedStyle = new URLSearchParams(location.search).get('style') || 'classic'; if (heroAnimation) heroAnimation.cancel(); applyStyle(requestedStyle); });
  const nav = document.getElementById('site-nav');
  const menu = document.querySelector('.mobile-menu-toggle');
  function closeMenu() { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); }
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.querySelectorAll('.site-header a[href^="#"], .skip-link').forEach(a => a.addEventListener('click', e => {
    if (root.dataset.style !== 'classic') return;
    e.preventDefault();
    const url = new URL(location.href); url.hash = a.getAttribute('href');
    history.pushState(null, '', url);
    if (classicReady) scrollClassic(url.hash);
    if (a.classList.contains('skip-link')) classicFrame.focus();
  }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
  document.getElementById('ai-stat').textContent = aiProjects.length;
  document.getElementById('bi-stat').textContent = reports.length;
  document.getElementById('original-about').innerHTML = `<p class="original-role">${escape(data.originalRole)}</p>${data.aboutHtml}<div class="original-background"><p>${escape(data.originalHeroDescription)}</p><div class="stats">${data.originalStats.map(s => `<div class="stat"><strong>${escape(s.n)}</strong><span>${escape(s.l)}</span></div>`).join('')}</div></div>`;
  document.getElementById('skills-grid').innerHTML = data.skills.map(group => `<article class="skill-group reveal"><h3>${escape(group.title)}</h3><ul>${group.items.map(item => `<li>${escape(item)}</li>`).join('')}</ul></article>`).join('');
  const featuredAi = ['p06', 'p03', 'p09'];
  const allProjects = [
    ...data.portfolio.map((project, i) => ({ ...project, id: `finance-${i}`, category: 'finance', tags: project.tech, links: [{ url: project.demo, label: '開啟作品' }, ...(project.github ? [{ url: project.github, label: '原始碼' }] : [])], featured: i < 3 })),
    ...aiProjects.map(project => ({ ...project, category: 'ai', image: `images/ai/${project.id}.webp`, featured: featuredAi.includes(project.id) }))
  ];
  const state = { filter: 'all', query: '', limit: allProjects.length };
  const search = document.getElementById('project-search');
  const more = document.getElementById('load-more');
  function renderProjects() {
    const query = state.query.toLocaleLowerCase('zh-TW');
    const matching = allProjects.filter(p => (state.filter === 'all' || (state.filter === 'featured' ? p.featured : p.category === state.filter)) && (!query || [p.title, p.desc, ...p.tags].join(' ').toLocaleLowerCase('zh-TW').includes(query)));
    const visible = matching.slice(0, state.limit);
    document.getElementById('project-grid').innerHTML = visible.map((p, i) => `<article class="project-card"><a href="${escape(p.links[0].url)}" target="_blank" rel="noopener noreferrer" aria-label="開啟${escape(p.title)}">${p.image ? `<img class="project-image" src="${escape(p.image)}" width="1280" height="800" alt="${escape(p.title)}現有專案快照" loading="lazy">` : `<div class="project-placeholder" aria-hidden="true">${escape(['FIN.', 'COST.', 'MFG.', 'STOCK.', 'BUY.', 'ASK.', 'COFFEE.', 'WRITE.', 'CARE.', 'CHAT.'][Number(p.id.split('-')[1])] || 'BUILD.')}</div>`}</a><div class="project-body"><h3 class="project-title">${escape(p.title)}</h3><p class="project-desc">${escape(p.desc)}</p><div class="tags">${p.tags.map(t => `<span>${escape(t)}</span>`).join('')}</div><div class="project-links">${p.links.map(l => anchor(l.url, l.label)).join('')}</div></div></article>`).join('');
    document.getElementById('result-count').textContent = `顯示 ${visible.length} / ${matching.length} 件作品`;
    document.getElementById('empty-state').hidden = matching.length > 0;
    more.hidden = visible.length >= matching.length;
    document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === state.filter)));
    if (!reduceMotion.matches) document.querySelectorAll('.project-card').forEach((card, i) => card.animate([{ opacity: .5, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 240, delay: Math.min(i, 5) * 25, easing: 'cubic-bezier(.16,1,.3,1)' }));
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { state.filter = button.dataset.filter; state.limit = allProjects.length; renderProjects(); }));
  search.addEventListener('input', () => { state.query = search.value.trim(); state.limit = allProjects.length; renderProjects(); });
  more.addEventListener('click', () => { state.limit += 6; renderProjects(); });
  document.getElementById('clear-search').addEventListener('click', () => { state.filter = 'all'; state.query = ''; state.limit = allProjects.length; search.value = ''; renderProjects(); search.focus(); });
  renderProjects();
  function renderReportPreview(index) {
    const preview = reportPreviews[index];
    if (!preview) return '';
    return `<details class="original-preview"><summary>報告版面與指標預覽</summary><div class="preview-tabs">${preview.mockTabs.map(t => `<span>${escape(t)}</span>`).join('')}</div><div class="preview-kpis">${preview.mockKPIs.map(k => `<div class="preview-kpi"><span>${escape(k.l)}</span><strong>${escape(k.v)} ${escape(k.u)}</strong></div>`).join('')}</div><div class="preview-bars" role="img" aria-label="${escape(preview.mockBarLabel)}">${preview.mockBars.map(h => `<span style="--bar-height:${Number(h)}%"></span>`).join('')}</div><p class="preview-caption">${escape(preview.mockBarLabel)}</p><p class="original-kpi-ring"><strong>${escape(preview.mockRing.v)}</strong><span>${escape(preview.mockRing.l)}</span></p></details>`;
  }
  document.getElementById('bi-grid').innerHTML = reports.map((report, i) => `<article class="bi-card reveal" ${i >= 4 ? 'data-extra-report' : ''}><span class="bi-number" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><div class="bi-body"><h3>${escape(report.title)}</h3><span class="original-bi-name">${escape(report.en)}</span><p>${escape(report.desc)}</p><div class="project-links">${anchor(report.link, '開啟互動報告')}${(report.guides || (report.guide ? [{url: report.guide, label: '圖解導覽'}] : [])).map(g => anchor(g.url, g.label)).join('')}</div><details class="bi-detail"><summary>分析架構與指標</summary><ul>${report.frameworks.map(f => `<li><strong>${escape(f.title)}</strong> <span lang="en">${escape(f.en)}</span><br>${escape(f.q)}<br>${f.kpis.map(escape).join(' · ')}</li>`).join('')}</ul></details>${renderReportPreview(i)}</div></article>`).join('');
  document.getElementById('bi-more').setAttribute('aria-expanded', 'true');
  document.getElementById('bi-more').textContent = '收起報告';
  document.getElementById('bi-more').addEventListener('click', e => { const button = e.currentTarget; const expanded = button.getAttribute('aria-expanded') !== 'true'; document.querySelectorAll('[data-extra-report]').forEach(el => { el.hidden = !expanded; }); button.setAttribute('aria-expanded', String(expanded)); button.textContent = expanded ? '收起報告' : `展開全部 ${reports.length} 份報告`; });
  document.getElementById('career-list').innerHTML = data.career.map((item, i) => `<article class="career-item reveal" ${i >= 3 ? 'data-extra-career' : ''}><p class="career-date">${escape(item.date)}</p><div><h3>${escape(item.title)}</h3><p class="career-company">${escape(item.company)}</p><p class="career-company">${escape(item.tag)}</p></div><p class="career-desc">${escape(item.desc)}</p></article>`).join('');
  document.getElementById('career-more').setAttribute('aria-expanded', 'true');
  document.getElementById('career-more').textContent = '收起經歷';
  document.getElementById('career-more').addEventListener('click', e => { const button = e.currentTarget; const expanded = button.getAttribute('aria-expanded') !== 'true'; document.querySelectorAll('[data-extra-career]').forEach(el => { el.hidden = !expanded; }); button.setAttribute('aria-expanded', String(expanded)); button.textContent = expanded ? '收起經歷' : `展開完整 ${data.career.length} 段經歷`; });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting && !reduceMotion.matches) { const item = entry.target; item.animate([{ opacity: .4, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 460, easing: 'cubic-bezier(.16,1,.3,1)' }); observer.unobserve(item); } }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    const topObserver = new IntersectionObserver(([entry]) => { document.querySelector('.back-top').hidden = root.dataset.style === 'classic' || entry.isIntersecting; }); topObserver.observe(hero);
  }
})();
