---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`get_history_orders`

---

### 🎯 Function Purpose

Retrieves **historical order records** from the MT5 account.
Unlike `get_order_history()` (which returns deal/execution records), this function returns the **order objects** that were placed—including both filled and cancelled orders.
Supports filtering by time range, symbol, ticket, or position ID.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | Optional. Filter criteria for the query. |

| Field Name  | Type          | Required | Description |
|-------------|---------------|----------|-------------|
| `from`      | datetime/str  | ❌       | Start of time range (default: `2000-01-01`). |
| `to`        | datetime/str  | ❌       | End of time range (default: current time). |
| `symbol`    | str           | ❌       | Filter by specific trading symbol. |
| `ticket`    | int           | ❌       | Filter by specific order ticket ID. |
| `position`  | int           | ❌       | Filter by the position ID associated with the order. |

---

### 📤 Function Return

| Name     | Type       | Description |
|----------|------------|-------------|
| `result` | list[dict] | List of historical order records. Returns `[]` if no matching records are found. |

| Field Name        | Type     | Description |
|-------------------|----------|-------------|
| `ticket`          | int      | Order ticket ID. |
| `symbol`          | str      | Trading symbol. |
| `type`            | int      | Order type (e.g., `0 = BUY`, `1 = SELL`, `2 = BUY_LIMIT`, etc.). |
| `volume_initial`  | float    | Originally requested volume. |
| `volume_current`  | float    | Remaining unfilled volume at time of record. |
| `price_open`      | float    | Order price. |
| `sl`              | float    | Stop loss price. |
| `tp`              | float    | Take profit price. |
| `price_current`   | float    | Current market price of the symbol at time of record. |
| `price_stoplimit` | float    | Stop-limit trigger price (for stop-limit order types). |
| `state`           | int      | Order state (e.g., `1 = PLACED`, `3 = CANCELED`, `4 = PARTIAL`, `5 = FILLED`). |
| `magic`           | int      | EA magic number. |
| `comment`         | str      | Order comment. |
| `reason`          | int      | Reason code (e.g., `0 = Manual`, `1 = EA`, `2 = SL/TP`). |
| `time_setup`      | datetime | Time the order was placed. |
| `time_expiration` | datetime | Order expiration time (`None` if not set). |
| `time_done`       | datetime | Time the order was completed (filled or cancelled). |

Return Format:
```python
[
    {
        "ticket": 10001234,
        "symbol": "EURUSD",
        "type": 2,
        "volume_initial": 0.1,
        "volume_current": 0.0,
        "price_open": 1.08500,
        "sl": 1.08000,
        "tp": 1.09500,
        "price_current": 1.08520,
        "price_stoplimit": 0.0,
        "state": 5,
        "magic": 123456,
        "comment": "MAS Order",
        "reason": 0,
        "time_setup": "2025-06-24T10:00:00",
        "time_expiration": None,
        "time_done": "2025-06-24T10:15:00"
    }
]
```

---

### 💡 Example Code

```python
import mas
from datetime import datetime

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

    # Query history orders for today
    orders = mas_client.get_history_orders({
        "from": "2025-06-01",
        "to": "2025-06-30"
    })
    print(f"History orders: {len(orders)}")

    # Query by symbol
    orders = mas_client.get_history_orders({
        "from": "2025-06-01",
        "to": "2025-06-30",
        "symbol": "EURUSD"
    })
    for o in orders:
        print(o["ticket"], o["state"], o["volume_initial"])

if __name__ == "__main__":
    main()
```
---
