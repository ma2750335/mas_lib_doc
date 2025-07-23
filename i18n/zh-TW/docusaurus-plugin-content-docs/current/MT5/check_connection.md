---
sidebar_position: 2
---
### function 名稱

`check_connection`

---

### function 用途

檢查 MetaTrader 5（MT5）是否仍保持連線。  

---

### function 參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                |
|--------|------|-------------------------------------------|
|（匿名） | bool | 若連線正常則回傳 `True`，否則回傳 `False` |

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
        if mas_client.check_connection():
            print("目前已連線至 MT5")
        else:
            print("尚未連線 MT5，請先執行 login")
            
    except Exception as e:
        print(f"初始化失敗:{str(e)}")
```
---
