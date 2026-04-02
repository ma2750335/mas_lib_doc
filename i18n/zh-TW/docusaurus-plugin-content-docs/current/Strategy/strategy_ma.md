---
sidebar_position: 1
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📈 黃金交叉 / 死亡交叉策略

此策略是經典的趨勢追蹤交易模型，透過短期均線（MA5）與長期均線（MA20）的交叉訊號來判斷進出場時機，廣泛應用於外匯、股票及期貨市場。

---

## 💡 策略邏輯

- **黃金交叉（Golden Cross）**：當短期均線（MA5）上穿長期均線（MA20），代表市場趨勢轉多，觸發買進訊號。  
- **死亡交叉（Death Cross）**：當短期均線（MA5）下穿長期均線（MA20），代表市場趨勢轉空，觸發賣出訊號。  

此策略在震盪盤時容易出現假訊號，但在趨勢明顯的行情中表現較佳。

---

## 🔁 策略流程說明

```text

[每根K棒更新] → [計算 MA5 與 MA20] → [檢查交叉條件] → [執行進出場] → [產出績效報表]

```

---

## 🧠 策略邏輯片段（核心實作）

```python
if len(self.closes) >= 21:
    series = pd.Series(self.closes)
    ma_5_prev = series[-6:-1].mean()
    ma_20_prev = series[-21:-1].mean()
    ma_5_curr = series[-5:].mean()
    ma_20_curr = series[-20:].mean()

    # 黃金交叉
    if ma_5_prev <= ma_20_prev and ma_5_curr > ma_20_curr and not self.hold:
        # 下單買進
        ...
    # 死亡交叉
    elif ma_5_prev >= ma_20_prev and ma_5_curr < ma_20_curr and self.hold:
        # 賣出平倉
        ...
```

---

## 🧩 策略特點

| 項目   | 說明                     |
| ---- | ---------------------- |
| 策略類型 | 趨勢追蹤型（Trend Following） |
| 入場條件 | MA5 上穿 MA20（黃金交叉）      |
| 出場條件 | MA5 下穿 MA20（死亡交叉）      |
| 適用市場 | 外匯 / 股票 / 期貨（需具備良好流動性） |
| 優點   | 規則簡單、邏輯清晰、易於快速回測與驗證    |
| 缺點   | 震盪盤易受干擾，需額外搭配止損與風控機制   |

---

## 🚀 回測與實盤切換

可透過`toggle`參數快速切換模式：

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

## 📘 MA 策略完整範例

```python

import mas
import pandas as pd

class MAS_Client(mas):
    def __init__(self, toggle):
        super().__init__()
        self.toggle = toggle
        self.hold = False
        self.order_id = None
        self.closes = []  # 儲存收盤價序列

    def receive_bars(self, symbol, data, is_end):
        close = data['close']
        self.closes.append(close)

        # 只有當資料數大於20筆才開始判斷均線交叉
        if len(self.closes) >= 21:
            series = pd.Series(self.closes)
            ma_5_prev = series[-6:-1].mean()     # 前一根K棒的MA5
            ma_20_prev = series[-21:-1].mean()   # 前一根K棒的MA20
            ma_5_curr = series[-5:].mean()       # 最新一根K棒的MA5
            ma_20_curr = series[-20:].mean()     # 最新一根K棒的MA20

            # 黃金交叉（MA5 上穿 MA20）：買進
            if ma_5_prev <= ma_20_prev and ma_5_curr > ma_20_curr and not self.hold:
                self.order_id = self.send_order({
                    "symbol": symbol,
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True

            # 死亡交叉（MA5 下穿 MA20）：賣出
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
        toggle = True  # True: 回測模式, False: 實盤模式
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