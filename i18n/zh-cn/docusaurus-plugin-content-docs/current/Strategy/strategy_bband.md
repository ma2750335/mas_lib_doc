---
sidebar_position: 5
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📈 BBAND 策略

布林通道（Bollinger Bands, BBands）是一种基于标准差的技术分析工具，用于判断价格波动范围与市场状态。  
本策略通过中轨、上轨与下轨来决定买卖时机，属于典型的「均值回归」交易模型，特别适合横盘震荡行情操作。

---

## 💡 策略逻辑

- **中轨 (Middle Band)**：N 日收盘价的移动平均线（默认 N=20）  
- **上轨 (Upper Band)**：中轨 + K × 标准差（默认 K=2）  
- **下轨 (Lower Band)**：中轨 − K × 标准差（默认 K=2）  

**进出场条件**：  
- **买入**：收盘价 ≤ 下轨 → 判定为价格低估，触发买入  
- **卖出**：收盘价 ≥ 上轨 → 判定为价格高估，触发卖出  

此策略假设价格会回到均值，因此在横盘震荡市场中表现较佳。

---

## 🔁 策略流程说明

```text

[接收历史K线数据]
        ↓
[计算中轨、上轨、下轨]
        ↓
[触及下轨 → 买入]
        ↓
[触及上轨 → 卖出]
        ↓
[回测结束 → 生成KPI与交易图表]

```

---

## 🧩 策略特点

| 项目   | 说明                       |
| ---- | ------------------------ |
| 策略类型 | 均值回归（Reversion to Mean）  |
| 技术指标 | Bollinger Bands (20, 2)  |
| 买入逻辑 | 收盘价 ≤ 下轨                 |
| 卖出逻辑 | 收盘价 ≥ 上轨                 |
| 适用市场 | 外汇 / 股票 / 指数 / 震荡型商品     |
| 优点   | 简单直观，对震荡行情反应灵敏           |
| 缺点   | 遇单边趋势可能连续亏损，需搭配止损或趋势过滤机制 |

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

## 📘 BBAND 策略完整示例

```python

import mas
import pandas as pd

class BBand_Strategy(MAS):
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

            # 触及下轨买入
            if close <= lower and not self.hold:
                self.order_id = self.send_order({
                    "symbol": symbol,
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True

            # 触及上轨卖出
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
        toggle = True  # True = 回测, False = 实盘
        mas_c = BBand_Strategy(toggle, period=20, std_k=2)

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
            "captital": 1000,
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