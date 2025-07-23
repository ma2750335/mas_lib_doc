---
sidebar_position: 2
---
### Function Name

`modify_order`

---

### Function Purpose

Modifies a pending limit order that has not been filled.  
This function sends a modification request to the MT5 platform using the given `order_id`.  
Supports simultaneous updates of price, stop loss (SL), take profit (TP), stop limit, expiration time, and comment.  
If the modification is successful, the order status will be pushed via notification callback.

---

### Function Parameters

| Name   | Type | Description |
|--------|------|-------------|
| params | dict | A dictionary containing the fields below: |

| Field Name  | Type     | Required | Description                                                  |
|-------------|----------|----------|--------------------------------------------------------------|
| `order_id`  | int      | ✅       | The original pending order ticket number to modify.         |
| `price`     | float    | ✅       | New price to set.                                            |
| `sl`        | float    | ❌       | Stop loss price.                                             |
| `tp`        | float    | ❌       | Take profit price.                                           |
| `stoplimit` | float    | ❌       | Stop limit price.                                            |
| `expiration`| datetime | ❌       | Order expiration time.                                       |
| `comment`   | str      | ❌       | Order comment (default is `"Modified by MAS"`).              |

---

### Function Return 

| Name          | Type | Description                                  |
|---------------|------|----------------------------------------------|
| (anonymous)   | bool | Returns `True` if the modification succeeds, otherwise `False`. |

---

### 💡 Example Code

```python
import time
from mas.mas import MAS

class MAS_Client(MAS):
    def __init__(self):
        super().__init__()

    def receive_order_execution(self, order_id, execution_data):
        print("receive_order_execution:", order_id, execution_data)

    def receive_order_status(self, order_id, status_data):
        print("receive_order_status:", order_id, status_data)

def main():
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_client.login(login_params)

        order_params = {
            "symbol": "EURUSD",
            "order_type": "sell_limit",
            "price": 1.18,
            "volume": 0.1,
            "backtest_toggle": False
        }
        order_id = mas_client.send_order(order_params)
        print(order_id)
        time.sleep(3)

        modify_order_params = {
            "order_id": order_id,
            "price": 1.18,
            "sl": 1.185,
            "tp": 1.175,
        }
        mas_client.modify_order(modify_order_params)
    except Exception as e:
        print(f"Login failed:{str(e)}")
```
---
