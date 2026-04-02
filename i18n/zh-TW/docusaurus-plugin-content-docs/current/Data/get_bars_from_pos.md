---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`get_bars_from_pos`

---

### 🎯 函式用途

從 MT5 取得指定商品在特定**位置索引**起算的**固定數量歷史 K 線（OHLCV）**。  
位置 `0` 代表最新的 K 棒；位置 `1` 代表往前一根，以此類推。  
適用於無需指定絕對時間戳、直接載入最近 N 根 K 棒供指標計算使用的情境。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| `params` | dict | 查詢參數字典。 |

| dict 欄位名稱 | 型別 | 必填 | 說明 |
|--------------|------|------|------|
| `symbol`     | str  | ✅   | 商品代碼（如 `"EURUSD"`）。 |
| `timeframe`  | str  | ✅   | K 線週期：`"M1"`、`"M5"`、`"H1"`、`"H4"`、`"D1"`、`"W1"`、`"MN1"` 等。 |
| `count`      | int  | ✅   | 欲取得的 K 線數量。 |
| `start_pos`  | int  | ❌   | 起始位置索引（預設 `0`，即最新 K 棒）。 |

---

### 📤 回傳資料內容

| 名稱     | 型別         | 備註說明 |
|----------|-------------|----------|
| `result` | pd.DataFrame | K 線資料，最新 K 棒在最後一列。失敗時回傳空 DataFrame。 |

| 欄位名稱     | 型別     | 說明 |
|--------------|----------|------|
| `time`       | datetime | K 棒開盤時間。 |
| `open`       | float    | 開盤價。 |
| `high`       | float    | 最高價。 |
| `low`        | float    | 最低價。 |
| `close`      | float    | 收盤價。 |
| `tick_volume`| int      | 該 K 棒期間的 Tick 次數。 |
| `spread`     | int      | 該 K 棒期間的平均點差。 |
| `real_volume`| int      | 實際交易量（若有提供）。 |

回傳格式如下：
```python
          time     open     high      low    close  tick_volume  spread  real_volume
0  2025-06-01  1.08501  1.09120  1.08350  1.08950         8432       8            0
1  2025-06-02  1.08950  1.09500  1.08800  1.09200         7651       9            0
...
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

    # 取得 EURUSD 最近 100 根日線
    df = mas_client.get_bars_from_pos({
        "symbol": "EURUSD",
        "timeframe": "D1",
        "count": 100
    })

    if not df.empty:
        print(f"已載入 {len(df)} 根 K 線。")
        print(df.tail(3))
    else:
        print("❌ 資料載入失敗。")

    # 從第 10 根前開始取得 50 根 H1 K 線
    df_h1 = mas_client.get_bars_from_pos({
        "symbol": "EURUSD",
        "timeframe": "H1",
        "count": 50,
        "start_pos": 10
    })
    print(df_h1.head())

if __name__ == "__main__":
    main()
```
---
