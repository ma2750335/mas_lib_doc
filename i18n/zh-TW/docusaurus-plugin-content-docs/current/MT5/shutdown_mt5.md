---
sidebar_position: 4
---
### function 名稱

`shutdown_mt5`

---

### function 用途

關閉 MetaTrader 5（MT5）平台連線。  

---

### function 參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                 |
|--------|------|--------------------------|
| 無     | None | 無回傳值，僅執行關閉 MT5 動作 |

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