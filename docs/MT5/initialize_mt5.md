---
sidebar_position: 1
---
### function 名稱

`initialize_mt5`

---

### function 用途

初始化 MetaTrader 5（MT5）環境並建立與終端機的連線。
📌 備註：一般情況下不需要獨立呼叫，通常由 `login()` 函式內部自動執行。

---

### function 參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                           | 
|--------|------|-----------------------------------|
|（匿名） | bool | 若成功則回傳 `True`，否則為 `False` |

---

### 💡 範例程式碼

```python
mas_client = MASClient()
if not mas_client.initialize_mt5():
    print("MT5 初始化失敗")
else:
    print("MT5 已連線")
```

---