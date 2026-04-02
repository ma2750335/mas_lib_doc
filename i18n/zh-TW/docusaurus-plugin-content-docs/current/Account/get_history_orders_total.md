---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`get_history_orders_total`

---

### 🎯 函式用途

回傳指定時間區間內的**歷史掛單總數**。  
可在呼叫 `get_history_orders()` 之前用於估算資料筆數，或建立摘要統計，無需取得完整掛單明細。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| `params` | dict | 選填。時間區間過濾條件。 |

| dict 欄位名稱 | 型別          | 必填 | 說明 |
|--------------|---------------|------|------|
| `from`       | datetime/str  | ❌   | 起始時間（預設 `2000-01-01`）。 |
| `to`         | datetime/str  | ❌   | 結束時間（預設目前時間）。 |

---

### 📤 回傳資料內容

| 名稱     | 型別 | 備註說明 |
|----------|------|----------|
| `result` | int  | 指定時間區間內的歷史掛單總數。失敗或無資料時回傳 `0`。 |

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

    # 查詢 2025 年 6 月的歷史掛單總數
    total = mas_client.get_history_orders_total({
        "from": "2025-06-01",
        "to": "2025-06-30"
    })
    print(f"六月份掛單數量：{total}")

if __name__ == "__main__":
    main()
```
---
