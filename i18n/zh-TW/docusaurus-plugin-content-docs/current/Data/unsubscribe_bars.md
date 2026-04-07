---
sidebar_position: 3
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`unsubscribe_bars`

---

### 🎯 函式用途

取消指定交易商品的**即時 Bar（K 線）資料訂閱**，僅適用於**實盤模式**。  
執行此函式後，系統將中止內部背景訂閱執行緒，並停止該商品的即時報價與 K 線更新。  
不再需要即時 K 線資料時請呼叫此函式，以避免不必要的資源佔用。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| `params`   | dict | 查詢條件設定字典，欄位說明如下： |

#### `params`（dict）欄位說明

| 欄位名稱 | 型別 | 備註說明 |
|---------------|------|----------|
| `symbol`     | str  | 商品代碼（例如 `"EURUSD"`）。 |
| `timeframe`  | str  | Bar 時間週期（例如 `"M1"`、`"H1"`、`"D1"`）。 |

---

### 📤 回傳內容

| 名稱   | 型別  | 備註說明                             |
|--------|------|--------------------------------------|
| None   | None | 此函式無回傳值，執行後即停止指定商品的 Bar 訂閱。 |

---

### 💡 範例程式碼

```python
import time
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

    def receive_bars(self, symbol, data, is_end=False):
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

        params = {
            "symbol": "EURUSD",
            "timeframe": "M1",
            "backtest_toggle": False
        }
        mas_client.subscribe_bars(params)
        time.sleep(120)
        mas_client.unsubscribe_bars(params)
    except Exception as e:
        print(str(e))
```
---