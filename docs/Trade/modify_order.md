---
sidebar_position: 2
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`modify_order`

---

### 🎯 Function Purpose

Updates a pending limit order that has not yet been executed.  
This function sends a modification request to the MetaTrader 5 (MT5) platform using the specified **`order_id`**.  
It supports updating **price**, **stop loss (SL)**, **take profit (TP)**, **stop limit**, **expiration time**, and **comment** fields in a single request.
Upon successful modification, the updated order status will be pushed to the client via a notification callback.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| params         | dict | Dictionary containing the following fields: |

| Field Name  | Type     | Required | Description |
|-------------|----------|----------|-------------|
| `order_id`  | int      | ✅       | The original pending order ticket number to be modified. |
| `price`     | float    | ✅       | New price for the pending order. |
| `sl`        | float    | ❌       | Stop loss price (SL). |
| `tp`        | float    | ❌       | Take profit price (TP). |
| `stoplimit` | float    | ❌       | Stop limit price. |
| `expiration`| datetime | ❌       | Expiration date and time for the pending order. |
| `comment`   | str      | ❌       | Order comment (default: `"Modified by MAS"`). |

---

### 📤 Function Return 

| Name          | Type | Description                                  |
|---------------|------|----------------------------------------------|
| (anonymous)   | bool | Returns `True` if the modification succeeds, otherwise `False`. |

---

### 💡 Example Code

```python
import time
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
