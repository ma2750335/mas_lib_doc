---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`get_history_orders`

---

### 🎯 函数用途

查询 MT5 账户的**历史挂单记录**（History Orders）。  
与 `get_order_history()`（返回成交记录）不同，此函数返回的是订单对象本身，包含已成交与已取消的挂单。  
支持按时间区间、商品代码、ticket 或 position 进行过滤。

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params` | dict | 选填。查询条件字典。 |

| dict 字段名称 | 类型          | 必填 | 说明 |
|--------------|---------------|------|------|
| `from`       | datetime/str  | ❌   | 起始时间（默认 `2000-01-01`）。 |
| `to`         | datetime/str  | ❌   | 结束时间（默认当前时间）。 |
| `symbol`     | str           | ❌   | 指定商品代码过滤。 |
| `ticket`     | int           | ❌   | 按指定订单 ticket 过滤。 |
| `position`   | int           | ❌   | 按关联 position ID 过滤。 |

---

### 📤 返回数据内容

| 名称     | 类型        | 备注说明 |
|----------|------------|----------|
| `result` | list[dict] | 历史挂单数据列表，若无符合数据则返回 `[]`。 |

| 字段名称          | 类型     | 说明 |
|-------------------|----------|------|
| `ticket`          | int      | 订单 ticket 编号。 |
| `symbol`          | str      | 商品代码。 |
| `type`            | int      | 订单类型（`0=BUY`、`1=SELL`、`2=BUY_LIMIT` 等）。 |
| `volume_initial`  | float    | 原始下单手数。 |
| `volume_current`  | float    | 记录当时剩余未成交手数。 |
| `price_open`      | float    | 订单价格。 |
| `sl`              | float    | 止损价格。 |
| `tp`              | float    | 止盈价格。 |
| `price_current`   | float    | 记录当时的市场报价。 |
| `price_stoplimit` | float    | 止损限价触发价（止损限价类型使用）。 |
| `state`           | int      | 订单状态（`1=已挂出`、`3=已取消`、`4=部分成交`、`5=完全成交`）。 |
| `magic`           | int      | EA 标识码。 |
| `comment`         | str      | 订单备注。 |
| `reason`          | int      | 原因代码（`0=手动`、`1=EA`、`2=止盈止损`）。 |
| `time_setup`      | datetime | 订单创建时间。 |
| `time_expiration` | datetime | 订单到期时间（未设置则为 `None`）。 |
| `time_done`       | datetime | 订单完成时间（成交或取消）。 |

返回格式如下：
```python
[
    {
        "ticket": 10001234,
        "symbol": "EURUSD",
        "type": 2,
        "volume_initial": 0.1,
        "volume_current": 0.0,
        "price_open": 1.08500,
        "sl": 1.08000,
        "tp": 1.09500,
        "price_current": 1.08520,
        "price_stoplimit": 0.0,
        "state": 5,
        "magic": 123456,
        "comment": "MAS Order",
        "reason": 0,
        "time_setup": "2025-06-24T10:00:00",
        "time_expiration": None,
        "time_done": "2025-06-24T10:15:00"
    }
]
```

---

### 💡 示例代码

```python
import mas
from datetime import datetime

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

    # 查询特定时间区间的历史挂单
    orders = mas_client.get_history_orders({
        "from": "2025-06-01",
        "to": "2025-06-30"
    })
    print(f"历史挂单数量：{len(orders)}")

    # 按商品代码过滤
    orders = mas_client.get_history_orders({
        "from": "2025-06-01",
        "to": "2025-06-30",
        "symbol": "EURUSD"
    })
    for o in orders:
        print(o["ticket"], o["state"], o["volume_initial"])

if __name__ == "__main__":
    main()
```
---
