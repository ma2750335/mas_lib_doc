---
sidebar_position: 1
---
### Function Name

`initialize_mt5`

---

### Function Purpose

Initializes the MetaTrader 5 (MT5) environment and establishes a connection with the terminal.  
📌 Note: Normally, you don't need to call this function manually—it is automatically executed inside the `login()` function.

---

### Function Parameters

| Name | Type | Description        |
|------|------|--------------------|
| None | None | This function takes no parameters. |

---

### Function Return 

| Name        | Type | Description                              | 
|-------------|------|------------------------------------------|
| (anonymous) | bool | Returns `True` if initialization is successful, otherwise `False`. |

---

### 💡 Example Code

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

def main():
    try:
        mas_client = MAS_Client()
        if not mas_client.initialize_mt5():
            print("MT5 initialization failed")
        else:
            print("MT5 connected successfully")
            
    except Exception as e:
        print(f"Initialization error:{str(e)}")
```
---