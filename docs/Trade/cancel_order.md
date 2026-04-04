---
sidebar_position: 3
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`cancel_order`

---

### 🎯 Function Purpose

Cancels a pending MT5 order that has not yet been executed.<br/>
This function uses the specified **`order_id`** (MT5 order ticket number) to send a cancellation request directly to the MetaTrader 5 platform, ensuring the order is removed before execution.  

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| params         | dict | Configuration dictionary. Field details are as follows: |

#### `params` (dict) Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `order_id`  | int  | ✅       | The MT5 order ticket number to be cancelled. |
| `comment`   | str  | ❌       | Cancellation reason note; defaults to `"Cancel by MAS"`. |

---

### 📤 Function Return 

| Name         | Type | Description                             |
|--------------|------|-----------------------------------------|
| `result`     | bool | Returns `True` if cancellation succeeds, otherwise `False`. |

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

        cancel_order_params = {
            "order_id": order_id
        }
        mas_client.cancel_order(cancel_order_params)
    except Exception as e:
        print(f"Login failed:{str(e)}")
```

---
