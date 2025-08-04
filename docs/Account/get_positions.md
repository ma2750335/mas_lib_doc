### Function Name

`get_positions`

---

### Function Purpose

Retrieve all current open positions for the authenticated MetaTrader 5 (MT5) account.

You can filter positions by a specific symbol, group, or position ticket.  
Each position is returned as a dictionary with detailed information such as price, volume, PnL, and timestamps.

---

### Function Parameters

| Parameter | Type | Description |
|----------|------|-------------|
| `params` | dict | A dictionary containing the following fields: |

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `symbol`   | str  | ❌      | Filter by symbol (highest priority). |
| `group`    | str  | ❌      | Filter by group name (e.g., `"USD*"`). |
| `ticket`   | int  | ❌      | Filter by position ticket (ignored if `symbol` is used). |

---

### Function Return

| Name   | Type        | Description |
|--------|-------------|-------------|
| result | list[dict]  | A list of open positions matching the filter. Empty list `[]` if none found. Each item has the following structure: |

| Field Name        | Type     | Description |
|-------------------|----------|-------------|
| `ticket`          | int      | Unique position ticket. |
| `symbol`          | str      | Trading symbol. |
| `type`            | int      | Position direction: `0 = Buy`, `1 = Sell`. |
| `magic`           | int      | EA's magic number. |
| `identifier`      | int      | Strategy-specific ID. |
| `reason`          | int      | Order reason (manual, EA, etc). |
| `volume`          | float    | Volume (in lots). |
| `price_open`      | float    | Opening price. |
| `sl`              | float    | Stop Loss. |
| `tp`              | float    | Take Profit. |
| `price_current`   | float    | Current market price. |
| `swap`            | float    | Accumulated swap. |
| `profit`          | float    | Floating profit/loss. |
| `comment`         | str      | User comment. |
| `external_id`     | str      | External reference ID. |
| `time`            | datetime | Open time (`datetime` format). |
| `time_msc`        | int      | Open time in milliseconds since epoch. |
| `time_update`     | datetime | Last update time. |
| `time_update_msc` | int      | Last update time in milliseconds. |

Return Format：
```python
[
  {
    "ticket": 123456789,
    "symbol": "EURUSD.sml",
    "type": 0,
    "magic": 888888,
    "identifier": 0,
    "reason": 1,
    "volume": 0.1,
    "price_open": 1.09876,
    "sl": 1.09500,
    "tp": 1.10500,
    "price_current": 1.09980,
    "swap": -0.12,
    "profit": 10.40,
    "comment": "Strategy-01",
    "external_id": "",
    "time": "2025-06-24T08:30:15",
    "time_msc": 1719217815023,
    "time_update": "2025-06-24T08:45:12",
    "time_update_msc": 1719218712345
  },
  {
    "ticket": 987654321,
    "symbol": "USDJPY.sml",
    "type": 1,
    "magic": 123456,
    "identifier": 0,
    "reason": 0,
    "volume": 0.2,
    "price_open": 157.350,
    "sl": 158.000,
    "tp": 155.500,
    "price_current": 157.100,
    "swap": 0.00,
    "profit": -50.00,
    "comment": "",
    "external_id": "",
    "time": "2025-06-23T22:15:00",
    "time_msc": 1719171300000,
    "time_update": "2025-06-24T09:01:05",
    "time_update_msc": 1719219665000
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
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_client.login(login_params)

        positions = mas_client.get_positions()
        print(positions)

        positions = mas_client.get_positions({"symbol": "EURUSD"})
        print(positions)

        positions = mas_client.get_positions({"group": "EURUSD"})
        print(positions)

        positions = mas_client.get_positions({'ticket': 28184471})
        print(positions)
    except Exception as e:
        print(str(e))
```
---
