---
sidebar_position: 4
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`subscribe_ticks`

---

### 🎯 函数用途

订阅 **指定交易品种的实时 Tick 数据**，或在回测模式中推送历史 Tick 数据。  
系统会根据 `backtest_toggle` 参数值自动切换数据来源模式：

- **True**：启用历史数据模块，按指定时间范围推送 Tick 数据  
- **False**：建立后台线程，按 `interval_ms` 间隔从 MT5 获取最新 Tick 并推送  

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params` | dict | 字典字段说明如下： |

| 参数名称        | 类型          | 必填        | 说明 |
|-----------------|---------------|------------|------|
| `symbol`        | str           | ✅        | 要订阅的交易商品代码（如 `"EURUSD"`）。 |
| `interval_ms`   | int           | ❌        | 实时模式推送间隔（毫秒），默认 `500`。 |
| `from`          | datetime/str  | ✅（回测） | 历史数据起始时间（仅在 `backtest_toggle = True` 时使用）。 |
| `to`            | datetime/str  | ✅（回测） | 历史数据结束时间（仅在 `backtest_toggle = True` 时使用）。 |
| `flags`         | int           | ❌        | Tick 数据来源类型，默认 `mt5.COPY_TICKS_ALL`（仅实时模式使用）。 |
| `mode`          | str           | ❌        | 回测 Tick 模式：`"all"`（全部）或 `"trade"`（仅成交），默认 `"all"`。 |
| `captital`　　　　| bool          | ❌        | 设置本金，默认值为`10000`(美元)。 | 
| `backtest_toggle`| bool          | ❌        | 是否启用回测模式，默认 `False`。 |

---

### 📤 返回数据内容

| 名称   | 类型 | 备注说明 |
|--------|------|----------|
| 无     | None | 此函数无返回值，仅用于触发 Tick 数据推送 |

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