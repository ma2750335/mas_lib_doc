---
sidebar_position: 8
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`get_bars_from_pos`

---

### 🎯 Function Purpose

Retrieves a **fixed number of historical OHLCV bars** for a specified symbol from MT5, starting from a given **position index**.<br/>
Position `0` represents the most recent bar, while position `1` represents the previous bar, and so on.<br/>
Ideal for scenarios where absolute timestamps are not required and the latest N bars are needed for indicator calculations.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | Query parameters. |

| Field Name   | Type | Required | Description |
|--------------|------|----------|-------------|
| `symbol`     | str  | ✅       | Trading symbol (e.g., `"EURUSD"`). |
| `timeframe`  | str  | ✅       | Bar timeframe: `"M1"`, `"M5"`, `"M15"`, `"M30"`, `"H1"`, `"H4"`, `"D1"`, `"W1"`, `"MN1"`. |
| `count`      | int  | ✅       | Number of bars to retrieve. |
| `start_pos`  | int  | ❌       | Starting index from the current bar (default: `0` = latest bar). |

---

### 📤 Function Return

| Name     | Type         | Description |
|----------|--------------|-------------|
| `result` | pd.DataFrame | DataFrame of OHLCV bars, newest bar last. Returns an empty DataFrame on failure. |

| Column Name   | Type     | Description |
|---------------|----------|-------------|
| `time`        | datetime | Bar open time. |
| `open`        | float    | Open price. |
| `high`        | float    | High price. |
| `low`         | float    | Low price. |
| `close`       | float    | Close price. |
| `tick_volume` | int      | Tick count during this bar. |
| `spread`      | int      | Average spread during this bar. |
| `real_volume` | int      | Real traded volume (if available). |

Return Format:
```python
          time     open     high      low    close  tick_volume  spread  real_volume
0  2025-06-01  1.08501  1.09120  1.08350  1.08950         8432       8            0
1  2025-06-02  1.08950  1.09500  1.08800  1.09200         7651       9            0
...
```

---

### 💡 Example Code

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

    # Get the last 100 D1 bars for EURUSD
    df = mas_client.get_bars_from_pos({
        "symbol": "EURUSD",
        "timeframe": "D1",
        "count": 100
    })

    if not df.empty:
        print(f"Loaded {len(df)} bars.")
        print(df.tail(3))
    else:
        print("❌ Failed to load bar data.")

    # Get H1 bars starting from 10 bars back
    df_h1 = mas_client.get_bars_from_pos({
        "symbol": "EURUSD",
        "timeframe": "H1",
        "count": 50,
        "start_pos": 10
    })
    print(df_h1.head())

if __name__ == "__main__":
    main()
```
---
