---
sidebar_position: 2
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📈 RSI 策略

RSI（Relative Strength Index，相對強弱指標）是一種用於衡量資產動能的技術指標，常見於震盪市場。透過觀察價格上漲與下跌的強度比例，RSI 可判斷市場是否處於「超買」或「超賣」狀態。

本策略以 14 日 RSI 為基礎，當 RSI < 30 時視為超賣區買進，當 RSI > 70 則視為超買區賣出，屬於簡單但實用的動能反轉策略。

---

## 💡 策略邏輯

- **買進條件**：
  - RSI 小於 30（超賣區）
  - 當前尚未持倉

- **賣出條件**：
  - RSI 大於 70（超買區）
  - 當前已持有部位

此策略為典型的「逆勢操作」邏輯，透過捕捉價格過度偏離後的反彈來獲利。

---

## 🔁 策略流程說明

```text

[接收歷史K棒資料] 
    ↓
[累積收盤價並計算 RSI]
    ↓
[判斷 RSI 是否超買 / 超賣]
    ↓
[是否已有持倉 → 執行買或賣單]
    ↓
[持續更新 → 回測結束時產出報表與圖表]

程式內部使用 14 根K棒資料作為 RSI 計算週期，利用 MAS SDK 的 receive_bars 每根K棒逐步處理資料與下單判斷。

```

---

## 🧩 策略特點

| 項目     | 說明                                |
| ------- | ----------------------------------- |
| 策略類型 | 反轉型動能策略（逆勢操作）             |
| 使用指標 | RSI（14日）                          |       
| 買進邏輯 | RSI < 30（進場）                     |
| 賣出邏輯 | RSI > 70（出場）                     |
| 適用市場 | 外匯 / 股市 / 指數商品（震盪盤尤佳）   |
| 優點     | 簡單明確，入門友善，適合盤整環境       |
| 缺點     | 不適合強趨勢行情，需搭配止損機制更穩定 |

---

## 🚀 回測與實盤切換

你可透過 toggle 參數，快速在回測模式與真實交易間切換：

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
    "backtest_toggle": mas_c.toggle
}

```

---

## 📊 執行後將自動輸出：

- 完整交易紀錄報表（`generate_data_report()`）

- 策略績效分析 KPI（`generate_kpi_report()`）

- 視覺化交易圖表 (`generate_trade_chart()`)

---

## 📘 RSI 策略完整範例

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

            # 超賣進場
            if current_rsi < 30 and not self.hold:
                self.order_id = self.send_order({
                    "symbol": symbol,
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True

            # 超買出場
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