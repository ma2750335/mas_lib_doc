---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`get_pending_orders`

---

### 🎯 函式用途

查詢 MT5 帳戶目前所有**尚未成交的掛單**（限價單與停損單）。  
支援依商品代碼、商品群組或訂單編號（ticket）進行條件過濾。  
若查無符合條件的掛單，回傳空陣列。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| `params` | dict | 選填。過濾條件字典，傳入 `{}` 取得所有掛單。 |

| dict 欄位名稱 | 型別 | 必填 | 說明 |
|--------------|------|------|------|
| `symbol`     | str  | ❌   | 指定商品代碼（例如 `"EURUSD"`）。 |
| `group`      | str  | ❌   | 依商品群組樣式過濾（例如 `"*USD*"`）。 |
| `ticket`     | int  | ❌   | 依指定掛單 ticket 編號過濾。 |

---

### 📤 回傳資料內容

| 名稱     | 型別         | 備註說明 |
|----------|-------------|----------|
| `result` | list[dict]  | 掛單資料列表，若無掛單則回傳 `[]`。 |

| 欄位名稱          | 型別     | 說明 |
|-------------------|----------|------|
| `ticket`          | int      | 掛單唯一編號（Ticket）。 |
| `symbol`          | str      | 商品代碼（如 `"EURUSD"`）。 |
| `type`            | int      | 掛單類型（`2=BUY_LIMIT`、`3=SELL_LIMIT`、`4=BUY_STOP`、`5=SELL_STOP`）。 |
| `volume_initial`  | float    | 原始下單手數。 |
| `volume_current`  | float    | 剩餘未成交手數。 |
| `price_open`      | float    | 掛單觸發價格。 |
| `sl`              | float    | 停損價格。 |
| `tp`              | float    | 停利價格。 |
| `price_current`   | float    | 商品目前市場報價。 |
| `price_stoplimit` | float    | 停損限價觸發價（僅限 BUY_STOP_LIMIT / SELL_STOP_LIMIT）。 |
| `magic`           | int      | EA 標記碼。 |
| `comment`         | str      | 訂單備註。 |
| `reason`          | int      | 掛單原因（`0=手動`、`1=EA`、`2=SL/TP`）。 |
| `time_setup`      | datetime | 掛單建立時間。 |
| `time_expiration` | datetime | 掛單到期時間（未設定則為 `None`）。 |
| `time_done`       | datetime | 訂單完成時間（成交或取消；仍掛單中則為 `None`）。 |

回傳格式如下：
```python
[
    {
        "ticket": 10001234,
        "symbol": "EURUSD",
        "type": 2,
        "volume_initial": 0.1,
        "volume_current": 0.1,
        "price_open": 1.08500,
        "sl": 1.08000,
        "tp": 1.09500,
        "price_current": 1.08450,
        "price_stoplimit": 0.0,
        "magic": 123456,
        "comment": "MAS Order",
        "reason": 0,
        "time_setup": "2025-06-24T10:00:00",
        "time_expiration": None,
        "time_done": None
    }
]
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

    # 取得所有掛單
    orders = mas_client.get_pending_orders()
    print(f"掛單數量：{len(orders)}")

    # 依商品代碼過濾
    orders = mas_client.get_pending_orders({"symbol": "EURUSD"})
    for order in orders:
        print(order["ticket"], order["type"], order["price_open"])

if __name__ == "__main__":
    main()
```
---
