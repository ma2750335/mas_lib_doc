---
sidebar_position: 3
---

## 📈 KD Strategy

The KD indicator (Stochastic Oscillator) is a momentum indicator used to evaluate the closing price relative to the high-low range over a specified period.

This strategy utilizes the crossover signals between the K and D lines to determine entry and exit points, combined with overbought/oversold zones to filter signals. It is commonly used for short- to mid-term swing trading.

---

## 💡 Strategy Logic

- **Buy Condition: Golden Cross + Oversold**
  - Trigger a buy when the K line crosses above the D line and K < 20 (oversold zone)

- **Sell Condition: Death Cross + Overbought**
  - Trigger a sell when the K line crosses below the D line and K > 80 (overbought zone)

- **Calculation Method:**
  - **RSV** = (Close - Lowest Low) / (Highest High - Lowest Low) × 100  
  - **K** = (Previous K × 2 + Current RSV) ÷ 3  
  - **D** = (Previous D × 2 + Current K) ÷ 3  
    *(Default period: 9 days; smoothing factor: 3 for both K and D)*

---

## 🔁 Strategy Flow

```text

[Receive historical bar data]
        ↓
[Update high / low / close prices]
        ↓
[Calculate RSV → K → D]
        ↓
[Check K and D crossover]
        ↓
[Check overbought / oversold zone]
        ↓
[Trigger buy or sell signal]
        ↓
[Backtest ends → Output KPIs and trade chart]

```

---

## 🧩 Strategy Characteristics

| Item          | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| Strategy Type | Momentum Reversal + Trend Following Hybrid                         |
| Indicator     | KD (Stochastic Oscillator)                                         |
| Buy Logic     | K crosses above D + K < 20                                         |
| Sell Logic    | K crosses below D + K > 80                                         |
| Market        | Forex / Stocks / Futures / Crypto                                  |
| Pros          | Responsive in short term; overbought/oversold filter reduces noise |
| Cons          | Prone to false signals in sideways markets; requires trend filter  |

---

## 🚀 Backtesting and Live Mode Switching

You can switch between backtesting and live trading using the `toggle` parameter:

```python

toggle = True  # Backtesting mode
# toggle = False  # Live trading mode
mas_c = MASStrategy(toggle)

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

from mas.mas import MAS
import pandas as pd

class KD_Strategy(MAS):
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
        mas_c = KD_Strategy(toggle)

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