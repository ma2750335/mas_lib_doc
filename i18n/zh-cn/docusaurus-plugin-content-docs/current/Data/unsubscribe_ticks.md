---
sidebar_position: 6
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`unsubscribe_ticks`

---

### 🎯 函数用途

取消指定品种的实时 Tick（逐笔成交）数据订阅，适用于实盘模式。  
执行此函数会终止内部后台订阅线程，并关闭对该品种的实时报价监控。

---

### 🔧 函数参数

| 参数名称 | 类型  | 备注说明 |
|----------|-------|----------|
| params   | dict  | symbol（str）：要取消订阅的商品代码。 |

---

### 📤 返回数据内容

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

