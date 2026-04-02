---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`get_pending_orders`

---

### 🎯 Function Purpose

Retrieves all **active pending orders** (limit and stop orders not yet executed) from the MT5 account.
Supports optional filtering by **symbol**, **symbol group**, or **ticket ID**.
Returns an empty list if no matching pending orders are found.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | Optional. Dictionary specifying filter criteria. Pass `{}` to get all pending orders. |

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `symbol`   | str  | ❌       | Filter by specific trading symbol (e.g., `"EURUSD"`). |
| `group`    | str  | ❌       | Filter by symbol group pattern (e.g., `"*USD*"`). |
| `ticket`   | int  | ❌       | Filter by specific order ticket ID. |

---

### 📤 Function Return

| Name     | Type       | Description |
|----------|------------|-------------|
| `result` | list[dict] | List of pending order records. Returns `[]` if no pending orders found. |

| Field Name        | Type     | Description |
|-------------------|----------|-------------|
| `ticket`          | int      | Unique order ticket ID. |
| `symbol`          | str      | Trading symbol (e.g., `"EURUSD"`). |
| `type`            | int      | Order type (e.g., `2 = BUY_LIMIT`, `3 = SELL_LIMIT`, `4 = BUY_STOP`, `5 = SELL_STOP`). |
| `volume_initial`  | float    | Originally requested volume. |
| `volume_current`  | float    | Remaining unfilled volume. |
| `price_open`      | float    | Pending order trigger price. |
| `sl`              | float    | Stop loss price. |
| `tp`              | float    | Take profit price. |
| `price_current`   | float    | Current market price of the symbol. |
| `price_stoplimit` | float    | Stop-limit trigger price (for `BUY_STOP_LIMIT` / `SELL_STOP_LIMIT` orders). |
| `magic`           | int      | EA magic number. |
| `comment`         | str      | Order comment. |
| `reason`          | int      | Reason the order was placed (e.g., `0 = Manual`, `1 = EA`, `2 = SL/TP`). |
| `time_setup`      | datetime | Time the order was placed. |
| `time_expiration` | datetime | Order expiration time (`None` if not set). |
| `time_done`       | datetime | Time the order was completed (filled or cancelled; `None` if still pending). |

Return Format:
```python
[
    {
        "ticket": 10001234,
        "symbol": "EURUSD",
        "type": 2,
        "volume_initial": 0.1,
        "volume_current": 0.1,
        "price_open": 1.08500,
        "sl": 1.08000,
        "tp": 1.09500,
        "price_current": 1.08450,
        "price_stoplimit": 0.0,
        "magic": 123456,
        "comment": "MAS Order",
        "reason": 0,
        "time_setup": "2025-06-24T10:00:00",
        "time_expiration": None,
        "time_done": None
    }
]
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

    # Get all pending orders
    orders = mas_client.get_pending_orders()
    print(f"Pending orders: {len(orders)}")

    # Get pending orders for a specific symbol
    orders = mas_client.get_pending_orders({"symbol": "EURUSD"})
    for order in orders:
        print(order["ticket"], order["type"], order["price_open"])

if __name__ == "__main__":
    main()
```
---
