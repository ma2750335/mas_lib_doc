---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`get_positions`

---

### 🎯 函式用途

查詢目前 MT5 交易帳號中的**未平倉部位（Position）**資訊。  
可依據**商品代碼**、**商品群組**或**特定持倉編號（ticket）**進行篩選。  
每筆部位會以 `dict` 物件回傳，內容包含**價格、手數、停損/止盈、浮動盈虧、建倉時間**等完整資訊。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| `params` | dict | 查詢條件設定字典，欄位說明如下： |

| dict 欄位名稱 | 型別 | 必填 | 說明 |
|---------------|------|------|------|
| `symbol`      | str  | ❌   | 過濾指定商品代碼的持倉（優先順序最高）。 |
| `group`       | str  | ❌   | 過濾指定商品群組的持倉（支援萬用字元，如 `"USD*"`）。 |
| `ticket`      | int  | ❌   | 過濾指定持倉編號（ticket）。若同時指定 `symbol`，此欄位將被忽略。 |

---

### 📤 回傳資料內容

| 名稱   | 型別        | 備註說明 |
|--------|-------------|----------|
| result | list[dict]  | 回傳符合條件的所有未平倉部位；若無資料則為空陣列 `[]`。每筆資料為一個 `dict`，欄位如下： |

| 欄位名稱          | 型別      | 說明 |
|-------------------|-----------|------|
| `ticket`          | int       | 持倉唯一編號（Position Ticket ID）。 |
| `symbol`          | str       | 商品代碼（例如 EURUSD、XAUUSD）。 |
| `type`            | int       | 持倉方向（0=Buy 多單，1=Sell 空單）。 |
| `magic`           | int       | Magic Number（策略/EA 指定的識別碼）。 |
| `identifier`      | int       | 自定義持倉識別碼（可能由策略程式設定）。 |
| `reason`          | int       | 建倉原因（例如：手動、EA 自動等）。 |
| `volume`          | float     | 持倉手數（Lot）。 |
| `price_open`      | float     | 開倉價格。 |
| `sl`              | float     | 停損價（Stop Loss）。 |
| `tp`              | float     | 止盈價（Take Profit）。 |
| `price_current`   | float     | 最新市場價格。 |
| `swap`            | float     | 庫存費（Swap）。 |
| `profit`          | float     | 浮動盈虧（Floating P/L）。 |
| `comment`         | str       | 備註或策略名稱。 |
| `external_id`     | str       | 外部系統參照 ID。 |
| `time`            | datetime  | 建倉時間（轉為 `datetime` 物件）。 |
| `time_msc`        | int       | 建倉時間（毫秒時間戳）。 |
| `time_update`     | datetime  | 最後更新時間（轉為 `datetime` 物件）。 |
| `time_update_msc` | int       | 最後更新時間（毫秒時間戳）。 |

回傳格式如下：
```python
[
  {
    "ticket": 123456789,
    "symbol": "EURUSD.sml",
    "type": 0,
    "magic": 888888,
    "identifier": 0,
    "reason": 1,
    "volume": 0.1,
    "price_open": 1.09876,
    "sl": 1.09500,
    "tp": 1.10500,
    "price_current": 1.09980,
    "swap": -0.12,
    "profit": 10.40,
    "comment": "Strategy-01",
    "external_id": "",
    "time": "2025-06-24T08:30:15",
    "time_msc": 1719217815023,
    "time_update": "2025-06-24T08:45:12",
    "time_update_msc": 1719218712345
  },
  {
    "ticket": 987654321,
    "symbol": "USDJPY.sml",
    "type": 1,
    "magic": 123456,
    "identifier": 0,
    "reason": 0,
    "volume": 0.2,
    "price_open": 157.350,
    "sl": 158.000,
    "tp": 155.500,
    "price_current": 157.100,
    "swap": 0.00,
    "profit": -50.00,
    "comment": "",
    "external_id": "",
    "time": "2025-06-23T22:15:00",
    "time_msc": 1719171300000,
    "time_update": "2025-06-24T09:01:05",
    "time_update_msc": 1719219665000
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

        positions = mas_client.get_positions()
        print(positions)

        positions = mas_client.get_positions({"symbol": "EURUSD"})
        print(positions)

        positions = mas_client.get_positions({"group": "EURUSD"})
        print(positions)

        positions = mas_client.get_positions({'ticket': 28184471})
        print(positions)
    except Exception as e:
        print(str(e))
```
---
