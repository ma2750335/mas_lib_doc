---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`get_symbols_total`

---

### 🎯 函式用途

取得 MT5 終端機中所有**可用商品的總數量**。

---

### 🔧 函式參數

此函式不需要任何參數。

---

### 📤 回傳資料內容

| 名稱     | 型別 | 備註說明 |
|----------|------|----------|
| `result` | int  | 可用商品總數。失敗時回傳 `0`。 |

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

    total = mas_client.get_symbols_total()
    print(f"MT5 商品總數：{total}")

if __name__ == "__main__":
    main()
```
---
