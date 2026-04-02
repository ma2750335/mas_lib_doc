---
sidebar_position: 3
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`cancel_order`

---

### 🎯 函数用途

取消尚未成交的挂单订单。  
此函数会根据传入的 **`order_id`**（MT5 订单编号 ticket）向 MetaTrader 5 平台发送撤单请求，确保未成交的订单能即时取消，避免不必要的持仓或市场风险。  

---

### 🔧 函数参数

| 参数名称 | 类型 | 说明 |
|----------|------|------|
| params   | dict | 参数字典，字段说明如下： |

| 字典字段     | 类型 | 必填 | 说明 |
|--------------|------|------|------|
| `order_id`   | int  | ✅   | 要取消的 MT5 订单编号（ticket） |
| `comment`    | str  | ❌   | 取消原因备注，默认 `"Cancel by MAS"` |

---

### 📤 返回数据

| 名称   | 类型 | 说明                         |
|--------|------|------------------------------|
| （匿名） | bool | 取消成功返回 `True`，否则返回 `False` |

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

        cancel_order_params = {
            "order_id": order_id
        }
        mas_client.cancel_order(cancel_order_params)
    except Exception as e:
        print(f"登录失败:{str(e)}")
```

---
