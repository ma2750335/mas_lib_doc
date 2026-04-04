---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`get_pending_orders`

---

### 🎯 函数用途

查询 MT5 账户当前所有**尚未成交的挂单**（限价单和止损单）。  
支持按交易品种、品种分组或订单编号（ticket）进行条件筛选。  
若未找到符合条件的挂单，则返回空数组。

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params` | dict | 查询条件设置字典，字段说明如下： |

#### `params`（dict）字段说明

| 字段名称 | 类型 | 必填 | 说明 |
|----------|------|------|------|
| `symbol`     | str  | ❌   | 指定商品代码（例如 `"EURUSD"`）。 |
| `group`      | str  | ❌   | 按商品分组样式过滤（例如 `"*USD*"`）。 |
| `ticket`     | int  | ❌   | 按指定挂单 ticket 编号过滤。 |

---

### 📤 返回内容

| 名称     | 类型        | 备注说明 |
|----------|------------|----------|
| `result` | list[dict] | 挂单数据列表，若无挂单则返回 `[]`。 |

| 字段名称          | 类型     | 说明 |
|-------------------|----------|------|
| `ticket`          | int      | 挂单唯一编号（Ticket）。 |
| `symbol`          | str      | 商品代码（如 `"EURUSD"`）。 |
| `type`            | int      | 挂单类型（`2=BUY_LIMIT`、`3=SELL_LIMIT`、`4=BUY_STOP`、`5=SELL_STOP`）。 |
| `volume_initial`  | float    | 原始下单手数。 |
| `volume_current`  | float    | 剩余未成交手数。 |
| `price_open`      | float    | 挂单触发价格。 |
| `sl`              | float    | 止损价格。 |
| `tp`              | float    | 止盈价格。 |
| `price_current`   | float    | 商品当前市场报价。 |
| `price_stoplimit` | float    | 止损限价触发价（仅限 BUY_STOP_LIMIT / SELL_STOP_LIMIT）。 |
| `magic`           | int      | EA 标识码。 |
| `comment`         | str      | 订单备注。 |
| `reason`          | int      | 挂单原因（`0=手动`、`1=EA`、`2=止盈止损`）。 |
| `time_setup`      | datetime | 挂单创建时间。 |
| `time_expiration` | datetime | 挂单到期时间（未设置则为 `None`）。 |
| `time_done`       | datetime | 订单完成时间（成交或取消；仍挂单中则为 `None`）。 |

#### 返回格式

```python
[
    {
        "ticket": 10001234,
        "symbol": "EURUSD",
        "type": 2,
        "volume_initial": 0.1,
        "volume_current": 0.1,
        "price_open": 1.08500,
        "sl": 1.08000,
        "tp": 1.09500,
        "price_current": 1.08450,
        "price_stoplimit": 0.0,
        "magic": 123456,
        "comment": "MAS Order",
        "reason": 0,
        "time_setup": "2025-06-24T10:00:00",
        "time_expiration": None,
        "time_done": None
    }
]
```

---

### 💡 示例代码

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

def main():
    mas_client = MAS_Client()
    mas_client.login({
        "account": "YOUR_ACCOUNT",
        "password": "YOUR_PASSWORD",
        "server": "YOUR_SERVER"
    })

    # 获取所有挂单
    orders = mas_client.get_pending_orders()
    print(f"挂单数量：{len(orders)}")

    # 按商品代码过滤
    orders = mas_client.get_pending_orders({"symbol": "EURUSD"})
    for order in orders:
        print(order["ticket"], order["type"], order["price_open"])

if __name__ == "__main__":
    main()
```
---
