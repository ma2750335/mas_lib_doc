---
sidebar_position: 4
---
### function 名稱

`subscribe_ticks`

---

### function 用途

訂閱即時 Tick 資料，或於回測模式中送出歷史 Tick 推播。 
根據 `backtest_toggle` 參數的值，自動切換資料來源：

- 若為 `True`：呼叫歷史資料模組送出 Tick 推播  
- 若為 `False`：建立背景執行緒，每間隔 `interval_ms` 毫秒從 MT5 取得最新 Tick 並推播

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 傳入的字典內容如下方欄位說明 |

| 名稱             | 型別          | 必填        | 說明                                                         |
|------------------|---------------|------------|--------------------------------------------------------------|
| `symbol`         | str           | ✅        | 商品代碼（如 `"EURUSD"`）。                                     |
| `interval_ms`    | int           | ❌        | 每次推播的間隔毫秒數（預設 `500ms`）。                           |
| `from`           | datetime/str  | ✅（回測） | 歷史資料起始時間（僅在 `backtest_toggle = True` 時使用）。       |
| `to`             | datetime/str  | ✅（回測） | 歷史資料結束時間（僅在 `backtest_toggle = True` 時使用）。       |
| `flags`          | int           | ❌        | Tick 資料來源類型，預設為 `mt5.COPY_TICKS_ALL`，僅實盤時使用。   |
| `mode`           | str           | ❌        | 回測 tick 模式：`"all"` 或 `"trade"`，預設為 `"all"`。         |
| `backtest_toggle`| bool          | ❌        | 是否為回測模式，預設為 `False`。                               |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明             |
|--------|------|----------------------|
| 無     | None | 此函式無實際回傳值，用於觸發 Tick 資料推播 |

---

### 💡 範例程式碼

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

    def receive_ticks(self, symbol, data, is_end=False):
        print(symbol, data, is_end)

def main():
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_client.login(login_params)

        #回測模式參數
        params = {
            "symbol": "EURUSD",
            "from": '2025-07-07 12:00:00',
            "to": '2025-07-07 13:00:00',
            "backtest_toggle": True
        }
        mas_client.subscribe_ticks(params)

        #實盤模式參數
        params = {
            "symbol": "EURUSD",
            "backtest_toggle": False
        }
        mas_client.subscribe_ticks(params)

    except Exception as e:
        print(str(e))
```
---