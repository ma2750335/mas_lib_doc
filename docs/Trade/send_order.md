### function 名稱

`send_order`

---

### function 用途

發送一筆交易訂單，支援市價單與限價單。  
此函式為統一下單入口，根據參數 `backtest_toggle` 的值，自動切換：

- 若為 `True`：使用模擬交易流程進行下單，不連接 MetaTrader5  
- 若為 `False`：使用實盤交易流程進行下單，連接 MetaTrader5 進行真實交易

實盤流程包含初始化、登入檢查、Tick 擷取、訂單轉換、`order_send()` 發送請求與推播狀態處理
模擬流程則建立模擬訂單，加入待處理清單，並推播預約訊息。

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 傳入的字典內容如下方欄位說明 |

| dict 欄位名稱    | 型別   | 備註說明 |
|------------------|--------|----------|
| symbol           | str    | 商品代碼（如 EURUSD） |
| order_type       | str    | 訂單類型（buy、sell、buy_limit、sell_limit） |
| volume           | float  | 下單數量（如 1.0） |
| price            | float  | 限價單價格（僅限價單需要） |
| sl               | float  | 停損價格（可選） |
| tp               | float  | 停利價格（可選） |
| comment          | str    | 訂單備註（預設為 MAS Order） |
| backtest_toggle  | bool   | 是否為模擬交易（True 表示模擬，False 表示實盤） |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                         |
|--------|------|--------------------------------------------------|
| return | str  | 成功下單後回傳訂單代碼（字串），失敗則回傳空字串或模擬編號 |

---

### 💡 範例程式碼（實盤）

```python
params = {
    "symbol": "EURUSD",
    "order_type": "buy",
    "volume": 1.0,
    "sl": 1.0950,
    "tp": 1.1050,
    "comment": "Test Order",
    "backtest_toggle": False
}

order_id = engine.send_order(params)
print("實盤訂單編號：", order_id)
```

### 💡 範例程式碼（模擬）
```python
params = {
    "symbol": "EURUSD",
    "order_type": "buy",
    "volume": 1.0,
    "backtest_toggle": True
}

order_id = engine.send_order(params)
print("模擬訂單編號：", order_id)
```

---

### MT5 function

function 名稱：`mt5.order_send(request)`  
此為 MetaTrader5 提供的交易下單函式。

function 用途：發送交易請求至 MT5 伺服器，可建立市價單（`TRADE_ACTION_DEAL`）與限價掛單（`TRADE_ACTION_PENDING`）。

`request` 為一個 `MqlTradeRequest` 結構，以下是該結構的欄位說明：

| 欄位名稱      | 型別   | 說明 |
|---------------|--------|------|
| action        | int    | 交易操作類型，對應 `TRADE_REQUEST_ACTIONS` 列舉，例如下單、修改、刪除等 |
| magic         | int    | EA 識別碼，可用來標記策略來源，每個 EA 可使用不同 ID 區分 |
| order         | int    | 訂單票號，修改掛單時必填 |
| symbol        | str    | 下單商品代碼（例如 `"EURUSD"`），修改或平倉時非必填 |
| volume        | float  | 要求的下單手數，實際成交量依商品與執行方式而定 |
| price         | float  | 下單價格。若為市價單且屬於「市場成交型」（Market Execution），此欄位可不填 |
| stoplimit     | float  | 當市價觸及 `price` 時，用於啟用限價單的價格（觸發後才送出） |
| sl            | float  | 停損價格（價格朝不利方向移動時觸發） |
| tp            | float  | 停利價格（價格朝有利方向移動時觸發） |
| deviation     | int    | 可接受的最大滑價（以點為單位） |
| type          | int    | 訂單型別，對應 `ORDER_TYPE` 列舉（如買入、市價、限價等） |
| type_filling  | int    | 撮合方式，對應 `ORDER_TYPE_FILLING` 列舉（如 FOK、IOC、RETURN） |
| type_time     | int    | 訂單有效時間型態，對應 `ORDER_TYPE_TIME`（如 GTC、指定時間） |
| expiration    | datetime | 掛單的到期時間（僅在 `TIME_SPECIFIED` 類型時使用） |
| comment       | str    | 訂單備註 |
| position      | int    | 持倉編號，用於修改或平倉指定倉位（通常與開倉訂單編號一致） |
| position_by   | int    | 反向倉位編號，用於「對沖平倉」操作（以相反方向的持倉進行平倉） |


官方參考連結：  
https://www.mql5.com/en/docs/python_metatrader5/mt5ordersend_py