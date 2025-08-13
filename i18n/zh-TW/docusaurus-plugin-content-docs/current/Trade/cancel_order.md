---
sidebar_position: 3
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`cancel_order`

---

### 🎯 函式用途

取消尚未成交的掛單訂單。  
此函式會依據傳入的 **`order_id`**（MT5 訂單編號 ticket）向 MetaTrader 5 平台發送刪單請求，確保未成交的訂單即時撤銷，避免不必要的持倉或市場風險。  

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 字典欄位說明如下： |

| dict 欄位名稱 | 型別 | 必填  | 說明                                      |
|--------------|-------------|------------------------------------------|
| `order_id`   | int  | ✅   | 欲取消之掛單的 MT5 訂單編號（ticket） |
| `comment`    | str  | ❌   | 取消原因備註，預設為 `"Cancel by MAS"` |

---

### 📤 回傳資料內容

| 名稱     | 型別 | 備註說明              |
|----------|------|-----------------------|
| （匿名） | bool | 取消成功則回傳 `True`，否則為 `False` |

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

        cancel_order_params = {
            "order_id": order_id
        }
        mas_client.cancel_order(cancel_order_params)
    except Exception as e:
        print(f"登入失敗:{str(e)}")
```

---
