---
sidebar_position: 2
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`modify_order`

---

### 🎯 函数用途

修改尚未成交的挂单（限价单或其他可修改挂单类型）。  
此函数会根据 **`order_id`** 向 MT5 平台发送修改请求，支持同步调整价格（price）、止损（sl）、止盈（tp）、止损限价（stoplimit）、到期时间（expiration）以及订单备注（comment）。  
若修改成功，将触发推送更新订单状态。

---

### 🔧 函数参数

| 参数名称 | 类型 | 说明 |
|----------|------|------|
| params   | dict | 参数字典，字段说明如下： |

| 字典字段     | 类型       | 必填 | 说明                                      |
|--------------|------------|------|-------------------------------------------|
| `order_id`   | int        | ✅   | 要修改的挂单订单编号（MT5 ticket）。 |
| `price`      | float      | ✅   | 修改后的新挂单价格。 |
| `sl`         | float      | ❌   | 止损价格（Stop Loss）。 |
| `tp`         | float      | ❌   | 止盈价格（Take Profit）。 |
| `stoplimit`  | float      | ❌   | 止损限价（Stop Limit Price）。 |
| `expiration` | datetime   | ❌   | 挂单到期时间（Expiration Time）。 |
| `comment`    | str        | ❌   | 订单备注，默认 `"Modified by MAS"`。 |

---

### 📤 返回数据

| 名称   | 类型 | 说明                             |
|--------|------|----------------------------------|
| （匿名） | bool | 修改成功返回 `True`，否则返回 `False`。 |

---

### 💡 示例代码

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
        print(f"登录失败:{str(e)}")
```
---
