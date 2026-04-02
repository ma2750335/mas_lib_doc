---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`get_market_book`

---

### 🎯 Function Purpose

Retrieves a **snapshot of the current order book (market depth / DOM)** for a specified symbol.
Must call `subscribe_market_book()` first to activate the feed.
Returns a list of bid and ask price levels with their associated volumes, enabling order-flow analysis and liquidity monitoring.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | Dictionary specifying the target symbol. |

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `symbol`   | str  | ✅       | Trading symbol to query (e.g., `"EURUSD"`). Must be subscribed first via `subscribe_market_book()`. |

---

### 📤 Function Return

| Name     | Type       | Description |
|----------|------------|-------------|
| `result` | list[dict] | List of order book entries sorted by price level. Returns `[]` on failure or if not subscribed. |

| Field Name   | Type  | Description |
|--------------|-------|-------------|
| `type`       | int   | Entry type: `1 = Ask (sell-side)`, `2 = Bid (buy-side)`. |
| `price`      | float | Price level. |
| `volume`     | int   | Volume available at this level (integer lots). |
| `volume_dbl` | float | Precise volume at this level (floating point). |

Return Format:
```python
[
    {"type": 1, "price": 1.09520, "volume": 50,  "volume_dbl": 50.0},
    {"type": 1, "price": 1.09510, "volume": 120, "volume_dbl": 120.0},
    {"type": 2, "price": 1.09500, "volume": 80,  "volume_dbl": 80.0},
    {"type": 2, "price": 1.09490, "volume": 200, "volume_dbl": 200.0},
]
```

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

    # Subscribe first
    mas_client.subscribe_market_book({"symbol": symbol})
    time.sleep(0.5)

    # Get order book snapshot
    book = mas_client.get_market_book({"symbol": symbol})

    bids = [e for e in book if e["type"] == 2]
    asks = [e for e in book if e["type"] == 1]

    print(f"Best Bid: {bids[0]['price'] if bids else 'N/A'}")
    print(f"Best Ask: {asks[0]['price'] if asks else 'N/A'}")
    print(f"Total DOM levels: {len(book)}")

    # Unsubscribe when done
    mas_client.unsubscribe_market_book({"symbol": symbol})

if __name__ == "__main__":
    main()
```
---
