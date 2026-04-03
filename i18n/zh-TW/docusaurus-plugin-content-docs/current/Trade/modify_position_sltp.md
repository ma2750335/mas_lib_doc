---
sidebar_position: 8
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`modify_position_sltp`

---

### 🎯 函式用途

修改**已持倉部位**的停損（SL）和/或停利（TP）價格。  
`sl` 與 `tp` 至少需提供一個。  
執行此函式後，系統將透過 MT5 的 `TRADE_ACTION_SLTP` 更新部位設定，不會進行平倉或重新開倉。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| `params` | dict | 包含部位 ID 與新 SL/TP 的字典。 |

| dict 欄位名稱 | 型別  | 必填 | 說明 |
|--------------|-------|------|------|
| `position_id`| int   | ✅   | 欲修改部位的 ticket ID。 |
| `sl`         | float | ❌*  | 新停損價格。`sl` 或 `tp` 至少須填一個。 |
| `tp`         | float | ❌*  | 新停利價格。`sl` 或 `tp` 至少須填一個。 |

> ❌* `sl` 與 `tp` 至少須提供一個，兩者皆未填則回傳錯誤。

---

### 📤 回傳資料內容

| 名稱     | 型別 | 備註說明 |
|----------|------|----------|
| `result` | bool | 修改成功回傳 `True`，否則回傳 `False`。 |

---

### 💡 範例程式碼

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

def main():
    mas_client = MAS_Client()
    mas_client.login({
        "account": "YOUR_ACCOUNT",
        "password": "YOUR_PASSWORD",
        "server": "YOUR_SERVER"
    })

    # 同時修改 SL 與 TP
    success = mas_client.modify_position_sltp({
        "position_id": 123456789,
        "sl": 1.08000,
        "tp": 1.10500
    })

    if success:
        print("✅ SL/TP 修改成功。")
    else:
        print("❌ SL/TP 修改失敗。")

    # 僅修改停損（移至保本點）
    mas_client.modify_position_sltp({
        "position_id": 123456789,
        "sl": 1.09000
    })

if __name__ == "__main__":
    main()
```
---
