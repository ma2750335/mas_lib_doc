---
sidebar_position: 4
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`subscribe_ticks`

---

### 🎯 函式用途

訂閱 **指定交易商品的即時 Tick 資料**，或於回測模式中推送歷史 Tick 資料。  
系統會依據 `backtest_toggle` 參數值自動切換資料來源模式：

- **True**：啟用歷史資料模組，依指定時間範圍推送 Tick 資料  
- **False**：建立背景執行緒，依 `interval_ms` 間隔從 MT5 取得最新 Tick 並推播

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| `params` | dict | 查詢條件設定字典，欄位說明如下： |

#### `params`（dict）欄位說明

| 參數名稱        | 型別          | 必填        | 說明 |
|-----------------|---------------|------------|------|
| `symbol`        | str           | ✅        | 要訂閱的交易商品代碼（如 `"EURUSD"`）。 |
| `interval_ms`   | int           | ❌        | 即時模式推播間隔（毫秒），預設為 `500`。 |
| `from`          | datetime/str  | ✅（回測） | 歷史資料起始時間（僅於 `backtest_toggle = True` 時使用）。 |
| `to`            | datetime/str  | ✅（回測） | 歷史資料結束時間（僅於 `backtest_toggle = True` 時使用）。 |
| `flags`         | int           | ❌        | Tick 資料來源類型，預設為 `mt5.COPY_TICKS_ALL`（僅即時模式使用）。 |
| `mode`          | str           | ❌        | 回測 Tick 模式：`"all"`（全部）或 `"trade"`（僅成交），預設為 `"all"`。 |
| `captital`　　　　| bool         | ❌        | 設定本金，預設為`10000`(美元)。 | 
| `backtest_toggle`| bool          | ❌        | 是否啟用回測模式，預設為 `False`。 |

---

### 📤 回傳內容

| 名稱   | 型別 | 備註說明 |
|--------|------|----------|
| 無     | None | 此函式無回傳值，僅用於觸發 Tick 資料推播 |

---

### 💡 範例程式碼

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

    def receive_ticks(self, symbol, data, is_end=False):
        print(symbol, data, is_end)

def main():
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_client.login(login_params)

        #回測模式參數
        params = {
            "symbol": "EURUSD",
            "from": '2025-07-07 12:00:00',
            "to": '2025-07-07 13:00:00',
            "captital": 1000,
            "backtest_toggle": True
        }
        mas_client.subscribe_ticks(params)

        #實盤模式參數
        params = {
            "symbol": "EURUSD",
            "backtest_toggle": False
        }
        mas_client.subscribe_ticks(params)

    except Exception as e:
        print(str(e))
```
---