### function 名稱

`check_connection`

---

### function 用途

檢查目前是否已連線至 MetaTrader5。  
此函式會透過 `mt5.terminal_info()` 判斷終端機是否處於連線狀態，並輸出提示訊息。

---

### function 參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                |
|--------|------|-------------------------------------------|
| return | bool | 若連線成功則回傳 `True`，否則回傳 `False` |

---

### 💡 範例程式碼

```python
if engine.check_connection():
    print("目前已連線至 MT5")
else:
    print("尚未連線 MT5，請先執行 login")
```

---

### MT5 function
function 名稱：`mt5.terminal_info()`

function 用途：
取得 MT5 終端機狀態與基本資訊。  
可用於判斷是否已初始化並成功與 MT5 終端機連線。

回傳內容:
| 型別              | 說明 |
|-------------------|------|
| `TerminalInfo` 結構 或 `None` | 成功時回傳包含終端資訊的物件，失敗則為 `None` |

官方參考連結： 
https://www.mql5.com/en/docs/python_metatrader5/mt5terminalinfo_py
