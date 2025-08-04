---
sidebar_position: 1
---

## 📈 Golden Cross / Death Cross Strategy

This strategy is a classic trend-following method based on technical indicators. It uses the crossover between the 5-day moving average (MA5) and the 20-day moving average (MA20) to determine entry and exit signals.

---

## 💡 Strategy Logic

- Golden Cross: When the short-term MA5 crosses above the long-term MA20 → Buy signal  
- Death Cross: When MA5 crosses below MA20 → Sell signal  

This strategy tends to produce false signals in sideways markets, but performs better in trending conditions.

---

## 🔁 Strategy Flow

```text

[On each new bar] → Calculate latest MA5 / MA20 → Check crossover conditions → Execute trade → Output reports

```

---

## 🧠 Strategy Logic Snippet (Core Implementation)

```python
if len(self.closes) >= 21:
    series = pd.Series(self.closes)
    ma_5_prev = series[-6:-1].mean()
    ma_20_prev = series[-21:-1].mean()
    ma_5_curr = series[-5:].mean()
    ma_20_curr = series[-20:].mean()

    # Golden Cross
    if ma_5_prev <= ma_20_prev and ma_5_curr > ma_20_curr and not self.hold:
        # Buy
        ...
    # Death Cross
    elif ma_5_prev >= ma_20_prev and ma_5_curr < ma_20_curr and self.hold:
        # Sell
        ...
```

---

## 🧩 Strategy Characteristics

| Item          | Description                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| Strategy Type | Trend Following                                                                                                   |
| Entry Signal  | MA5 crosses above MA20 (Golden Cross)                                                                             |
| Exit Signal   | MA5 crosses below MA20 (Death Cross)                                                                              |
| Market Type   | Forex / Stocks / Futures (must be liquid)                                                                         |
| Pros          | Simple, stable, easy to test                                                                                      |
| Cons          | Prone to false signals in consolidation phases; no built-in risk control, must implement stop-loss logic manually |

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

## 📘 MA Strategy Example

```python

import mas
import pandas as pd

class MAS_Client(mas):
    def __init__(self, toggle):
        super().__init__()
        self.toggle = toggle
        self.hold = False
        self.order_id = None
        self.closes = []  # Store close prices

    def receive_bars(self, symbol, data, is_end):
        close = data['close']
        self.closes.append(close)

        # Only proceed when we have at least 21 data points
        if len(self.closes) >= 21:
            series = pd.Series(self.closes)
            ma_5_prev = series[-6:-1].mean()     # MA5 of the previous bar
            ma_20_prev = series[-21:-1].mean()   # MA20 of the previous bar
            ma_5_curr = series[-5:].mean()       # MA5 of the current bar
            ma_20_curr = series[-20:].mean()     # MA20 of the current bar

            # Golden Cross (MA5 crosses above MA20): Buy signal
            if ma_5_prev <= ma_20_prev and ma_5_curr > ma_20_curr and not self.hold:
                self.order_id = self.send_order({
                    "symbol": symbol,
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True

            # Death Cross (MA5 crosses below MA20): Sell signal
            elif ma_5_prev >= ma_20_prev and ma_5_curr < ma_20_curr and self.hold:
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
        toggle = True  # True: backtest mode, False: live mode
        mas_c = MAS_Client(toggle)

        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_c.login(login_params)

        backtest_params = {
            "symbol": "EURUSD",
            "from": '2020-01-01',
            "to": '2024-12-31',
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