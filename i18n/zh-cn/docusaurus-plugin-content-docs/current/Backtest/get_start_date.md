---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`get_start_date`

---

### 🎯 函数用途

根据**结束日期**与所需的 **K 棒数量**，计算回测的**起始日期**。  
目前仅支持 **`D1`（日线）** 周期。

以每周 5 个交易日为计算基准，并向上取整为完整周数，确保即使起始日落在周末或假日前后，仍能覆盖足够的 K 棒数量。

常见用法：将计算结果直接作为 `subscribe_bars()` 的 `from` 参数，确保指标预热所需的历史数据充足。

---

### 🔧 函数参数

| 参数名称    | 类型 | 备注说明 |
|-------------|------|----------|
| `to_date`   | str  | 回测结束日期，格式为 `"YYYY-MM-DD"`。 |
| `timeframe` | str  | 时间周期字符串，目前仅支持 `"D1"`（日线）。 |
| `kbar_num`  | int  | 所需的 K 棒数量（以交易日计算）。 |

---

### 📤 返回内容

| 名称     | 类型 | 备注说明 |
|----------|------|----------|
| `result` | str  | 计算出的回测起始日期，格式为 `"YYYY-MM-DD"`。 |

> ⚠️ 若 `timeframe` 不为 `"D1"` 将抛出 `ValueError`。

---

### 💡 示例代码

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

    def receive_bars(self, symbol, data, is_end):
        print(data["time"], data["close"])

def main():
    mas_client = MAS_Client()
    mas_client.login({
        "account": "YOUR_ACCOUNT",
        "password": "YOUR_PASSWORD",
        "server": "YOUR_SERVER"
    })

    to_date = "2025-06-30"
    timeframe = "D1"
    kbar_num = 250  # 约 1 年交易日

    start_date = mas_client.get_start_date(to_date, timeframe, kbar_num)
    print(f"回测区间：{start_date} ~ {to_date}")

    # 直接传入 subscribe_bars
    mas_client.subscribe_bars({
        "symbol": "EURUSD",
        "timeframe": timeframe,
        "from": start_date,
        "to": to_date,
        "backtest_toggle": True
    })

if __name__ == "__main__":
    main()
```

---

### 📐 计算逻辑说明

| 输入 | 数值 |
|------|------|
| `kbar_num` | 需要 250 个交易日 |
| 每周交易日数 | 5 天 |
| 所需周数（进位） | 50 周 |
| 换算日历天数 | 50 × 7 = 350 天 |
| `to_date` | 2025-06-30 |
| **计算出的起始日** | **2024-07-15** |

函数永远向上取整至完整周数，避免起始处遗漏 K 棒。

---
