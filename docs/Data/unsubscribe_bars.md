### function 名稱

`unsubscribe_bars`

---

### function 用途

取消指定商品與週期的即時 Bar（K 線）資料訂閱。  
本函式會終止背景推播執行緒，釋放不再監控的訂閱資源。

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 字典內容如下方欄位說明 |

| dict 欄位名稱 | 型別 | 備註說明 |
|----------------|------|----------|
| symbol         | str  | 商品代碼（如 EURUSD） |
| timeframe      | str  | Bar 時間週期（如 TIMEFRAME_M1, TIMEFRAME_H1, TIMEFRAME_D1） |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                             |
|--------|------|--------------------------------------|
| return | None | 此函式無回傳值，執行後即終止對應訂閱 |

---

### 💡 範例程式碼

```python
params = {
    "symbol": "USDJPY",
    "timeframe": "TIMEFRAME_M1"
}

data_engine.unsubscribe_bars(params)