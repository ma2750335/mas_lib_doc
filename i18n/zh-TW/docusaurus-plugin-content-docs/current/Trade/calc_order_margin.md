---
sidebar_position: 6
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`calc_order_margin`

---

### 🎯 函式用途

計算指定訂單所需的**保證金金額**，不實際執行下單。  
可用於在下單前預先確認帳戶是否具備足夠的可用保證金，或在策略中建立保證金感知的倉位管理邏輯。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| `params` | dict | 查詢條件設定字典，欄位說明如下： |

#### `params`（dict）欄位說明

| 欄位名稱 | 型別 | 必填 | 說明 |
|----------|------|------|------|
| `action`     | str   | ✅   | 交易方向：`"buy"` 或 `"sell"`。 |
| `symbol`     | str   | ✅   | 商品代碼（如 `"EURUSD"`）。 |
| `volume`     | float | ✅   | 下單手數。 |
| `price`      | float | ✅   | 訂單價格（市價單請使用當前市場價格）。 |

---

### 📤 回傳內容

| 名稱     | 型別  | 備註說明 |
|----------|-------|----------|
| `result` | float | 所需保證金金額（帳戶計價貨幣）。失敗時回傳 `-1.0`。 |

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

    margin = mas_client.calc_order_margin({
        "action": "buy",
        "symbol": "EURUSD",
        "volume": 0.1,
        "price": 1.09500
    })

    if margin != -1.0:
        print(f"所需保證金：{margin:.2f} USD")
    else:
        print("❌ 保證金計算失敗。")

    # 動態倉位管理：以可用保證金的 30% 為上限
    account = mas_client.get_account_info()
    free_margin = account.get("margin_free", 0)
    target_lots = 0.01
    while True:
        m = mas_client.calc_order_margin({
            "action": "buy", "symbol": "EURUSD",
            "volume": target_lots + 0.01, "price": 1.09500
        })
        if m > free_margin * 0.3:
            break
        target_lots += 0.01
    print(f"最大安全手數：{target_lots:.2f}")

if __name__ == "__main__":
    main()
```
---
