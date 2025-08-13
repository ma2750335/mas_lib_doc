---
sidebar_position: 5
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`receive_order_status`

---

### 🎯 函式用途

接收並處理 **MT5 平台回傳的訂單狀態推播資訊**。  
此函式在訂單執行、修改、取消等操作後會自動觸發，用於更新系統內部訂單狀態、記錄交易日誌或進行即時風控判斷。  

---

### 🔧 函式參數

| 參數名稱    | 型別  | 備註說明 |
|-------------|-------|----------|
| `order_id`  | str   | 訂單編號（ticket）。 |
| `status_data` | dict |字典欄位說明如下：   |

| status_data 欄位 | 型別  | 備註說明 |
|------------------|--------|----------|
| `status`         | int   | 訂單狀態代碼（通常與 MT5 `retcode` 相同）。 |
| `retcode`        | int   | MT5 回傳的原始訂單狀態代碼。 |
| `message`        | str   | MT5 回傳的狀態訊息（例如 `"Request executed"`）。 |
| `request`        | dict  | 本筆訂單下單時的 request 原始資料。 |

---

### 📤 回傳資料內容

| 名稱 | 型別 | 備註說明 |
|------|------|----------|
| 無   | None | 無回傳值（僅用於接收與處理推播訊息）。 |

---

### 💡 範例程式碼

```python
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
            "order_type": "sell",
            "volume": 0.1,
            "backtest_toggle": True
        }
        mas_client.send_order(order_params)
    except Exception as e:
        print(f"登入失敗:{str(e)}")
```
