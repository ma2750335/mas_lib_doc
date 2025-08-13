---
sidebar_position: 2
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`receive_bars`

---

### 🎯 Function Purpose

Receives real-time or backtesting Bar (candlestick) data via push updates, triggered by the `on_bar()` handler.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|-------|-------------|
| `symbol`       | str   | The instrument symbol (e.g., `"EURUSD"`). |
| `data`         | dict  | A single Bar data structure. See field details below. |
| `is_end`       | bool  | Indicates the end of a push stream (used in backtesting mode). |

**`data` Field Structure**:  
| Key         | Type     | Description |
|-------------|----------|-------------|
| `time`      | datetime | Bar start time. |
| `open`      | float    | Opening price. |
| `high`      | float    | Highest price during the Bar. |
| `low`       | float    | Lowest price during the Bar. |
| `close`     | float    | Closing price. |
| `volume`    | float    | Trading volume. |
| `timeframe` | str      | Bar timeframe (e.g., `"M1"`, `"H1"`, `"D1"`). |

---

### 📤 Function Return

| Name | Type | Description |
|------|------|-------------|
| None | None | No return value. This function only processes received push data. |

---

### 💡 Example Code
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

        # Backtest mode parameters
        params = {
            "symbol": "EURUSD",
            "timeframe": "M1",
            "from": '2024-01-01',
            "to": '2024-12-31',
            "backtest_toggle": True
        }
        mas_client.subscribe_bars(params)

        # Live mode parameters
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