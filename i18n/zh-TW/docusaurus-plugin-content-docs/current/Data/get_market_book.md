---
sidebar_position: 9
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`get_market_book`

---

### 🎯 函式用途

取得指定商品目前的**委託簿快照（市場深度 / DOM）**。  
須先呼叫 `subscribe_market_book()` 以啟用資料來源。  
回傳各買賣報價層級與對應數量，可用於分析委託流或監控市場流動性。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| `params` | dict | 指定目標商品的字典。 |

| dict 欄位名稱 | 型別 | 必填 | 說明 |
|--------------|------|------|------|
| `symbol`     | str  | ✅   | 欲查詢市場深度的商品代碼（如 `"EURUSD"`），須先訂閱。 |

---

### 📤 回傳資料內容

| 名稱     | 型別        | 備註說明 |
|----------|------------|----------|
| `result` | list[dict] | 依價位排序的委託簿條目列表。未訂閱或失敗時回傳 `[]`。 |

| 欄位名稱     | 型別  | 說明 |
|--------------|-------|------|
| `type`       | int   | 條目類型：`1=Ask（賣方）`、`2=Bid（買方）`。 |
| `price`      | float | 該報價層級的價格。 |
| `volume`     | int   | 該層級的整數數量（手數）。 |
| `volume_dbl` | float | 該層級的精確數量（浮點數）。 |

回傳格式如下：
```python
[
    {"type": 1, "price": 1.09520, "volume": 50,  "volume_dbl": 50.0},
    {"type": 1, "price": 1.09510, "volume": 120, "volume_dbl": 120.0},
    {"type": 2, "price": 1.09500, "volume": 80,  "volume_dbl": 80.0},
    {"type": 2, "price": 1.09490, "volume": 200, "volume_dbl": 200.0},
]
```

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

    # 先訂閱
    mas_client.subscribe_market_book({"symbol": symbol})
    time.sleep(0.5)

    # 取得委託簿快照
    book = mas_client.get_market_book({"symbol": symbol})

    bids = [e for e in book if e["type"] == 2]
    asks = [e for e in book if e["type"] == 1]

    print(f"最佳買價：{bids[0]['price'] if bids else 'N/A'}")
    print(f"最佳賣價：{asks[0]['price'] if asks else 'N/A'}")
    print(f"委託簿總層數：{len(book)}")

    # 取消訂閱
    mas_client.unsubscribe_market_book({"symbol": symbol})

if __name__ == "__main__":
    main()
```
---
