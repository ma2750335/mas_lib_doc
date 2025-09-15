---
sidebar_position: 3
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`unsubscribe_bars`

---

### 🎯 函数用途

取消指定交易品种的**实时 Bar（K 线）数据订阅**，仅适用于**实盘模式**。  
执行此函数后，系统会终止内部后台订阅线程，并关闭对该品种的实时报价与 K 线更新监控。  

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| params   | dict | 字典字段说明如下： |

| dict 字段名称 | 类型 | 备注说明 |
|---------------|------|----------|
| `symbol`     | str  | 商品代码（例如 `"EURUSD"`）。 |
| `timeframe`  | str  | Bar 时间周期（例如 `"M1"`、`"H1"`、`"D1"`）。 |

---

### 📤 返回数据内容

| 名称   | 类型  | 备注说明                             |
|--------|------|--------------------------------------|
| None   | None | 此函数无返回值，执行后即停止指定品种的 Bar 订阅。 |

---

### 💡 示例代码

```python
import time
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

        params = {
            "symbol": "EURUSD",
            "timeframe": "M1",
            "backtest_toggle": False
        }
        mas_client.subscribe_bars(params)
        time.sleep(120)
        mas_client.unsubscribe_bars(params)
    except Exception as e:
        print(str(e))
```
---