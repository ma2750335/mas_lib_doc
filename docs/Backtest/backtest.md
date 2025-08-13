---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📘 What is Backtesting?

Before starting any automated trading, **backtesting** is a crucial process. By simulating a trading strategy on historical market data, you can:

- Validate if the strategy can consistently generate profits  
- Assess performance under different market conditions  
- Measure key risk metrics (e.g., maximum drawdown, win rate, Sharpe ratio)  
- Reduce both time and financial risk compared to direct live testing  

---

## 🔧 How does MAS SDK perform backtesting?

MAS SDK offers a streamlined approach to run backtests. By simply extending the `MAS` class and overriding the `receive_bars` method, you can quickly integrate your trading logic with historical data—no need for complex framework setup.

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

Upon completion of backtesting, MAS SDK automatically generates multi-dimensional reports to help you evaluate strategy performance:

- **Data Report**: Detailed trade logs including entry/exit time, direction, and P&L results  
- **KPI Report**: Comprehensive performance metrics such as Sharpe ratio, win rate, net profit, and maximum drawdown  
- **Trade Chart**: Visual representation of all entry and exit points  

These outputs enable quick strategy assessment and parameter optimization.

---

## 🔄 When to Use Backtesting

- **Strategy R&D Phase**: Verify the correctness of trading logic before deployment  
- **Parameter Optimization**: Perform batch tests using methods like Grid Search to find the best combinations  
- **Real-Market Simulation**: Add realistic conditions such as fees, slippage, and execution delays  

---

## ⚙️ Switching to Live Trading Mode

MAS SDK features a **single codebase with dual-mode operation**, enabling seamless transition between backtesting and live trading. You only need to adjust one parameter—no code duplication required.

---

## ✅ How to Switch

Use the `toggle` parameter to instantly switch modes:

- `True` → Backtest mode
- `False` → Live trading mode

```python
try:
    # toggle = True → backtesting mode
    toggle = False  # switch to live trading

    mas_c = MAS_Client(toggle)
    login_params = {
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

## 🧩 Switching Logic

- **Backtest Mode** (`toggle=True`): All trade executions are handled by the simulation engine, with no live orders sent  
- **Live Mode** (`toggle=False`): All trade instructions are transmitted to the broker’s API for real-time execution  

This approach lets you safely validate in a simulated environment before moving to live deployment.

---

## 🛡️ Pre-Live Checklist

Before going live, review the following to ensure readiness and mitigate risk:

| Item                 | Recommendation                  | Notes                                          |
| -------------------- | ------------------------------- | ---------------------------------------------- |
| Strategy Performance | ✅ Pass KPI benchmarks           | Positive net profit and stable win rate        |
| Login Test           | ✅ Successful `login()`          | Ensure credentials are valid                   |
| Order API            | ✅ Test order executes correctly | Use a demo account or small trade for testing  |
| Risk Controls        | ✅ Implemented stop-loss logic   | Avoid unhedged positions and excessive risk    |

---

## 🧩 End-to-End Workflow

```text

[Strategy Design] → [Historical Backtesting] → [Performance Review] → ✅ [One-Click Toggle] → [Live Trading]

```
With MAS SDK, a single strategy file is sufficient—streamlining both testing and live deployment while lowering development and maintenance costs.

---