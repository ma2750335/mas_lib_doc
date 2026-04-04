---
sidebar_position: 8
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`modify_position_sltp`

---

### 🎯 函数用途

修改**已持仓仓位**的止损（SL）和/或止盈（TP）价格。  
`sl` 与 `tp` 至少需提供一个。  
执行该函数后，系统将通过 MT5 的 `TRADE_ACTION_SLTP` 更新仓位设置，不会进行平仓或重新开仓。

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params` | dict | 查询条件设置字典，字段说明如下： |

#### `params`（dict）字段说明

| 字段名称 | 类型 | 必填 | 说明 |
|----------|------|------|------|
| `position_id`| int   | ✅   | 要修改持仓的 ticket ID。 |
| `sl`         | float | ❌*  | 新止损价格。`sl` 或 `tp` 至少须填一个。 |
| `tp`         | float | ❌*  | 新止盈价格。`sl` 或 `tp` 至少须填一个。 |

> ❌* `sl` 与 `tp` 至少须提供一个，两者均未填则返回错误。

---

### 📤 返回内容

| 名称     | 类型 | 备注说明 |
|----------|------|----------|
| `result` | bool | 修改成功返回 `True`，否则返回 `False`。 |

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

    # 同时修改 SL 与 TP
    success = mas_client.modify_position_sltp({
        "position_id": 123456789,
        "sl": 1.08000,
        "tp": 1.10500
    })

    if success:
        print("✅ SL/TP 修改成功。")
    else:
        print("❌ SL/TP 修改失败。")

    # 仅修改止损（移至保本点）
    mas_client.modify_position_sltp({
        "position_id": 123456789,
        "sl": 1.09000
    })

if __name__ == "__main__":
    main()
```
---
