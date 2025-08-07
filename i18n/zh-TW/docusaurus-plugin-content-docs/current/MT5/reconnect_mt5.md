---
sidebar_position: 3
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`reconnect_mt5`

---

### 🎯 函式用途

重新連線 MetaTrader 5（MT5）（如中斷後自動重連）。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數 |

---

### 📤 回傳資料內容

| 名稱   | 型別 | 備註說明                                |
|--------|------|-------------------------------------------|
|（匿名） | bool | 若連線成功則回傳 `True`，否則為 `False` |

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
        if not mas_client.check_connection():
            print("MT5 掉線，正在重新連線...")
            success = mas_client.reconnect_mt5()
        if success:
            print("重新連線成功")
        else:
            print("重新連線失敗")
            
    except Exception as e:
        print(f"初始化失敗:{str(e)}")
```
---