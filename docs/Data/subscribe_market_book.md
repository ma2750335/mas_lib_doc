---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`subscribe_market_book`

---

### 🎯 Function Purpose

**Subscribes** to the **market depth (DOM - Depth of Market)** feed for a specified symbol in MT5.
Once subscribed, you can call `get_market_book()` at any time to retrieve the current order book snapshot.
Call `unsubscribe_market_book()` when done to release the subscription and free resources.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | Dictionary specifying the target symbol. |

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `symbol`   | str  | ✅       | Trading symbol to subscribe (e.g., `"EURUSD"`). |

---

### 📤 Function Return

| Name     | Type | Description |
|----------|------|-------------|
| `result` | bool | Returns `True` if the subscription was successful; otherwise `False`. |

---

### 💡 Example Code

```python
import mas
import time

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

    symbol = "EURUSD"

    # Step 1: Subscribe to market book
    success = mas_client.subscribe_market_book({"symbol": symbol})
    if not success:
        print("❌ Failed to subscribe to market book.")
        return

    print(f"✅ Subscribed to {symbol} market book.")

    # Step 2: Read the order book
    time.sleep(0.5)  # Allow brief time for data to populate
    book = mas_client.get_market_book({"symbol": symbol})
    for entry in book[:5]:
        print(entry)

    # Step 3: Unsubscribe when done
    mas_client.unsubscribe_market_book({"symbol": symbol})
    print("✅ Unsubscribed from market book.")

if __name__ == "__main__":
    main()
```
---
