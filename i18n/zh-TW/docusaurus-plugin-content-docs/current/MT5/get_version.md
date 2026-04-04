---
sidebar_position: 7
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`get_version`

---

### 🎯 函式用途

回傳目前連線的 **MT5 終端機版本資訊**，包含版本號、Build 編號與發布日期。  
可用於排查相容性問題或確認終端環境版本。

---

### 🔧 函式參數

此函式不需要任何參數。

---

### 📤 回傳內容

| 名稱     | 型別 | 備註說明 |
|----------|------|----------|
| `result` | dict | MT5 終端版本資訊字典。失敗時回傳空字典 `{}`。 |

| 欄位名稱       | 型別 | 說明 |
|----------------|------|------|
| `version`      | int  | MT5 終端主要版本號。 |
| `build`        | int  | Build 號。 |
| `release_date` | str  | 發布日期字串（如 `"24 Jan 2025"`）。 |

#### 回傳格式

```python
{
    "version": 500,
    "build": 4755,
    "release_date": "24 Jan 2025"
}
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

    version_info = mas_client.get_version()
    print("MT5 版本資訊：", version_info)
    # 輸出：{'version': 500, 'build': 4755, 'release_date': '24 Jan 2025'}

if __name__ == "__main__":
    main()
```
---
