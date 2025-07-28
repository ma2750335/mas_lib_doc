---
sidebar_position: 5
---

## 📈 BBAND 策略

布林通道（Bollinger Bands, BBands）是一種基於標準差的技術指標，用於判斷價格波動範圍與市場狀態。本策略使用中軌、上軌與下軌來決定買賣時機，屬於典型的「均值回歸」交易模型。

---

## 💡 策略邏輯

- **中軌 (Middle Band)**：
  - 取 N 日收盤價的移動平均線（預設 N=20）

- **上軌 (Upper Band)**：
  - 中軌 + K × 標準差（預設 K=2）

- **下軌 (Lower Band)**：
  - 中軌 − K × 標準差（預設 K=2）

- **買進條件：**
  - 當收盤價 ≦ 下軌，判定為價格偏離，觸發買進

- **賣出條件：**
  - 當收盤價 ≧ 上軌，判定為價格偏離，觸發賣出

該策略屬於「回歸型策略」，假設價格會回到均值，適用於震盪市場。

---

## 🔁 策略流程說明

```text

[接收歷史K棒資料]
        ↓
[計算移動平均與標準差 → 上下軌]
        ↓
[判斷收盤價是否觸及下軌 → 買進]
        ↓
[判斷收盤價是否觸及上軌 → 賣出]
        ↓
[回測結束 → 輸出 KPI 與交易圖表]

```

---

## 🧩 策略特點

| 項目       | 說明                                            |
|------------|------------------------------------------------|
| 策略類型   | 均值回歸（Reversion to Mean）                    |
| 使用指標   | Bollinger Bands (20, 2)                         |
| 買進邏輯   | 收盤價 ≤ 下軌                                    |
| 賣出邏輯   | 收盤價 ≥ 上軌                                    |
| 適用市場   | 外匯 / 股票 / 指數 / 震盪型商品                   |
| 優點       | 簡單直觀，適合震盪盤操作                          |
| 缺點       | 遇到單邊強趨勢可能連續虧損，需搭配止損與趨勢過濾    |

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

## 📘 BBAND 策略完整範例

```python

from mas.mas import MAS
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

            # 觸及下軌買進
            if close <= lower and not self.hold:
                self.order_id = self.send_order({
                    "symbol": symbol,
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True

            # 觸及上軌賣出
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
        toggle = True  # True = 回測, False = 實盤
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