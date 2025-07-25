---
id: intro
title: Introduction
slug: /
sidebar_position: 1
---

# <img src="/img/mas_logo.png" alt="brain icon" width="48" style={{ verticalAlign: 'middle' }} /> MAS Python SDK 簡介

MAS Python SDK 是一套針對金融策略交易者打造的輕量級 Python 函式庫，
支援外匯自訂策略的自動化交易與回測，無需深入理解券商 API 或資料封包格式，即可快速部署與模擬交易。

---

## 🚀 你可以用 MAS SDK 做什麼？

- 📥 接收即時行情與歷史 K 線資料
- 📈 自動下單與模擬回測結果比對
- 🧠 執行自訂策略邏輯（含停利停損、技術指標）
- 🔗 透過 MAS Web 平台整合帳戶資訊與績效報表

---

## 📊 回測與績效報表功能

MAS SDK 在回測與真實交易執行後，會自動產出完整的績效報表，協助你掌握策略表現、風險指標與關鍵買賣點資訊：

| 報表類型 | 說明 | 輸出格式 |
|-----------|------|------------|
| 📘 原始交易紀錄明細 | 每筆交易的時間、方向、價格、部位、類型等欄位 | JSON |
| 📈 靜態 KPI 報表 | 淨利、勝率、最大回檔、交易次數、平均持倉時間等 | HTML |
| 💹 策略績效數據（Silver 等級以上） | 資金曲線、累計報酬與最大風險敞口變化 | JSON |
| 🔎 進階風控指標（Silver 等級以上） | Sharpe Ratio、Sortino Ratio、勝負比等 | HTML |
| 🧮 動態交易點分析（Gold 等級以上） | 顯示每筆進出場時間、價格、盈虧點、交易理由 | HTML |

☑️ 所有報表均可在 MAS SDK查看與下載，或透過 SDK 匯出（視方案等級而定）

---

## 🧩 使用前請先完成以下步驟

1. 前往 MAS 平台註冊帳號
2. 下載 MAS 軟體[【點我進行下載】](https://mindaismart.com/)登入後可查看目前方案等級
3. 安裝 MAS SDK 並開始策略開發

---

## ⚙️ 快速開始

安裝 MAS SDK：

```bash
pip install mas
```

最小運作範例：

```python
from mas.mas import MAS

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

| 區段 | 說明 |
|------|------|
| 安裝與環境配置 | 如何快速安裝並開始第一個策略 |
| API 使用手冊 | 完整函式庫與方法的參數說明 |
| 策略實作範例 | 多種策略類型範例與應用 |
| MAS 平台整合 | 如何接軌 Web 平台並下載執行程式 |

---

## 🖥️ 系統需求

- Python 3.8+
- 支援平台：Windows / macOS
- 相依套件：requests, pandas, matplotlib（安裝時自動安裝）

---

## 🤖 不會寫程式？MAS AI 策略助理讓你一鍵完成自動交易！

<iframe width="560" height="315" src="https://www.youtube.com/embed/WZJoxikns4Q?si=WUG36ZHWNOzRble4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<br /><br />

只要輸入你的交易邏輯描述，MAS AI 助理就能：

✅ 自動產出你的專屬交易策略  
✅ 執行歷史資料回測並產出報表  
✅ 打包成 .exe 可執行檔（不需安裝 Python）  
✅ 輸入券商帳號直接部署到 MT5 進行自動化程式交易

---

## 🛠️ 功能特色

| 功能 | 說明 |
|------|------|
| 🧠 自然語言輸入 | 例如：「當 RSI < 30 且 MACD 金叉時買進」 |
| 🔧 一鍵產出策略 | 系統自動完成策略生成與回測 |
| 📊 自動產生報表 | 顯示總報酬率、勝率、風險比等關鍵績效 |
| 💻 提供執行檔下載 | 直接取得 .exe 檔，免安裝 Python |
| 🔐 連結MT5交易帳號 | 填入券商資訊即可部署至真實帳戶 |

---

## 📥 使用範例流程

```diff
🖋 步驟 1：在MAS AI 交易助理畫面，輸入策略邏輯
買進邏輯:「 當 RSI < 30 且成交量突破 5日均量時買進 」
賣出邏輯:「 RSI > 70 時賣出 」

📊 步驟 2：檢視系統產生回測報表
- 淨利：+8.6%
- 勝率：61%
- 回撤：-2.1%

💾 步驟 3：去策略管理選擇要下載 .exe 檔
檔名：rsi_vol_strategy_2025Q2.exe

🔐 步驟 4：執行exe 檔，輸入帳號與券商設定，即可部署真實交易
👉 立即體驗 MAS AI 策略助理
```

---

<!-- ## 🎥 教學影片資源

| 角色 | 推薦影片 | 連結 |
|------|----------|------|
| 新手交易者 | 【零程式碼教學】如何用 MAS 平台自動生成策略？ | 📺 前往觀看 |
| 程式開發者 | 【MAS SDK 入門】Python 寫一個自動交易策略 | 📺 前往觀看 |
| 進階用戶 | 【MT5 實單部署】如何串接 MAS 與你的帳戶？ | 📺 前往觀看 | -->
