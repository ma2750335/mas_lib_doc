---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`calc_order_margin`

---

### 🎯 函数用途

计算指定订单所需的**保证金金额**，不实际下单。  
可在下单前预先确认账户是否有足够的可用保证金，或在策略中构建保证金感知的仓位管理逻辑。

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params` | dict | 保证金计算参数字典。 |

| dict 字段名称 | 类型  | 必填 | 说明 |
|--------------|-------|------|------|
| `action`     | str   | ✅   | 交易方向：`"buy"` 或 `"sell"`。 |
| `symbol`     | str   | ✅   | 商品代码（如 `"EURUSD"`）。 |
| `volume`     | float | ✅   | 下单手数。 |
| `price`      | float | ✅   | 订单价格（市价单请使用当前市场价格）。 |

---

### 📤 返回数据内容

| 名称     | 类型  | 备注说明 |
|----------|-------|----------|
| `result` | float | 所需保证金金额（账户计价货币）。失败时返回 `-1.0`。 |

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

    margin = mas_client.calc_order_margin({
        "action": "buy",
        "symbol": "EURUSD",
        "volume": 0.1,
        "price": 1.09500
    })

    if margin != -1.0:
        print(f"所需保证金：{margin:.2f} USD")
    else:
        print("❌ 保证金计算失败。")

    # 动态仓位管理：以可用保证金的 30% 为上限
    account = mas_client.get_account_info()
    free_margin = account.get("margin_free", 0)
    target_lots = 0.01
    while True:
        m = mas_client.calc_order_margin({
            "action": "buy", "symbol": "EURUSD",
            "volume": target_lots + 0.01, "price": 1.09500
        })
        if m > free_margin * 0.3:
            break
        target_lots += 0.01
    print(f"最大安全手数：{target_lots:.2f}")

if __name__ == "__main__":
    main()
```
---
