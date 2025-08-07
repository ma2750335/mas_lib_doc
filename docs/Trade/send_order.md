---
sidebar_position: 1
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`send_order`

---

### 🎯 Function Purpose

Submits a trading order (supports market, limit, stop-limit, GTC or expiration time, and full request parameters).  
This is a unified order entry function that automatically switches behavior based on the `backtest_toggle` parameter:

- If `True`: simulated trading flow (does not connect to MetaTrader5).
- If `False`: real trading flow, sends request to MetaTrader5 live trading server.

Upon successful order placement, it triggers status and execution push notifications.

---

### 🔧 Function Parameters

| Name   | Type | Description |
|--------|------|-------------|
| params | dict | A dictionary containing the following fields: |

| Field Name       | Type       | Required | Description |
|------------------|------------|----------|-------------|
| `backtest_toggle`| bool       | ✅        | Whether to use backtest mode (`True` means backtest). |
| `symbol`         | str        | ✅        | Trading symbol (e.g., `"EURUSD.sml"`). |
| `order_type`     | str        | ✅        | Order type: `buy`, `sell`, `buy_limit`, `sell_stop`, etc. |
| `volume`         | float      | ✅        | Trading volume (e.g., `0.1`). |
| `price`          | float      | ❌        | Order price (for limit/stop orders; ignored for market orders). |
| `sl`             | float      | ❌        | Stop loss price. |
| `tp`             | float      | ❌        | Take profit price. |
| `stoplimit`      | float      | ❌        | Stop-limit price. |
| `deviation`      | int        | ❌        | Max slippage allowed (default 10). |
| `magic`          | int        | ❌        | Custom EA ID (default 123456). |
| `comment`        | str        | ❌        | Order comment (default `"MAS Order"`). |
| `type_time`      | enum/int   | ❌        | Order time type (default: `mt5.ORDER_TIME_GTC`). |
| `expiration`     | datetime   | ❌        | Expiration time for pending orders (when using time-limited type). |
| `type_filling`   | enum/int   | ❌        | Order fill policy (default: `mt5.ORDER_FILLING_FOK`). |
| `position`       | int        | ❌        | Modify specific position. |
| `position_by`    | int        | ❌        | Used in hedging mode to close opposing positions. |

---

### Request Structure

| Field Name     | Type     | Description |
|----------------|----------|-------------|
| action         | int      | Trading action type. |
| magic          | int      | EA ID for strategy identification. |
| order          | int      | Order ID (required when modifying an order). |
| symbol         | str      | Trading symbol (optional when closing/modifying). |
| volume         | float    | Trading volume. |
| price          | float    | Order price (can be omitted for market execution). |
| stoplimit      | float    | Stop-limit trigger price. |
| sl             | float    | Stop loss price. |
| tp             | float    | Take profit price. |
| deviation      | int      | Max slippage (in points). |
| type           | int      | Order type. |
| type_filling   | int      | Fill policy. |
| type_time      | int      | Time policy. |
| expiration     | datetime | Order expiration time. |
| comment        | str      | Order comment. |
| position       | int      | Position ID to modify or close. |
| position_by    | int      | Opposing position ID for hedging close. |

---

### 📤 Function Return

| Name      | Type | Description |
|-----------|------|-------------|
| order_id  | str  | If successful, returns order ID; otherwise, returns error message. |

---

### 💡 Example Code (Live Trading)
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
            "order_type": "buy_limit",
            "volume": 0.1,
            "price": 1.12345,
            "sl": 1.12000,
            "tp": 1.13000,
            "deviation": 10,
            "magic": 888888,
            "comment": "Test Order",
            "type_time": mt5.ORDER_TIME_GTC,
            "expiration": datetime(2025, 12, 31, 23, 59),
            "type_filling": mt5.ORDER_FILLING_IOC,
            "backtest_toggle": False
        }
        mas_client.send_order(order_params)
    except Exception as e:
        print(f"Login failed:{str(e)}")
```

### 💡 Example Code (Backtest)

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
---