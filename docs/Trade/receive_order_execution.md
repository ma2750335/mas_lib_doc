### function 名稱

`receive_order_execution`

---

### function 用途

接收並處理訂單成交的推播資訊。  
此函式通常在交易成功後由內部邏輯呼叫，通知策略模組、紀錄成交事件，或更新持倉狀態。

---

### function 參數

| 參數名稱     | 型別  | 備註說明 |
|--------------|--------|----------|
| order_id     | str    | 訂單代碼，對應下單後回傳的唯一識別碼 |
| execution_data | dict | 包含成交資訊的字典，如下方欄位說明 |

| execution_data 欄位 | 型別   | 備註說明 |
|----------------------|--------|----------|
| price                | float  | 成交價格 |
| volume               | float  | 成交數量 |
| symbol               | str    | 商品代碼 |
| time                 | datetime | 成交時間（通常為當下推播時間） |
| type                 | str    | 訂單類型（如 buy / sell） |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明              |
|--------|------|-----------------------|
| return | None | 無回傳值（單純接收推播訊息處理） |

---

### 💡 範例程式碼

```python
if result.retcode == mt5.TRADE_RETCODE_DONE:
    self.receiver.on_order_execution(order_id, {
        "price": result.price,
        "volume": result.volume,
        "symbol": symbol,
        "time": datetime.now(),
        "type": order_type
    })