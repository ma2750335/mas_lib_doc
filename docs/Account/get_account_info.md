### function 名稱

`get_account_info`

---

### function 用途

查詢目前 MetaTrader 5（MT5）登入帳號的基本資訊。

---

### function 參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                               |
|--------|------|----------------------------------------------------------|
| return | dict | 若成功則回傳帳戶資訊dict，否則為 `{"error": "查詢帳戶資訊失敗"}`，字典內容如下方欄位說明|

| 欄位名稱        | 類型 | 說明 |
|------------------|------|------|
| login            | int  | 使用者帳號 |
| trade_mode       | int  | 交易模式（0=實盤, 1=模擬, 2=競賽） |
| leverage         | int  | 槓桿倍率 |
| limit_orders     | int  | 最大掛單數量 |
| margin_so_mode   | int  | 強平計算模式（0=百分比, 1=金額） |
| trade_allowed    | int  | 是否允許手動交易（0 或 1） |
| trade_expert     | int  | 是否允許 EA 交易（0 或 1） |
| margin_mode      | int  | 保證金模式（0=Netting, 1=Exchange, 2=Hedging） |
| currency_digits  | int  | 貨幣小數位數 |
| fifo_close       | int  | 是否啟用 FIFO 平倉（0 或 1） |
| balance             | float | 總餘額 |
| credit              | float | 信用額度 |
| profit              | float | 未實現損益 |
| equity              | float | 淨值 |
| margin              | float | 已用保證金 |
| margin_free         | float | 可用保證金 |
| margin_level        | float | 保證金比率 (%) |
| margin_so_call      | float | Margin Call 水位 |
| margin_so_so        | float | 強平水位 |
| margin_initial      | float | 初始保證金 |
| margin_maintenance  | float | 維持保證金 |
| assets              | float | 資產總值 |
| liabilities         | float | 負債總額 |
| commission_blocked  | float | 凍結的手續費 |
| name     | str  | 使用者稱 |
| server   | str  | 伺服器名稱 |
| currency | str  | 帳戶貨幣基準 |
| company  | str  | 券商名稱 |


回傳格式如下：
```python
{
    "login": 25115284,
    "trade_mode": 0,
    "balance": 99588.3,
    "equity": 99543.2,
    "margin": 54.37,
    "free_margin": 99488.8,
    "leverage": 100,
    "margin_level": 183085,
    "currency": "USD",
    "limit_orders": 200,
    "margin_so_mode": 0,
    "trade_allowed": true,
    "trade_expert": true,
    "margin_mode": 2,
    "currency_digits": 2,
    "fifo_close": false,
    "credit": 0,
    "profit": -45.13,
    "margin_so_call": 50,
    "margin_so_so": 30,
    "margin_initial": 0,
    "margin_maintenance": 0,
    "assets": 0,
    "liabilities": 0,
    "commission_blocked": 0,
    "name": "James Smith",
    "server": "MetaQuotes-Demo",
    "company": "MetaQuotes Software Corp."
}
```

---

### 💡 範例程式碼

```python
info = engine.get_account_info()
if "error" in info:
    print("查詢失敗：", info["error"])
else:
    print("帳戶餘額：", info["balance"])
```
