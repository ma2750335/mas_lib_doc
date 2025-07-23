### Function Name

`get_order_history`

---

### Function Purpose

Retrieve historical deal records (executed trades) within a specific time range.  
You may filter by time, symbol, order ID, or position ID.

---

### Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| params         | dict | A dictionary containing the following fields:  |

| Field Name  | Type          | Required | Description |
|-------------|---------------|----------|-------------|
| `symbol`    | str           | ❌      | Symbol to filter (uses internal `group` filter) |
| `from`      | datetime/str  | ❌      | Start time, default is `2000-01-01` |
| `to`        | datetime/str  | ❌      | End time, default is `datetime.now()` |
| `ticket`    | int           | ❌      | Specify a deal by ticket ID (only one filter type supported at a time) |
| `position`  | int           | ❌      | Specify deals by position ID (only one filter type supported at a time) |

---

### function Return
| Name   | Type         | Description |
|--------|--------------|-------------|
| result | `list[dict]` | List of deal records matching the criteria.  
Returns an empty list `[]` if no data is found.  
Each item is a deal object with the following fields: |

| Field Name       | Type     | Description |
|------------------|----------|-------------|
| `ticket`         | int      | Deal ticket ID |
| `order`          | int      | Order ID associated with the deal |
| `position_id`    | int      | Related position ID |
| `symbol`         | str      | Trading symbol |
| `type`           | int      | Direction of deal (buy/sell) |
| `entry`          | int      | Entry type (open, close, correction, etc.) |
| `reason`         | int      | Reason for deal (manual, automatic, expiration, etc.) |
| `volume`         | float    | Volume of the deal |
| `price`          | float    | Executed price |
| `commission`     | float    | Commission fee |
| `swap`           | float    | Swap fee |
| `fee`            | float    | Additional fee |
| `profit`         | float    | Profit/loss from the deal |
| `comment`        | str      | Comment |
| `external_id`    | str      | External reference ID |
| `time`           | datetime | Deal time (converted to Python `datetime`) |
| `time_msc`       | int      | Deal timestamp in milliseconds |

Return Format：

```python
[
  {
    "ticket": 123456789,
    "order": 987654321,
    "position_id": 111222,
    "symbol": "USDJPY.sml",
    "type": 0,
    "entry": 1,
    "reason": 0,
    "volume": 0.1,
    "price": 157.350,
    "commission": -0.8,
    "swap": 0.0,
    "fee": 0.0,
    "profit": 20.15,
    "comment": "Open",
    "external_id": "",
    "time": "2025-06-20T15:30:00",
    "time_msc": 1718868600000
  }
]
```

---

### 💡 Example Code

```python
from mas.mas import MAS

class MAS_Client(MAS):
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

        symbol_params = {
            "symbol": "EURUSD",
            "from": "2025-07-01",
            "to":  "2025-07-07"
        }
        print(mas_client.get_order_history(symbol_params))

        ticket_params = {
          "ticket" : 30681969
        }
        print(mas_client.get_order_history(ticket_params))

        position_params = {
          "position" : 28290355
        }
        print(mas_client.get_order_history(position_params))
    except Exception as e:
        print(str(e))
```
---