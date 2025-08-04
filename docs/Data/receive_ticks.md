---
sidebar_position: 5
---
### Function Name

`receive_ticks`

---

### Function Purpose

Receives Tick data via push updates, triggered by the `on_tick()` handler.

---

### Function Parameters

| Name    | Type    | Description                                 |
|---------|---------|---------------------------------------------|
| symbol  | str     | The instrument symbol (e.g., `"EURUSD"`).   |
| data    | dict    | A dictionary representing a single tick.    |
| is_end  | bool    | Indicates the end of the push stream (used in backtesting mode). |

Tick `data` structure:

| Key      | Type     | Description                  |
|----------|----------|------------------------------|
| `time`   | datetime | Timestamp of the tick.       |
| `bid`    | float    | Bid price.                   |
| `ask`    | float    | Ask price.                   |
| `last`   | float    | Last transaction price.      |
| `volume` | float    | Transaction volume.          |

---

### Function Return

| Name   | Type | Description                              |
|--------|------|------------------------------------------|
| None   | None | No return value. This function only handles incoming tick data. |

---

### 💡 Example Code

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

    def receive_ticks(self, symbol, data, is_end=False):
        print(symbol, data, is_end)

def main():
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_client.login(login_params)

        # Backtesting mode parameters
        params = {
            "symbol": "EURUSD",
            "from": '2025-07-07 12:00:00',
            "to": '2025-07-07 13:00:00',
            "backtest_toggle": True
        }
        mas_client.subscribe_ticks(params)

        # Live mode parameters
        params = {
            "symbol": "EURUSD",
            "backtest_toggle": False
        }
        mas_client.subscribe_ticks(params)

    except Exception as e:
        print(str(e))
```
---