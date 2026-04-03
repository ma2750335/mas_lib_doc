---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`get_start_date`

---

### 🎯 Function Purpose

Calculates the **backtest start date** based on an end date and the number of K-bars required.<br/>
Currently supports the **`D1` (daily) timeframe only**.<br/>
The calculation assumes **5 trading days per calendar week**, and always rounds up to complete weeks to ensure the required number of bars is covered even when the start date falls on a weekend or holiday.<br/>
Typical use case: pass the result directly as the `from` parameter in `subscribe_bars()` to guarantee enough historical data for indicator warm-up.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `to_date`      | str  | End date of the backtest period, in `"YYYY-MM-DD"` format. |
| `timeframe`    | str  | Timeframe string. Currently only `"D1"` (daily) is supported. |
| `kbar_num`     | int  | Number of K-bars (trading days) required for the backtest. |

---

### 📤 Function Return

| Name     | Type | Description |
|----------|------|-------------|
| `result` | str  | Calculated start date in `"YYYY-MM-DD"` format. |

> ⚠️ Raises `ValueError` if `timeframe` is not `"D1"`.

---

### 💡 Example Code

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

    def receive_bars(self, symbol, data, is_end):
        # Your strategy logic here
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
    kbar_num = 250  # ~1 year of trading days

    start_date = mas_client.get_start_date(to_date, timeframe, kbar_num)
    print(f"Backtest from {start_date} to {to_date}")
    # Output: Backtest from 2024-07-01 to 2025-06-30

    # Use directly in subscribe_bars
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

### 📐 Calculation Logic

| Input | Value |
|-------|-------|
| `kbar_num` | 250 trading days needed |
| Trading days per week | 5 |
| Weeks required (ceil) | 50 weeks |
| Calendar days to subtract | 50 × 7 = 350 days |
| `to_date` | 2025-06-30 |
| **Resulting start date** | **2024-07-15** |

The function always rounds **up** to whole weeks to avoid missing bars near the start of the range.

---
