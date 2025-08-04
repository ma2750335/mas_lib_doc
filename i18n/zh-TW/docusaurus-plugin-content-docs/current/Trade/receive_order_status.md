---
sidebar_position: 5
---
### function 名稱

`receive_order_status`

---

### function 用途

接收系統回傳的訂單狀態資訊，用於後續處理或顯示。

---

### function 參數

| 參數名稱   | 型別   | 備註說明                                      |
|------------|--------|-----------------------------------------------|
| order_id   | str    | 訂單編號。 |
| status_data| dict   | 傳入的字典內容如下方欄位說明。 |

| status_data 欄位 | 型別  | 備註說明 |
|------------------|--------|----------|
| `status`         | int    | 訂單狀態（通常與 MT5 `retcode` 相同）。 |
| `retcode`        | int    | MT5 回傳的訂單狀態。 |
| `message`        | str    | MT5 回傳的訂單訊息（例如 `"Request executed"`）。 |
| `request`        | dict   | 本筆訂單下單時的 request。 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明              |
|--------|------|-----------------------|
| 無     | None | 無回傳值（單純接收推播訊息處理） |

---

### 💡 範例程式碼

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

    def receive_order_execution(self, order_id, execution_data):
        print("receive_order_execution:", order_id, execution_data)

    def receive_order_status(self, order_id, status_data):
        print("receive_order_status:", order_id, status_data)

def main():
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_client.login(login_params)

        order_params = {
            "symbol": "EURUSD",
            "order_type": "sell",
            "volume": 0.1,
            "backtest_toggle": True
        }
        mas_client.send_order(order_params)
    except Exception as e:
        print(f"登入失敗:{str(e)}")
```
