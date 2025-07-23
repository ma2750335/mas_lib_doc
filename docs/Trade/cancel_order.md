---
sidebar_position: 3
---
### Function Name

`cancel_order`

---

### Function Purpose

Cancels a pending order that has not yet been filled.  
This function sends a cancellation request to the MT5 platform using the provided `order_id`.

---

### Function Parameters

| Name   | Type | Description |
|--------|------|-------------|
| params | dict | Dictionary containing the fields below: |

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `order_id` | int  | ✅       | The order ticket number to be cancelled. |
| `comment`  | str  | ❌       | Reason for cancellation; default is `"Cancel by MAS"`. |

---

### Function Return 

| Name         | Type | Description                             |
|--------------|------|-----------------------------------------|
| (anonymous)  | bool | Returns `True` if cancellation succeeds, otherwise `False`. |

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

        cancel_order_params = {
            "order_id": order_id
        }
        mas_client.cancel_order(cancel_order_params)
    except Exception as e:
        print(f"Login failed:{str(e)}")
```

---
