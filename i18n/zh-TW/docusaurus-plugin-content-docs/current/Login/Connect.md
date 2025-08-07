---
id: login
title: login
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`login`

---

### 🎯 函式用途

初始化MetaTrader 5（MT5）並登入帳戶。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 傳入的字典內容如下方欄位說明 |

| dict欄位名稱    | 型別    | 必填 | 備註說明 |
|----------------|---------|------|----------|
| `account`      | int     | ✅   | 使用者MT5交易帳號。 |
| `password`     | str     | ✅   | 使用者MT5交易密碼。 |
| `server`       | str     | ✅   | 交易伺服器名稱。 |
| `timeout`      | int     | ❌   | 連線逾時時間（單位：毫秒），預設為 `60000`（60 秒）。 |

---

### 📤 回傳資料內容

| 名稱     | 型別  | 備註說明                                   |
|----------|-------|--------------------------------------------|
| （匿名） | bool  | 成功則回傳 `True`，失敗則回傳錯誤訊息。 |

---

### 範例程式碼

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

def main():
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER",
            "timeout": 10000
        }
        if mas_client.login(login_params):
            print("登入成功！")
    except Exception as e:
        print(f"登入失敗:{str(e)}")
```
---