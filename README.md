# Docusaurus Documentation

這是使用 [Docusaurus](https://docusaurus.io/) 建立的文檔網站，Docusaurus 是一個現代化的靜態網站生成器，專為建立技術文檔而設計。

## 開始使用

要開始使用此專案，請按照以下步驟操作：

### 1. 安裝依賴

首先，clone本專案並進入專案目錄：

```bash
git clone https://github.com/ma2750335/mas_lib_doc.git
```

然後，安裝所需的依賴：

```bash
npm install
```

### 2. 啟動開發伺服器

安裝完成後，啟動開發伺服器：

```bash
npm run start
```

這將啟動一個本地開發伺服器，並可通過`http://localhost:3000`預覽文檔網站。

### 3. 構建靜態網站

當你準備好部署時，可以構建靜態文件：

```bash
npm run build
```

這將生成一個包含所有靜態資源的 `build` 目錄，供部署使用。

---

## 文件結構
本專案遵循 Docusaurus 的典型結構：

- `docs/`: 存放所有文檔文件（Markdown 文件）。
- `blog/`: 存放博客文章（可選）。
- `src/`: 自定義的 React 組件與樣式。
- `static/`: 靜態資源文件，如圖片、字型等。

---

## 配置 docusaurus.config.js

`docusaurus.config.js` 是 Docusaurus 的核心配置文件，負責設置網站的基本信息。以下是一些常見的配置項目：

```javascript
module.exports = {
  title: 'My Docs', // 網站標題
  tagline: 'Documentation for My Project', // 標語
  url: 'https://your-project.github.io', // 網站網址
  baseUrl: '/', // 基本路徑
  favicon: 'img/favicon.ico', // 網站圖示
  themeConfig: {
    navbar: {
      title: 'My Docs',
      items: [
        { to: 'docs/intro', label: 'Docs', position: 'left' },
        { to: 'blog', label: 'Blog', position: 'left' },
        { href: 'https://github.com/your-username/your-project-name', label: 'GitHub', position: 'right' },
      ],
    },
  },
};
```

更多 docusaurus.config.js 的配置選項，請參考 [官方文檔](https://docusaurus.io/docs/configuration)。

---

## 配置多語系 (i18n)
Docusaurus 支援多語言的配置，可以讓你為文檔提供不同語言的版本。設定 `i18n` 可以讓你的網站支援不同語言的切換。以下是如何配置多語系：

1. 在 `docusaurus.config.js` 中配置 `i18n` 設置：

```javascript
module.exports = {
  i18n: {
    defaultLocale: 'en', // 設置預設語言
    locales: ['en', 'zh-TW'], // 支援的語言列表
    localeConfigs: {
      'zh-TW': {
        label: 'Traditional Chinese',
      },
    },
  },
};
```

2. 對於預設語言（如英文），將文檔存放在 `docs/` 目錄下。例如：
   - `docs/intro.md` 用於英文文檔

3. 對於非預設語言（如繁體中文），需要將文檔存放在 `i18n/` 目錄下對應的語言子目錄中。例如：
   - `i18n/zh-tw/docusaurus-plugin-content-docs/current/intro.md` 用於繁體中文文檔

4. 當你在網站上使用語言選擇器時，Docusaurus 會自動根據用戶的選擇顯示對應語言的文檔。

---

## 進階設定

### 1. `_category_.json` 這個能做甚麼？

在 Docusaurus 中，`_category_.json` 是一個自動生成的文件，用來處理文檔分類和排序。它位於每個文檔目錄中，並可以自定義類別結構。

- **功能**：
  - Docusaurus 使用這個文件來生成導航欄和側邊欄的結構。
  - 它允許你為文檔設置不同的分類，並定義分類的順序。
  - 當你創建新的文檔或調整文檔目錄結構時，`_category_.json` 文件會自動管理你的分類信息。


### 2. 開頭的屬性設置

每個文檔頁面都有開頭的 Front Matter（開頭設置），這些設置幫助 Docusaurus 解析頁面的基本屬性，例如標題、URL、側邊欄位置等。以下是一個範例：

```markdown
---
id: intro
title: Introduction
slug: /
sidebar_position: 1
---
```

- **`id`**：每個頁面的唯一標識符，Docusaurus 使用 `id` 來識別頁面並生成導航。`id` 是每個頁面在網站中的唯一標識，通常用於 URL 和側邊欄的生成。
- **`title`**：頁面的標題，通常顯示在頁面頂部和導航欄中。
- **`slug`**：頁面在 URL 中的路徑。如果為 `/`，則為網站的根目錄，表示此頁是首頁。其他頁面會根據路徑結構生成 URL，例如 `/docs/intro`。
- **`sidebar_position`**：設置該頁面在側邊欄中的顯示位置。數字越小，頁面越靠前。這有助於控制文檔的順序。 

### 3. `sidebars.js` 這個能做甚麼？

`sidebars.js` 是 Docusaurus 用來定義側邊欄結構和導航的配置文件。在這個文件中，你可以設置側邊欄的結構、選擇顯示哪些文檔、文檔顯示順序等。

- **功能**：
  - **自定義側邊欄**：你可以在 `sidebars.js` 中設置不同的分類來控制文檔在側邊欄中的顯示方式。
  - **分類**：使用 `sidebars.js` 來設定文檔分類，讓用戶在側邊欄中能夠輕鬆瀏覽文檔的不同部分。
  - **文檔順序**：你可以設置文檔顯示的順序，這有助於定義文檔的瀏覽流程。

範例配置：

```javascript
module.exports = {
  docs: {
    'Getting Started': ['intro', 'installation'],
    'Tutorial': ['tutorial-basics', 'tutorial-extras'],
  },
};
```

- **`docs`**：這是側邊欄的主要分類。在此處，你可以定義不同的文檔分類。
- **分類名稱**（如 `'Getting Started'` 和 `'Tutorial'`）：每個分類將顯示為側邊欄中的一個部分。
- **文檔 ID**（如 `'intro'` 和 `'tutorial-basics'`）：這些是對應文檔的 `id`。你可以在此處設置文檔的順序，來控制側邊欄顯示文檔的順序。



