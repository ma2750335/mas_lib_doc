---
sidebar_position: 4
---
### Function Name

`receive_order_execution`

---

### Function Purpose

Handles the system's execution report for an order.  
This function is used to process or display trade execution data after an order is filled.

---

### Function Parameters

| Name          | Type   | Description                    |
|---------------|--------|--------------------------------|
| order_id      | str    | The ticket number of the order. |
| execution_data| dict   | A dictionary containing the following fields: |

| Field Name | Type     | Description             |
|------------|----------|-------------------------|
| `price`    | float    | Executed price.         |
| `volume`   | float    | Executed volume.        |
| `symbol`   | str      | Trading symbol.         |
| `time`     | datetime | Execution time (usually the push time). |
| `type`     | str      | Order type.             |

---

### Function Return 

| Name | Type  | Description                          |
|------|-------|--------------------------------------|
| None | NoneType | No return value; this is a passive push handler. |

---

### 💡 Example Code

```python
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
            "order_type": "sell",
            "volume": 0.1,
            "backtest_toggle": True
        }
        mas_client.send_order(order_params)
    except Exception as e:
        print(f"Login failed:{str(e)}")
```