---
sidebar_position: 7
---
### Function Name

`stop_all_subscriptions`

---

### Function Purpose

Stops all active data subscriptions for both Tick and Bar feeds.  
This is applicable in live trading mode.

---

### Function Parameters

| Name | Type | Description                |
|------|------|----------------------------|
| None | None | This function takes no parameters. |

---

### Function Return

| Name | Type | Description          |
|------|------|----------------------|
| None | None | No return value.     |

---

### 💡 Example Code


```python
import time
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

        params = {
            "symbol": "EURUSD",
            "backtest_toggle": False,
        }
        mas_client.subscribe_ticks(params)
        time.sleep(10)
        mas_client.stop_all_subscriptions()
    except Exception as e:
        print(str(e))
```
---