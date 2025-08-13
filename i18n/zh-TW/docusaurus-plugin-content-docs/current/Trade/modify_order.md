---
sidebar_position: 2
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`modify_order`

---

### 🎯 函式用途

修改尚未成交的掛單（限價單或其他可修改掛單類型）。  
此函式會依據 **`order_id`** 發送交易修改請求至 MT5 平台，支援同步調整價格（price）、停損（sl）、停利（tp）、停損限價（stoplimit）、到期時間（expiration）以及訂單備註（comment）。  
若修改成功，會觸發推播更新訂單狀態。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 字典欄位說明如下： |

| dict 欄位名稱 | 型別       | 必填  | 說明                                    |
|--------------|------------|-------|----------------------------------------|
| `order_id`  | int         | ✅   | 欲修改的掛單訂單編號（MT5 ticket）。 |
| `price`     | float       | ✅   | 修改後的新掛單價格。 |
| `sl`        | float       | ❌   | 停損價格（Stop Loss）。 |
| `tp`        | float       | ❌   | 停利價格（Take Profit）。 |
| `stoplimit` | float       | ❌   | 停損限價（Stop Limit Price）。 |
| `expiration`| datetime    | ❌   | 掛單到期時間（Expiration Time）。 |
| `comment`   | str         | ❌   | 訂單備註，預設為 `"Modified by MAS"`。 |

---

### 📤 回傳資料內容

| 名稱     | 型別 | 備註說明         |
|----------|------|------------------|
| （匿名）  | bool | 修改成功則回傳 `True`，否則為 `False`。 |

---

### 💡 範例程式碼

```python
import time
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

    def receive_order_execution(self, order_id, execution_data):
        print("receive_order_execution:", order_id, execution_data)

    def receive_order_status(self, order_id, status_data):
        print("receive_order_status:", order_id, status_data)

def main():
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_client.login(login_params)

        order_params = {
            "symbol": "EURUSD",
            "order_type": "sell_limit",
            "price": 1.18,
            "volume": 0.1,
            "backtest_toggle": False
        }
        order_id = mas_client.send_order(order_params)
        print(order_id)
        time.sleep(3)

        modify_order_params = {
            "order_id": order_id,
            "price": 1.18,
            "sl": 1.185,
            "tp": 1.175,
        }
        mas_client.modify_order(modify_order_params)
    except Exception as e:
        print(f"登入失敗:{str(e)}")
```
---
