---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`get_account_info`

---

### 🎯 Function Purpose

Retrieves comprehensive account details for the currently logged-in MetaTrader 5 (MT5) trading account.  

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| None           | None | This function does not require any input parameters. |

---

### 📤 Function Return

| Name   | Type | Description |
|--------|------|-------------|
| return | dict | Returns a dictionary of MT5 account data on success.  
If the query fails, it returns: `{"error": "Failed to retrieve account information"}`.  
Details of the returned fields are as follows: |

| Field Name            | Type  | Description |
|-----------------------|-------|-------------|
| `login`               | int   | Account login ID. |
| `trade_mode`          | int   | Account trade mode (0=Real, 1=Demo, 2=Contest). |
| `leverage`            | int   | Account leverage ratio. |
| `limit_orders`        | int   | Maximum number of allowed pending orders. |
| `margin_so_mode`      | int   | Stop Out mode: `0=Percent`, `1=Money`. |
| `trade_allowed`       | int   | Whether manual trading is allowed (0 or 1). |
| `trade_expert`        | int   | Whether Expert Advisors (EAs) are allowed (0 or 1). |
| `margin_mode`         | int   | Margin calculation mode: `0=Netting`, `1=Exchange`, `2=Hedging`. |
| `currency_digits`     | int   | Number of decimal digits in the account's base currency. |
| `fifo_close`          | int   | Whether FIFO (First-In-First-Out) closing rule is enabled (0 or 1). Applicable in hedging mode. |
| `balance`             | float | Total account balance. |
| `credit`              | float | Credit granted to the account. |
| `profit`              | float | Floating profit/loss. |
| `equity`              | float | Equity. |
| `margin`              | float | Used margin. |
| `margin_free`         | float | Free margin. |
| `margin_level`        | float | Margin level percentage: (Equity / Margin) × 100. |
| `margin_so_call`      | float | Margin Call threshold. Alerts when margin level falls below this value. |
| `margin_so_so`        | float | Stop Out threshold. Positions may be forcibly closed when this level is reached. |
| `margin_initial`      | float | Total reserved margin for all pending orders. |
| `margin_maintenance`  | float | Minimum margin required to maintain positions. |
| `assets`              | float | Total account assets. |
| `liabilities`         | float | Total account liabilities. |
| `commission_blocked`  | float | Total blocked commission amount. |
| `name`                | str   | MT5 Account name. |
| `server`              | str   | MT5 server name. |
| `currency`            | str   | Account base currency. |
| `company`             | str   | Broker or company name. |

Return Format:
```python
{
    "login": 25115284,
    "trade_mode": 0,
    "balance": 99588.3,
    "equity": 99543.2,
    "margin": 54.37,
    "free_margin": 99488.8,
    "leverage": 100,
    "margin_level": 183085,
    "currency": "USD",
    "limit_orders": 200,
    "margin_so_mode": 0,
    "trade_allowed": true,
    "trade_expert": true,
    "margin_mode": 2,
    "currency_digits": 2,
    "fifo_close": false,
    "credit": 0,
    "profit": -45.13,
    "margin_so_call": 50,
    "margin_so_so": 30,
    "margin_initial": 0,
    "margin_maintenance": 0,
    "assets": 0,
    "liabilities": 0,
    "commission_blocked": 0,
    "name": "James Smith",
    "server": "MetaQuotes-Demo",
    "company": "MetaQuotes Software Corp."
}
```

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
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        if mas_client.login(login_params):
            print("Login successful!")
        print(mas_client.get_account_info())
    except Exception as e:
        print(f"Login failed:{str(e)}")
```
---
