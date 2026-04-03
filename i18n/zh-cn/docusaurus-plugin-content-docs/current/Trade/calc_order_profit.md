---
sidebar_position: 7
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`calc_order_profit`

---

### 🎯 函数用途

计算指定订单的**预估盈亏金额**，不实际执行下单。  
可用于在下单前预估潜在盈亏、设置合理的止盈/止损目标，或进行风险收益比分析。

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params` | dict | 盈亏计算参数字典。 |

| dict 字段名称  | 类型  | 必填 | 说明 |
|---------------|-------|------|------|
| `action`      | str   | ✅   | 交易方向：`"buy"` 或 `"sell"`。 |
| `symbol`      | str   | ✅   | 商品代码（如 `"EURUSD"`）。 |
| `volume`      | float | ✅   | 下单手数。 |
| `price_open`  | float | ✅   | 开仓价格。 |
| `price_close` | float | ✅   | 预计平仓价格。 |

---

### 📤 返回数据内容

| 名称     | 类型  | 备注说明 |
|----------|-------|----------|
| `result` | float | 预估盈亏金额（账户计价货币）。失败时返回 `-1.0`。 |

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

    # 计算买入 0.1 手 EURUSD，开仓 1.09500 平仓 1.10000 的预估盈亏
    profit = mas_client.calc_order_profit({
        "action": "buy",
        "symbol": "EURUSD",
        "volume": 0.1,
        "price_open": 1.09500,
        "price_close": 1.10000
    })

    if profit != -1.0:
        print(f"预估盈亏：{profit:.2f} USD")
    else:
        print("❌ 盈亏计算失败。")

if __name__ == "__main__":
    main()
```
---
