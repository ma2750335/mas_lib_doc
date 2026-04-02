---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`order_check`

---

### 🎯 Function Purpose

**Pre-validates** an order request against the broker's requirements **without placing it**.
Use this before `send_order()` to verify that the order parameters are valid, the account has sufficient margin, and the broker allows the intended action.
Returns a detailed result including margin requirements and any error codes.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | Order parameters to validate (same structure as `send_order`). |

| Field Name    | Type  | Required | Description |
|---------------|-------|----------|-------------|
| `symbol`      | str   | ✅       | Trading symbol (e.g., `"EURUSD"`). |
| `order_type`  | str   | ✅       | Order type: `"buy"`, `"sell"`, `"buy_limit"`, `"sell_stop"`, etc. |
| `volume`      | float | ✅       | Trade volume in lots. |
| `price`       | float | ❌       | Price for pending orders. |
| `sl`          | float | ❌       | Stop loss price. |
| `tp`          | float | ❌       | Take profit price. |

---

### 📤 Function Return

| Name     | Type | Description |
|----------|------|-------------|
| `result` | dict | Validation result from MT5. Returns `{}` on failure. |

| Field Name    | Type  | Description |
|---------------|-------|-------------|
| `retcode`     | int   | Return code. `0` means the order is valid. |
| `balance`     | float | Account balance after the hypothetical trade. |
| `equity`      | float | Account equity after the trade. |
| `profit`      | float | Projected profit. |
| `margin`      | float | Required margin for this order. |
| `margin_free` | float | Free margin remaining after this order. |
| `margin_level`| float | Margin level percentage. |
| `comment`     | str   | Description of the result (e.g., `"Done"` or error message). |

Return Format:
```python
{
    "retcode": 0,
    "balance": 10000.00,
    "equity": 10000.00,
    "profit": 0.0,
    "margin": 130.45,
    "margin_free": 9869.55,
    "margin_level": 7665.0,
    "comment": "Done"
}
```

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

    check_result = mas_client.order_check({
        "symbol": "EURUSD",
        "order_type": "buy",
        "volume": 0.1,
        "sl": 1.08000,
        "tp": 1.10000
    })

    if check_result.get("retcode") == 0:
        print("✅ Order is valid. Required margin:", check_result["margin"])
    else:
        print("❌ Order check failed:", check_result.get("comment"))

if __name__ == "__main__":
    main()
```
---
