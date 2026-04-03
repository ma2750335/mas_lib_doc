---
sidebar_position: 6
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`get_symbols_total`

---

### 🎯 Function Purpose

Returns the **total count of all available trading symbols** in the connected MT5 terminal.<br/>
Use this as a quick check before calling `get_symbols()`, or to monitor how many instruments the broker provides.

---

### 🔧 Function Parameters

This function takes no parameters.

---

### 📤 Function Return

| Name     | Type | Description |
|----------|------|-------------|
| `result` | int  | Total number of available symbols. Returns `0` on failure. |

---

### 💡 Example Code

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

def main():
    mas_client = MAS_Client()
    mas_client.login({
        "account": "YOUR_ACCOUNT",
        "password": "YOUR_PASSWORD",
        "server": "YOUR_SERVER"
    })

    total = mas_client.get_symbols_total()
    print(f"Total available symbols: {total}")
    # Output: Total available symbols: 1342

if __name__ == "__main__":
    main()
```
---
