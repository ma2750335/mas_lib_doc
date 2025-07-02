### function 名稱

`modify_order`

---

### function 用途

修改一筆未成交的掛單（限價單）。  
根據傳入的 `order_id`，建立交易修改請求至 MT5 平台。
支援同步調整價格（price）、停損（sl）、停利（tp）、stoplimit、到期時間與備註。
若修改成功，會觸發推播更新訂單狀態。

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 傳入的字典內容如下方欄位說明 |

| dict 欄位名稱 | 型別       | 必填 | 說明                                    |
|--------------|------------|------|----------------------------------------|
| `order_id`   | int        | ✅   | 欲修改之原始掛單的訂單編號（ticket）。    |
| `price`      | float      | ✅   | 修改後的新價格。                        |
| `sl`         | float      | ❌   | 停損價格。                             |
| `tp`         | float      | ❌   | 停利價格。                             |
| `stoplimit`  | float      | ❌   | 停損限價。                             |
| `expiration` | datetime   | ❌   | 掛單的到期時間。                        |
| `comment`    | str        | ❌   | 訂單備註（預設為 `"Modified by MAS"`）。 |

---

### function 回傳內容

| 名稱     | 型別 | 備註說明         |
|----------|------|------------------|
| （匿名）  | bool | 修改成功則回傳 `True`，否則為 `False`。 |

---

### 💡 範例程式碼

```python
mas_client = MASClient()
params = {
    "order_id": 12345678,
    "price": 1.12345,
    "sl": 1.12000,
    "tp": 1.13000,
    "expiration": datetime(2025, 12, 31, 23, 59),
    "comment": "修正價格與止損止盈"
}
success = mas_client.modify_order(params)
if success:
    print("訂單修改成功")
else:
    print("訂單修改失敗")
```

---
