---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`get_positions`

---

### 🎯 函数用途

查询当前 MT5 交易账号中的**未平仓持仓（Position）**信息。  
可根据**商品代码**、**商品组**或**特定持仓编号（ticket）**进行筛选。  
每笔持仓会以 `dict` 对象返回，内容包含**价格、手数、止损/止盈、浮动盈亏、开仓时间**等完整信息。

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params` | dict | 查询条件设置字典，字段说明如下： |

| dict 字段名称 | 类型 | 必填 | 说明 |
|---------------|------|------|------|
| `symbol`      | str  | ❌   | 过滤指定商品代码的持仓（优先级最高）。 |
| `group`       | str  | ❌   | 过滤指定商品组的持仓（支持通配符，如 `"USD*"`）。 |
| `ticket`      | int  | ❌   | 过滤指定持仓编号（ticket）。若同时指定 `symbol`，此字段将被忽略。 |

---

### 📤 返回数据内容

| 名称   | 类型        | 备注说明 |
|--------|-------------|----------|
| result | list[dict]  | 返回符合条件的所有未平仓持仓；若无数据则为空数组 `[]`。每笔数据为一个 `dict`，字段如下： |

| 字段名称          | 类型      | 说明 |
|-------------------|-----------|------|
| `ticket`          | int       | 持仓唯一编号（Position Ticket ID）。 |
| `symbol`          | str       | 商品代码（例如 EURUSD、XAUUSD）。 |
| `type`            | int       | 持仓方向（0=Buy 多单，1=Sell 空单）。 |
| `magic`           | int       | Magic Number（策略/EA 指定的识别码）。 |
| `identifier`      | int       | 自定义持仓识别码（可能由策略程序设置）。 |
| `reason`          | int       | 开仓原因（例如：手动、EA 自动等）。 |
| `volume`          | float     | 持仓手数（Lot）。 |
| `price_open`      | float     | 开仓价格。 |
| `sl`              | float     | 止损价（Stop Loss）。 |
| `tp`              | float     | 止盈价（Take Profit）。 |
| `price_current`   | float     | 最新市场价格。 |
| `swap`            | float     | 隔夜费（Swap）。 |
| `profit`          | float     | 浮动盈亏（Floating P/L）。 |
| `comment`         | str       | 备注或策略名称。 |
| `external_id`     | str       | 外部系统参考 ID。 |
| `time`            | datetime  | 开仓时间（转换为 `datetime` 对象）。 |
| `time_msc`        | int       | 开仓时间（毫秒时间戳）。 |
| `time_update`     | datetime  | 最后更新时间（转换为 `datetime` 对象）。 |
| `time_update_msc` | int       | 最后更新时间（毫秒时间戳）。 |

返回格式如下：
```python
[
  {
    "ticket": 123456789,
    "symbol": "EURUSD.sml",
    "type": 0,
    "magic": 888888,
    "identifier": 0,
    "reason": 1,
    "volume": 0.1,
    "price_open": 1.09876,
    "sl": 1.09500,
    "tp": 1.10500,
    "price_current": 1.09980,
    "swap": -0.12,
    "profit": 10.40,
    "comment": "Strategy-01",
    "external_id": "",
    "time": "2025-06-24T08:30:15",
    "time_msc": 1719217815023,
    "time_update": "2025-06-24T08:45:12",
    "time_update_msc": 1719218712345
  },
  {
    "ticket": 987654321,
    "symbol": "USDJPY.sml",
    "type": 1,
    "magic": 123456,
    "identifier": 0,
    "reason": 0,
    "volume": 0.2,
    "price_open": 157.350,
    "sl": 158.000,
    "tp": 155.500,
    "price_current": 157.100,
    "swap": 0.00,
    "profit": -50.00,
    "comment": "",
    "external_id": "",
    "time": "2025-06-23T22:15:00",
    "time_msc": 1719171300000,
    "time_update": "2025-06-24T09:01:05",
    "time_update_msc": 1719219665000
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

        positions = mas_client.get_positions()
        print(positions)

        positions = mas_client.get_positions({"symbol": "EURUSD"})
        print(positions)

        positions = mas_client.get_positions({"group": "EURUSD"})
        print(positions)

        positions = mas_client.get_positions({'ticket': 28184471})
        print(positions)
    except Exception as e:
        print(str(e))
```
---
