### function 名稱

`receive_order_execution`

---

### function 用途

接收系統回傳的訂單成交資訊，用於後續處理或顯示。

---

### function 參數

| 參數名稱     | 型別  | 備註說明 |
|--------------|--------|----------|
| order_id     | str    | 訂單編號。 |
| execution_data | dict | 傳入的字典內容如下方欄位說明。 |

| execution_data 欄位 | 型別   | 備註說明 |
|----------------------|--------|----------|
| `price`              | float  | 成交價格。 |
| `volume`             | float  | 成交數量。 |
| `symbol`             | str    | 商品代碼。 |
| `time`               | datetime | 成交時間（通常為當下推播時間）。 |
| `type`               | str    | 訂單類型。 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明              |
|--------|------|-----------------------|
| 無     | None | 無回傳值（單純接收推播訊息處理） |

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