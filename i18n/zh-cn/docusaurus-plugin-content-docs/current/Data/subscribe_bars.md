---
sidebar_position: 1
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`subscribe_bars`

---

### 🎯 函数用途

订阅指定交易品种的实时 **Bar（K 线）数据**，或在回测模式中发送历史 Bar 推送。  
根据 `backtest_toggle` 参数值自动切换数据来源：  

- **True**：启动历史数据模块，按时间区间推送历史 Bar 数据  
- **False**：建立后台线程，每隔 `interval_ms` 毫秒从 MT5 获取最新 Bar 并推送  

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| params   | dict | 字典字段说明如下： |

| 名称             | 类型          | 必填        | 说明 |
|------------------|---------------|------------|------|
| `symbol`         | str           | ✅        | 商品代码（例如 `"EURUSD"`）。 |
| `timeframe`      | str           | ✅        | Bar 时间周期（例如 `"M1"`、`"H1"`、`"D1"`）。 |
| `interval_ms`    | int           | ❌        | 实盘推送间隔时间（毫秒），默认 `1000`。 |
| `from`           | datetime/str  | ✅(回测)  | 历史数据起始时间（仅在 `backtest_toggle = True` 时使用）。 |
| `to`             | datetime/str  | ✅(回测)  | 历史数据结束时间（仅在 `backtest_toggle = True` 时使用）。 |
| `captital`　　　　| bool          | ❌        | 设置本金，默认值为`10000`(美元)。 | 
| `backtest_toggle`| bool          | ❌        | 是否启用回测模式，默认 `False`。 | 

**timeframe 说明：**
| ID | 说明 |
|----------|----------|
| M1 | 1 minute | 
| M2 | 2 minutes | 
| M3 | 3 minutes | 
| M4 | 4 minutes | 
| M5 | 5 minutes | 
| M6 | 6 minutes | 
| M10 | 10 minutes | 
| M12 | 12 minutes | 
| M15 | 15 minutes | 
| M20 | 20 minutes | 
| M30 | 30 minutes | 
| H1 | 1 hour | 
| H2 | 2 hours | 
| H3 | 3 hours | 
| H4 | 4 hours | 
| H6 | 6 hours | 
| H8 | 8 hours | 
| H12 | 12 hours | 
| D1 | 1 day | 
| W1 | 1 week | 
| MN1 | 1 month | 

---

### 📤 返回数据内容

| 名称   | 类型 | 备注说明 |
|--------|------|----------|
| 无     | None | 无返回值，仅用于触发 Bar 数据推送 |

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