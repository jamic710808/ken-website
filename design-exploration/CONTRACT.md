# 個人品牌多風格實作契約
範圍：四種完整網站風格，由頂端導覽切換；單一內容來源，不修改既有業務資料。
主 Agent 製作 shared.css、site.js、brand-data.js、根 index.html 及 editorial.css/hero-editorial.html。
平行實作者每人獨立製作 themes/NAME.css 與 themes/hero-NAME.html（HTML fragment, 不含 head/script/style）。
頁面根元素為 html[data-style=NAME]，主視覺放進 <section id=home class=hero>，hero fragment 在其中。所有 CSS 以 [data-style=NAME] 起頭；hero專有class必須 NAME- 前綴。
共用 CSS 變數 --page,--surface,--ink,--muted,--accent,--line,--button-ink,--radius,--heading-font,--body-font,--shadow。
共用頁面類名 .site-header .brand .site-nav .style-picker .style-button[aria-pressed] .header-contact .mobile-menu-toggle .section .section-heading .section-intro .about-grid .about-photo .about-copy .stats .stat .skills-grid .skill-group .career-list .career-item .projects-toolbar .project-filters .filter-button[aria-pressed] .project-search .project-grid .project-card .project-image .project-body .project-title .project-desc .tags .project-links .bi-grid .bi-card .bi-number .bi-body .contact-section .contact-links .contact-link .site-footer .button .button-primary .button-secondary .section-link .section-index .reveal 。
寬度 max 1280px；header約 100px 高；section padding clamp(64px,8vw,112px)；常態正文 >=16px；小字 >=13px；首屏 900px 視口上方導覽下完整可見，手機390x844 不溢出。
共用 section id: about,expertise,experience,projects,powerbi,contact。主按鈕連 #projects、次要 #contact。
共用 hero 文案 data-copy=name(劉炳祥), latinName(Ken Liu), role(財務實務 × 資料分析 × AI 開發), headline(把複雜問題，做成可用的解答。), description(從財務現場到 AI 系統，將商業理解轉化為真正能用的工具。), years(17+), projectCount(19)。已知17+來自現有網站，不自行更新。
可使用 <span data-copy=KEY></span>；<img src=images/smile.webp> 或 dark.webp、creative.webp；專案圖 images/ai/p06.webp 等。相對URL均以專案根目錄為基準。不要生成假人像。
Hero有主動作真連結；不要無作用的按鈕。可寫原創 inline SVG 抽象圖形，禁止仿冒商標與遊戲IP。
本次不安裝任何dependencies、不修改其他人的檔案。可離線運行；中文使用本機 Microsoft JhengHei/PingFang TC，英文可Georgia、Arial等。
每種風格全站設計而非僅hero，但共享下方的語意結構；透過CSS改變排版與材質。包含prefers-reduced-motion 及390px媒體查詢。