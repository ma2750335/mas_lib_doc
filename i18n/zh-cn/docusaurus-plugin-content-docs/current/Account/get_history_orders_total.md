---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`get_history_orders_total`

---

### 🎯 函数用途

获取指定时间区间内的**历史挂单总数**。  
可用于在调用 `get_history_orders()` 之前预估数据量，或进行摘要统计，无需获取完整的挂单明细数据。

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params` | dict | 查询条件设置字典，字段说明如下： |

#### `params`（dict）字段说明

| 字段名称 | 类型 | 必填 | 说明 |
|----------|------|------|------|
| `from`       | datetime/str  | ❌   | 起始时间（默认 `2000-01-01`）。 |
| `to`         | datetime/str  | ❌   | 结束时间（默认当前时间）。 |

---

### 📤 返回内容

| 名称     | 类型 | 备注说明 |
|----------|------|----------|
| `result` | int  | 指定时间区间内的历史挂单总数。失败或无数据时返回 `0`。 |

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

    # 查询 2025 年 6 月的历史挂单总数
    total = mas_client.get_history_orders_total({
        "from": "2025-06-01",
        "to": "2025-06-30"
    })
    print(f"六月份挂单数量：{total}")

if __name__ == "__main__":
    main()
```
---
