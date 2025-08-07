---
sidebar_position: 4
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`subscribe_ticks`

---

### 🎯 Function Purpose

Subscribes to real-time tick data or pushes historical tick data in simulation mode.  
The data source will switch automatically based on the value of `backtest_toggle`:

- If `True`: historical tick data will be pushed using the simulation module  
- If `False`: a background thread will be started to fetch and push the latest tick from MT5 every `interval_ms` milliseconds

---

### 🔧 Function Parameters

| Name     | Type  | Description |
|----------|-------|-------------|
| `params` | dict  | A dictionary containing the following fields: |

| Field             | Type           | Required         | Description                                                                 |
|------------------|----------------|-------------------|-----------------------------------------------------------------------------|
| `symbol`         | str            | ✅               | The symbol to subscribe (e.g., `"EURUSD"`)                                  |
| `interval_ms`    | int            | ❌               | Interval in milliseconds between each tick push (default: `500`)            |
| `from`           | datetime/str   | ✅ (backtest)    | Start time of historical data (used only when `backtest_toggle=True`)       |
| `to`             | datetime/str   | ✅ (acktest)     | End time of historical data (used only when `backtest_toggle=True`)         |
| `flags`          | int            | ❌               | Tick source flags, default is `mt5.COPY_TICKS_ALL` (used in real-time mode) |
| `mode`           | str            | ❌               | Simulation tick mode: `"all"` or `"trade"` (default: `"all"`)               |
| `backtest_toggle`| bool           | ❌               | Whether to enable simulation mode (default: `False`)                        |

---

### 📤 Function Return

| Name   | Type | Description                        |
|--------|------|------------------------------------|
| None   | None | No return value. Triggers tick data streaming |

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

        # Backtest mode parameters
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