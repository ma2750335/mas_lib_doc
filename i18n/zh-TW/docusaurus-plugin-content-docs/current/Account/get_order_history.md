---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`get_order_history`

---

### 🎯 函式用途

查詢 MT5 交易帳戶在特定時間區間內的**歷史成交紀錄**（已成交之訂單資訊）。  
支援依據時間範圍、商品代碼、訂單編號（ticket）或部位編號（position）進行條件過濾。  

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 查詢條件設定字典，欄位說明如下： |

| dict 欄位名稱 | 型別          | 必填 | 說明                                                       |
|-------------|---------------|------|------------------------------------------------------------|
| `symbol`    | str           | ❌   | 指定查詢的商品代碼，可搭配 `group` 欄位進行篩選。             |
| `from`      | datetime/str  | ❌   | 起始時間（預設為 `2000-01-01`）。                            |
| `to`        | datetime/str  | ❌   | 結束時間（預設為目前時間 `datetime.now()`）。                 |
| `ticket`    | int           | ❌   | 查詢指定訂單編號的成交紀錄（不可與其他條件並用）。              |
| `position`  | int           | ❌   | 查詢指定部位編號的所有成交紀錄（不可與其他條件並用）。           |

---

### 📤 回傳資料內容

| 名稱   | 型別           | 備註說明                               |
|--------|---------------|----------------------------------------|
| result |  `list[dict]` | 回傳符合條件的所有成交資料，若無資料則為空陣列 `[]`。每筆成交紀錄為一筆 dictionary，欄位說明如下： |

| 欄位名稱       | 型別      | 說明 |
|----------------|-----------|------|
| `ticket`        | int       | 成交紀錄的唯一 ID（Ticket）。 |
| `order`         | int       | 所屬原始訂單編號。 |
| `position_id`   | int       | 該筆成交所屬的部位 ID。 |
| `symbol`        | str       | 商品代碼（如 EURUSD、XAUUSD）。 |
| `type`          | int       | 成交方向（0=Buy，1=Sell）。 |
| `entry`         | int       | 成交類型（0=建倉、1=平倉、2=反向、3=交割、4=調整）。 |
| `reason`        | int       | 成交原因（0=手動、1=EA 自動、2=止盈止損、3=保證金強平等）。 |
| `volume`        | float     | 成交手數。 |
| `price`         | float     | 成交價格。 |
| `commission`    | float     | 手續費。 |
| `swap`          | float     | 庫存費（Swap）。 |
| `fee`           | float     | 其他費用（若有）。 |
| `profit`        | float     | 此筆成交的實際盈虧。 |
| `comment`       | str       | 成交註解（如：策略名稱、交易備註等）。 |
| `external_id`   | str       | 外部系統參照 ID（如對接第三方標記）。 |
| `time`          | datetime  | 成交時間（已轉換為 datetime 物件）。 |
| `time_msc`      | int       | 成交時間（Unix timestamp 毫秒）。 |

回傳格式如下：
```python
[
  {
    "ticket": 123456789,
    "order": 987654321,
    "position_id": 111222,
    "symbol": "USDJPY.sml",
    "type": 0,
    "entry": 1,
    "reason": 0,
    "volume": 0.1,
    "price": 157.350,
    "commission": -0.8,
    "swap": 0.0,
    "fee": 0.0,
    "profit": 20.15,
    "comment": "開倉",
    "external_id": "",
    "time": "2025-06-20T15:30:00",
    "time_msc": 1718868600000
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
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_client.login(login_params)

        symbol_params = {
            "symbol": "EURUSD",
            "from": "2025-07-01",
            "to":  "2025-07-07"
        }
        print(mas_client.get_order_history(symbol_params))

        ticket_params = {
          "ticket" : 30681969
        }
        print(mas_client.get_order_history(ticket_params))

        position_params = {
          "position" : 28290355
        }
        print(mas_client.get_order_history(position_params))
    except Exception as e:
        print(str(e))
```
---