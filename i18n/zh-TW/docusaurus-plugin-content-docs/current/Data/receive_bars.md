---
sidebar_position: 2
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`receive_bars`

---

### 🎯 函式用途

接收 Bar（K 線）資料推播，由 `on_bar()` 呼叫觸發。

---

### 🔧 函式參數

| 參數名稱 | 型別  | 備註說明 |
|----------|--------|----------|
| symbol   | str    | 商品代碼（如 `"EURUSD"`） |
| data     | dict   | 一筆 Bar 結構資料 |
| is_end   | bool   | 是否為推播結束標記（回測模式中使用）|


 data 結構說明:
| 欄位名稱   | 型別     | 說明       |
|------------|----------|------------|
| `time`     | datetime | Bar 起始時間。 |
| `open`     | float    | 開盤價。     |
| `high`     | float    | 最高價。     |
| `low`      | float    | 最低價。     |
| `close`    | float    | 收盤價。     |
| `volume`   | float    | 成交量。     |
| `timeframe`| str      | Bar 的時間週期（如 M1, H1, D1）。 |

---

### 📤 回傳資料內容

| 名稱   | 型別 | 備註說明                    |
|--------|------|-----------------------------|
| 無     | None | 無回傳值（單純接收推播訊息處理）|

---

### 💡 範例程式碼
```python
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

        #回測模式參數
        params = {
            "symbol": "EURUSD",
            "timeframe": "M1",
            "from": '2024-01-01',
            "to": '2024-12-31',
            "backtest_toggle": True
        }
        mas_client.subscribe_bars(params)

        #實盤模式參數
        params = {
            "symbol": "EURUSD",
            "timeframe": "M1",
            "backtest_toggle": False
        }
        mas_client.subscribe_bars(params)

    except Exception as e:
        print(str(e))
```
---