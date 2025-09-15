---
sidebar_position: 2
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📈 RSI 策略

RSI（Relative Strength Index，相对强弱指标）是一种常用于衡量资产动能的技术指标，特别适合应用于震荡行情。  
通过比较价格上涨与下跌的强度比例，RSI 能有效判断市场是否处于「超买」或「超卖」状态。

本策略以 **14 日 RSI** 为基础：  
- RSI < 30 视为超卖区 → 触发买入  
- RSI > 70 视为超买区 → 触发卖出  
属于简单且实用的动能反转交易模型。

---

## 💡 策略逻辑

- **买入条件**：  
  - RSI 小于 30（超卖区）  
  - 当前无持仓  

- **卖出条件**：  
  - RSI 大于 70（超买区）  
  - 当前有持仓  

该策略为典型的 **逆势操作**，通过捕捉价格过度偏离后的反弹或回落，寻求获利机会。

---

## 🔁 策略流程说明

```text

[接收历史K线数据]  
        ↓  
[累计收盘价并计算 RSI]  
        ↓  
[判断 RSI 是否超买 / 超卖]  
        ↓  
[根据持仓状态执行买或卖单]  
        ↓  
[回测结束 → 生成绩效报表与图表]  

```

---

## 🧩 策略特点

| 项目   | 说明                         |
| ---- | -------------------------- |
| 策略类型 | 反转型动能策略（逆势操作）             |
| 技术指标 | RSI（14日）                  |
| 买入条件 | RSI < 30（进场）              |
| 卖出条件 | RSI > 70（出场）              |
| 适用市场 | 外汇 / 股票 / 指数商品（特别适用于震荡行情） |
| 优点   | 规则简单明确，适合初学者，适用于盘整环境       |
| 缺点   | 不适用于单边强趋势，建议搭配止损与风控机制     |

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

## 📘 RSI 策略完整示例

```python

import mas
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

            # 超卖进场
            if current_rsi < 30 and not self.hold:
                self.order_id = self.send_order({
                    "symbol": symbol,
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True

            # 超买出场
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