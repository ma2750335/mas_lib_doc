### Function Name

`get_account_info`

---

### Function Purpose

Retrieve basic account information of the currently logged-in MetaTrader 5 (MT5) account.

---

### Function Parameters

| Name | Type | Description |
|------|------|-------------|
| None | None | This function does not take any parameters. |

---

### Function Return

| Name   | Type | Description |
|--------|------|-------------|
| return | dict | Returns a dictionary with account information on success, or `{"error": "Failed to retrieve account information"}` on failure. |

| Field Name            | Type  | Description |
|-----------------------|-------|-------------|
| `login`               | int   | User account ID. |
| `trade_mode`          | int   | Trading mode (0=Real, 1=Demo, 2=Contest). |
| `leverage`            | int   | Leverage ratio. |
| `limit_orders`        | int   | Maximum number of pending orders. |
| `margin_so_mode`      | int   | Stop-out calculation mode (0=Percent, 1=Money). |
| `trade_allowed`       | int   | Manual trading allowed (0 or 1). |
| `trade_expert`        | int   | Expert Advisor (EA) trading allowed (0 or 1). |
| `margin_mode`         | int   | Margin mode (0=Netting, 1=Exchange, 2=Hedging). |
| `currency_digits`     | int   | Number of decimal digits in account currency. |
| `fifo_close`          | int   | FIFO closing enabled (0 or 1). |
| `balance`             | float | Total account balance. |
| `credit`              | float | Credit amount. |
| `profit`              | float | Floating profit/loss. |
| `equity`              | float | Equity. |
| `margin`              | float | Used margin. |
| `margin_free`         | float | Free margin. |
| `margin_level`        | float | Margin level (%). |
| `margin_so_call`      | float | Margin Call level. |
| `margin_so_so`        | float | Stop Out level. |
| `margin_initial`      | float | Initial margin. |
| `margin_maintenance`  | float | Maintenance margin. |
| `assets`              | float | Total assets. |
| `liabilities`         | float | Total liabilities. |
| `commission_blocked`  | float | Blocked commission. |
| `name`                | str   | User name. |
| `server`              | str   | Server name. |
| `currency`            | str   | Account base currency. |
| `company`             | str   | Broker name. |


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
from mas.mas import MAS

class MAS_Client(MAS):
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
