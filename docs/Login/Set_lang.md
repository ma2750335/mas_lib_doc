---
sidebar_position: 2
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`set_lang`

---

### 🎯 Function Purpose

Sets the default display language for the system, affecting all message outputs and internationalized (i18n) content.  

---

### 🔧 Function Parameters

| Parameter Name | Type | Required | Description |
|----------------|------|----------|-------------|
| lang           | str  | ❌       | Language code. Options: `'en'` (English, default), `'zh-tw'` (Traditional Chinese), `'zh-cn'` (Simplified Chinese). |

---

### 📤 Function Return

| Name | Type     | Description                        |
|------|----------|------------------------------------|
| None | NoneType | Updates the internal language setting only; no return value. |

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