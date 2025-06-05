### function 名稱

`check_connection`

---

### function 用途

檢查 MetaTrader 5（MT5）是否仍保持連線。  

---

### function 參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                |
|--------|------|-------------------------------------------|
| return | bool | 若連線正常則回傳 `True`，否則回傳 `False` |

---

### 💡 範例程式碼

```python
if engine.check_connection():
    print("目前已連線至 MT5")
else:
    print("尚未連線 MT5，請先執行 login")
```

---
