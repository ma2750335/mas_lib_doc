---
sidebar_position: 11
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`unsubscribe_market_book`

---

### 🎯 函式用途

取消指定商品的**市場深度（DOM）訂閱**。  
執行此函式後，系統將停止接收該商品的委託簿資料，並釋放相關內部資源。  
不再需要委託簿資料時請呼叫此函式，以避免不必要的資源佔用。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| `params` | dict | 指定目標商品的字典。 |

| dict 欄位名稱 | 型別 | 必填 | 說明 |
|--------------|------|------|------|
| `symbol`     | str  | ✅   | 欲取消訂閱市場深度的商品代碼（如 `"EURUSD"`）。 |

---

### 📤 回傳資料內容

| 名稱     | 型別 | 備註說明 |
|----------|------|----------|
| `result` | bool | 取消成功回傳 `True`，否則回傳 `False`。 |

---

### 💡 範例程式碼

```python
import mas
import time

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

    symbol = "EURUSD"
    mas_client.subscribe_market_book({"symbol": symbol})
    time.sleep(1)

    # 取消訂閱
    result = mas_client.unsubscribe_market_book({"symbol": symbol})
    if result:
        print("✅ 已取消市場深度訂閱。")
    else:
        print("❌ 取消訂閱失敗。")

if __name__ == "__main__":
    main()
```
---
