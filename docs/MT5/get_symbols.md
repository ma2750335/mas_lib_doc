---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`get_symbols`

---

### 🎯 Function Purpose

Retrieves a list of **all available trading symbols** from the connected MT5 terminal.
Supports optional filtering by **group pattern** (e.g., `"*USD*"` to get all USD pairs).
Each result includes symbol metadata such as digits, spread, volume limits, and trade modes.

---

### 🔧 Function Parameters

| Parameter Name | Type | Description |
|----------------|------|-------------|
| `params`       | dict | Optional. Dictionary with filter options. Pass `{}` to get all symbols. |

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `group`    | str  | ❌       | Wildcard pattern to filter symbols by group (e.g., `"*USD*"`, `"Forex*"`). |

---

### 📤 Function Return

| Name     | Type       | Description |
|----------|------------|-------------|
| `result` | list[dict] | List of symbol information dictionaries. Returns an empty list on failure. |

| Field Name            | Type  | Description |
|-----------------------|-------|-------------|
| `name`                | str   | Symbol name (e.g., `"EURUSD"`). |
| `description`         | str   | Full description of the symbol. |
| `digits`              | int   | Number of decimal places in price. |
| `point`               | float | Minimum price change (tick size). |
| `spread`              | int   | Current spread in points. |
| `trade_contract_size` | float | Contract size (e.g., `100000` for standard forex lot). |
| `volume_min`          | float | Minimum allowed trade volume. |
| `volume_max`          | float | Maximum allowed trade volume. |
| `volume_step`         | float | Volume increment step. |
| `currency_base`       | str   | Base currency of the symbol (e.g., `"EUR"`). |
| `currency_profit`     | str   | Profit currency of the symbol (e.g., `"USD"`). |
| `trade_mode`          | int   | Trade mode (e.g., full access, close only). |

Return Format:
```python
[
    {
        "name": "EURUSD",
        "description": "Euro vs US Dollar",
        "digits": 5,
        "point": 1e-05,
        "spread": 8,
        "trade_contract_size": 100000.0,
        "volume_min": 0.01,
        "volume_max": 500.0,
        "volume_step": 0.01,
        "currency_base": "EUR",
        "currency_profit": "USD",
        "trade_mode": 4
    },
    ...
]
```

---

### 💡 Example Code

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

def main():
    mas_client = MAS_Client()
    mas_client.login({
        "account": "YOUR_ACCOUNT",
        "password": "YOUR_PASSWORD",
        "server": "YOUR_SERVER"
    })

    # Get all symbols
    all_symbols = mas_client.get_symbols()
    print(f"Total symbols: {len(all_symbols)}")

    # Get only USD-related symbols
    usd_symbols = mas_client.get_symbols({"group": "*USD*"})
    for s in usd_symbols:
        print(s["name"], s["digits"])

if __name__ == "__main__":
    main()
```
---
