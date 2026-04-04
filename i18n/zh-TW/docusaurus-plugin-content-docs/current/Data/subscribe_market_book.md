---
sidebar_position: 10
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`subscribe_market_book`

---

### 🎯 函式用途

訂閱指定商品的**市場深度（DOM - Depth of Market）**資料。  
訂閱成功後，可呼叫 `get_market_book()` 取得當前委託簿快照。  
使用完畢後，請呼叫 `unsubscribe_market_book()` 以釋放訂閱資源。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| `params` | dict | 查詢條件設定字典，欄位說明如下： |

#### `params`（dict）欄位說明

| 欄位名稱 | 型別 | 必填 | 說明 |
|----------|------|------|------|
| `symbol`     | str  | ✅   | 欲訂閱市場深度的商品代碼（如 `"EURUSD"`）。 |

---

### 📤 回傳內容

| 名稱     | 型別 | 備註說明 |
|----------|------|----------|
| `result` | bool | 訂閱成功回傳 `True`，否則回傳 `False`。 |

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

    # 步驟 1：訂閱市場深度
    success = mas_client.subscribe_market_book({"symbol": symbol})
    if not success:
        print("❌ 市場深度訂閱失敗。")
        return

    print(f"✅ 已訂閱 {symbol} 市場深度。")

    # 步驟 2：讀取委託簿資料
    time.sleep(0.5)
    book = mas_client.get_market_book({"symbol": symbol})
    for entry in book[:5]:
        print(entry)

    # 步驟 3：取消訂閱
    mas_client.unsubscribe_market_book({"symbol": symbol})
    print("✅ 已取消市場深度訂閱。")

if __name__ == "__main__":
    main()
```
---
