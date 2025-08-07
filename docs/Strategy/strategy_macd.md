---
sidebar_position: 4
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📈 MACD Strategy

MACD (Moving Average Convergence Divergence) is a classic trend-following indicator that detects bullish or bearish momentum based on the crossover between short- and long-term moving averages.

---

## 💡 Strategy Logic

- **MACD Line Calculation**
  - The difference between the fast EMA(12) and slow EMA(26) forms the MACD Line.
  - The Signal Line is the EMA(9) of the MACD Line.

- **Buy Condition: Golden Cross**
  - MACD Line crosses above the Signal Line
  - No current position → Trigger buy

- **Sell Condition: Death Cross**
  - MACD Line crosses below the Signal Line
  - Position held → Trigger sell

- **Histogram**
  - Represents the difference between MACD and Signal Line, used to help filter noise

---

## 🔁 Strategy Flow

```text

[Receive historical candlestick data]
        ↓
[Calculate EMA(12) and EMA(26)]
        ↓
[Calculate MACD Line and Signal Line]
        ↓
[Detect crossover → Golden Cross or Death Cross]
        ↓
[Place Buy/Sell Orders]
        ↓
[Backtest ends → Output KPIs and trade chart]

```

---

## 🧩 Strategy Characteristics

| Item          | Description                                                                               |
| ------------- | ----------------------------------------------------------------------------------------- |
| Strategy Type | Trend-following                                                                           |
| Indicator     | MACD (12,26,9)                                                                            |
| Buy Logic     | MACD crosses above Signal                                                                 |
| Sell Logic    | MACD crosses below Signal                                                                 |
| Market        | Forex / Stocks / Index / Futures                                                          |
| Pros          | Trend-following, filters out noise, works for both short and long term                    |
| Cons          | May produce delayed signals during sideways markets; should be used with other mechanisms |

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

## 📘 MACD Strategy Example

```python

import mas
import pandas as pd

class MACD_Strategy(MAS):
    def __init__(self, toggle):
        super().__init__()
        self.toggle = toggle
        self.closes = []
        self.hold = False
        self.order_id = None

    def calculate_macd(self, fast=12, slow=26, signal=9):
        if len(self.closes) < slow + signal:
            return None, None, None

        series = pd.Series(self.closes)
        ema_fast = series.ewm(span=fast, adjust=False).mean()
        ema_slow = series.ewm(span=slow, adjust=False).mean()

        macd_line = ema_fast - ema_slow
        signal_line = macd_line.ewm(span=signal, adjust=False).mean()
        histogram = macd_line - signal_line

        return macd_line.iloc[-2:], signal_line.iloc[-2:], histogram.iloc[-2:]

    def receive_bars(self, symbol, data, is_end):
        close = data["close"]
        self.closes.append(close)

        macd_vals = self.calculate_macd()
        if macd_vals is not None:
            macd_line, signal_line, hist = macd_vals

            # Previous and current values
            macd_prev, macd_curr = macd_line.iloc[0], macd_line.iloc[1]
            sig_prev, sig_curr = signal_line.iloc[0], signal_line.iloc[1]

            # Golden Cross: MACD crosses above Signal
            if macd_prev <= sig_prev and macd_curr > sig_curr and not self.hold:
                self.order_id = self.send_order({
                    "symbol": symbol,
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True

            # Death Cross: MACD crosses below Signal
            elif macd_prev >= sig_prev and macd_curr < sig_curr and self.hold:
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
        mas_c = MACD_Strategy(toggle)

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