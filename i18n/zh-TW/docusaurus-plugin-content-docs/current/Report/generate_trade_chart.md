---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`generate_trade_chart`

---

### 🎯 函式用途

根據歷史交易紀錄，產生包含進出場點、資金曲線（Equity Curve）、累積損益等資訊的交易圖表。  

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| 無       | 無   | 函式會自動從內部交易資料取得內容產生圖表，無需傳入參數 |

---

### 📤 回傳資料內容

| 名稱   | 型別 | 備註說明                                               |
|--------|------|--------------------------------------------------------|
| return | 任意 | 回傳是否產出成功，失敗時包含錯誤資訊 |

```python
{
    "status": True
}

{
    "status": False,
    "error": "Missing trade data for KPI generation"
}
```

---
### 💡 範例程式碼

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()
        self.toggle = False
        self.ma = 0
        self.index = 0
        self.hold = False
        self.order_id = None

    def receive_bars(self, symbol, data, is_end=False):
        single = self.index % self.ma

        if single == 0:
            if not self.hold:
                self.order_id = self.send_order({
                    "symbol": "EURUSD",
                    "order_type": "sell",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True
            else:
                self.send_order({
                    "symbol": "EURUSD",
                    "order_type": "buy",
                    "order_id": self.order_id,
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = False

        self.index = self.index+1
        if is_end:
            self.generate_trade_chart()

def main():
    try:
        mas_client = MAS_Client()
        mas_client.toggle = True
        mas_client.ma = 50
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_client.login(login_params)

        params = {
            "symbol": "EURUSD",
            "from": '2020-01-01',
            "to": '2024-12-31',
            "timeframe": "D1",
            "backtest_toggle": mas_client.toggle
        }
        mas_client.subscribe_bars(params)
    except Exception as e:
        print(str(e))
```

---
### 💡 範例圖表 
<a
  href="/html/trade_report.html"
  target="_blank"
  rel="noopener noreferrer"
  style={{ fontSize: '20px', fontWeight: 'bold' }}
>
  查看報表
</a>

<iframe
  src="/html/trade_report.html"
  width="130%"
  height="1000"
  style={{ border: '1px solid #ccc' }}
/>