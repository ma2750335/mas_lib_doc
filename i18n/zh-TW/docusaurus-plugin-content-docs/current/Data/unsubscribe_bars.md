---
sidebar_position: 3
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`unsubscribe_bars`

---

### 🎯 函式用途

取消指定商品的即時 Bar（K 線）資料訂閱 -> 適用於實盤模式。
此函式會中止內部背景訂閱執行緒，關閉對該商品的即時報價監控。  

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 傳入的字典內容如下方欄位說明 |

| dict 欄位名稱 | 型別 | 備註說明 |
|---------------|------|----------|
| `symbol `     | str  | 商品代碼（如 EURUSD）。 |
| `timeframe`   | str  | Bar 時間週期（如 M1, H1, D1）。 |

---

### 📤 回傳資料內容

| 名稱   | 型別 | 備註說明                             |
|--------|------|--------------------------------------|
| return | None | 無回傳值，執行後即停止訂閱 |

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