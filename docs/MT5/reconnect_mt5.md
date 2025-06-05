### function 名稱

`reconnect_mt5`

---

### function 用途

重新連線 MetaTrader 5（MT5）（如中斷後自動重連）。

---

### function 參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                |
|--------|------|-------------------------------------------|
| return | bool | 若連線成功則回傳 `True`，否則為 `False` |

---

### 💡 範例程式碼

```python
if not engine.check_connection():
    print("MT5 掉線，正在重新連線...")
    success = engine.reconnect_mt5()
    if success:
        print("重新連線成功")
    else:
        print("重新連線失敗")