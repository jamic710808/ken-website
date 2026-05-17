# KenLiu 劉炳祥 — 個人形象網站

AI 驅動全端工程師 / 數據分析師 · 17+ 年跨國科技+醫療財務實務

## 本地預覽

```bash
cd ken-website
python -m http.server 8765
# 開啟 http://localhost:8765/
```

## 結構

- `index.html` — 入口
- `ken-components.jsx` — Nav / Hero / About / Skills / Experience / Portfolio / PowerBI / Contact / Footer
- `tweaks-panel.jsx` — 設計工具 helper（生產環境自動隱藏）
- `images/` — 人像（已壓縮為 webp）

JSX 透過 `@babel/standalone` 在瀏覽器即時編譯，無需 build step。
