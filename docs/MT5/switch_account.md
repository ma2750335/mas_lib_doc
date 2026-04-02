---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`switch_account`

---

### 🎯 Function Purpose

Switches the active MT5 login to a **different trading account** without restarting the application.
Internally performs a `shutdown_mt5()` followed by a fresh `login()` using the new credentials.
This is useful when managing multiple accounts or switching between demo and live environments.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | Dictionary containing the new account credentials. |

| Field Name   | Type | Required | Description |
|--------------|------|----------|-------------|
| `account`    | int  | ✅       | The MT5 account number to switch to. |
| `password`   | str  | ✅       | Password for the new account. |
| `server`     | str  | ✅       | Broker server name for the new account. |
| `timeout`    | int  | ❌       | Connection timeout in milliseconds (default: `6000`). |

---

### 📤 Function Return

| Name     | Type | Description |
|----------|------|-------------|
| `result` | bool | Returns `True` if the account switch and re-login succeeded; otherwise `False`. |

---

### 💡 Example Code

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

def main():
    mas_client = MAS_Client()

    # Login to initial account
    mas_client.login({
        "account": 111111,
        "password": "password_a",
        "server": "BrokerA-Live"
    })

    print("Switching account...")

    # Switch to another account
    success = mas_client.switch_account({
        "account": 222222,
        "password": "password_b",
        "server": "BrokerB-Demo"
    })

    if success:
        print("✅ Account switched successfully.")
    else:
        print("❌ Failed to switch account.")

if __name__ == "__main__":
    main()
```
---
