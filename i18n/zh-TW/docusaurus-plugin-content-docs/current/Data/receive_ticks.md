---
sidebar_position: 5
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`receive_ticks`

---

### 🎯 函式用途

接收 **Tick 資料推播**，由 `on_tick()` 回呼函式觸發。  

---

### 🔧 函式參數

| 參數名稱 | 型別  | 備註說明 |
|----------|-------|----------|
| `symbol` | str   | 商品代碼（例如 `"EURUSD"`）。 |
| `data`   | dict  | 一筆 Tick 資料結構，欄位說明如下： |
| `is_end` | bool  | 是否為推播結束標記（回測模式中使用）。 |

**`data` 欄位結構**：  
| 欄位名稱 | 型別     | 說明 |
|----------|----------|------|
| `time`   | datetime | 資料時間戳記。 |
| `bid`    | float    | 買價（Bid Price）。 |
| `ask`    | float    | 賣價（Ask Price）。 |
| `last`   | float    | 最後成交價（Last Price）。 |
| `volume` | float    | 成交量（Volume）。 |

---

### 📤 回傳資料內容

| 名稱 | 型別 | 備註說明 |
|------|------|----------|
| 無   | None | 無回傳值（僅處理接收到的推播資料）。 |

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