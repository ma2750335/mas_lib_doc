---
sidebar_position: 5
---

## 📈 BBAND  Strategy

Bollinger Bands (BBands) is a volatility-based technical indicator that uses standard deviation to assess price range and market status.  
This strategy utilizes the middle, upper, and lower bands to determine entry and exit points, representing a typical **mean reversion** model.

---

## 💡 Strategy Logic

- **Middle Band**:  
  - Moving average of the past N closing prices (default N = 20)

- **Upper Band**:  
  - Middle Band + K × Standard Deviation (default K = 2)

- **Lower Band**:  
  - Middle Band − K × Standard Deviation (default K = 2)

- **Buy Condition**:  
  - Close price ≤ Lower Band → Price is considered oversold → Trigger Buy

- **Sell Condition**:  
  - Close price ≥ Upper Band → Price is considered overbought → Trigger Sell

This is a **reversion strategy**, assuming prices tend to return to the mean, ideal for sideways or range-bound markets.

---

## 🔁 Strategy Flow

```text

[Receive historical candlestick data]
        ↓
[Calculate Moving Average and Standard Deviation → Bands]
        ↓
[Check if close price touches Lower Band → Buy]
        ↓
[Check if close price touches Upper Band → Sell]
        ↓
[Backtest ends → Output KPI and trade chart]

```

---

## 🧩 Strategy Characteristics

| Item          | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| Strategy Type | Mean Reversion                                                    |
| Indicator     | Bollinger Bands (20, 2)                                           |
| Buy Logic     | Close price ≤ Lower Band                                          |
| Sell Logic    | Close price ≥ Upper Band                                          |
| Applicable To | Forex / Stocks / Index / Range-bound instruments                  |
| Pros          | Simple and intuitive, works well in range-bound conditions        |
| Cons          | May incur continuous losses in trending markets without stop-loss |

---

## 🚀 Backtesting and Live Mode Switching

You can switch between backtesting and live trading using the `toggle` parameter:

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

class BBand_Strategy(MAS):
    def __init__(self, toggle, period=20, std_k=2):
        super().__init__()
        self.toggle = toggle
        self.period = period
        self.std_k = std_k
        self.closes = []
        self.hold = False
        self.order_id = None

    def calculate_bbands(self):
        if len(self.closes) < self.period:
            return None, None, None

        series = pd.Series(self.closes)
        mid = series.rolling(window=self.period).mean().iloc[-1]
        std = series.rolling(window=self.period).std().iloc[-1]

        upper = mid + self.std_k * std
        lower = mid - self.std_k * std
        return lower, mid, upper

    def receive_bars(self, symbol, data, is_end):
        close = data["close"]
        self.closes.append(close)

        bbands = self.calculate_bbands()
        if bbands is not None:
            lower, mid, upper = bbands

            # Buy at Lower Band
            if close <= lower and not self.hold:
                self.order_id = self.send_order({
                    "symbol": symbol,
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True

            # Sell at Upper Band
            elif close >= upper and self.hold:
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
        mas_c = BBand_Strategy(toggle, period=20, std_k=2)

        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_c.login(login_params)

        params = {
            "symbol": "EURUSD",
            "from": '2020-01-01',
            "to': '2024-12-31',
            "timeframe": "D1",
            "backtest_toggle": mas_c.toggle
        }
        mas_c.subscribe_bars(params)

    except Exception as e:
        return {
            'status': False,
            'error': str(e)
        }

if __name__ == "__main__":
    main()

```

---