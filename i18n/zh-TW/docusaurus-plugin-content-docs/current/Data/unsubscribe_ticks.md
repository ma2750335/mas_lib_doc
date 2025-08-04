---
sidebar_position: 6
---
### function 名稱

`unsubscribe_ticks`

---

### function 用途

取消指定商品的即時 Tick 資料訂閱 -> 適用於實盤模式。  
此函式會中止內部背景訂閱執行緒，關閉對該商品的即時報價監控。  

---

### function 參數

| 參數名稱 | 型別  | 備註說明 |
|----------|-------|----------|
| params   | dict  | symbol（str）：要取消訂閱的商品代碼。 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                            |
|--------|------|-------------------------------------|
| 無     | None | 無回傳值，執行後即停止訂閱 |

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
        mas_client.unsubscribe_ticks(params)
    except Exception as e:
        print(str(e))
```
---

