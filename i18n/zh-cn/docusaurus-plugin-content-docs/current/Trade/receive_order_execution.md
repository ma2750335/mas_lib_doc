---
sidebar_position: 4
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`receive_order_execution`

---

### 🎯 函数用途

接收 **交易订单成交信息推送**，用于后续的数据处理、交易记录更新、绩效统计或实时显示。  

---

### 🔧 函数参数

| 参数名称           | 类型  | 说明 |
|--------------------|-------|------|
| `order_id`         | str   | 订单编号。 |
| `execution_data`   | dict  | 参数字典，字段说明如下： |

| execution_data 字段 | 类型     | 说明 |
|---------------------|----------|------|
| `price`             | float    | 成交价格。 |
| `volume`            | float    | 成交数量（交易手数）。 |
| `symbol`            | str      | 交易品种代码（如 `EURUSD`）。 |
| `time`              | datetime | 成交时间（通常为服务器推送时间）。 |
| `type`              | str      | 订单类型（如市价、市价平仓、限价等）。 |

---

### 📤 返回数据

| 名称 | 类型 | 说明 |
|------|------|------|
| 无   | None | 无返回值（仅接收并处理成交推送信息）。 |

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