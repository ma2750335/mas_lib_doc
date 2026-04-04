---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`get_orders_total`

---

### 🎯 函式用途

取得 MT5 帳戶目前**有效掛單的總數**。  
可用於在呼叫 `get_pending_orders()` 前快速檢查掛單數量，或於策略邏輯中控制最大掛單數量上限。

---

### 🔧 函式參數

此函式不需要任何參數。

---

### 📤 回傳內容

| 名稱     | 型別 | 備註說明 |
|----------|------|----------|
| `result` | int  | 目前有效掛單總數。無掛單或失敗時回傳 `0`。 |

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

    total = mas_client.get_orders_total()
    print(f"目前有效掛單數量：{total}")

    # 用於策略邏輯中控制最大掛單數
    if total < 5:
        print("可以新增掛單。")
    else:
        print("已達掛單數量上限。")

if __name__ == "__main__":
    main()
```
---
