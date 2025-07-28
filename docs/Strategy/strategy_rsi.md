---
sidebar_position: 2
---

## 📈 RSI Strategy

The RSI (Relative Strength Index) is a momentum oscillator used to measure the speed and change of price movements, commonly applied in ranging markets. By comparing the magnitude of recent gains to recent losses, the RSI indicates whether an asset is overbought or oversold.

This strategy is based on a 14-day RSI. It issues a buy signal when RSI < 30 (oversold) and a sell signal when RSI > 70 (overbought), making it a simple yet practical momentum reversal strategy.

---

## 💡 Strategy Logic

- **Buy Conditions**:
  - RSI is below 30 (oversold zone)
  - No current open position

- **Sell Conditions**:
  - RSI is above 70 (overbought zone)
  - A position is currently held

This strategy follows a contrarian approach, aiming to profit from potential rebounds after excessive price deviations.

---

## 🔁 Strategy Workflow

```text

[Receive historical bar data]
    ↓
[Accumulate closing prices and calculate RSI]
    ↓
[Check if RSI is overbought or oversold]
    ↓
[Check position status → Execute buy or sell order]
    ↓
[Continue updating → Output reports and charts when backtest ends]

Internally, the strategy uses 14 bars to calculate RSI, and processes data one bar at a time using MAS SDK’s receive_bars method.

```

---

## 🧩 Strategy Features

| Item        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| Type        | Momentum Reversal Strategy (Contrarian Trading)              |
| Indicator   | RSI (14-day)                                                 |
| Entry Logic | RSI < 30 (Buy)                                               |
| Exit Logic  | RSI > 70 (Sell)                                              |
| Applicable  | Forex / Stocks / Indices (Ideal for sideway market)          |
| Pros        | Simple and beginner-friendly; effective in ranging markets   |
| Cons        | Not suitable for strong trends; requires stop-loss mechanism |

---

## 🚀 Backtest vs. Live Mode Toggle

You can toggle between backtest and live trading using the `toggle` parameter:

```python

toggle = True  # Backtest mode
# toggle = False  # Live trading mode
mas_c = MASStrategy(toggle)

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

from mas.mas import MAS
import pandas as pd

class RSI_Strategy(MAS):
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
        mas_c = RSI_Strategy(toggle)

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