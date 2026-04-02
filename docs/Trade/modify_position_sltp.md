---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`modify_position_sltp`

---

### 🎯 Function Purpose

Modifies the **Stop Loss (SL)** and/or **Take Profit (TP)** levels of an **existing open position**.
At least one of `sl` or `tp` must be provided. This uses MT5's `TRADE_ACTION_SLTP` action and does not close or reopen the position.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | Dictionary with position ID and new SL/TP values. |

| Field Name    | Type  | Required | Description |
|---------------|-------|----------|-------------|
| `position_id` | int   | ✅       | The ticket ID of the open position to modify. |
| `sl`          | float | ❌*      | New stop loss price. At least one of `sl` or `tp` must be provided. |
| `tp`          | float | ❌*      | New take profit price. At least one of `sl` or `tp` must be provided. |

> ❌* At least one of `sl` or `tp` is required; providing neither will result in an error.

---

### 📤 Function Return

| Name     | Type | Description |
|----------|------|-------------|
| `result` | bool | Returns `True` if SL/TP was successfully modified; otherwise `False`. |

---

### 💡 Example Code

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

    def receive_order_execution(self, order_id, execution_data):
        print("Order executed:", order_id, execution_data)

def main():
    mas_client = MAS_Client()
    mas_client.login({
        "account": "YOUR_ACCOUNT",
        "password": "YOUR_PASSWORD",
        "server": "YOUR_SERVER"
    })

    # Modify stop loss and take profit for position 123456789
    success = mas_client.modify_position_sltp({
        "position_id": 123456789,
        "sl": 1.08000,
        "tp": 1.10500
    })

    if success:
        print("✅ SL/TP modified successfully.")
    else:
        print("❌ Failed to modify SL/TP.")

    # Modify only stop loss (move to breakeven)
    mas_client.modify_position_sltp({
        "position_id": 123456789,
        "sl": 1.09000
    })

if __name__ == "__main__":
    main()
```
---
