---
sidebar_position: 1
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`subscribe_bars`

---

### 🎯 函式用途

訂閱指定商品的即時 Bar（K 線）資料，或於回測模式中送出歷史 Bar 推播。  
根據 `backtest_toggle` 參數的值，自動切換資料來源：

- 若為 `True`：呼叫歷史資料模組送出 Bar 推播  
- 若為 `False`：建立背景執行緒，每間隔 `interval_ms` 毫秒從 MT5 取得最新 Bar 並推播

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 字典內容如下方欄位說明 |

| 名稱             | 型別          | 必填        | 說明                                                          |
|------------------|---------------|------------|---------------------------------------------------------------|
| `symbol`         | str           | ✅        | 商品代碼（如 `"EURUSD"`）。                                     |
| `timeframe`      | str           | ✅        | Bar 時間週期（如 `"M1"`、`"H1"`、`"D1"`）。                     |
| `interval_ms`    | int           | ❌        | 實盤推播間隔時間，預設為 `1000` 毫秒。                          |
| `from`           | datetime/str  | ✅(回測)  | 歷史資料起始時間（僅在 `backtest_toggle = True` 時使用）。       |
| `to`             | datetime/str  | ✅(回測)  | 歷史資料結束時間（僅在 `backtest_toggle = True` 時使用）。       |
| `backtest_toggle`| bool          | ❌        | 是否為回測模式，預設為 `False`。                               |      


timeframe說明:
| ID | 說明 |
|----------|----------|
| M1 | 1 minute | 
| M2 | 2 minutes | 
| M3 | 3 minutes | 
| M4 | 4 minutes | 
| M5 | 5 minutes | 
| M6 | 6 minutes | 
| M10 | 10 minutes | 
| M12 | 12 minutes | 
| M15 | 15 minutes | 
| M20 | 20 minutes | 
| M30 | 30 minutes | 
| H1 | 1 hour | 
| H2 | 2 hours | 
| H3 | 3 hours | 
| H4 | 4 hours | 
| H6 | 6 hours | 
| H8 | 8 hours | 
| H12 | 12 hours | 
| D1 | 1 day | 
| W1 | 1 week | 
| MN1 | 1 month | 

---

### 📤 回傳資料內容

| 名稱   | 型別 | 備註說明                          |
|--------|------|-----------------------------------|
| return | None | 此函式無回傳值，用於觸發 Bar 資料推播 |

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