---
sidebar_position: 2
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`check_connection`

---

### 🎯 函式用途

檢查並回報當前系統是否與 MetaTrader 5（MT5） 保持有效連線。  

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數。|

---

### 📤 回傳內容

| 名稱   | 型別 | 備註說明                                |
|--------|------|-------------------------------------------|
| （匿名） | bool | 若連線正常則回傳 `True`；若斷線則回傳 `False`，可作為重連判斷依據。 |

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
        if mas_client.check_connection():
            print("目前已連線至 MT5")
        else:
            print("尚未連線 MT5，請先執行 login")
            
    except Exception as e:
        print(f"初始化失敗:{str(e)}")
```
---
