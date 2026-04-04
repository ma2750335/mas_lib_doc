---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`get_history_orders_total`

---

### 🎯 Function Purpose

Retrieves the **total number of historical pending orders** within a specified time range.<br/>
Can be used to estimate data volume before calling `get_history_orders()` or to generate summary statistics without retrieving full order details.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | Configuration dictionary. Field details are as follows: |

#### `params` (dict) Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `from`     | datetime/str | ❌       | Start of time range (default: `2000-01-01`). |
| `to`       | datetime/str | ❌       | End of time range (default: current time). |

---

### 📤 Function Return

| Name     | Type | Description |
|----------|------|-------------|
| `result` | int  | Total number of historical orders in the specified period. Returns `0` on failure or no data. |

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

    # Total history orders for June 2025
    total = mas_client.get_history_orders_total({
        "from": "2025-06-01",
        "to": "2025-06-30"
    })
    print(f"Orders placed in June: {total}")

if __name__ == "__main__":
    main()
```
---
