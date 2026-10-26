# KenLiu 劉炳祥 — 個人形象網站

AI 驅動全端工程師 / 數據分析師 · 17+ 年跨國科技+醫療財務實務

## 原始版與四種個人品牌風格

首頁上方可切換「原始版、顧問誌、系統構築、作品索引、知識小島」五個版本。原始版同頁載入既有 React 網站，保留原本的 Power BI 分頁與預覽；其餘四版恢復原始完整自介與報告內容。共用作品、AI 專案、Power BI、技能與職涯內容，切換時保留搜尋、篩選和展開狀態。風格偏好保存在瀏覽器，也可用 `?style=classic`、`?style=editorial`、`?style=systems`、`?style=gallery`、`?style=island` 直接預覽。

原版首頁保留在 `index-classic.html`。知識小島以 Animal Island UI 的設計語彙原生實作，沒有安裝新套件；來源與授權位於 `design-exploration/references/`。

## 本地預覽

```bash
cd ken-website
python -m http.server 8765
# 開啟 http://localhost:8765/
```

## 結構

- `index.html` — 四風格入口，原生 HTML/CSS/JavaScript，不需要建置
- `index-classic.html` — 保留的原版 React 入口
- `design-exploration/` — 共用資料、互動、獨立風格、設計說明與截圖
- `ken-components.jsx` — Nav / Hero / About / Skills / Experience / Portfolio / PowerBI / Contact / Footer
- `tweaks-panel.jsx` — 設計工具 helper（生產環境自動隱藏）
- `images/` — 人像（已壓縮為 webp）

原版 JSX 透過 `@babel/standalone` 在瀏覽器即時編譯。修改四風格的 `themes/hero-*.html` 後，執行 `node scripts/prepare-brand-preview.cjs` 更新預覽片段。詳見 `design-exploration/DESIGN.md`。

內容完整性檢查：`node scripts/check-brand-content.cjs`。預設顯示全部29件作品、13份報告與8段經歷，仍可搜尋、篩選或收合。
