---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`get_start_date`

---

### 🎯 函式用途

根據**結束日期**與所需的 **K 棒數量**，計算回測的**起始日期**。  
目前僅支援 **`D1`（日線）** 週期。
以每週 5 個交易日為計算基準，並向上取整為完整週數，確保即使起始日落在週末或假日前後，仍能涵蓋足夠的 K 棒數量。
常見用法：將計算結果直接作為 `subscribe_bars()` 的 `from` 參數，確保指標熱身所需的歷史資料足夠。

---

### 🔧 函式參數

| 參數名稱    | 型別 | 備註說明 |
|-------------|------|----------|
| `to_date`   | str  | 回測結束日期，格式為 `"YYYY-MM-DD"`。 |
| `timeframe` | str  | 時間週期字串，目前僅支援 `"D1"`（日線）。 |
| `kbar_num`  | int  | 所需的 K 棒數量（以交易日計算）。 |

---

### 📤 回傳資料內容

| 名稱     | 型別 | 備註說明 |
|----------|------|----------|
| `result` | str  | 計算出的回測起始日期，格式為 `"YYYY-MM-DD"`。 |

> ⚠️ 若 `timeframe` 不為 `"D1"` 將拋出 `ValueError`。

---

### 💡 範例程式碼

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

    def receive_bars(self, symbol, data, is_end):
        print(data["time"], data["close"])

def main():
    mas_client = MAS_Client()
    mas_client.login({
        "account": "YOUR_ACCOUNT",
        "password": "YOUR_PASSWORD",
        "server": "YOUR_SERVER"
    })

    to_date = "2025-06-30"
    timeframe = "D1"
    kbar_num = 250  # 約 1 年交易日

    start_date = mas_client.get_start_date(to_date, timeframe, kbar_num)
    print(f"回測區間：{start_date} ~ {to_date}")

    # 直接帶入 subscribe_bars
    mas_client.subscribe_bars({
        "symbol": "EURUSD",
        "timeframe": timeframe,
        "from": start_date,
        "to": to_date,
        "backtest_toggle": True
    })

if __name__ == "__main__":
    main()
```

---

### 📐 計算邏輯說明

| 輸入 | 數值 |
|------|------|
| `kbar_num` | 需要 250 個交易日 |
| 每週交易日數 | 5 天 |
| 所需週數（進位） | 50 週 |
| 換算日曆天數 | 50 × 7 = 350 天 |
| `to_date` | 2025-06-30 |
| **計算出的起始日** | **2024-07-15** |

函式永遠向上取整至完整週數，避免起始處遺漏 K 棒。

---
