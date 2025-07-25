---
sidebar_position: 6
---
### Function Name

`unsubscribe_ticks`

---

### Function Purpose

Unsubscribes from real-time tick data for a specified symbol — intended for live trading mode only.  
This function terminates the internal background thread and stops receiving live tick data for the specified symbol.

---

### Function Parameters

| Name   | Type | Description |
|--------|------|-------------|
| params | dict | symbol（str）：The symbol to unsubscribe (e.g., `"EURUSD"`). |

---

### Function Return

| Name | Type | Description                                  |
|------|------|----------------------------------------------|
| None | None | No return value. Calling this function stops the subscription. |

---

### 💡 Example Code

```python
import time
from mas.mas import MAS

class MAS_Client(MAS):
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

        params = {
            "symbol": "EURUSD",
            "backtest_toggle": False,
        }
        mas_client.subscribe_ticks(params)
        time.sleep(10)
        mas_client.unsubscribe_ticks(params)
    except Exception as e:
        print(str(e))
```
---

