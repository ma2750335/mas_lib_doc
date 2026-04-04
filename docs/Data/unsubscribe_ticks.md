---
sidebar_position: 6
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`unsubscribe_ticks`

---

### 🎯 Function Purpose

Cancels the **real-time tick data subscription** for a specified symbol, applicable only in **live trading mode**.<br/>
After execution, the system terminates the internal background subscription thread and stops real-time price updates for the symbol.<br/>
Call this function when real-time tick data is no longer needed to avoid unnecessary resource usage.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | Configuration dictionary. Field details are as follows: |

#### `params` (dict) Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `symbol`   | str  | ✅       | The symbol to unsubscribe (e.g., `"EURUSD"`). |

---

### 📤 Function Return

| Name | Type | Description                                  |
|------|------|----------------------------------------------|
| None | None | No return value. Stops the tick data subscription for the specified symbol. |

---

### 💡 Example Code

```python
import time
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

        params = {
            "symbol": "EURUSD",
            "backtest_toggle": False,
        }
        mas_client.subscribe_ticks(params)
        time.sleep(10)
        mas_client.unsubscribe_ticks(params)
    except Exception as e:
        print(str(e))
```
---

