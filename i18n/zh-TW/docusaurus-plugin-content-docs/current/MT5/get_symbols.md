---
sidebar_position: 5
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`get_symbols`

---

### 🎯 函式用途

取得 MT5 終端機中目前所有**可用商品清單**。  
支援依 group 條件篩選（如 `"*USD*"` 取得所有包含 USD 的商品）。  
每筆資料包含商品名稱、精確度、點差、交易量限制及貨幣資訊等相關資料。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| `params` | dict | 選填。過濾條件字典，傳入 `{}` 取得所有商品。 |

| dict 欄位名稱 | 型別 | 必填 | 說明 |
|--------------|------|------|------|
| `group`      | str  | ❌   | 商品群組萬用字元樣式（如 `"*USD*"`、`"Forex*"`）。 |

---

### 📤 回傳資料內容

| 名稱     | 型別        | 備註說明 |
|----------|------------|----------|
| `result` | list[dict] | 商品資訊字典列表，失敗時回傳空列表。 |

| 欄位名稱              | 型別  | 說明 |
|-----------------------|-------|------|
| `name`                | str   | 商品代碼（如 `"EURUSD"`）。 |
| `description`         | str   | 商品完整描述。 |
| `digits`              | int   | 報價小數位數。 |
| `point`               | float | 最小報價變動單位（tick size）。 |
| `spread`              | int   | 目前點差（以點為單位）。 |
| `trade_contract_size` | float | 合約規格（如標準外匯手為 `100000`）。 |
| `volume_min`          | float | 最小允許交易量。 |
| `volume_max`          | float | 最大允許交易量。 |
| `volume_step`         | float | 交易量遞增單位。 |
| `currency_base`       | str   | 基礎貨幣（如 `"EUR"`）。 |
| `currency_profit`     | str   | 獲利計算貨幣（如 `"USD"`）。 |
| `trade_mode`          | int   | 交易模式（如完整交易、僅平倉等）。 |

回傳格式如下：
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

### 💡 範例程式碼

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

    # 取得所有商品
    all_symbols = mas_client.get_symbols()
    print(f"商品總數：{len(all_symbols)}")

    # 僅取得含 USD 的商品
    usd_symbols = mas_client.get_symbols({"group": "*USD*"})
    for s in usd_symbols:
        print(s["name"], s["digits"])

if __name__ == "__main__":
    main()
```
---
