---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`get_order_history`

---

### 🎯 Function Purpose

Retrieves **historical deal records** (executed trades) from your MetaTrader 5 (MT5) account within a specified time range.  
Supports multiple filter options such as **time period**, **symbol**, **order ticket ID**, or **position ID**.  

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | A dictionary specifying query filters. See the following fields: |

| Field Name  | Type          | Required | Description |
|-------------|---------------|----------|-------------|
| `symbol`    | str           | No       | Trading symbol to filter results. Can be combined with `group` filtering. |
| `from`      | datetime/str  | No       | Start time. Defaults to `2000-01-01`. Accepts Python `datetime` or ISO string. |
| `to`        | datetime/str  | No       | End time. Defaults to current system time (`datetime.now()`). |
| `ticket`    | int           | No       | Retrieve a single deal by its unique ticket ID. **Cannot be used with other filters**. |
| `position`  | int           | No       | Retrieve all deals for a specific position ID. **Cannot be used with other filters**. |

---

### function Return
| Name   | Type         | Description |
|--------|--------------|-------------|
| result | `list[dict]` | Returns a list of deals matching the query. Returns an empty list `[]` if no records are found. Each deal record is represented as a dictionary with the following fields: |

| Field Name       | Type     | Description |
|------------------|----------|-------------|
| `ticket`         | int      | Unique deal ticket ID. |
| `order`          | int      | The originating order ID for this deal. |
| `position_id`    | int      | The position ID associated with this deal. |
| `symbol`         | str      | Trading symbol (e.g., `EURUSD`, `XAUUSD`). |
| `type`           | int      | Trade direction: `0=Buy`, `1=Sell`. |
| `entry`          | int      | Entry type: `0=Open`, `1=Close`, `2=Reverse`, `3=Settlement`, `4=Adjustment`. |
| `reason`         | int      | Reason for execution: `0=Manual`, `1=EA (Automated)`, `2=Stop Loss/Take Profit`, `3=Margin Stop Out`, etc. |
| `volume`         | float    | Deal volume (in lots). |
| `price`          | float    | Executed price. |
| `commission`     | float    | Commission charged for the trade. |
| `swap`           | float    | Swap fee (overnight financing cost). |
| `fee`            | float    | Additional fee, if applicable. |
| `profit`         | float    | Realized profit or loss from the deal. |
| `comment`        | str      | Deal comment (e.g., strategy name, custom note). |
| `external_id`    | str      | External reference ID (used for third-party integration). |
| `time`           | datetime | Deal execution time (Python `datetime` object). |
| `time_msc`       | int      | Deal execution timestamp in milliseconds. |

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