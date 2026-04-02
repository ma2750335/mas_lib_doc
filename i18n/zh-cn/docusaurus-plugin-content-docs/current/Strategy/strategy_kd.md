---
sidebar_position: 3
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📈 KD 策略

KD 指标（Stochastic Oscillator）是一种动能分析工具，用于衡量收盘价相对于一定期间内价格区间的位置。  
本策略结合 K 线与 D 线的交叉信号，并配合超买 / 超卖区域过滤噪音，属短中期波段常用的交易模型。

---

## 💡 策略逻辑

- **买入条件：金叉 + 超卖区**  
  - K 线自下而上突破 D 线，且 K 值 < 20（超卖区）时进场买入。

- **卖出条件：死叉 + 超买区**  
  - K 线自上而下跌破 D 线，且 K 值 > 80（超买区）时进场卖出。

- **计算公式：**  
  - **RSV** = (收盘价 − 近期最低价) ÷ (近期最高价 − 近期最低价) × 100  
  - **K** = (前一日 K × 2 + 当日 RSV) ÷ 3  
  - **D** = (前一日 D × 2 + 当日 K) ÷ 3  
    *（默认周期为 9 日，K 与 D 平滑系数为 3）*

---

## 🔁 策略流程说明

```text

[接收历史K线数据]
        ↓
[更新最高价 / 最低价 / 收盘价]
        ↓
[计算 RSV → K → D]
        ↓
[检查 K 与 D 是否交叉]
        ↓
[判断是否位于超买 / 超卖区]
        ↓
[触发进出场信号]
        ↓
[回测结束 → 生成 KPI 与交易图表]

```

---

## 🧩 策略特点

| 项目   | 说明                         |
| ---- | -------------------------- |
| 策略类型 | 动能反转结合顺势交易                 |
| 技术指标 | KD (Stochastic Oscillator) |
| 买入逻辑 | K 上穿 D 且 K < 20            |
| 卖出逻辑 | K 下穿 D 且 K > 80            |
| 适用市场 | 外汇 / 股票 / 期货 / 加密货币        |
| 优点   | 短线灵敏，结合超买超卖可过滤部分假信号        |
| 缺点   | 在震荡市可能产生较多假信号，需搭配趋势过滤机制    |

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

## 📘 KD 策略完整示例

```python

import mas
import pandas as pd

class KD_Strategy(MAS):
    def __init__(self, toggle):
        super().__init__()
        self.toggle = toggle
        self.hold = False
        self.order_id = None

        self.highs = []
        self.lows = []
        self.closes = []

        # K, D 初始值
        self.prev_k = 50
        self.prev_d = 50

    def calculate_kd(self, period=9, k_smooth=3, d_smooth=3):
        if len(self.closes) < period:
            return None, None

        # 计算 RSV
        high_max = max(self.highs[-period:])
        low_min = min(self.lows[-period:])
        close = self.closes[-1]

        if high_max == low_min:
            rsv = 50
        else:
            rsv = (close - low_min) / (high_max - low_min) * 100

        # 计算 K 与 D（平滑）
        k = (self.prev_k * (k_smooth - 1) + rsv) / k_smooth
        d = (self.prev_d * (d_smooth - 1) + k) / d_smooth

        self.prev_k = k
        self.prev_d = d
        return k, d

    def receive_bars(self, symbol, data, is_end):
        high = data["high"]
        low = data["low"]
        close = data["close"]

        self.highs.append(high)
        self.lows.append(low)
        self.closes.append(close)

        k, d = self.calculate_kd()

        if k is not None and d is not None:
            # 金叉：K 上穿 D 且在超卖区 (<20)
            if self.prev_k <= self.prev_d and k > d and k < 20 and not self.hold:
                self.order_id = self.send_order({
                    "symbol": symbol,
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True

            # 死叉：K 下穿 D 且在超买区 (>80)
            elif self.prev_k >= self.prev_d and k < d and k > 80 and self.hold:
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
        mas_c = KD_Strategy(toggle)

        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_c.login(login_params)

        backtest_params = {
            "symbol": "EURUSD",
            "from": "2020-01-01",
            "to": "2024-12-31",
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