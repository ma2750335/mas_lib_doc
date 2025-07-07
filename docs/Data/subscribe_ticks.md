---
sidebar_position: 4
---
### function 名稱

`subscribe_ticks`

---

### function 用途

訂閱即時 Tick 資料，或於回測模式中送出歷史 Tick 推播。 
根據 `backtest_toggle` 參數的值，自動切換資料來源：

- 若為 `True`：呼叫歷史資料模組送出 Tick 推播  
- 若為 `False`：建立背景執行緒，每間隔 `interval_ms` 毫秒從 MT5 取得最新 Tick 並推播

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 傳入的字典內容如下方欄位說明 |

| dict 欄位名稱      | 型別   |  必填 | 備註說明                                 |
|--------------------|-------|------|-----------------------------------------|
| `backtest_toggle`  | bool  | ✅  | 是否為回測模式（`True` 表示回測模式）。      |
| `symbol`           | str   | ✅  | 商品代碼（如 `"EURUSD"`）。                 |
| `interval_ms`      | int   | ❌  | 每次推播的間隔毫秒數（預設為 500）。         |
| `flags`            | int   | ❌   | Tick 資料來源類型，預設為 `mt5.COPY_TICKS_ALL`。     |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明             |
|--------|------|----------------------|
| 無     | None | 此函式無實際回傳值，用於觸發 Tick 資料推播 |

---

### 💡 範例程式碼

```python
mas_client = MASClient()
params = {
    "symbol": "EURUSD",
    "interval_ms": 1000,
    "backtest_toggle": False
}

mas_client.subscribe_ticks(params)
```
---