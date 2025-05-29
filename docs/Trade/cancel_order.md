### function 名稱

`cancel_order`

---

### function 用途

取消一筆尚未成交的掛單（如限價單）。  
此函式會根據傳入的 `order_id` 建立取消請求，並送交至 MT5 平台執行刪單動作。

---

### function 參數

| 參數名稱 | 型別  | 備註說明 |
|----------|-------|----------|
| params   | dict  | 包含 order_id（str）：欲取消的掛單識別碼 |

---

### function 回傳內容

| 名稱     | 型別 | 備註說明              |
|----------|------|-----------------------|
| return   | bool | 成功取消則回傳 True，否則為 False |

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

### MT5 function
function 名稱：`mt5.order_send(request)`  
此為 MetaTrader5 提供的交易請求函式。

當 `request["action"]` 設為 `mt5.TRADE_ACTION_REMOVE` 時，該請求可用於刪除尚未成交的掛單（如限價單、停止單等）。

request 結構說明（刪除掛單）:

| 欄位名稱 | 型別 | 說明 |
|----------|------|------|
| action   | int  | 固定為 `mt5.TRADE_ACTION_REMOVE` |
| order    | int  | 欲取消的原始掛單訂單編號（ticket） |

官方參考連結：  
https://www.mql5.com/en/docs/python_metatrader5/mt5ordersend_py