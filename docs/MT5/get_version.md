---
sidebar_position: 7
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 Function Name

`get_version`

---

### 🎯 Function Purpose

Returns the **MT5 terminal version information** for the current connection, including version number, build number, and release date.<br/>
Useful for troubleshooting compatibility issues or verifying the terminal environment version.

---

### 🔧 Function Parameters

This function takes no parameters.

---

### 📤 Function Return

| Name     | Type | Description |
|----------|------|-------------|
| `result` | dict | Dictionary containing MT5 terminal version details. Returns an empty dict on failure. |

| Field Name     | Type | Description |
|----------------|------|-------------|
| `version`      | int  | Major version number of the MT5 terminal. |
| `build`        | int  | Build number. |
| `release_date` | str  | Release date string (e.g., `"01 Jan 2025"`). |

Return Format:
```python
{
    "version": 500,
    "build": 4755,
    "release_date": "24 Jan 2025"
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
    mas_client = MAS_Client()
    mas_client.login({
        "account": "YOUR_ACCOUNT",
        "password": "YOUR_PASSWORD",
        "server": "YOUR_SERVER"
    })

    version_info = mas_client.get_version()
    print("MT5 Version:", version_info)
    # Output: {'version': 500, 'build': 4755, 'release_date': '24 Jan 2025'}

if __name__ == "__main__":
    main()
```
---
