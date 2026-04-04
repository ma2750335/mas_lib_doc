---
sidebar_position: 8
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`switch_account`

---

### 🎯 函式用途

在不重啟應用程式的情況下，**切換至另一個 MT5 交易帳戶**。  
執行此函式後，系統將先呼叫 `shutdown_mt5()`，再以新的帳戶憑證重新執行 `login()`。  
可用於多帳戶管理，或在模擬帳戶與實盤帳戶之間進行切換。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| `params` | dict | 查詢條件設定字典，欄位說明如下： |

#### `params`（dict）欄位說明

| 欄位名稱 | 型別 | 必填 | 說明 |
|----------|------|------|------|
| `account`    | int  | ✅   | 欲切換的 MT5 帳號。 |
| `password`   | str  | ✅   | 新帳戶的密碼。 |
| `server`     | str  | ✅   | 新帳戶所屬的券商伺服器名稱。 |
| `timeout`    | int  | ❌   | 連線逾時時間（毫秒），預設 `6000`。 |

---

### 📤 回傳內容

| 名稱     | 型別 | 備註說明 |
|----------|------|----------|
| `result` | bool | 切換並重新登入成功回傳 `True`，否則回傳 `False`。 |

---

### 💡 範例程式碼

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

def main():
    mas_client = MAS_Client()

    # 登入初始帳戶
    mas_client.login({
        "account": 111111,
        "password": "password_a",
        "server": "BrokerA-Live"
    })

    print("切換帳戶中...")

    # 切換至另一帳戶
    success = mas_client.switch_account({
        "account": 222222,
        "password": "password_b",
        "server": "BrokerB-Demo"
    })

    if success:
        print("✅ 帳戶切換成功。")
    else:
        print("❌ 帳戶切換失敗。")

if __name__ == "__main__":
    main()
```
---
