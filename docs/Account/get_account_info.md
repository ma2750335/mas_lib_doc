### function 名稱

`get_account_info`

---

### function 用途

查詢當前登入帳戶的基本資訊。  
本函式會透過 `mt5.account_info()` 取得帳戶狀態，包含餘額、淨值、槓桿、保證金資訊等，並轉換為 Python 字典格式。

---

---

### function 參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                               |
|--------|------|----------------------------------------------------------|
| return | dict | 若成功，回傳帳戶資訊字典；若失敗，回傳 `{"error": "查詢帳戶資訊失敗"}` |

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

### MT5 function
function 名稱：`mt5.account_info()`

function 用途：
回傳目前登入帳戶的詳細資訊。  
包含帳號、餘額、淨值、保證金、可用保證金、槓桿倍率、貨幣等。

回傳內容:
| 型別 | 說明                         |
|------|------------------------------|
| `AccountInfo` 結構物件 | 欄位內容整合自`ENUM_ACCOUNT_INFO_INTEGER` , `ENUM_ACCOUNT_INFO_DOUBLE` ,  `ENUM_ACCOUNT_INFO_STRING` |

ENUM_ACCOUNT_INFO_INTEGER:
| 欄位名稱        | 類型 | 說明 |
|------------------|------|------|
| login            | int  | 帳戶號碼 |
| trade_mode       | int  | 交易模式（0=實盤, 1=模擬, 2=競賽） |
| leverage         | int  | 槓桿倍率 |
| limit_orders     | int  | 最大掛單數量 |
| margin_so_mode   | int  | 強平計算模式（0=百分比, 1=金額） |
| trade_allowed    | int  | 是否允許手動交易（0 或 1） |
| trade_expert     | int  | 是否允許 EA 交易（0 或 1） |
| margin_mode      | int  | 保證金模式（0=Netting, 1=Exchange, 2=Hedging） |
| currency_digits  | int  | 貨幣小數位數 |
| fifo_close       | int  | 是否啟用 FIFO 平倉（0 或 1） |

ENUM_ACCOUNT_INFO_DOUBLE:
| 欄位名稱            | 類型  | 說明 |
|---------------------|-------|------|
| balance             | float | 總餘額 |
| credit              | float | 信用額度 |
| profit              | float | 未實現盈虧 |
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

ENUM_ACCOUNT_INFO_STRING:
| 欄位名稱 | 類型 | 說明 |
|----------|------|------|
| name     | str  | 客戶名稱 |
| server   | str  | 伺服器名稱 |
| currency | str  | 帳戶基準貨幣 |
| company  | str  | 經紀商名稱 |


官方參考連結： 

https://www.mql5.com/en/docs/python_metatrader5/mt5accountinfo_py
https://www.mql5.com/en/docs/constants/environment_state/accountinformation
