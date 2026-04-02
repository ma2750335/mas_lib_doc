---
sidebar_position: 4
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📈 MACD 策略

MACD（Moving Average Convergence Divergence）是經典的趨勢追蹤技術指標，透過長期與短期均線的差值以及訊號線交叉，來判斷多空動能變化與市場趨勢方向。

---

## 💡 策略邏輯

- **MACD 線計算**  
  - 使用短期 EMA(12) 與長期 EMA(26) 的差值作為 **MACD Line**  
  - 對 MACD Line 取 EMA(9) 作為 **Signal Line**  

- **買進條件（黃金交叉）**  
  - MACD Line 由下往上突破 Signal Line  
  - 當前無持倉時觸發買進  

- **賣出條件（死亡交叉）**  
  - MACD Line 由上往下跌破 Signal Line  
  - 當前有持倉時觸發賣出  

- **柱狀圖（Histogram）**  
  - 顯示多空能量差值，可用於濾除雜訊並輔助判斷趨勢強弱  

---

## 🔁 策略流程說明

```text

[接收歷史K線]  
        ↓
[計算 EMA(12) 與 EMA(26)]  
        ↓
[計算 MACD Line 與 Signal Line]  
        ↓
[檢查是否黃金交叉 / 死亡交叉]  
        ↓
[執行買進或賣出]  
        ↓
[回測結束 → 輸出KPI與交易圖表]

```

---

## 🧩 策略特點

| 項目   | 說明                     |
| ---- | ---------------------- |
| 策略類型 | 趨勢追蹤型                  |
| 技術指標 | MACD (12, 26, 9)       |
| 買進條件 | MACD 上穿 Signal         |
| 賣出條件 | MACD 下穿 Signal         |
| 適用市場 | 外匯 / 股票 / 指數 / 期貨      |
| 優點   | 順勢型策略，能濾除部分雜訊，適用於不同週期  |
| 缺點   | 在震盪行情中可能延遲反應，需結合其他過濾機制 |

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

## 📘 MACD 策略完整範例

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

            # 前一根與當前
            macd_prev, macd_curr = macd_line.iloc[0], macd_line.iloc[1]
            sig_prev, sig_curr = signal_line.iloc[0], signal_line.iloc[1]

            # 黃金交叉：MACD 上穿 Signal
            if macd_prev <= sig_prev and macd_curr > sig_curr and not self.hold:
                self.order_id = self.send_order({
                    "symbol": symbol,
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True

            # 死亡交叉：MACD 下穿 Signal
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
        toggle = True  # True = 回測, False = 實盤
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