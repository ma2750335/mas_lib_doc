---
id: login
title: login
#slug: /api/modify-order
---

### function 名稱

`login`

---

### function 用途

驗證 MAS CTD 的TOKEN，成功後初始化MetaTrader 5（MT5）登入帳戶。

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 包含以下欄位： `account`（int）、`password`（str）、`server`（str）、`token`（str） |

---

### function 回傳內容

| 名稱     | 型別  | 備註說明                                   |
|----------|-------|--------------------------------------------|
| `return` | bool  | 成功則回傳 `True`，否則為 `False` |

---

### 範例程式碼

```python
mas_client = MASClient()

login_params = {
    "account": 123456,
    "password": "mypassword",
    "server": "MetaQuotes-Demo",
    "token": "MAS-CTD-TOKEN"
}

if mas_client.login(login_params):
    print("登入成功！")
else:
    print("登入失敗。")
```

---

### MT5 function 相關說明
名稱：`mt5.login`  

說明 : 使用指定的參數來登入MT5 交易帳號。

參數：  
- `login`（int，**必填**）：交易帳號。
- `password`（str，非必填）：交易帳號密碼。如未設定密碼，則自動套用 MT5 終端資料庫中儲存的密碼。  
- `server`（str，非必填）：交易伺服器名稱。如未設定伺服器，則自動套用最後連線時的伺服器。  
- `timeout`（int，非必填）：連線逾時時間（單位：毫秒），預設為 `60000`（60 秒）。若在指定時間內無法建立連線，則強制終止並產生例外。

回傳內容：  
- `True` 表示登入成功  
- `False` 表示登入失敗，可搭配 `mt5.last_error()` 查看錯誤程式碼與描述。

官方參考連結：  
https://www.mql5.com/en/docs/integration/python_metatrader5/mt5login_py