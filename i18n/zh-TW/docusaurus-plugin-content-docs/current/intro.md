---
id: intro
title: Introduction
slug: /
sidebar_position: 1
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

# <img src="/img/mas_logo.png" alt="brain icon" width="48" style={{ verticalAlign: 'middle' }} /> MAS Python SDK 簡介

MAS Python SDK 是一套專為外匯與多資產策略交易者設計的輕量級開源函式庫。  
它支援**自動化交易、量化策略回測**與**MT5 部署整合**，讓你**無需深入理解券商 API 或通訊封包**，即可快速開發與執行交易策略。

---

## 🚀 MAS SDK 能幫你完成哪些任務？

- 📥 取得即時行情與歷史 K 線數據（含外匯、指數等）
- 📈 執行策略自動下單、模擬交易與真實交易績效對比
- 🧠 自定義交易邏輯（支援停利/停損、技術指標如 RSI、MACD 等）
- 🔗 整合 MAS Web 平台：帳戶資訊、績效報表一站呈現

---

## 📊 策略回測與績效報表功能

MAS SDK 可於回測與實單交易後，自動生成多種專業級報表，助你評估策略品質與風險控制指標：

| 報表類型 | 說明 | 輸出格式 |
|-----------|------|------------|
| 📘 原始交易紀錄明細 | 每筆交易的時間、方向、價格、部位、類型等欄位 | JSON |
| 📈 靜態 KPI 報表 | 淨利、勝率、最大回檔、交易次數、平均持倉時間等 | HTML |
| 💹 策略績效數據（Silver 等級以上） | 資金曲線、累計報酬與最大風險敞口變化 | JSON |
| 🔎 進階風控指標（Silver 等級以上） | Sharpe Ratio、Sortino Ratio、盈虧比等 | HTML |
| 🧮 動態交易點分析（Gold 等級以上） | 顯示每筆進出場時間、價格、盈虧點、交易理由 | HTML |

☑️ 所有報表均可在 MAS SDK查看與下載，或透過 SDK 匯出（視方案等級而定）

---

## 🧩 使用 MAS SDK 前的準備事項

1. 註冊 MAS 平台帳號[【立即註冊】](https://mas.mindaismart.com/authentication/sign-up)（免費）
2. 下載 MAS 軟體[【點我進行下載】](https://mindaismart.com/)，登入後可查看目前方案等級
3. 安裝 MAS SDK 並啟動第一個策略專案

---

## ⚙️ 安裝 MAS SDK 並快速開始

安裝 MAS SDK：

```bash
pip install mas
```

最小運作範例：

```python
import mas

def main():
    # 測試用登入資料
    params = {
        "account": "YOUR_ACCOUNT",
        "password": "YOUR_PASSWORD",
        "server": "YOUR_BROKER_SERVER",
    }

    # 建立 MAS 實例
    mas = MAS()

    # 嘗試登入
    success = mas.login(params)

    # 判斷結果
    if success:
        print("[Test] ✅ 成功登入MAS系統與MT5平台！")
    else:
        print("[Test] ❌ 登入失敗，請檢查帳號密碼或Token。")

if __name__ == "__main__":
    main()
```

---

## 📚 文件導覽

| 區塊 | 說明 |
|------|------|
| 安裝與環境配置 | 完整說明安裝流程與建置交易策略 |
| API 使用手冊 | 所有 MAS 函式、參數與回傳結果一覽 |
| 策略開發實例 | RSI、MACD 等策略案例與程式碼解說 |
| MAS平台整合流程 | 部署至 MT5 並執行交易程式策略 |

---

## 🖥️ 系統與環境需求

- Python 3.8 或以上
- 支援作業系統：Windows、macOS
- 相依套件：requests, pandas, matplotlib

---

## 🤖 不會寫程式也能用？MAS AI 策略助理來幫你！
<!--
<iframe width="560" height="315" src="https://www.youtube.com/embed/WZJoxikns4Q?si=WUG36ZHWNOzRble4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<br /><br />
-->

只需輸入你的交易邏輯描述，MAS AI 助理可協助你：[了解更多 ↗](https://mindaismart.com/product_ai)

✅ 自動生成專屬量化策略（基於 RSI、MACD 等指標）  
✅ 回測並產出 HTML 報表與盈虧指標  
✅ 匯出執行檔（.exe）可直接部署到 MT5  
✅ 僅需輸入券商帳號，即可啟動自動化交易流程

---

## 🛠️ MAS AI 策略助理特色一覽

| 功能 | 說明 |
|------|------|
| 🧠 輸入策略生成 | 例如：「當 RSI < 30 且 MACD 金叉時買進」 |
| 🔧 一鍵生成 + 回測 | 系統自動化生成完整策略與歷史績效 |
| 📊 報表自動產出 | 含報酬率、勝率、風險報酬比等 KPI |
| 💻 可執行檔下載 | 產出 .exe 檔，免安裝 Python 環境 |
| 🔐 MT5 API 整合 | 輸入帳密即完成部署與交易連線 |

---

## 📥 使用 MAS AI 助理的完整流程

```diff
🖋 步驟 1：在MAS AI 交易助理畫面，輸入策略邏輯
買進邏輯:「 當 RSI < 30 且成交量突破 5日均量時買進 」
賣出邏輯:「 RSI > 70 時賣出 」

📊 步驟 2：系統執行回測並產出績效報表 
- 淨利：+8.6%
- 勝率：61%
- 回撤：-2.1%

💾 步驟 3：前往策略管理頁面，選擇並下載執行檔（.exe）  
檔名：rsi_vol_strategy_2025Q2.exe

🔐 步驟 4：執行下載的 .exe 檔，輸入 MT5 券商帳號與伺服器資訊，即可完成部署，開始自動化實單交易。
👉 現在就體驗 MAS AI 策略助理，讓量化交易更輕鬆、更快速！
```

---

<!-- ## 🎥 教學影片資源

| 角色 | 推薦影片 | 連結 |
|------|----------|------|
| 新手交易者 | 【零程式碼教學】如何用 MAS 平台自動生成策略？ | 📺 前往觀看 |
| 程式開發者 | 【MAS SDK 入門】Python 寫一個自動交易策略 | 📺 前往觀看 |
| 進階用戶 | 【MT5 實單部署】如何串接 MAS 與你的帳戶？ | 📺 前往觀看 | -->
