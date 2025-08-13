---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`get_positions`

---

### 🎯 Function Purpose

Fetches all **active open positions** from the authenticated MetaTrader 5 (MT5) account.  
Supports filtering by **trading symbol**, **symbol group**, or **position ticket** for precise data queries.  
Each position is returned as a Python dictionary containing **trade direction, entry price, stop loss/take profit levels, floating P/L, swap fees, and update timestamps**.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | A dictionary specifying query filters. See the following fields: |

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `symbol`   | str  | ❌       | Filter by specific trading symbol (highest priority). |
| `group`    | str  | ❌       | Filter by symbol group (supports wildcard patterns, e.g., `"USD*"`). |
| `ticket`   | int  | ❌       | Filter by position ticket ID. Ignored if `symbol` is specified. |

---

### 📤 Function Return

| Name   | Type       | Description |
|--------|------------|-------------|
| result | list[dict] | List of matching open positions. Returns an empty list `[]` if no positions are found. Each position dictionary contains: |

| Field Name        | Type     | Description |
|-------------------|----------|-------------|
| `ticket`          | int      | Unique position ticket ID. |
| `symbol`          | str      | Trading symbol (e.g., `EURUSD`, `XAUUSD`). |
| `type`            | int      | Position direction: `0 = Buy (long)`, `1 = Sell (short)`. |
| `magic`           | int      | Expert Advisor (EA) magic number. |
| `identifier`      | int      | Custom strategy-specific identifier. |
| `reason`          | int      | Order opening reason (e.g., manual, EA, automated strategy). |
| `volume`          | float    | Position volume in lots. |
| `price_open`      | float    | Opening price. |
| `sl`              | float    | Stop Loss price level. |
| `tp`              | float    | Take Profit price level. |
| `price_current`   | float    | Current market price. |
| `swap`            | float    | Accumulated swap fee. |
| `profit`          | float    | Floating profit or loss. |
| `comment`         | str      | User comment or strategy label. |
| `external_id`     | str      | External reference ID. |
| `time`            | datetime | Position opening time (Python `datetime` object). |
| `time_msc`        | int      | Position opening time in milliseconds since epoch. |
| `time_update`     | datetime | Last update time (Python `datetime` object). |
| `time_update_msc` | int      | Last update time in milliseconds since epoch. |

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
