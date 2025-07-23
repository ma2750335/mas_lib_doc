---
sidebar_position: 3
---
### function 名稱

`reconnect_mt5`

---

### function 用途

重新連線 MetaTrader 5（MT5）（如中斷後自動重連）。

---

### function 參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                |
|--------|------|-------------------------------------------|
|（匿名） | bool | 若連線成功則回傳 `True`，否則為 `False` |

---

### 💡 範例程式碼

```python
from mas.mas import MAS

class MAS_Client(MAS):
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