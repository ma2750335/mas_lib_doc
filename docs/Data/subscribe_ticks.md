### function 名稱

`subscribe_ticks`

---

### function 用途

訂閱即時 Tick 資料或在回測模式中模擬推播歷史 Tick。  
函式會根據 `backtest_toggle` 自動切換資料來源：

- 若為 `True`：呼叫歷史模組送出模擬 Tick 推播  
- 若為 `False`：建立背景執行緒，定期從 MT5 取得最新 Tick 並推送至策略

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 傳入的字典內容如下方欄位說明 |

| dict 欄位名稱    | 型別   | 備註說明 |
|------------------|--------|----------|
| symbol           | str    | 商品代碼（如 `"EURUSD"`） |
| interval_ms      | int    | 每次推播的間隔毫秒數（預設為 500） |
| backtest_toggle  | bool   | 是否為模擬模式（`True` 表示使用歷史資料） |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明             |
|--------|------|----------------------|
| 無     | None | 此函式無實際回傳值，用於觸發 Tick 資料推播任務 |

---

### 💡 範例程式碼

```python
params = {
    "symbol": "EURUSD",
    "interval_ms": 1000,
    "backtest_toggle": False
}

data_engine.subscribe_ticks(params)
```
---
### MT5 function

function 名稱：`mt5.copy_ticks_from(name, time_from, count, flags)`
function 用途：從指定時間開始，擷取指定數量的 Tick 資料。常用於實盤訂閱中取得即時報價。

| 參數名稱 | 型別     | 說明 |
|----------|----------|------|
| name     | str      | 商品代碼，如 `"EURUSD"` |
| time_from| datetime | 起始時間 |
| count    | int      | 取得筆數 |
| flags    | int      | Tick 類型（如 `COPY_TICKS_ALL`, `COPY_TICKS_TRADE`, `COPY_TICKS_QUOTE`） |

回傳內容:
- 成功時：回傳 `numpy` 陣列，欄位包含：
  - `time`：UNIX 秒數
  - `time_msc`：精確毫秒
  - `bid`、`ask`、`last`、`volume`
- 失敗時：回傳 `None`

官方參考連結： 
https://www.mql5.com/en/docs/python_metatrader5/mt5copyticksfrom_py