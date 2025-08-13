---
sidebar_position: 1
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📈 Golden Cross / Death Cross Strategy

This strategy is a classic **trend-following** trading model that identifies market direction by tracking crossovers between the short-term 5-day moving average (MA5) and the long-term 20-day moving average (MA20).  
It is widely used in Forex, stock, and futures markets where sufficient liquidity exists.

---

## 💡 Strategy Logic

- **Golden Cross**: When MA5 crosses above MA20, it signals a potential bullish trend shift → trigger a buy entry.  
- **Death Cross**: When MA5 crosses below MA20, it signals a potential bearish trend shift → trigger a sell or exit.  

While this approach can generate false signals during sideways or choppy markets, it often performs well in strong trending conditions.

---

## 🔁 Strategy Flow

```text

[New bar update] → [Calculate MA5 & MA20] → [Check for crossover] → [Execute entry/exit] → [Generate performance report]

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

| Item          | Description                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| Strategy Type | Trend Following                                                                                        |
| Entry Signal  | MA5 crosses above MA20 (Golden Cross)                                                                  |
| Exit Signal   | MA5 crosses below MA20 (Death Cross)                                                                   |
| Markets       | Forex / Stocks / Futures (requires good liquidity)                                                     |
| Pros          | Clear rules, simple to implement, and easy to backtest                                                 |
| Cons          | Vulnerable to whipsaws in range-bound markets; requires additional stop-loss and risk management logic |

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