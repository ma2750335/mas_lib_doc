## 📘 What is Backtesting?

Before engaging in any automated trading, **backtesting** is an essential step. By simulating a trading strategy using historical data, we can:

- Verify if the strategy is profitable  
- Test the performance across different market conditions  
- Calculate risk metrics (e.g., max drawdown, win rate, Sharpe ratio)  
- Save time and reduce risk compared to real trading

---

## 🔧 How does MAS SDK perform backtesting?

MAS SDK provides a simple way to run backtesting. Just extend the `MAS` class and override the `receive_bars` method to implement your logic.

Here’s a basic moving average strategy backtesting example:

```python
import mas

class MAS_Client(mas):
    def __init__(self, toggle):
        super().__init__()
        self.index = 0
        self.hold = False
        self.ma = 0
        self.toggle = toggle
        self.order_id = None

    def receive_bars(self, symbol, data, is_end):
        single = self.index % self.ma

        if single == 0:
            if not self.hold:
                self.order_id = self.send_order({
                    "symbol": "EURUSD",
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True
            else:
                self.send_order({
                    "symbol": "EURUSD",
                    "order_type": "sell",
                    "order_id": self.order_id,
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = False

        self.index = self.index+1
        if is_end:
            data = self.generate_data_report()
            data_source = data.get("data")
            print(data_source)
            self.generate_kpi_report()
            self.generate_trade_chart()

def main():
    try:
        toggle = True
        mas_c = MAS_Client(toggle)
        params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }

        mas_c.login(params)
        params = {
            "symbol": "EURUSD",
            "from": '2020-01-01',
            "to": '2024-12-31',
            "timeframe": "D1",
            "backtest_toggle": mas_c.toggle
        }
        mas_c.ma = 50
        df = mas_c.subscribe_bars(params)
    except Exception as e:
        return {
            'status': False,
            'error': str(e)
        }


if __name__ == "__main__":
    main()
```

---

## 📈 KPI Reports After Backtesting

When backtesting is completed, MAS SDK will automatically generate the following reports:

- Data report: Detailed order records and P&L results (`generate_data_report()`)

- KPI report: Sharpe ratio, win rate, net profit, max drawdown, etc. (`generate_kpi_report()`)

- Trade chart: Visualized entry and exit points (`generate_trade_chart()`)

These reports help you evaluate and optimize your strategy parameters.

---

## 🔄 Application Scenarios

- Early-stage development: Quickly test if strategy logic works

- Parameter tuning: Combine with grid search for batch backtesting

- Real-world simulation: Configure slippage, delay, fees, etc.

---

## ⚙️ Switching to Live Trading Mode

MAS SDK uses a "single-codebase, dual-mode" design. Users only need to toggle a parameter to switch between backtesting and live trading.

---

## ✅ How to Switch

Just set `toggle` to `False`. All other code remains unchanged:

```python
try:
    # toggle = True → backtesting mode
    toggle = False  # switch to live trading

    mas_c = MAS_Client(toggle)
    params = {
        "account": "YOUR_ACCOUNT",
        "password": "YOUR_PASSWORD",
        "server": "YOUR_SERVER"
    }

    mas_c.login(params)
    params = {
        "symbol": "EURUSD",
        "from": '2020-01-01',
        "to": '2024-12-31',
        "timeframe": "D1",
        "backtest_toggle": mas_c.toggle
    }
    mas_c.ma = 50
    df = mas_c.subscribe_bars(params)

except Exception as e:
    return {
        'status': False,
        'error': str(e)
    }
```

---

## 🧩 Underlying Logic

- Backtesting mode: `toggle=True`, all orders are handled by the simulation engine, no real trading

- Live mode: `toggle=False`, all orders are sent to broker via API for real execution

Same structure, just one flag switch between test and live.

---

## 🛡️ Checklist Before Live Deployment

| Item                 | Recommendation          | Description                                  |
| -------------------- | ----------------------- | -------------------------------------------- |
| Strategy performance | ✅ Passed KPI threshold  | Positive net profit and win rate recommended |
| Login test           | ✅ `login()` success     | Valid credentials                            |
| Order API            | ✅ Send test order       | Use demo account or small volume             |
| Risk controls        | ✅ Stop-loss logic added | Avoid unhedged exposure                      |

---

## 🧩 Full Workflow Summary

```text

[Strategy Design] → [Backtesting] → [KPI Review] → ✅ [Toggle Live] → [Real Trading]

```
You only need one strategy file. No need to maintain separate logic for test/live.

---