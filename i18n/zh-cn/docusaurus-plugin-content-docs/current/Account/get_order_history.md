---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`get_order_history`

---

### 🎯 函数用途

查询 MT5 交易账户在特定时间区间内的**历史成交记录**（已成交订单信息）。  
支持根据时间范围、商品代码、订单编号（ticket）或持仓编号（position）进行条件过滤。  

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params` | dict | 查询条件设置字典，字段说明如下： |

#### `params`（dict）字段说明

| 字段名称 | 类型 | 必填 | 说明 |
|----------|------|------|------|
| `symbol`    | str           | ❌   | 指定查询的商品代码，可搭配 `group` 字段进行筛选。             |
| `from`      | datetime/str  | ❌   | 起始时间（默认 `2000-01-01`）。                              |
| `to`        | datetime/str  | ❌   | 结束时间（默认当前时间 `datetime.now()`）。                   |
| `ticket`    | int           | ❌   | 查询指定订单编号的成交记录（不可与其他条件并用）。              |
| `position`  | int           | ❌   | 查询指定持仓编号的所有成交记录（不可与其他条件并用）。      

---

### 📤 返回内容

| 名称   | 类型           | 备注说明                               |
|--------|---------------|----------------------------------------|
| result |  `list[dict]` | 返回符合条件的所有成交数据，若无数据则为空数组 `[]`。每笔成交记录为一个 dictionary，字段说明如下： |

| 字段名称       | 类型      | 说明 |
|----------------|-----------|------|
| `ticket`        | int       | 成交记录的唯一 ID（Ticket）。 |
| `order`         | int       | 所属原始订单编号。 |
| `position_id`   | int       | 该笔成交所属的持仓 ID。 |
| `symbol`        | str       | 商品代码（如 EURUSD、XAUUSD）。 |
| `type`          | int       | 成交方向（0=Buy，1=Sell）。 |
| `entry`         | int       | 成交类型（0=开仓、1=平仓、2=反向、3=交割、4=调整）。 |
| `reason`        | int       | 成交原因（0=手动、1=EA 自动、2=止盈止损、3=保证金强平等）。 |
| `volume`        | float     | 成交手数。 |
| `price`         | float     | 成交价格。 |
| `commission`    | float     | 手续费。 |
| `swap`          | float     | 隔夜费（Swap）。 |
| `fee`           | float     | 其他费用（若有）。 |
| `profit`        | float     | 本次成交的实际盈亏。 |
| `comment`       | str       | 成交备注（如：策略名称、交易说明等）。 |
| `external_id`   | str       | 外部系统参考 ID（如对接第三方标记）。 |
| `time`          | datetime  | 成交时间（已转换为 datetime 对象）。 |
| `time_msc`      | int       | 成交时间（Unix timestamp 毫秒）。 |

#### 返回格式

```python
[
  {
    "ticket": 123456789,
    "order": 987654321,
    "position_id": 111222,
    "symbol": "USDJPY.sml",
    "type": 0,
    "entry": 1,
    "reason": 0,
    "volume": 0.1,
    "price": 157.350,
    "commission": -0.8,
    "swap": 0.0,
    "fee": 0.0,
    "profit": 20.15,
    "comment": "開倉",
    "external_id": "",
    "time": "2025-06-20T15:30:00",
    "time_msc": 1718868600000
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
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_client.login(login_params)

        symbol_params = {
            "symbol": "EURUSD",
            "from": "2025-07-01",
            "to":  "2025-07-07"
        }
        print(mas_client.get_order_history(symbol_params))

        ticket_params = {
          "ticket" : 30681969
        }
        print(mas_client.get_order_history(ticket_params))

        position_params = {
          "position" : 28290355
        }
        print(mas_client.get_order_history(position_params))
    except Exception as e:
        print(str(e))
```
---