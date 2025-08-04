---
sidebar_position: 4
---
### Function Name

`shutdown_mt5`

---

### Function Purpose

Closes the MetaTrader 5 (MT5) platform connection.

---

### Function Parameters

| Name | Type | Description            |
|------|------|------------------------|
| None | None | This function takes no parameters. |

---

### Function Return 

| Name | Type | Description                       |
|------|------|------------------------------------|
| None | None | No return value. Simply shuts down the MT5 connection. |

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
        mas_client.shutdown_mt5()
        print("MT5 connection has been shut down")
            
    except Exception as e:
        print(f"Initialization error:{str(e)}")
```
---