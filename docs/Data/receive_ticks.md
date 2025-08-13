---
sidebar_position: 5
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`receive_ticks`

---

### 🎯 Function Purpose

Receives real-time or backtesting Tick data via push updates, triggered by the `on_bar()` handler.

---

### 🔧 Function Parameters

| Parameter Name     | Type    | Description |
|--------------------|---------|-------------|
| `symbol`           | str     | The instrument symbol (e.g., `"EURUSD"`). |
| `data`             | dict    | A dictionary containing the tick data fields, described below. |
| `is_end`           | bool    | Indicates the end of the push stream (used in backtesting mode). |

**`data` structure**:  
| Key       | Type     | Description |
|-----------|----------|-------------|
| `time`    | datetime | The timestamp of the tick. |
| `bid`     | float    | Bid price (the price at which the market is willing to buy). |
| `ask`     | float    | Ask price (the price at which the market is willing to sell). |
| `last`    | float    | Last trade price (final executed transaction price). |
| `volume`  | float    | Trade volume associated with the tick. |

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

        # Backtesting mode parameters
        params = {
            "symbol": "EURUSD",
            "from": '2025-07-07 12:00:00',
            "to": '2025-07-07 13:00:00',
            "backtest_toggle": True
        }
        mas_client.subscribe_ticks(params)

        # Live mode parameters
        params = {
            "symbol": "EURUSD",
            "backtest_toggle": False
        }
        mas_client.subscribe_ticks(params)

    except Exception as e:
        print(str(e))
```
---