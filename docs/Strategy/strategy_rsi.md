---
sidebar_position: 2
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📈 RSI Strategy

The RSI (Relative Strength Index) is a popular momentum oscillator that measures the strength and speed of price movements, often applied in sideways or ranging markets.  
By comparing the magnitude of recent gains to recent losses, RSI helps identify whether an asset is in an **overbought** or **oversold** condition.

This strategy uses a **14-day RSI**:  
- **Buy** when RSI < 30 (oversold zone)  
- **Sell** when RSI > 70 (overbought zone)  
It is a straightforward yet effective momentum reversal approach.

---

## 💡 Strategy Logic

- **Buy Condition**:  
  - RSI is below 30 (oversold zone)  
  - No current open position  

- **Sell Condition**:  
  - RSI is above 70 (overbought zone)  
  - A position is currently held  

This contrarian-style strategy aims to capture potential reversals after excessive price moves.

---

## 🔁 Strategy Workflow

```text

[Receive historical price bars]
        ↓
[Accumulate close prices and calculate RSI]
        ↓
[Check if RSI is in overbought / oversold territory]
        ↓
[Execute buy/sell based on position status]
        ↓
[Backtest ends → Output performance reports & charts]

```

---

## 🧩 Strategy Features

| Item          | Description                                                      |
| ------------- | ---------------------------------------------------------------- |
| Strategy Type | Momentum Reversal (Contrarian Trading)                           |
| Indicator     | RSI (14-day)                                                     |
| Buy Logic     | RSI < 30 (Oversold → Buy)                                        |
| Sell Logic    | RSI > 70 (Overbought → Sell)                                     |
| Markets       | Forex / Stocks / Indices (especially effective in ranging moves) |
| Pros          | Simple, beginner-friendly, works well in consolidation phases    |
| Cons          | Poor performance in strong trending markets; needs stop-loss     |

---

## 🚀 Backtesting and Live Mode Switching

Use the `toggle` parameter to instantly switch modes:

- `True` → Backtest mode
- `False` → Live trading mode

```python

toggle = True  # Backtest mode
# toggle = False  # Live trading mode
mas_c = MAS_Client(toggle)

```

Pass the `backtest_toggle` into `subscribe_bars()`:

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

## 📘 RSI Strategy Example

```python

import mas
import pandas as pd

class MAS_Client(mas):
    def __init__(self, toggle):
        super().__init__()
        self.toggle = toggle
        self.closes = []
        self.hold = False
        self.order_id = None

    def calculate_rsi(self, series, period=14):
        delta = series.diff()
        gain = delta.where(delta > 0, 0)
        loss = -delta.where(delta < 0, 0)

        avg_gain = gain.rolling(window=period).mean()
        avg_loss = loss.rolling(window=period).mean()

        rs = avg_gain / avg_loss
        rsi = 100 - (100 / (1 + rs))
        return rsi

    def receive_bars(self, symbol, data, is_end):
        close = data["close"]
        self.closes.append(close)

        if len(self.closes) > 14:
            close_series = pd.Series(self.closes)
            rsi_series = self.calculate_rsi(close_series)
            current_rsi = rsi_series.iloc[-1]

            # Buy when RSI indicates oversold
            if current_rsi < 30 and not self.hold:
                self.order_id = self.send_order({
                    "symbol": symbol,
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True

            # Sell when RSI indicates overbought
            elif current_rsi > 70 and self.hold:
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
        toggle = True
        mas_c = MAS_Client(toggle)

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