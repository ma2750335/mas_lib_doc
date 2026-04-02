---
sidebar_position: 1
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📈 黄金交叉 / 死亡交叉策略

该策略是经典的趋势跟踪交易模型，通过短期均线（MA5）与长期均线（MA20）的交叉信号来判断进出场时机，广泛应用于外汇、股票及期货市场。

---

## 💡 策略逻辑

- **黄金交叉（Golden Cross）**：当短期均线（MA5）上穿长期均线（MA20），代表市场趋势转多，触发买入信号。  
- **死亡交叉（Death Cross）**：当短期均线（MA5）下穿长期均线（MA20），代表市场趋势转空，触发卖出信号。  

该策略在震荡行情时容易出现假信号，但在趋势明显的市场中表现更佳。

---

## 🔁 策略流程说明

```text

[每根K线更新] → [计算 MA5 与 MA20] → [检查交叉条件] → [执行进出场] → [生成绩效报表]

```

---

## 🧠 策略逻辑片段（核心实现）

```python
if len(self.closes) >= 21:
    series = pd.Series(self.closes)
    ma_5_prev = series[-6:-1].mean()
    ma_20_prev = series[-21:-1].mean()
    ma_5_curr = series[-5:].mean()
    ma_20_curr = series[-20:].mean()

    # 黃金交叉
    if ma_5_prev <= ma_20_prev and ma_5_curr > ma_20_curr and not self.hold:
        # 下单买入
        ...
    # 死亡交叉
    elif ma_5_prev >= ma_20_prev and ma_5_curr < ma_20_curr and self.hold:
        # 卖出平仓
        ...
```

---

## 🧩 策略特点

| 项目   | 说明                     |
| ---- | ---------------------- |
| 策略类型 | 趋势跟踪型（Trend Following） |
| 入场条件 | MA5 上穿 MA20（黄金交叉）      |
| 出场条件 | MA5 下穿 MA20（死亡交叉）      |
| 适用市场 | 外汇 / 股票 / 期货（需具备良好流动性） |
| 优点   | 规则简单、逻辑清晰、易于快速回测与验证    |
| 缺点   | 震荡市易受干扰，需额外搭配止损与风控机制   |

---

## 🚀 回测与实盘切换

可通过`toggle`参数快速切换模式：

- `True` → 回测模式

- `False` → 实盘模式

```python

toggle = True  # 回测模式
# toggle = False  # 实盘模式
mas_c = MAS_Client(toggle)

```

搭配 `backtest_toggle` 传入 `subscribe_bars()`：

```python

params = {
    "symbol": "EURUSD",
    "from": "2020-01-01",
    "to": "2024-12-31",
    "timeframe": "D1",
    "captital": 1000,
    "backtest_toggle": mas_c.toggle
}

```

---

## 📊 执行后将自动输出：

- 完整交易记录报表（`generate_data_report()`）

- 策略绩效分析 KPI（`generate_kpi_report()`）

- 可视化交易图表（`generate_trade_chart()`）

---

## 📘 MA 策略完整示例

```python

import mas
import pandas as pd

class MAS_Client(mas):
    def __init__(self, toggle):
        super().__init__()
        self.toggle = toggle
        self.hold = False
        self.order_id = None
        self.closes = []  # 存储收盘价序列

    def receive_bars(self, symbol, data, is_end):
        close = data['close']
        self.closes.append(close)

        # 仅当数据大于20条时才开始判断均线交叉
        if len(self.closes) >= 21:
            series = pd.Series(self.closes)
            ma_5_prev = series[-6:-1].mean()     # 前一根K线的MA5
            ma_20_prev = series[-21:-1].mean()   # 前一根K线的MA20
            ma_5_curr = series[-5:].mean()       # 最新一根K线的MA5
            ma_20_curr = series[-20:].mean()     # 最新一根K线的MA20

            # 黄金交叉（MA5 上穿 MA20）：买入
            if ma_5_prev <= ma_20_prev and ma_5_curr > ma_20_curr and not self.hold:
                self.order_id = self.send_order({
                    "symbol": symbol,
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True

            # 死亡交叉（MA5 下穿 MA20）：卖出
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
        toggle = True  # True: 回测模式, False: 实盘模式
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
            "captital": 1000,
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