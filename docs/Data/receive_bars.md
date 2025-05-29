### function 名稱

`receive_bars`

---

### function 用途

接收來自即時訂閱或模擬回測的 Bar（K 線）資料推播。  
本函式會將資料傳遞至策略模組，通常用於進行技術指標計算、訊號生成、或策略進出場判斷。

---

### function 參數

| 參數名稱 | 型別  | 備註說明 |
|----------|--------|----------|
| symbol   | str    | 商品代碼（如 `"EURUSD"`） |
| data     | dict   | 一筆 Bar 結構資料 |
| is_end   | bool   | 是否為推播結束標記（模擬模式中使用） |


 data 結構說明:
 | 欄位名稱 | 型別     | 說明       |
|----------|----------|------------|
| time     | datetime | Bar 起始時間 |
| open     | float    | 開盤價     |
| high     | float    | 最高價     |
| low      | float    | 最低價     |
| close    | float    | 收盤價     |
| volume   | float    | 成交量     |
| timeframe| str      | Bar 的時間週期（如 TIMEFRAME_M1, TIMEFRAME_H1, TIMEFRAME_D1） |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                    |
|--------|------|-----------------------------|
| return | None | 無回傳值，僅作為資料推播傳遞 |

---

### 💡 範例程式碼
```python
bar_data = {
    "symbol": "EURUSD",
    "time": datetime.now(),
    "timeframe": "M1",
    "open": 1.1050,
    "high": 1.1060,
    "low": 1.1040,
    "close": 1.1055,
    "volume": 345
}

engine.receive_bars("EURUSD", bar_data)