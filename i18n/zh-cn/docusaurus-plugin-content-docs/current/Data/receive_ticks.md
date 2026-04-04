---
sidebar_position: 5
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`receive_ticks`

---

### 🎯 函数用途

接收 **Tick 数据推送**，由 `on_tick()` 回调函数触发。  

---

### 🔧 函数参数

| 参数名称 | 类型  | 备注说明 |
|----------|-------|----------|
| `symbol` | str   | 商品代码（例如 `"EURUSD"`）。 |
| `data`   | dict  | 一条 Tick 数据结构，字段说明如下： |
| `is_end` | bool  | 是否为推送结束标记（回测模式中使用）。 |

#### `data` 字段结构

| 字段名称 | 类型     | 说明 |
|----------|----------|------|
| `time`   | datetime | 数据时间戳。 |
| `bid`    | float    | 买价（Bid Price）。 |
| `ask`    | float    | 卖价（Ask Price）。 |
| `last`   | float    | 最新成交价（Last Price）。 |
| `volume` | float    | 成交量（Volume）。 |

---

### 📤 返回内容

| 名称 | 类型 | 备注说明 |
|------|------|----------|
| 无   | None | 无返回值（仅处理接收到的推送数据）。 |

---

### 💡 示例代码

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

    def receive_ticks(self, symbol, data, is_end=False):
        print(symbol, data, is_end)

def main():
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_client.login(login_params)

        #回测模式参数
        params = {
            "symbol": "EURUSD",
            "from": '2025-07-07 12:00:00',
            "to": '2025-07-07 13:00:00',
            "captital": 1000,
            "backtest_toggle": True
        }
        mas_client.subscribe_ticks(params)

        #实盘模式参数
        params = {
            "symbol": "EURUSD",
            "backtest_toggle": False
        }
        mas_client.subscribe_ticks(params)

    except Exception as e:
        print(str(e))
```
---