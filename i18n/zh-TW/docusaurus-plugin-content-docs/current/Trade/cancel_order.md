---
sidebar_position: 3
---
### function 名稱

`cancel_order`

---

### function 用途

取消一筆尚未成交的掛單。  
此函式會根據傳入的 `order_id` 建立取消請求至 MT5 平台執行刪單動作。

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 傳入的字典內容如下方欄位說明 |

| dict 欄位名稱 | 型別 | 必填  | 說明                                      |
|--------------|-------------|------|------------------------------------|
| `order_id`   | int  | ✅   | 欲取消之原始掛單的訂單編號（ticket）。        |
| `comment`    | str  | ❌   | 取消原因備註，預設為 `"Cancel by MAS"`。    |

---

### function 回傳內容

| 名稱     | 型別 | 備註說明              |
|----------|------|-----------------------|
| （匿名） | bool | 取消成功則回傳 `True`，否則為 `False` |

---

### 💡 範例程式碼

```python
import time
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
            "order_type": "sell_limit",
            "price": 1.18,
            "volume": 0.1,
            "backtest_toggle": False
        }
        order_id = mas_client.send_order(order_params)
        print(order_id)
        time.sleep(3)

        cancel_order_params = {
            "order_id": order_id
        }
        mas_client.cancel_order(cancel_order_params)
    except Exception as e:
        print(f"登入失敗:{str(e)}")
```

---
