---
sidebar_position: 1
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`subscribe_bars`

---

### 🎯 Function Purpose

Subscribes to **real-time Bar (candlestick) data** for a specified trading symbol,  
or dispatches historical Bars in backtest mode.  
The data source automatically switches based on the `backtest_toggle` parameter:

- **True**: Activates the historical data module to push Bars within the specified date range  
- **False**: Launches a background thread to fetch the latest Bar data from MT5 at the given `interval_ms` interval

---

### Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | Parameter settings dictionary, with the following fields: |

| Name             | Type          | Required     | Description |
|------------------|---------------|--------------|-------------|
| `symbol`         | str           | ✅           | Trading symbol to subscribe (e.g., `"EURUSD"`). |
| `timeframe`      | str           | ✅           | Bar timeframe (e.g., `"M1"`, `"H1"`, `"D1"`). |
| `interval_ms`    | int           | ❌           | Interval in milliseconds for live mode (default: `1000`). |
| `from`           | datetime/str  | ✅ (backtest) | Start time for historical data (only used when `backtest_toggle = True`). |
| `to`             | datetime/str  | ✅ (backtest) | End time for historical data (only used when `backtest_toggle = True`). |
| `backtest_toggle`| bool          | ❌           | Whether to enable backtest mode (default: `False`). |

**Timeframe Reference:**
| ID   | Description   |
|------|---------------|
| M1   | 1 minute      |
| M2   | 2 minutes     |
| M3   | 3 minutes     |
| M4   | 4 minutes     |
| M5   | 5 minutes     |
| M6   | 6 minutes     |
| M10  | 10 minutes    |
| M12  | 12 minutes    |
| M15  | 15 minutes    |
| M20  | 20 minutes    |
| M30  | 30 minutes    |
| H1   | 1 hour        |
| H2   | 2 hours       |
| H3   | 3 hours       |
| H4   | 4 hours       |
| H6   | 6 hours       |
| H8   | 8 hours       |
| H12  | 12 hours      |
| D1   | 1 day         |
| W1   | 1 week        |
| MN1  | 1 month       |

---

### 📤 Function Return

| Parameter Name | Type | Description |
|----------------|------|-------------|
| None           | None | No return value. Used to trigger Bar data streaming. |

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