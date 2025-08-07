---
sidebar_position: 2
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`check_connection`

---

### 🎯 Function Purpose

Checks whether the connection to MetaTrader 5 (MT5) is still active.

---

### 🔧 Function Parameters

| Name | Type | Description |
|------|------|-------------|
| None | None | This function takes no parameters. |

---

### 📤 Function Return 

| Name        | Type | Description                          |
|-------------|------|--------------------------------------|
| (anonymous) | bool | Returns `True` if MT5 is connected; otherwise, returns `False`. |

---

### 💡 Example Code

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

def main():
    try:
        mas_client = MAS_Client()
        if mas_client.check_connection():
            print("Connected to MT5")
        else:
            print("Not connected to MT5. Please login first.")
            
    except Exception as e:
        print(f"Initialization failed:{str(e)}")
```
---
