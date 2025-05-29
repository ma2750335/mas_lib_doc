### function 名稱

`shutdown_mt5`

---

### function 用途

關閉與 MetaTrader5 的連線。  
此函式會執行 `mt5.shutdown()`，中止與終端機的溝通，並更新內部狀態 `is_connected = False`。適用於程式結束前的清理階段。

---

### function 參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                 |
|--------|------|--------------------------|
| return | None | 無回傳值，僅執行關閉 MT5 動作 |

---

### 💡 範例程式碼

```python
engine.shutdown_mt5()
print("已關閉 MT5 連線")
```

---

### MT5 function
function 名稱：`mt5.shutdown()`

function 用途：
關閉與 MetaTrader5 終端機的連線。  
此為 `mt5.initialize()` 的對應結束步驟。所有交易操作完成後應執行此函式以釋放系統資源。

此函式無任何參數。

回傳內容:
| 型別 | 說明         |
|------|--------------|
| bool | 回傳 `True` 表示成功關閉連線，`False` 表示操作失敗（可搭配 `mt5.last_error()`）|

官方參考連結： 
https://www.mql5.com/en/docs/python_metatrader5/mt5shutdown_py