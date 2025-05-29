### function 名稱

`initialize_mt5`

---

### function 用途

初始化 MetaTrader5 環境並建立與終端機的連線。  
此函式會在內部呼叫 `mt5.initialize()`，若初始化失敗會輸出錯誤訊息並回傳 `False`。
📌 備註：一般情況下不需要獨立呼叫，通常由 `login()` 函式內部自動執行。
---

### function 參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                 |
|--------|------|------------------------------------------|
| return | bool | 若初始化成功則回傳 True，否則為 False（初始化失敗、未連上 MT5） |

---

### 💡 範例程式碼

```python
if not engine.initialize_mt5():
    print("MT5 初始化失敗")
else:
    print("MT5 已連線")
```

---

### MT5 function
function 名稱：`mt5.initialize(path=None, login=None, password=None, server=None, portable=False)`

function 用途：
初始化與 MetaTrader 5 終端機的通訊環境，建立與本機 MT5 程式的連線通道。  
此函式通常是使用任何 MT5 功能前的第一步。


| 參數名稱 | 型別 | 說明 |
|----------|------|------|
| path     | str  | MT5 終端機安裝路徑（可選） |
| login    | int  | 登入帳號（可選） |
| password | str  | 登入密碼（可選） |
| server   | str  | 伺服器名稱（可選） |
| portable | bool | 是否以可攜模式啟動（可選） |

回傳內容:
| 型別 | 說明                         |
|------|------------------------------|
| bool | 成功則回傳 `True`，失敗則回傳 `False`，可透過 `mt5.last_error()` 取得錯誤代碼與說明 |

官方參考連結： 
https://www.mql5.com/en/docs/python_metatrader5/mt5initialize_py