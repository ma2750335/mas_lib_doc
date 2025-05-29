### function 名稱

`reconnect_mt5`

---

### function 用途

當與 MetaTrader5 的連線中斷時，自動執行重新連線流程。  
此函式會先呼叫 `shutdown_mt5()` 關閉舊有連線，再重新初始化 MT5 環境（`initialize_mt5()`）。  
適用於定時檢查連線或在策略執行中偵測 MT5 掉線時使用。

---

### function 參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                |
|--------|------|-------------------------------------------|
| return | bool | 若重新連線成功則回傳 `True`，否則回傳 `False` |

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