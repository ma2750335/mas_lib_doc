---
sidebar_position: 2
---

### Function Name

`login`

---

### Function Purpose

Sets the default language for the system.

---

### Function Parameters

| Name  | Type | Required | Description |
|-------|------|----------|-------------|
| lang  | str  | ❌      | Language code. Options: `'en'` (English, default), `'zh-tw'` (Traditional Chinese), `'zh-cn'` (Simplified Chinese). |

---

### Function Return

| Name | Type     | Description                        |
|------|----------|------------------------------------|
| None | NoneType | Sets internal language only; no return value. |

---

### Example Code

```python
from mas.mas import MAS

class MAS_Client(MAS):
    def __init__(self):
        super().__init__()

def main():
    try:
        mas_client = MAS_Client()
        mas_client.set_lang("zh-tw")
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD"
        }
        if mas_client.login(login_params):
            print("Login successful!")
    except Exception as e:
        print(f"Login failed:{str(e)}")
```
---