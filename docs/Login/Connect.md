---
id: login
title: login
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`login`

---

### 🎯 Function Purpose

Initializes the **MetaTrader 5 (MT5)** trading terminal and logs into a specified trading account.  

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| params         | dict | A dictionary containing the following fields: |

| Field          | Type   | Required | Description                                               |
|----------------|--------|----------|-----------------------------------------------------------|
| `account`      | int    | ✅        | MT5 trading account number (valid for both live and demo accounts). |
| `password`     | str    | ✅        | MT5 account password (must match the account number). |
| `server`       | str    | ✅        | Name of the MT5 trading server (available from MT5 login settings). |
| `timeout`      | int    | ❌        | Connection timeout in milliseconds (default: `60000` / 60 seconds). Recommended to increase in high-latency environments. |


---

### 📤 Function Return

| Name       | Type | Description |
|------------|------|-------------|
| (anonymous)| bool | Returns `True` if login is successful, otherwise raises an exception with the MT5 API error code and message. |

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