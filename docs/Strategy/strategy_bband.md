---
sidebar_position: 5
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📈 BBAND  Strategy

Bollinger Bands (BBands) is a volatility-based technical analysis tool that uses standard deviation to determine price range and market conditions.  
This strategy applies the middle, upper, and lower bands to identify entry and exit opportunities, representing a classic **mean reversion** trading model that works best in sideways markets.

---

## 💡 Strategy Logic

- **Middle Band**: Moving average of the past N closing prices (default N = 20)  
- **Upper Band**: Middle Band + K × Standard Deviation (default K = 2)  
- **Lower Band**: Middle Band − K × Standard Deviation (default K = 2)  

**Entry & Exit Rules**:  
- **Buy**: Close price ≤ Lower Band → Interpreted as oversold → Enter long position  
- **Sell**: Close price ≥ Upper Band → Interpreted as overbought → Exit long / enter short position  

This is a **reversion-to-mean** strategy, assuming price will revert toward its average value, making it effective in ranging or consolidating markets.

---

## 🔁 Strategy Flow

```text

[Receive historical candlestick data]
        ↓
[Calculate Middle, Upper, Lower Bands]
        ↓
[Close ≤ Lower Band → Buy]
        ↓
[Close ≥ Upper Band → Sell]
        ↓
[End of backtest → Generate KPI & trade chart]

```

---

## 🧩 Strategy Characteristics

| Item          | Description                                                                             |
| ------------- | --------------------------------------------------------------------------------------- |
| Strategy Type | Mean Reversion                                                                          |
| Indicator     | Bollinger Bands (20, 2)                                                                 |
| Buy Logic     | Close ≤ Lower Band                                                                      |
| Sell Logic    | Close ≥ Upper Band                                                                      |
| Markets       | Forex / Stocks / Indices / Range-bound instruments                                      |
| Pros          | Simple and intuitive, responsive in sideways conditions                                 |
| Cons          | Risk of consecutive losses in strong trending markets without stop-loss or trend filter |

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

Pass `backtest_toggle` into `subscribe_bars()` :

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

## 📘 bband Strategy Example

```python

import mas
import pandas as pd

class MAS_Client(mas):
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
        mas_c = MAS_Client(toggle, period=20, std_k=2)

        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_c.login(login_params)

        params = {
            "symbol": "EURUSD",
            "from": '2020-01-01',
            "to": '2024-12-31',
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