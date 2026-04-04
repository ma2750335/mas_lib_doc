---
sidebar_position: 6
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`unsubscribe_ticks`

---

### 🎯 函数用途

取消指定品种的**实时 Tick（逐笔成交）数据订阅**，仅适用于**实盘模式**。  
执行该函数后，系统将终止内部后台订阅线程，并停止该品种的实时行情更新。  
不再需要实时 Tick 数据时请调用该函数，以避免不必要的资源占用。

---

### 🔧 函数参数

| 参数名称 | 类型  | 备注说明 |
|----------|-------|----------|
| `params`   | dict  | 查询条件设置字典，字段说明如下： |

#### `params`（dict）字段说明

| 字段名称 | 类型 | 必填 | 说明 |
|----------|------|------|------|
| `symbol` | str | ✅ | 要取消订阅的交易商品代码（如 `"EURUSD"`）。 |

---

### 📤 返回内容

| 名称   | 类型 | 备注说明                            |
|--------|------|-------------------------------------|
| 无     | None | 此函数无返回值，调用后即停止指定品种的 Tick 数据订阅。 |

---

### 💡 示例代码

```python
import time
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

        params = {
            "symbol": "EURUSD",
            "backtest_toggle": False,
        }
        mas_client.subscribe_ticks(params)
        time.sleep(10)
        mas_client.unsubscribe_ticks(params)
    except Exception as e:
        print(str(e))
```
---

