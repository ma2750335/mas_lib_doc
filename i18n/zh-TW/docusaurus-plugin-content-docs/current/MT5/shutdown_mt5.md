---
sidebar_position: 4
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`shutdown_mt5`

---

### 🎯 函式用途

關閉與 MetaTrader 5（MT5）平台的連線，並釋放相關資源。  

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數。 |

---

### 📤 回傳內容

| 名稱   | 型別 | 備註說明                 |
|--------|------|--------------------------|
| 無     | None | 無回傳值，僅執行關閉 MT5 動作。 |

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
        mas_client.shutdown_mt5()
        print("已關閉 MT5 連線")
            
    except Exception as e:
        print(f"初始化失敗:{str(e)}")
```
---