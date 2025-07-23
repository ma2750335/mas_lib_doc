---
sidebar_position: 2
---
### Function Name

`check_connection`

---

### Function Purpose

Checks whether the connection to MetaTrader 5 (MT5) is still active.

---

### Function Parameters

| Name | Type | Description |
|------|------|-------------|
| None | None | This function takes no parameters. |

---

### Function Return 

| Name        | Type | Description                          |
|-------------|------|--------------------------------------|
| (anonymous) | bool | Returns `True` if MT5 is connected; otherwise, returns `False`. |

---

### 💡 Example Code

```python
from mas.mas import MAS

class MAS_Client(MAS):
    def __init__(self):
        super().__init__()

def main():
    try:
        mas_client = MAS_Client()
        if mas_client.check_connection():
            print("Connected to MT5")
        else:
            print("Not connected to MT5. Please login first.")
            
    except Exception as e:
        print(f"Initialization failed:{str(e)}")
```
---
