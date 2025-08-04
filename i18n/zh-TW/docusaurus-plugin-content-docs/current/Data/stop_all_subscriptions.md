---
sidebar_position: 7
---
### function 名稱

`stop_all_subscriptions`

---

### function 用途

停止所有 Tick 與 Bar 的資料訂閱 -> 適用於實盤模式。

---

### function 參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數。 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明       |
|--------|------|---------------|
| 無     | None | 此函式無回傳值 |

---

### 💡 範例程式碼


```python
import time
import mas

class MAS_Client(mas):
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

        params = {
            "symbol": "EURUSD",
            "backtest_toggle": False,
        }
        mas_client.subscribe_ticks(params)
        time.sleep(10)
        mas_client.stop_all_subscriptions()
    except Exception as e:
        print(str(e))
```
---