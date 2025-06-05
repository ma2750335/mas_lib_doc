### function 名稱

`cancel_order`

---

### function 用途

取消一筆尚未成交的掛單。  
此函式會根據傳入的 `order_id` 建立取消請求至 MT5 平台執行刪單動作。

---

### function 參數

| 參數名稱 | 型別  | 備註說明 |
|----------|-------|----------|
| params   | dict  | order_id（str）：欲取消之原始掛單的訂單編號（ticket）。 |

---

### function 回傳內容

| 名稱     | 型別 | 備註說明              |
|----------|------|-----------------------|
| return   | bool | 取消成功則回傳 `True`，否則為 `False` |

---

### 💡 範例程式碼

```python
cancel_params = {
    "order_id": "BT1"
}

if trade_engine.cancel_order(cancel_params):
    print("掛單已成功取消！")
else:
    print("掛單取消失敗。")
```

---
