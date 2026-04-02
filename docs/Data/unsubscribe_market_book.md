---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`unsubscribe_market_book`

---

### 🎯 Function Purpose

**Releases the market depth (DOM) subscription** for a specified symbol, freeing MT5 resources.
Always call this when market book data is no longer needed to avoid unnecessary memory and bandwidth usage.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | Dictionary specifying the target symbol. |

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `symbol`   | str  | ✅       | Trading symbol to unsubscribe (e.g., `"EURUSD"`). |

---

### 📤 Function Return

| Name     | Type | Description |
|----------|------|-------------|
| `result` | bool | Returns `True` if successfully unsubscribed; otherwise `False`. |

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

    # Subscribe, read, then unsubscribe
    mas_client.subscribe_market_book({"symbol": symbol})
    time.sleep(0.5)
    book = mas_client.get_market_book({"symbol": symbol})
    print(f"DOM entries: {len(book)}")

    # Release subscription
    success = mas_client.unsubscribe_market_book({"symbol": symbol})
    if success:
        print(f"✅ Market book for {symbol} released.")
    else:
        print("⚠️ Symbol was not subscribed or release failed.")

if __name__ == "__main__":
    main()
```
---
