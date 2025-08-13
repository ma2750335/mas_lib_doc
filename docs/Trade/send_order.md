---
sidebar_position: 1
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`send_order`

---

### 🎯 Function Purpose

Submits a trading order through a **unified MT5 order API**, supporting market, limit, stop-limit, GTC, and time-expiration orders with full parameter control.  
Automatically switches between **live trading** and **backtest simulation** according to the `backtest_toggle` parameter:

- **`True` (Backtest Mode)**: Runs in simulation without connecting to MetaTrader 5.
- **`False` (Live Trading Mode)**: Connects to the MT5 server for real market execution.

Upon successful execution, the system sends **real-time order status** and **execution data** push notifications.

---

### 🔧 Function Parameters

| Parameter Name   | Type | Description |
|------------------|------|-------------|
| params           | dict | A dictionary containing the following fields: |

| Field Name       | Type       | Required | Description |
|------------------|------------|----------|-------------|
| `backtest_toggle`| bool       | ✅        | Enable backtest mode (`True` for backtesting). |
| `symbol`         | str        | ✅        | Trading symbol (e.g., `"EURUSD.sml"`). |
| `order_type`     | str        | ✅        | Order type: `buy`, `sell`, `buy_limit`, `sell_stop`, etc. |
| `volume`         | float      | ✅        | Trade volume (e.g., `0.1`). |
| `price`          | float      | ❌        | Price for limit/stop orders; ignored for market orders. |
| `sl`             | float      | ❌        | Stop loss price. |
| `tp`             | float      | ❌        | Take profit price. |
| `stoplimit`      | float      | ❌        | Stop-limit price. |
| `deviation`      | int        | ❌        | Maximum slippage allowed (default: 10 points). |
| `magic`          | int        | ❌        | Custom Expert Advisor (EA) ID (default: `123456`). |
| `comment`        | str        | ❌        | Order comment (default: `"MAS Order"`). |
| `type_time`      | enum/int   | ❌        | Order validity type (default: `mt5.ORDER_TIME_GTC`). |
| `expiration`     | datetime   | ❌        | Expiration date/time for pending orders (when applicable). |
| `type_filling`   | enum/int   | ❌        | Order fill policy (default: `mt5.ORDER_FILLING_FOK`). |
| `position`       | int        | ❌        | Modify a specific position ID. |
| `position_by`    | int        | ❌        | Used in hedging mode to close opposing positions. |

---

### Request Structure

| Field Name     | Type     | Description |
|----------------|----------|-------------|
| action         | int      | MT5 trade action type. |
| magic          | int      | Expert Advisor ID for strategy identification. |
| order          | int      | Order ID (required for order modifications). |
| symbol         | str      | Trading symbol (optional for modifications/closing). |
| volume         | float    | Trade volume. |
| price          | float    | Order price (optional for market execution). |
| stoplimit      | float    | Stop-limit trigger price. |
| sl             | float    | Stop loss price. |
| tp             | float    | Take profit price. |
| deviation      | int      | Maximum slippage in points. |
| type           | int      | MT5 order type. |
| type_filling   | int      | Fill policy. |
| type_time      | int      | Time validity policy. |
| expiration     | datetime | Order expiration time. |
| comment        | str      | Order comment. |
| position       | int      | Position ID to modify or close. |
| position_by    | int      | Opposing position ID for hedging close. |

---

### 📤 Function Return

| Name      | Type | Description |
|-----------|------|-------------|
| `order_id`| str  | Returns order ID if successful; otherwise, returns the error message. |

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