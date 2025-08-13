---
sidebar_position: 3
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📈 KD Strategy

The KD indicator (Stochastic Oscillator) is a momentum-based technical analysis tool that measures the closing price’s position within a specified period’s high-low range.  
This strategy combines K–D line crossovers with overbought/oversold zone filters, making it a popular choice for short- to mid-term swing trading.

---

## 💡 Strategy Logic

- **Buy Condition: Golden Cross + Oversold Zone**  
  - Enter a long position when the K line crosses above the D line and K < 20, indicating a potential bullish reversal from oversold conditions.

- **Sell Condition: Death Cross + Overbought Zone**  
  - Exit or go short when the K line crosses below the D line and K > 80, signaling a potential bearish reversal from overbought levels.

- **Calculation Formula:**  
  - **RSV** = (Close − Lowest Low) ÷ (Highest High − Lowest Low) × 100  
  - **K** = (Previous K × 2 + Current RSV) ÷ 3  
  - **D** = (Previous D × 2 + Current K) ÷ 3  
    *(Default period: 9 days; smoothing factor = 3 for both K and D)*

---

## 🔁 Strategy Flow

```text

[Receive historical OHLC data]
        ↓
[Update highest / lowest / closing prices]
        ↓
[Calculate RSV → K → D]
        ↓
[Check for K–D crossover]
        ↓
[Determine if within overbought / oversold zones]
        ↓
[Trigger buy or sell signal]
        ↓
[End of backtest → Generate KPI metrics & trade chart]

```

---

## 🧩 Strategy Characteristics

| Item          | Description                                                                        |
| ------------- | ---------------------------------------------------------------------------------- |
| Strategy Type | Momentum Reversal + Trend-Following Hybrid                                         |
| Indicator     | KD (Stochastic Oscillator)                                                         |
| Buy Logic     | K crosses above D with K < 20                                                      |
| Sell Logic    | K crosses below D with K > 80                                                      |
| Markets       | Forex / Stocks / Futures / Cryptocurrency                                          |
| Pros          | Fast reaction for short-term trades; overbought/oversold filter helps reduce noise |
| Cons          | Susceptible to false signals in choppy markets; benefits from a trend filter       |

---

## 🚀 Backtesting and Live Mode Switching

Use the `toggle` parameter to instantly switch modes:

- `True` → Backtest mode
- `False` → Live trading mode

```python

toggle = True  # Backtesting mode
# toggle = False  # Live trading mode
mas_c = MAS_Client(toggle)

```

Pass `backtest_toggle` into `subscribe_bars()`:

```python

params = {
    "symbol": "EURUSD",
    "from": "2020-01-01",
    "to": "2024-12-31",
    "timeframe": "D1",
    "backtest_toggle": mas_c.toggle
}

```

---

## 📊 Output Reports

After execution, the following will be generated automatically:

- Full trading record report (`generate_data_report()`)

- KPI performance report (`generate_kpi_report()`)

- Visualized trading chart (`generate_trade_chart()`)

---

## 📘 KD Strategy Example

```python

import mas
import pandas as pd

class MAS_Client(mas):
    def __init__(self, toggle):
        super().__init__()
        self.toggle = toggle
        self.hold = False
        self.order_id = None

        self.highs = []
        self.lows = []
        self.closes = []

        # Initial K and D values
        self.prev_k = 50
        self.prev_d = 50

    def calculate_kd(self, period=9, k_smooth=3, d_smooth=3):
        if len(self.closes) < period:
            return None, None

        # Calculate RSV
        high_max = max(self.highs[-period:])
        low_min = min(self.lows[-period:])
        close = self.closes[-1]

        rsv = 50 if high_max == low_min else (close - low_min) / (high_max - low_min) * 100

        # Calculate smoothed K and D
        k = (self.prev_k * (k_smooth - 1) + rsv) / k_smooth
        d = (self.prev_d * (d_smooth - 1) + k) / d_smooth

        self.prev_k = k
        self.prev_d = d
        return k, d

    def receive_bars(self, symbol, data, is_end):
        high = data["high"]
        low = data["low"]
        close = data["close"]

        self.highs.append(high)
        self.lows.append(low)
        self.closes.append(close)

        k, d = self.calculate_kd()

        if k is not None and d is not None:
            # Golden Cross: K crosses above D and in oversold zone
            if self.prev_k <= self.prev_d and k > d and k < 20 and not self.hold:
                self.order_id = self.send_order({
                    "symbol": symbol,
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True

            # Death Cross: K crosses below D and in overbought zone
            elif self.prev_k >= self.prev_d and k < d and k > 80 and self.hold:
                self.send_order({
                    "symbol": symbol,
                    "order_type": "sell",
                    "order_id": self.order_id,
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = False

        if is_end:
            data = self.generate_data_report()
            print(data.get("data"))
            self.generate_kpi_report()
            self.generate_trade_chart()

def main():
    try:
        toggle = True  # True = Backtest, False = Live
        mas_c = MAS_Client(toggle)

        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_c.login(login_params)

        backtest_params = {
            "symbol": "EURUSD",
            "from": "2020-01-01",
            "to": "2024-12-31",
            "timeframe": "D1",
            "backtest_toggle": mas_c.toggle
        }
        mas_c.subscribe_bars(backtest_params)

    except Exception as e:
        return {
            'status': False,
            'error': str(e)
        }

if __name__ == "__main__":
    main()

```

---