### function 名稱

`subscribe_bars`

---

### function 用途

訂閱指定商品的即時 Bar（K 線）資料，或於回測模式中送出歷史 Bar 推播。  
根據 `backtest_toggle` 參數的值，自動切換資料來源：

- 若為 `True`：呼叫歷史資料模組送出 Bar 推播  
- 若為 `False`：建立背景執行緒，每間隔 `interval_ms` 毫秒從 MT5 取得最新 Bar 並推播

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 字典內容如下方欄位說明 |

| dict 欄位名稱    | 型別   | 備註說明 |
|------------------|--------|----------|
| symbol           | str    | 商品代碼（如 EURUSD） |
| timeframe        | str    | Bar 時間週期（如 M1, H1, D1） |
| interval_ms      | int    | 每次推播間隔（毫秒），預設為 1000 |
| backtest_toggle  | bool   | 是否為回測模式（`True` 表示回測模式） |

timeframe說明:
| ID | 說明 |
|----------|----------|
| M1 | 1 minute | 
| M2 | 2 minutes | 
| M3 | 3 minutes | 
| M4 | 4 minutes | 
| M5 | 5 minutes | 
| M6 | 6 minutes | 
| M10 | 10 minutes | 
| M12 | 12 minutes | 
| M15 | 15 minutes | 
| M20 | 20 minutes | 
| M30 | 30 minutes | 
| H1 | 1 hour | 
| H2 | 2 hours | 
| H3 | 3 hours | 
| H4 | 4 hours | 
| H6 | 6 hours | 
| H8 | 8 hours | 
| H12 | 12 hours | 
| D1 | 1 day | 
| W1 | 1 week | 
| MN1 | 1 month | 

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                          |
|--------|------|-----------------------------------|
| return | None | 此函式無回傳值，用於觸發 Bar 資料推播 |

---

### 💡 範例程式碼

```python
params = {
    "symbol": "EURUSD",
    "timeframe": "M1",
    "interval_ms": 2000,
    "backtest_toggle": False
}

data_engine.subscribe_bars(params)
```
---