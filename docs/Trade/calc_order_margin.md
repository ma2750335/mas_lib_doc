---
sidebar_position: 6
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`calc_order_margin`

---

### 🎯 Function Purpose

Calculates the **required margin** for a specified order without executing the trade.<br/>
Useful for verifying whether the account has sufficient free margin before placing an order, or for implementing margin-aware position management logic within a strategy.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | Configuration dictionary. Field details are as follows: |

#### `params` (dict) Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `action`    | str   | ✅       | Trade action: `"buy"` or `"sell"`. |
| `symbol`    | str   | ✅       | Trading symbol (e.g., `"EURUSD"`). |
| `volume`    | float | ✅       | Trade volume in lots. |
| `price`     | float | ✅       | Order price (use current market price for market orders). |

---

### 📤 Function Return

| Name     | Type  | Description |
|----------|-------|-------------|
| `result` | float | Required margin in account currency. Returns `-1.0` on failure. |

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

    margin = mas_client.calc_order_margin({
        "action": "buy",
        "symbol": "EURUSD",
        "volume": 0.1,
        "price": 1.09500
    })

    if margin != -1.0:
        print(f"Required margin: {margin:.2f} USD")
    else:
        print("❌ Failed to calculate margin.")

    # Dynamic position sizing: use all available free margin
    account = mas_client.get_account_info()
    free_margin = account.get("margin_free", 0)
    target_lots = 0.01
    while True:
        m = mas_client.calc_order_margin({
            "action": "buy", "symbol": "EURUSD",
            "volume": target_lots + 0.01, "price": 1.09500
        })
        if m > free_margin * 0.3:
            break
        target_lots += 0.01
    print(f"Max safe lots: {target_lots:.2f}")

if __name__ == "__main__":
    main()
```
---
