---
id: login
title: login
---

### Function Name

`login`

---

### Function Purpose

Initializes MetaTrader 5 (MT5) and logs into the specified trading account.

---

### Function Parameters

| Name   | Type | Description |
|--------|------|-------------|
| params | dict | A dictionary containing the following fields: |

| Field      | Type   | Required | Description                                               |
|------------|--------|----------|-----------------------------------------------------------|
| `account`  | int    | ✅        | Your MT5 trading account number.                         |
| `password` | str    | ✅        | Your MT5 account password.                               |
| `server`   | str    | ✅        | Name of the trading server.                              |
| `timeout`  | int    | ❌        | Connection timeout in milliseconds (default: `60000`).   |

---

### Function Return

| Name       | Type | Description                                        |
|------------|------|----------------------------------------------------|
| (anonymous)| bool | Returns `True` if login succeeds; otherwise raises an exception. |

---

### Example Code

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

def main():
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER",
            "timeout": 10000
        }
        if mas_client.login(login_params):
            print("Login successful!")
    except Exception as e:
        print(f"Login failed:{str(e)}")
```
---