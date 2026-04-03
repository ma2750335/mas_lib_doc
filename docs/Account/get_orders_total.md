---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`get_orders_total`

---

### 🎯 Function Purpose

Retrieves the **total number of active pending orders** in the MT5 account.<br/>
Can be used to quickly check the number of pending orders before calling `get_pending_orders()` or to control the maximum number of pending orders within strategy logic.

---

### 🔧 Function Parameters

This function takes no parameters.

---

### 📤 Function Return

| Name     | Type | Description |
|----------|------|-------------|
| `result` | int  | Total number of active pending orders. Returns `0` if none exist or on failure. |

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

    total = mas_client.get_orders_total()
    print(f"Active pending orders: {total}")

    # Useful for enforcing max order limits in strategy
    if total < 5:
        print("Can place new order.")
    else:
        print("Order limit reached.")

if __name__ == "__main__":
    main()
```
---
