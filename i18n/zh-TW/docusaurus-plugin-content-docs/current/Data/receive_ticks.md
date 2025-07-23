---
sidebar_position: 5
---
### function 名稱

`receive_ticks`

---

### function 用途

接收 Tick 資料推播，由 `on_tick()` 呼叫觸發。

---

### function 參數

| 參數名稱 | 型別  | 備註說明 |
|----------|--------|----------|
| symbol   | str    | 商品代碼（如 `"EURUSD"`） |
| data     | dict   | 一筆 Tick 結構資料 |
| is_end   | bool   | 是否為推播結束標記（回測模式中使用） |

data 結構說明:

| 欄位名稱 | 型別     | 說明         |
|----------|----------|-------------|
| `time`   | datetime | 時間戳記。   |
| `bid`    | float    | 買價。       |
| `ask`    | float    | 賣價。       |
| `last`   | float    | 最後成交價。 |
| `volume` | float    | 成交量。     |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明       |
|--------|------|----------------|
| 無     | None | 無回傳值（單純接收推播訊息處理） |

---

### 💡 範例程式碼

```python
from mas.mas import MAS

class MAS_Client(MAS):
    def __init__(self):
        super().__init__()

    def receive_ticks(self, symbol, data, is_end=False):
        print(symbol, data, is_end)

def main():
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_client.login(login_params)

        #回測模式參數
        params = {
            "symbol": "EURUSD",
            "from": '2025-07-07 12:00:00',
            "to": '2025-07-07 13:00:00',
            "backtest_toggle": True
        }
        mas_client.subscribe_ticks(params)

        #實盤模式參數
        params = {
            "symbol": "EURUSD",
            "backtest_toggle": False
        }
        mas_client.subscribe_ticks(params)

    except Exception as e:
        print(str(e))
```
---