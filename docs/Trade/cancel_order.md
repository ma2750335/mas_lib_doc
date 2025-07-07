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
mas_client = MASClient()
cancel_params = {
    "order_id": 12345678,
    "comment": "自動取消條件單"
}

if mas_client.cancel_order(cancel_params):
    print("掛單已成功取消！")
else:
    print("掛單取消失敗。")
```

---
