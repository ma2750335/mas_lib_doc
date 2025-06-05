### function 名稱

`unsubscribe_bars`

---

### function 用途

取消指定商品的即時 Bar（K 線）資料訂閱。
此函式會中止內部背景訂閱執行緒，關閉對該商品的即時報價監控。  

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 傳入的字典內容如下方欄位說明 |

| dict 欄位名稱 | 型別 | 備註說明 |
|----------------|------|----------|
| symbol         | str  | 商品代碼（如 EURUSD） |
| timeframe      | str  | Bar 時間週期（如 M1, H1, D1） |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                             |
|--------|------|--------------------------------------|
| return | None | 無回傳值，執行後即停止訂閱 |

---

### 💡 範例程式碼

```python
params = {
    "symbol": "USDJPY",
    "timeframe": "TIMEFRAME_M1"
}

data_engine.unsubscribe_bars(params)