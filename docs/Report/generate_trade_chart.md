### Function Name

`generate_trade_chart`

---

### Function Purpose

Generates a trading chart based on historical trading records, including entry/exit points, equity curve, and cumulative PnL (profit and loss).

---

### Function Parameters

| Name | Type | Description |
|------|------|-------------|
| None | None | This function automatically uses internal trade data to generate the chart; no parameters are required. |

---

### Function Return

| Name   | Type | Description                                                 |
|--------|------|-------------------------------------------------------------|
| return | Any  | Returns generation status; includes error message if failed |

Return format:
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
### 💡 Example Code

```python
from mas.mas import MAS

class MAS_Client(MAS):
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
### 💡 Sample Report Preview 
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