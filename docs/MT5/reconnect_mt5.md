---
sidebar_position: 3
---
### Function Name

`reconnect_mt5`

---

### Function Purpose

Reconnects to MetaTrader 5 (MT5), typically used when the connection has been lost.

---

### Function Parameters

| Name | Type | Description        |
|------|------|--------------------|
| None | None | This function takes no parameters. |

---

### Function Return 

| Name        | Type | Description                                |
|-------------|------|--------------------------------------------|
| (anonymous) | bool | Returns `True` if reconnection is successful, otherwise `False`. |

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
        if not mas_client.check_connection():
            print("MT5 disconnected, attempting to reconnect...")
            success = mas_client.reconnect_mt5()
        if success:
            print("Reconnected successfully")
        else:
            print("Reconnection failed")
            
    except Exception as e:
        print(f"Initialization error:{str(e)}")
```
---