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
| `symbol`    | str           | ❌   | 指定查詢的商品（使用 `group` 欄位過濾）                    |
| `from`      | datetime/str  | ❌   | 起始時間，預設為 `2000-01-01`                              |
| `to`        | datetime/str  | ❌   | 結束時間，預設為 `datetime.now()`                          |
| `ticket`    | int           | ❌   | 指定訂單的成交紀錄（可搭配 from/to）                       |
| `position`  | int           | ❌   | 指定部位的成交紀錄                                          |

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
mas_client = MASClient()

from datetime import datetime, timedelta

params = {
    "symbol": "USDJPY.sml",
    "from": datetime.now() - timedelta(days=7),
    "to": datetime.now()
}

deals = mas_client.get_order_history(params)

for d in deals:
    print(f"{d['symbol']} | {d['price']} @ {d['volume']}手 | 盈虧: {d['profit']}")

```

---

### MT5 function

function 名稱：`mt5.history_deals_get()`
function 用途：查詢指定時間區間內的歷史成交紀錄（Deal），可透過參數篩選指定商品、訂單或部位。

以下為所有可傳入的命名參數（皆為可選）：
| 參數名稱 | 型別 | 說明 |
|----------|------|------|
| date_from | datetime | 查詢起始時間。 |
| date_to   | datetime | 查詢結束時間。 |
| group     | str      | 商品群組過濾條件。可回傳符合群組條件的商品成交紀錄（例如 `"USD*"` 表示所有美元商品）。 |
| ticket    | int      | 指定訂單的 ticket 編號，將回傳對應的成交紀錄。 |
| position  | int      | 指定部位的 ticket 編號，將回傳對應的成交紀錄。 |


回傳內容:
| 型別 | 說明                         |
|------|------------------------------|
| `Deal ` 結構物件 | 欄位內容整合自`ENUM_DEAL_PROPERTY_INTEGER` , `ENUM_DEAL_PROPERTY_DOUBLE` ,  `ENUM_DEAL_PROPERTY_STRING` |

ENUM_DEAL_PROPERTY_INTEGER:
| 欄位名稱            | 類型     | 說明                                                           |
|---------------------|----------|----------------------------------------------------------------|
| ticket              | int      | 成交紀錄編號。每筆成交紀錄會分配一個唯一的 ticket。             |
| order               | int      | 對應的訂單編號。                                               |
| time                | datetime | 成交時間。                                                     |
| time_msc            | int      | 成交時間（毫秒）。                                             |
| type                | int      | 成交類型（0=買入，1=賣出，2=平倉等）。                         |
| entry               | int      | 成交方向（0=進場，1=出場）。                                   |
| position_id         | int      | 對應的部位編號。                                               |
| reason              | int      | 成交原因（0=客戶手動，1=移動端，2=網頁端，3=EA）。             |

ENUM_DEAL_PROPERTY_DOUBLE:
| 欄位名稱           | 類型  | 說明                     |
|--------------------|-------|--------------------------|
| volume             | float | 成交數量（手數）。       |
| price              | float | 成交價格。               |
| commission         | float | 手續費。                 |
| swap               | float | 掉期費用。               |
| profit             | float | 成交盈虧。               |
| fee                | float | 額外費用。               |

ENUM_DEAL_PROPERTY_STRING:
| 欄位名稱           | 類型  | 說明                     |
|--------------------|-------|--------------------------|
| symbol             | str   | 商品代碼。               |
| comment            | str   | 成交註解。               |
| external_id        | str   | 外部交易系統的成交識別碼。|

官方參考連結： 
https://www.mql5.com/en/docs/python_metatrader5/mt5historydealsget_py