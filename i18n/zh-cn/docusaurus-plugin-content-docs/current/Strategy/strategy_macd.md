---
sidebar_position: 4
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📈 MACD 策略

MACD（Moving Average Convergence Divergence，指数平滑异同移动平均线）是经典的趋势跟踪技术指标，通过长期与短期均线的差值以及信号线交叉，来判断多空动能变化与市场趋势方向。

---

## 💡 策略逻辑

- **MACD 线计算**  
  - 使用短期 EMA(12) 与长期 EMA(26) 的差值作为 **MACD Line**  
  - 对 MACD Line 取 EMA(9) 作为 **Signal Line**  

- **买入条件（金叉）**  
  - MACD Line 自下而上突破 Signal Line  
  - 当前无持仓时触发买入  

- **卖出条件（死叉）**  
  - MACD Line 自上而下跌破 Signal Line  
  - 当前有持仓时触发卖出  

- **柱状图（Histogram）**  
  - 显示多空能量差值，可用于过滤噪音并辅助判断趋势强弱  

---

## 🔁 策略流程说明

```text

[接收历史K线]  
        ↓  
[计算 EMA(12) 与 EMA(26)]  
        ↓  
[计算 MACD Line 与 Signal Line]  
        ↓  
[检查是否金叉 / 死叉]  
        ↓  
[执行买入或卖出]  
        ↓  
[回测结束 → 输出KPI与交易图表]  

```

---

## 🧩 策略特点

| 项目   | 说明                     |
| ---- | ---------------------- |
| 策略类型 | 趋势跟踪型                  |
| 技术指标 | MACD (12, 26, 9)       |
| 买入条件 | MACD 上穿 Signal         |
| 卖出条件 | MACD 下穿 Signal         |
| 适用市场 | 外汇 / 股票 / 指数 / 期货      |
| 优点   | 顺势型策略，能过滤部分噪音，适用于不同周期 |
| 缺点   | 在震荡行情中可能延迟反应，需结合其他过滤机制 |

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

## 📘 MACD 策略完整示例

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

            # 前一根与当前
            macd_prev, macd_curr = macd_line.iloc[0], macd_line.iloc[1]
            sig_prev, sig_curr = signal_line.iloc[0], signal_line.iloc[1]

            # 金叉：MACD 上穿 Signal
            if macd_prev <= sig_prev and macd_curr > sig_curr and not self.hold:
                self.order_id = self.send_order({
                    "symbol": symbol,
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True

            # 死叉：MACD 下穿 Signal
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
        toggle = True  # True = 回测, False = 实盘
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