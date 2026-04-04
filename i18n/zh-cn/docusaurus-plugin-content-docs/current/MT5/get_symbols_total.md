---
sidebar_position: 6
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`get_symbols_total`

---

### 🎯 函数用途

获取 MT5 终端中所有**可用商品的总数量**。

---

### 🔧 函数参数

此函数不需要任何参数。

---

### 📤 返回内容

| 名称     | 类型 | 备注说明 |
|----------|------|----------|
| `result` | int  | 可用商品总数。失败时返回 `0`。 |

---

### 💡 示例代码

```python
import mas

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

    total = mas_client.get_symbols_total()
    print(f"MT5 商品总数：{total}")

if __name__ == "__main__":
    main()
```
---
