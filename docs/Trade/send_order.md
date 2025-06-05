### function 名稱

`send_order`

---

### function 用途

發送一筆交易訂單，支援市價單與限價單。  
此函式為統一下單入口，根據 `backtest_toggle` 參數的值，自動切換：

- 若為 `True`：使用模擬交易流程進行下單，不連接 MetaTrader5 。
- 若為 `False`：使用實盤交易流程進行下單，連接 MetaTrader5 進行真實交易。

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 傳入的字典內容如下方欄位說明 |

| dict 欄位名稱    | 型別                           | 備註說明 |
|------------------|------------------------------|----------|
| symbol           | str                               | 商品代碼（如 EURUSD）。 |
| order_type       | str                               | 訂單類型（buy、sell、buy_limit、sell_limit）。 |
| volume           | float                             | 下單數量（如 1.0）。 |
| price            | float（order_type為限價單時，必填） | 限價單價格。|
| sl               | float（非必填）                    | 停損價格 。 |
| tp               | float（非必填）                    | 停利價格 。 |
| comment          | str                               | 訂單備註（預設為 MAS Order）。 |
| backtest_toggle  | bool                              | 是否為模擬交易（True 表示模擬，False 表示實盤）。 |

---

### request內容

| 欄位名稱      | 型別   | 說明 |
|---------------|--------|------|
| action        | int    | 交易操作類型。 |
| magic         | int    | EA ID，可用來標記策略來源。 |
| order         | int    | 訂單編號，修改委託單時必填。 |
| symbol        | str    | 商品代碼（例如 `"EURUSD"`），修改或平倉時非必填 |
| volume        | float  | 下單數量。 |
| price         | float  | 下單價格。若為市價單且屬於「市場成交型」（Market Execution），此欄位可不填。 |
| stoplimit     | float  | 當市價觸及 `price` 時，用於啟用限價單的價格（觸發後才送出）。 |
| sl            | float  | 停損價格。 |
| tp            | float  | 停利價格。 |
| deviation     | int    | 可接受的最大滑價（以點為單位）。 |
| type          | int    | 訂單類型。 |
| type_filling  | int    | 撮合方式。 |
| type_time     | int    | 訂單有效時間型態。 |
| expiration    | datetime | 掛單的到期時間。 |
| comment       | str    | 訂單備註。 |
| position      | int    | 持倉編號，用於修改或平倉指定倉位（通常與開倉訂單編號一致）。 |
| position_by   | int    | 反向倉位編號，用於「對沖平倉」操作（以相反方向的持倉進行平倉）。 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                         |
|--------|------|--------------------------------------------------|
| return | str  | 成功下單後回傳訂單編號(order_id)，失敗則回傳錯誤訊息。 |

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