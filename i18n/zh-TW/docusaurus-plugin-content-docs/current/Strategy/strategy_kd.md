---
sidebar_position: 3
---

## 📈 KD 策略

KD 指標（Stochastic Oscillator）是一種動能指標，用於衡量價格收盤價相對於一段時間高低價區間的位置。  
本策略利用 K 線與 D 線的交叉訊號來判斷進出場，並搭配超買 / 超賣區域過濾訊號，屬於短中期波段常用策略。

---

## 💡 策略邏輯

- **買進條件：黃金交叉 + 超賣**
  - 當 K 線從下方上穿 D 線，且 K < 20（屬於超賣區）時，觸發買進。

- **賣出條件：死亡交叉 + 超買**
  - 當 K 線從上方下穿 D 線，且 K > 80（屬於超買區）時，觸發賣出。

- **計算方式：**
  - **RSV** = (收盤價 - 近期最低價) / (近期最高價 - 近期最低價) × 100
  - **K** = (前一日 K × 2 + 當日 RSV) ÷ 3
  - **D** = (前一日 D × 2 + 當日 K) ÷ 3  
    *(預設週期為 9 日，K 與 D 平滑係數皆為 3)*

---

## 🔁 策略流程說明

```text

[接收歷史K棒資料]
        ↓
[更新最高價 / 最低價 / 收盤價]
        ↓
[計算 RSV → K → D]
        ↓
[K 與 D 是否交叉？]
        ↓
[是否進入超買 / 超賣區域？]
        ↓
[觸發買進或賣出訊號]
        ↓
[回測結束 → 輸出 KPI 與買賣點圖表]

```

---

## 🧩 策略特點

| 項目       | 說明                                      |
|------------|------------------------------------------|
| 策略類型   | 動能反轉 + 順勢結合                        |
| 使用指標   | KD (Stochastic Oscillator)                |
| 買進邏輯   | K 上穿 D + K < 20                         |
| 賣出邏輯   | K 下穿 D + K > 80                         |
| 適用市場   | 外匯 / 股票 / 期貨 / 加密貨幣              |
| 優點       | 短線靈敏，結合超買超賣能過濾雜訊            |
| 缺點       | 容易在震盪盤出現假訊號，需要搭配趨勢濾網     |

---

## 🚀 回測與實盤切換

你可透過 `toggle` 參數，快速在回測模式與真實交易間切換：

```python

toggle = True  # 回測模式
# toggle = False  # 實盤模式
mas_c = MASStrategy(toggle)

```

搭配 `backtest_toggle` 傳入 `subscribe_bars()`：

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

## 📊 執行後將自動輸出：

- 完整交易紀錄報表（`generate_data_report()`）

- 策略績效分析 KPI（`generate_kpi_report()`）

- 視覺化交易圖表（`generate_trade_chart()`）

---

## 📘 KD 策略完整範例

```python

from mas.mas import MAS
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