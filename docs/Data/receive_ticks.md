### function 名稱

`receive_ticks`

---

### function 用途

接收 Tick 資料推播，用於傳遞即時報價至策略模組。  
此函式由 `on_tick()` 呼叫觸發，代表一筆新的 Tick 報價資料已抵達，並可進一步用於策略邏輯、紀錄、或模擬計算。

---

### function 參數

| 參數名稱 | 型別  | 備註說明 |
|----------|--------|----------|
| symbol   | str    | 商品代碼（如 `"EURUSD"`） |
| data     | dict   | 一筆 Tick 結構資料 |
| is_end   | bool   | 是否為推播結束標記（模擬模式中使用） |

data 結構說明:

| 欄位名稱 | 型別     | 說明         |
|----------|----------|--------------|
| time     | datetime | 時間戳記     |
| bid      | float    | 買價         |
| ask      | float    | 賣價         |
| last     | float    | 最後成交價   |
| volume   | float    | 成交量       |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明       |
|--------|------|----------------|
| return | None | 無回傳值，僅作為資料推播傳遞 |

---

### 💡 範例程式碼

```python
tick_data = {
    "symbol": "EURUSD",
    "time": datetime.now(),
    "bid": 1.1056,
    "ask": 1.1058,
    "last": 1.1057,
    "volume": 1.23
}

engine.receive_ticks("EURUSD", tick_data)