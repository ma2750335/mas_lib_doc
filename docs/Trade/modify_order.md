### function 名稱

`modify_order`

---

### function 用途

修改一筆未成交的掛單（限價單）。  
根據傳入的 `order_id`，建立交易修改請求至 MT5 平台。
支援同步調整價格（price）、停損（sl）與停利（tp）。

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 傳入的字典內容如下方欄位說明 |

| dict 欄位名稱   | 型別          | 備註說明 |
|----------------|---------------|----------|
| order_id       | str           | 欲修改之原始掛單的訂單編號（ticket）。 |
| price          | float         | 新的掛單價格。 |
| sl             | float（非必填）| 停損價格。 |
| tp             | float（非必填）| 停利價格。 |

---

### function 回傳內容

| 名稱     | 型別 | 備註說明         |
|----------|------|------------------|
| return   | bool | 修改成功則回傳 `True`，否則為 `False`。 |

---

### 💡 範例程式碼

```python
params = {
    "order_id": "321456789",
    "price": 1.1025,
    "sl": 1.0990,
    "tp": 1.1100
}

success = trade_engine.modify_order(params)
if success:
    print("訂單修改成功")
else:
    print("訂單修改失敗")
```

---
