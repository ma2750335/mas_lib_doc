### function 名稱

`subscribe_bars`

---

### function 用途

訂閱指定商品的即時 Bar（K 線）資料，或在回測模式中推播歷史 Bar。  
函式會根據 `backtest_toggle` 自動切換訂閱來源：
- 模擬模式：呼叫歷史資料模組，推送歷史 Bar  
- 實盤模式：每間隔 `interval_ms` 毫秒，從 MT5 抓取即時 Bar 推播至策略

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 字典內容如下方欄位說明 |

| dict 欄位名稱    | 型別   | 備註說明 |
|------------------|--------|----------|
| symbol           | str    | 商品代碼（如 EURUSD） |
| timeframe        | str    | Bar 時間週期（如 TIMEFRAME_M1, TIMEFRAME_H1, TIMEFRAME_D1） |
| interval_ms      | int    | 每次推播間隔（毫秒），預設為 1000 |
| backtest_toggle  | bool   | 是否為模擬模式，True 表示歷史回測 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                          |
|--------|------|-----------------------------------|
| return | None | 此函式無回傳值，僅觸發背景訂閱推播 |

---

### 💡 範例程式碼

```python
params = {
    "symbol": "EURUSD",
    "timeframe": "TIMEFRAME_M1",
    "interval_ms": 2000,
    "backtest_toggle": False
}

data_engine.subscribe_bars(params)
```
---
### MT5 function

function 名稱：`mt5.copy_rates_from(symbol, timeframe, time_from, count)`

function 用途：
- 擷取指定商品與週期的 Bar（K 線）資料。  
- 常用於實盤訂閱中取得即時 Bar 資料（Open, High, Low, Close, Volume）。

| 參數名稱 | 型別     | 說明 |
|----------|----------|------|
| symbol   | str      | 商品代碼，如 `"EURUSD"` |
| timeframe| int      | 時間週期（如 `TIMEFRAME_M1`） |
| time_from| datetime | 起始時間 |
| count    | int      | 擷取筆數（如 2） |

TIMEFRAME說明:
| ID | 說明 |
|----------|----------|
| TIMEFRAME_M1 | 1 minute | 
| TIMEFRAME_M2 | 2 minutes | 
| TIMEFRAME_M3 | 3 minutes | 
| TIMEFRAME_M4 | 4 minutes | 
| TIMEFRAME_M5 | 5 minutes | 
| TIMEFRAME_M6 | 6 minutes | 
| TIMEFRAME_M10 | 10 minutes | 
| TIMEFRAME_M12 | 12 minutes | 
| TIMEFRAME_M15 | 15 minutes | 
| TIMEFRAME_M20 | 20 minutes | 
| TIMEFRAME_M30 | 30 minutes | 
| TIMEFRAME_H1 | 1 hour | 
| TIMEFRAME_H2 | 2 hours | 
| TIMEFRAME_H3 | 3 hours | 
| TIMEFRAME_H4 | 4 hours | 
| TIMEFRAME_H6 | 6 hours | 
| TIMEFRAME_H8 | 8 hours | 
| TIMEFRAME_H12 | 12 hours | 
| TIMEFRAME_D1 | 1 day | 
| TIMEFRAME_W1 | 1 week | 
| TIMEFRAME_MN1 | 1 month | 

回傳內容:
- 成功：回傳 `numpy` 陣列，欄位包含：
  - `time`：Bar 時間（UNIX 時間戳）
  - `open`, `high`, `low`, `close`
  - `tick_volume`, `spread`, `real_volume`
- 失敗：回傳 `None`

官方參考文件：  
https://www.mql5.com/en/docs/python_metatrader5/mt5copyratesfrom_py