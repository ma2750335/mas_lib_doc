---
sidebar_position: 2
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`receive_bars`

---

### 🎯 函数用途

接收 **Bar（K 线）数据推送**，由 `on_bar()` 回调函数触发。  

---

### 🔧 函数参数

| 参数名称 | 类型  | 备注说明 |
|----------|-------|----------|
| `symbol` | str   | 商品代码（例如 `"EURUSD"`）。 |
| `data`   | dict  | 单笔 Bar 结构数据，字段说明如下： |
| `is_end` | bool  | 是否为推送结束标记（回测模式中使用）。 |

**`data` 字段结构**：  
| 字段名称   | 类型     | 说明 |
|------------|----------|------|
| `time`      | datetime | Bar 起始时间。 |
| `open`      | float    | 开盘价。 |
| `high`      | float    | 最高价。 |
| `low`       | float    | 最低价。 |
| `close`     | float    | 收盘价。 |
| `volume`    | float    | 成交量。 |
| `timeframe` | str      | Bar 的时间周期（如 `"M1"`、`"H1"`、`"D1"`）。 |

---

### 📤 返回数据内容

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

    def receive_bars(self, symbol, data, is_end=False):
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
            "timeframe": "M1",
            "from": '2024-01-01',
            "to": '2024-12-31',
            "captital": 1000,
            "backtest_toggle": True
        }
        mas_client.subscribe_bars(params)

        #实盘模式参数
        params = {
            "symbol": "EURUSD",
            "timeframe": "M1",
            "backtest_toggle": False
        }
        mas_client.subscribe_bars(params)

    except Exception as e:
        print(str(e))
```
---