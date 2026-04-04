---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`generate_data_report`

---

### 🎯 函数用途

根据历史交易记录自动计算多项绩效指标（如胜率、盈利因子、总盈亏、交易次数、最大回撤、累计收益率等），并返回可用于**策略回测报告**与**交易绩效分析**的统计结果。  
该函数可直接从 `clientpost` 对象内的交易数据生成报表，无需额外输入参数。

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| 无       | 无   | 函数内部会直接读取 `clientpost` 对象中的历史交易数据，无需传入任何参数。 |

---

### 📤 返回内容

| 字段名称 | 类型   | 说明                               |
|----------|-------|-----------------------------------|
| `status` | bool  | 是否成功生成报表。 |
| `data`   | dict  | 报表原始数据内容（仅在 `status = True` 时存在），根据用户权限显示不同范围的数据。 |
| `error`  | str   | 错误信息（仅在 `status = False` 时存在）。 |

#### 返回格式

```python
{
    "status": True,
    "data": {
        "general_data": {
            "total_profit_loss": -1389.86,
            "number_of_trades": 13
        },
        "performance_metrics": {
            "number_of_trades": 13,
            "profit_loss_ratio": 0.29,
            "win_rate": 30.77,
            "max_drawdown": 15.22,
            "total_return_rate": -13.9,
            "cagr": -2.85,
            "sharpe_ratio": -0.43,
            "sortino_ratio": -0.61,
            "max_consecutive_losses": 5,
            "max_single_loss": 312.40,
            "profit_factor": 0.45
        },
        "win_loss_ratio": {
            "win_rate": 30.77,
            "loss_rate": 69.23
        },
        "cumulative_return_line_chart": {
            "cumulative_return_percent": {
                "2020": -14.21,
                "2021": -13.99,
                "2022": -12.49,
                "2023": -12.56,
                "2024": -13.90
            }
        },
        "max_drawdown_trend": {
            "max_drawdown_percent": {
                "2020": -0.0,
                "2021": -10.90,
                "2022": -8.79,
                "2023": -9.78,
                "2024": -10.83
            }
        },
        "annual_year_pnl_usd": {
            "annual_year_pnl_usd": {
                "2020": -142.11,
                "2021": 21.06,
                "2022": 150.51,
                "2023": -7.14,
                "2024": -1411.18
            }
        },
        "annual_pnl_usd": {
            "annual_pnl_usd": {
                "2020": 9857.89,
                "2021": 9878.95,
                "2022": 10029.46,
                "2023": 10022.32,
                "2024": 8611.14
            }
        },
        "data_source": "<JSON string of per-trade records>"
    }
}
```
---

### 💡 示例代码

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()
        self.toggle = False
        self.ma = 0
        self.index = 0
        self.hold = False
        self.order_id = None

    def receive_bars(self, symbol, data, is_end=False):
        single = self.index % self.ma

        if single == 0:
            if not self.hold:
                self.order_id = self.send_order({
                    "symbol": "EURUSD",
                    "order_type": "sell",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True
            else:
                self.send_order({
                    "symbol": "EURUSD",
                    "order_type": "buy",
                    "order_id": self.order_id,
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = False

        self.index = self.index+1
        if is_end:
            data = self.generate_data_report()
            print(data)


def main():
    try:
        mas_client = MAS_Client()
        mas_client.toggle = True
        mas_client.ma = 50
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_client.login(login_params)

        params = {
            "symbol": "EURUSD",
            "from": '2020-01-01',
            "to": '2024-12-31',
            "timeframe": "D1",
            "captital": 1000,
            "backtest_toggle": mas_client.toggle
        }
        mas_client.subscribe_bars(params)
    except Exception as e:
        print(str(e))
```
---