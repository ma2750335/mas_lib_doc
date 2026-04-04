---
sidebar_position: 9
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`order_check`

---

### 🎯 函式用途

在**不實際執行下單**的情況下，預先對訂單請求進行**合法性驗證**。  
可用於在呼叫 `send_order()` 前確認訂單參數是否有效、帳戶是否具備足夠的可用保證金，以及券商是否允許此操作。  
回傳詳細結果，包含保證金需求與相關錯誤代碼。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| `params` | dict | 查詢條件設定字典，欄位說明如下： |

#### `params`（dict）欄位說明

| 欄位名稱 | 型別 | 必填 | 說明 |
|----------|------|------|------|
| `symbol`     | str   | ✅   | 商品代碼（如 `"EURUSD"`）。 |
| `order_type` | str   | ✅   | 訂單類型：`"buy"`、`"sell"`、`"buy_limit"` 等。 |
| `volume`     | float | ✅   | 下單手數。 |
| `price`      | float | ❌   | 掛單價格（限價單使用）。 |
| `sl`         | float | ❌   | 停損價格。 |
| `tp`         | float | ❌   | 停利價格。 |

---

### 📤 回傳內容

| 名稱     | 型別 | 備註說明 |
|----------|------|----------|
| `result` | dict | MT5 驗證結果。失敗時回傳空字典 `{}`。 |

| 欄位名稱      | 型別  | 說明 |
|---------------|-------|------|
| `retcode`     | int   | 回傳代碼，`0` 代表訂單有效。 |
| `balance`     | float | 假設成交後的帳戶餘額。 |
| `equity`      | float | 假設成交後的淨值。 |
| `profit`      | float | 預估損益。 |
| `margin`      | float | 此訂單所需保證金。 |
| `margin_free` | float | 此訂單成交後剩餘可用保證金。 |
| `margin_level`| float | 保證金水平百分比。 |
| `comment`     | str   | 結果說明（如 `"Done"` 或錯誤訊息）。 |

#### 回傳格式

```python
{
    "retcode": 0,
    "balance": 10000.00,
    "equity": 10000.00,
    "profit": 0.0,
    "margin": 130.45,
    "margin_free": 9869.55,
    "margin_level": 7665.0,
    "comment": "Done"
}
```

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

    check_result = mas_client.order_check({
        "symbol": "EURUSD",
        "order_type": "buy",
        "volume": 0.1,
        "sl": 1.08000,
        "tp": 1.10000
    })

    if check_result.get("retcode") == 0:
        print("✅ 訂單有效，所需保證金：", check_result["margin"])
    else:
        print("❌ 訂單驗證失敗：", check_result.get("comment"))

if __name__ == "__main__":
    main()
```
---
