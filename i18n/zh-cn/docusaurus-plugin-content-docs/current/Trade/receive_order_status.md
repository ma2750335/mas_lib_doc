---
sidebar_position: 5
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`receive_order_status`

---

### 🎯 函数用途

接收并处理 **MT5 平台返回的订单状态推送信息**。  
该函数会在订单执行、修改、取消等操作后自动触发，用于更新系统内部订单状态、记录交易日志或进行实时风控判断。  

---

### 🔧 函数参数

| 参数名称      | 类型  | 说明 |
|---------------|-------|------|
| `order_id`    | str   | 订单编号（ticket）。 |
| `status_data` | dict  | 字典字段说明如下： |

#### `status_data` 字段

| 字段名称 | 类型  | 说明 |
|----------|-------|------|
| `status`         | int   | 订单状态代码（通常与 MT5 `retcode` 相同）。 |
| `retcode`        | int   | MT5 返回的原始订单状态代码。 |
| `message`        | str   | MT5 返回的状态信息（如 `"Request executed"`）。 |
| `request`        | dict  | 本次订单下单时的 request 原始数据。 |
| `action`         | str   | *(选填)* 触发本次状态更新的操作类型。仅在 `modify_order`（值为 `"modify"`）或 `cancel_order`（值为 `"cancel"`）时出现；`send_order` 不含此字段。 |

---

### 📤 返回内容

| 名称 | 类型 | 说明 |
|------|------|------|
| 无   | None | 无返回值（仅用于接收和处理推送信息）。 |

---

### 💡 示例代码

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
        print(f"登录失败:{str(e)}")
```
