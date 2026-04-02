---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`get_symbols`

---

### 🎯 函数用途

获取连接的 MT5 终端中所有**可用商品列表**。  
支持按 group 样式过滤（如 `"*USD*"` 获取所有含 USD 的商品）。  
每条结果包含商品名称、精度、点差、交易量限制及货币信息等元数据。

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params` | dict | 选填。过滤条件字典，传入 `{}` 获取所有商品。 |

| dict 字段名称 | 类型 | 必填 | 说明 |
|--------------|------|------|------|
| `group`      | str  | ❌   | 商品分组通配符样式（如 `"*USD*"`、`"Forex*"`）。 |

---

### 📤 返回数据内容

| 名称     | 类型        | 备注说明 |
|----------|------------|----------|
| `result` | list[dict] | 商品信息字典列表，失败时返回空列表。 |

| 字段名称              | 类型  | 说明 |
|-----------------------|-------|------|
| `name`                | str   | 商品代码（如 `"EURUSD"`）。 |
| `description`         | str   | 商品完整描述。 |
| `digits`              | int   | 报价小数位数。 |
| `point`               | float | 最小报价变动单位（tick size）。 |
| `spread`              | int   | 当前点差（以点为单位）。 |
| `trade_contract_size` | float | 合约规格（如标准外汇手为 `100000`）。 |
| `volume_min`          | float | 最小允许交易量。 |
| `volume_max`          | float | 最大允许交易量。 |
| `volume_step`         | float | 交易量递增单位。 |
| `currency_base`       | str   | 基础货币（如 `"EUR"`）。 |
| `currency_profit`     | str   | 盈利计算货币（如 `"USD"`）。 |
| `trade_mode`          | int   | 交易模式（如完整交易、仅平仓等）。 |

返回格式如下：
```python
[
    {
        "name": "EURUSD",
        "description": "Euro vs US Dollar",
        "digits": 5,
        "point": 1e-05,
        "spread": 8,
        "trade_contract_size": 100000.0,
        "volume_min": 0.01,
        "volume_max": 500.0,
        "volume_step": 0.01,
        "currency_base": "EUR",
        "currency_profit": "USD",
        "trade_mode": 4
    },
    ...
]
```

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

    # 获取所有商品
    all_symbols = mas_client.get_symbols()
    print(f"商品总数：{len(all_symbols)}")

    # 仅获取含 USD 的商品
    usd_symbols = mas_client.get_symbols({"group": "*USD*"})
    for s in usd_symbols:
        print(s["name"], s["digits"])

if __name__ == "__main__":
    main()
```
---
