---
sidebar_position: 5
---
### Function Name

`receive_order_status`

---

### Function Purpose

Handles the system's order status updates.  
This function is triggered when MT5 returns the status of an order, and can be used for further processing or display.

---

### Function 參數

| Name         | Type   | Description                           |
|--------------|--------|---------------------------------------|
| order_id     | str    | The ticket number of the order.       |
| status_data  | dict   | A dictionary containing the following fields: |

| Field Name   | Type   | Description                                       |
|--------------|--------|---------------------------------------------------|
| `status`     | int    | Order status (usually same as MT5 `retcode`).     |
| `retcode`    | int    | Return code from MT5 indicating result.           |
| `message`    | str    | Response message from MT5 (e.g., `"Request executed"`). |
| `request`    | dict   | The original request payload for the order.       |

---

### Function Return 

| Name | Type     | Description                                |
|------|----------|--------------------------------------------|
| None | NoneType | No return value; this is a push message handler. |

---

### 💡 Example Code

```python
import mas

class MAS_Client(mas):
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
