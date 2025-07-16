### function 名稱

`get_order_history`

---

### function 用途

查詢帳戶在指定時間區間內的歷史成交紀錄（已成交的交易）。 
可依時間範圍、商品、訂單 ID 或部位 ID 進行過濾。

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 字典內容如下方欄位說明 |

| dict 欄位名稱 | 型別          | 必填 | 說明                                                       |
|-------------|---------------|------|------------------------------------------------------------|
| `symbol`    | str           | ❌   | 指定查詢的商品（使用 `group` 欄位過濾）                      |
| `from`      | datetime/str  | ❌   | 起始時間，預設為 `2000-01-01`                               |
| `to`        | datetime/str  | ❌   | 結束時間，預設為 `datetime.now()`                           |
| `ticket`    | int           | ❌   | 指定訂單的成交紀錄（僅支援單一參數使用）                      |
| `position`  | int           | ❌   | 指定部位的成交紀錄（僅支援單一參數使用）                      |

---

### function 回傳內容

| 名稱   | 型別           | 備註說明                               |
|--------|---------------|----------------------------------------|
| result |  `list[dict]` | 回傳所有符合條件的歷史成交紀錄，每筆為一筆成交紀錄，若無資料則回傳空陣列 `[]`，字典內容如下方欄位說明 |

| 欄位名稱       | 型別      | 說明                                 |
|----------------|-----------|--------------------------------------|
| `ticket`        | int       | 成交紀錄的唯一 ID                    |
| `order`         | int       | 所屬訂單編號                          |
| `position_id`   | int       | 對應的部位 ID                        |
| `symbol`        | str       | 商品代碼                             |
| `type`          | int       | 成交方向（買/賣）                    |
| `entry`         | int       | 成交類型（建倉、平倉、調整等）      |
| `reason`        | int       | 成交原因（手動、自動、到期等）      |
| `volume`        | float     | 成交手數                             |
| `price`         | float     | 成交價格                             |
| `commission`    | float     | 手續費                               |
| `swap`          | float     | 庫存費                               |
| `fee`           | float     | 其他費用                             |
| `profit`        | float     | 該筆成交的盈虧                       |
| `comment`       | str       | 備註                                 |
| `external_id`   | str       | 外部系統參照 ID                      |
| `time`          | datetime  | 成交時間（轉換為 `datetime`）        |
| `time_msc`      | int       | 成交時間（毫秒 timestamp）           |

回傳格式如下：

```python
[
  {
    "ticket": 123456789,
    "order": 987654321,
    "position_id": 111222,
    "symbol": "USDJPY.sml",
    "type": 0,
    "entry": 1,
    "reason": 0,
    "volume": 0.1,
    "price": 157.350,
    "commission": -0.8,
    "swap": 0.0,
    "fee": 0.0,
    "profit": 20.15,
    "comment": "開倉",
    "external_id": "",
    "time": "2025-06-20T15:30:00",
    "time_msc": 1718868600000
  }
]
```

---

### 💡 範例程式碼

```python
from mas.mas import MAS

class MAS_Client(MAS):
    def __init__(self):
        super().__init__()

def main():
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_client.login(login_params)

        symbol_params = {
            "symbol": "EURUSD",
            "from": "2025-07-01",
            "to":  "2025-07-07"
        }
        print(mas_client.get_order_history(symbol_params))

        ticket_params = {
          "ticket" : 30681969
        }
        print(mas_client.get_order_history(ticket_params))

        position_params = {
          "position" : 28290355
        }
        print(mas_client.get_order_history(position_params))
    except Exception as e:
        print(str(e))
```
---