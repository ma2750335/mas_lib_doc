---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`get_history_orders`

---

### 🎯 函式用途

查詢 MT5 帳戶的**歷史掛單紀錄**（History Orders）。  
與 `get_order_history()`（回傳成交紀錄）不同，此函式回傳訂單物件本身，包含已成交與已取消的掛單。  
支援依時間區間、商品代碼、ticket 或 position 進行過濾。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| `params` | dict | 選填。查詢條件字典。 |

| dict 欄位名稱 | 型別          | 必填 | 說明 |
|--------------|---------------|------|------|
| `from`       | datetime/str  | ❌   | 起始時間（預設 `2000-01-01`）。 |
| `to`         | datetime/str  | ❌   | 結束時間（預設目前時間）。 |
| `symbol`     | str           | ❌   | 指定商品代碼過濾。 |
| `ticket`     | int           | ❌   | 依指定訂單 ticket 過濾。 |
| `position`   | int           | ❌   | 依關聯 position ID 過濾。 |

---

### 📤 回傳資料內容

| 名稱     | 型別        | 備註說明 |
|----------|------------|----------|
| `result` | list[dict] | 歷史掛單資料列表，若無符合資料則回傳 `[]`。 |

| 欄位名稱          | 型別     | 說明 |
|-------------------|----------|------|
| `ticket`          | int      | 訂單 ticket 編號。 |
| `symbol`          | str      | 商品代碼。 |
| `type`            | int      | 訂單類型（`0=BUY`、`1=SELL`、`2=BUY_LIMIT` 等）。 |
| `volume_initial`  | float    | 原始下單手數。 |
| `volume_current`  | float    | 紀錄當時剩餘未成交手數。 |
| `price_open`      | float    | 訂單價格。 |
| `sl`              | float    | 停損價格。 |
| `tp`              | float    | 停利價格。 |
| `price_current`   | float    | 紀錄當時的市場報價。 |
| `price_stoplimit` | float    | 停損限價觸發價（停損限價類型使用）。 |
| `state`           | int      | 訂單狀態（`1=已掛出`、`3=已取消`、`4=部分成交`、`5=完全成交`）。 |
| `magic`           | int      | EA 標記碼。 |
| `comment`         | str      | 訂單備註。 |
| `reason`          | int      | 原因代碼（`0=手動`、`1=EA`、`2=SL/TP`）。 |
| `time_setup`      | datetime | 訂單建立時間。 |
| `time_expiration` | datetime | 訂單到期時間（未設定則為 `None`）。 |
| `time_done`       | datetime | 訂單完成時間（成交或取消）。 |

回傳格式如下：
```python
[
    {
        "ticket": 10001234,
        "symbol": "EURUSD",
        "type": 2,
        "volume_initial": 0.1,
        "volume_current": 0.0,
        "price_open": 1.08500,
        "sl": 1.08000,
        "tp": 1.09500,
        "price_current": 1.08520,
        "price_stoplimit": 0.0,
        "state": 5,
        "magic": 123456,
        "comment": "MAS Order",
        "reason": 0,
        "time_setup": "2025-06-24T10:00:00",
        "time_expiration": None,
        "time_done": "2025-06-24T10:15:00"
    }
]
```

---

### 💡 範例程式碼

```python
import mas
from datetime import datetime

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

    # 查詢特定時間區間的歷史掛單
    orders = mas_client.get_history_orders({
        "from": "2025-06-01",
        "to": "2025-06-30"
    })
    print(f"歷史掛單數量：{len(orders)}")

    # 依商品代碼過濾
    orders = mas_client.get_history_orders({
        "from": "2025-06-01",
        "to": "2025-06-30",
        "symbol": "EURUSD"
    })
    for o in orders:
        print(o["ticket"], o["state"], o["volume_initial"])

if __name__ == "__main__":
    main()
```
---
