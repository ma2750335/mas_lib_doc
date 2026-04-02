---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`calc_order_profit`

---

### 🎯 Function Purpose

Calculates the **estimated profit or loss** for a hypothetical order given an open and close price.
Use this to evaluate risk/reward scenarios, set dynamic take-profit targets, or validate strategy parameters before execution.
No order is placed; this is a pure calculation query.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | Parameters for profit estimation. |

| Field Name    | Type  | Required | Description |
|---------------|-------|----------|-------------|
| `action`      | str   | ✅       | Trade direction: `"buy"` or `"sell"`. |
| `symbol`      | str   | ✅       | Trading symbol (e.g., `"EURUSD"`). |
| `volume`      | float | ✅       | Trade volume in lots. |
| `price_open`  | float | ✅       | Hypothetical entry (open) price. |
| `price_close` | float | ✅       | Hypothetical exit (close) price. |

---

### 📤 Function Return

| Name     | Type  | Description |
|----------|-------|-------------|
| `result` | float | Estimated profit/loss in account currency. Returns `-1.0` on failure. |

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

    # Calculate P&L if buying EURUSD 0.1 lot at 1.0900 and closing at 1.0950
    profit = mas_client.calc_order_profit({
        "action": "buy",
        "symbol": "EURUSD",
        "volume": 0.1,
        "price_open": 1.09000,
        "price_close": 1.09500
    })

    if profit != -1.0:
        print(f"Estimated profit: {profit:.2f} USD")
        # Output: Estimated profit: 50.00 USD
    else:
        print("❌ Profit calculation failed.")

    # Check risk/reward ratio
    sl_profit = mas_client.calc_order_profit({
        "action": "buy", "symbol": "EURUSD",
        "volume": 0.1, "price_open": 1.09000, "price_close": 1.08500
    })
    tp_profit = mas_client.calc_order_profit({
        "action": "buy", "symbol": "EURUSD",
        "volume": 0.1, "price_open": 1.09000, "price_close": 1.10000
    })
    print(f"Risk: {sl_profit:.2f}, Reward: {tp_profit:.2f}, R/R: {tp_profit / abs(sl_profit):.2f}")

if __name__ == "__main__":
    main()
```
---
