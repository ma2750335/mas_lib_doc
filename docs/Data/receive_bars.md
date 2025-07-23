---
sidebar_position: 2
---
### Function Name

`receive_bars`

---

### Function Purpose

Receives real-time or backtesting Bar (candlestick) data via push updates, triggered by the `on_bar()` handler.

---

### Function Parameters

| Name    | Type    | Description                                 |
|---------|---------|---------------------------------------------|
| symbol  | str     | The instrument symbol (e.g., `"EURUSD"`).   |
| data    | dict    | A dictionary representing a single Bar.     |
| is_end  | bool    | Indicates the end of the push stream (used in backtesting mode). |


Bar `data` structure:
| Key        | Type     | Description                                     |
|------------|----------|-------------------------------------------------|
| `time`     | datetime | The opening timestamp of the Bar.              |
| `open`     | float    | Opening price.                                 |
| `high`     | float    | Highest price during the Bar.                  |
| `low`      | float    | Lowest price during the Bar.                   |
| `close`    | float    | Closing price.                                 |
| `volume`   | float    | Trade volume.                                  |
| `timeframe`| str      | Bar timeframe (e.g., `M1`, `H1`, `D1`).        |

---

### Function Return

| Name   | Type | Description                              |
|--------|------|------------------------------------------|
| None   | None | No return value. This function is for receiving and handling push updates only. |

---

### 💡 Example Code
```python
from mas.mas import MAS

class MAS_Client(MAS):
    def __init__(self):
        super().__init__()

    def receive_bars(self, symbol, data, is_end=False):
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

        # Backtest mode parameters
        params = {
            "symbol": "EURUSD",
            "timeframe": "M1",
            "from": '2024-01-01',
            "to": '2024-12-31',
            "backtest_toggle": True
        }
        mas_client.subscribe_bars(params)

        # Live mode parameters
        params = {
            "symbol": "EURUSD",
            "timeframe": "M1",
            "backtest_toggle": False
        }
        mas_client.subscribe_bars(params)

    except Exception as e:
        print(str(e))
```
---