# 原始內容恢復驗證

日期：2026-10-26。原始版由同頁選單載入原有index-classic.html，原頁與ken-components.jsx未改寫。

## 來源逐欄回歸

執行 node scripts/check-brand-content.cjs，結果：

```json
{
  "result": "PASS",
  "biographyParagraphs": 3,
  "skills": 8,
  "careerEntries": 8,
  "portfolio": 10,
  "aiProjects": 19,
  "reports": 13,
  "previews": 13,
  "reportGuideLinks": 12,
  "styleOptions": 5
}
```

比較完整自介原文、技能清單、每段經歷/產業標籤、10個作品全部文字/連結、每份報告全部文字與架構、單一與多個圖解導覽、原有預覽資料。

## 實際瀏覽器驗證

- 五種風格循環三輪，共15次。每次風格及aria-pressed一致，原版/新風格顯示容器正確；29作品、13報告、8經歷、完整自介、13份預覽與2個製造業導覽都保留，無外層橫向溢出。
- 搜尋Hermes後進原始版再回顧問誌：仍保留搜尋文字、1筆結果與已開啟的報告預覽。
- 原始版實際點製造業報告分頁，兩個圖解導覽皆出現；離開原始版再返回，仍保留該報告。
- 原始版重新整理：仍選classic，等待原頁載入完成，aria-busy=false。原頁自身的分頁在重新整理後按原本行為重設，並未新增報告偏好保存。
- 新風格報告及職涯先收合再展開：恢復13及8筆。
- 桌機1440x900與手機390x844：五版本截圖均無console error、外層horizontal overflow及broken image。原頁 iframe 內的既有視覺/動態沿用原實作，不將父頁靜態檢查誤當作原頁內所有樣式通過。

## 證據

- shots/content-restored-classic-ready：原始版進場動畫結束後的桌機/手機畫面。
- shots/content-restored：四個新風格與五項選單。
- shots/restored-biography：補回完整自介的實際畫面。
- shots/restored-report-preview：原有指標與圖表預覽展開畫面。

本輪為內容恢復，未新增獨立視覺評分；未部署或推送。原有外部專案、Power BI報告與履歷內容沒有重新查核。

補充：restored-report-preview的初次截圖在捲動/動畫中取樣，未展開且出現遮擋提示，已作廢。restored-report-ready桌面與restored-report-mobile手機為實際展開後的最終證據，檢查無issues。

手機指標預覽最後改為逐列排列，避免數字/單位拆行；最終畫面以shots/restored-report-mobile-final/page.png為準。
