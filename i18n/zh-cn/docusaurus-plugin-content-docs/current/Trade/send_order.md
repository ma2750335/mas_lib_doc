---
sidebar_position: 1
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`send_order`

---

### 🎯 函数用途

发送一笔交易订单（支持市价单、限价单、止损限价单、GTC 或指定时间，有完整 `request` 字段）。  
该函数为 **统一下单 API**，会根据 `backtest_toggle` 参数自动切换下单模式：

- **回测模式 (`True`)**：使用模拟交易流程，不连接 MetaTrader5。  
- **实盘模式 (`False`)**：连接 MT5 执行真实交易。  

下单成功后，系统会推送 **订单状态（Order Status）** 与 **成交信息（Execution Data）**。

---

### 🔧 函数参数

| 参数名称  | 类型 | 说明 |
|-----------|------|------|
| `params` | dict | 查询条件设置字典，字段说明如下： |

#### `params`（dict）字段说明

| 字段名称 | 类型       | 必填 | 说明 |
|----------|------------|------|------|
| `backtest_toggle`  | bool       | ✅   | 是否为回测模式（`True` 表示回测）。 |
| `symbol`           | str        | ✅   | 交易品种代码（如 `"EURUSD.sml"`）。 |
| `order_type`       | str        | ✅   | 订单类型：`buy`、`sell`、`buy_limit`、`sell_stop` 等。 |
| `volume`           | float      | ✅   | 下单手数（如 `0.1`）。 |
| `price`            | float      | ❌   | 限价/止损价格（市价单会自动使用 bid/ask）。 |
| `sl`               | float      | ❌   | 止损价。 |
| `tp`               | float      | ❌   | 止盈价。 |
| `stoplimit`        | float      | ❌   | 止损限价。 |
| `deviation`        | int        | ❌   | 最大滑点（默认 10）。 |
| `magic`            | int        | ❌   | 自定义 EA 标识（默认 123456）。 |
| `comment`          | str        | ❌   | 订单备注（默认 `"MAS Order"`）。 |
| `type_time`        | enum/int   | ❌   | 订单有效时间（默认 `mt5.ORDER_TIME_GTC`）。 |
| `expiration`       | datetime   | ❌   | 到期时间（仅在 `type_time` 为指定时间时有效）。 |
| `type_filling`     | enum/int   | ❌   | 成交方式（默认 `mt5.ORDER_FILLING_FOK`）。 |
| `position`         | int        | ❌   | 修改某持仓的订单编号。 |
| `position_by`      | int        | ❌   | 对冲模式下的 `position_by` 值。 |

---

### request 字段说明

| 字段名称      | 类型     | 说明 |
|--------------|----------|------|
| action       | int      | 交易操作类型。 |
| magic        | int      | EA ID（策略标识）。 |
| order        | int      | 订单编号（修改挂单时必填）。 |
| symbol       | str      | 品种代码（修改/平仓时非必填）。 |
| volume       | float    | 下单手数。 |
| price        | float    | 下单价格（市价单可不填）。 |
| stoplimit    | float    | 触发限价单的价格。 |
| sl           | float    | 止损价。 |
| tp           | float    | 止盈价。 |
| deviation    | int      | 最大滑点（点数）。 |
| type         | int      | 订单类型。 |
| type_filling | int      | 成交方式。 |
| type_time    | int      | 订单有效时间类型。 |
| expiration   | datetime | 到期时间。 |
| comment      | str      | 订单备注。 |
| position     | int      | 持仓编号（修改或平仓时使用）。 |
| position_by  | int      | 反向持仓编号（对冲平仓时使用）。 |

---

### 📤 返回内容

| 名称       | 类型 | 说明 |
|------------|------|------|
| `order_id` | str  | 成功返回订单编号，失败返回错误信息。 |

---

### 💡 示例代码（实盘）
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
        print(f"登录失败:{str(e)}")
```

### 💡 示例代码（回测）

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
---