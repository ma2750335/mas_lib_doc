---
sidebar_position: 3
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📈 KD 策略

KD 指標（Stochastic Oscillator）是一種動能分析工具，用於衡量收盤價相對於一定期間內價格區間的位置。  
本策略結合 K 線與 D 線的交叉訊號，並配合超買 / 超賣區域過濾雜訊，屬於短中期波段常用的交易模型。

---

## 💡 策略邏輯

- **買進條件：黃金交叉 + 超賣區**
  - K 線由下往上突破 D 線，且 K 值 < 20（超賣區）時進場買進。

- **賣出條件：死亡交叉 + 超買區**
  - K 線由上往下跌破 D 線，且 K 值 > 80（超買區）時進場賣出。

- **計算公式：**
  - **RSV** = (收盤價 − 近期最低價) ÷ (近期最高價 − 近期最低價) × 100  
  - **K** = (前一日 K × 2 + 當日 RSV) ÷ 3  
  - **D** = (前一日 D × 2 + 當日 K) ÷ 3  
    *(預設週期為 9 日，K 與 D 平滑係數為 3)*

---

## 🔁 策略流程說明

```text

[接收歷史K線資料]
        ↓
[更新最高價 / 最低價 / 收盤價]
        ↓
[計算 RSV → K → D]
        ↓
[檢查 K 與 D 是否交叉]
        ↓
[判斷是否位於超買 / 超賣區]
        ↓
[觸發進出場訊號]
        ↓
[回測結束 → 生成 KPI 與交易圖表]

```

---

## 🧩 策略特點

| 項目   | 說明                         |
| ---- | -------------------------- |
| 策略類型 | 動能反轉結合順勢交易                 |
| 技術指標 | KD (Stochastic Oscillator) |
| 買進邏輯 | K 上穿 D 且 K < 20            |
| 賣出邏輯 | K 下穿 D 且 K > 80            |
| 適用市場 | 外匯 / 股票 / 期貨 / 加密貨幣        |
| 優點   | 短線靈敏，結合超買超賣可過濾部分假訊號        |
| 缺點   | 在震盪市可能產生較多假訊號，需搭配趨勢過濾機制    |

---

## 🚀 回測與實盤切換

可透過 `toggle` 參數快速切換模式：

- `True` → 回測模式

- `False` → 實盤模式

```python

toggle = True  # 回測模式
# toggle = False  # 實盤模式
mas_c = MAS_Client(toggle)

```

搭配 `backtest_toggle` 傳入 `subscribe_bars()`：

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

## 📊 執行後將自動輸出：

- 完整交易紀錄報表（`generate_data_report()`）

- 策略績效分析 KPI（`generate_kpi_report()`）

- 視覺化交易圖表（`generate_trade_chart()`）

---

## 📘 KD 策略完整範例

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

        # 計算 RSV
        high_max = max(self.highs[-period:])
        low_min = min(self.lows[-period:])
        close = self.closes[-1]

        if high_max == low_min:
            rsv = 50
        else:
            rsv = (close - low_min) / (high_max - low_min) * 100

        # 計算 K 與 D（平滑）
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
            # 黃金交叉：K 上穿 D 且在超賣區 (<20)
            if self.prev_k <= self.prev_d and k > d and k < 20 and not self.hold:
                self.order_id = self.send_order({
                    "symbol": symbol,
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True

            # 死亡交叉：K 下穿 D 且在超買區 (>80)
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
        toggle = True  # True = 回測, False = 實盤
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