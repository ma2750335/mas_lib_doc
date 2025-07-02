---
id: login
title: login
---

### function 名稱

`login`

---

### function 用途

初始化MetaTrader 5（MT5）並登入帳戶。

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 傳入的字典內容如下方欄位說明 |

| dict欄位名稱    | 型別    | 必填 | 備註說明 |
|----------------|---------|------|----------|
| `account`      | int     | ✅   | 使用者MT5交易帳號。 |
| `password`     | str     | ❌   | 使用者MT5交易密碼。 如未設定密碼，則自動套用 MT5 終端資料庫中儲存的密碼。 |
| `server`       | str     | ❌   | 交易伺服器名稱。如未設定伺服器，則自動套用最後連線時的伺服器。 |
| `timeout`      | int     | ❌   | 連線逾時時間（單位：毫秒），預設為 `60000`（60 秒）。 |

---

### function 回傳內容

| 名稱     | 型別  | 備註說明                                   |
|----------|-------|--------------------------------------------|
| （匿名） | bool  | 成功則回傳 `True`，失敗則回傳錯誤訊息。 |

---

### 範例程式碼

```python
mas_client = MASClient()

login_params = {
    "account": 12345678,
    "password": "your_password",
    "server": "MetaQuotes-Demo",
    "timeout": 10000
}

if mas_client.login(login_params):
    print("登入成功！")
else:
    print("登入失敗。")
```

---