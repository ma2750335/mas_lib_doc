---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`unsubscribe_market_book`

---

### 🎯 函数用途

取消指定商品的**市场深度（DOM）订阅**，释放 MT5 内部资源。  
请在不再需要委托簿数据时调用此函数，避免资源占用。

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params` | dict | 指定目标商品的字典。 |

| dict 字段名称 | 类型 | 必填 | 说明 |
|--------------|------|------|------|
| `symbol`     | str  | ✅   | 要取消订阅市场深度的商品代码（如 `"EURUSD"`）。 |

---

### 📤 返回数据内容

| 名称     | 类型 | 备注说明 |
|----------|------|----------|
| `result` | bool | 取消成功返回 `True`，否则返回 `False`。 |

---

### 💡 示例代码

```python
import mas
import time

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

    symbol = "EURUSD"
    mas_client.subscribe_market_book({"symbol": symbol})
    time.sleep(1)

    # 取消订阅
    result = mas_client.unsubscribe_market_book({"symbol": symbol})
    if result:
        print("✅ 已取消市场深度订阅。")
    else:
        print("❌ 取消订阅失败。")

if __name__ == "__main__":
    main()
```
---
