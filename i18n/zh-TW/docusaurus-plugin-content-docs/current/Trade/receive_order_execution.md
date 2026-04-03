---
sidebar_position: 4
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`receive_order_execution`

---

### 🎯 函式用途

接收**交易訂單成交資訊推播**，用於後續資料處理、交易紀錄更新、績效統計或即時顯示。  
此函式通常會在實盤交易或回測過程中於訂單成交時自動觸發。

---

### 🔧 函式參數

| 參數名稱     | 型別  | 備註說明 |
|--------------|--------|----------|
| ` order_id`      | str    | 訂單編號。 |
| ` execution_data`  | dict | 字典欄位說明如下：  |

| execution_data 欄位 | 型別      | 備註說明 |
|---------------------|----------|----------|
| `price`             | float    | 成交價格。 |
| `volume`            | float    | 成交數量（交易手數）。 |
| `symbol`            | str      | 交易商品代碼（如 `EURUSD`）。 |
| `time`              | datetime | 成交時間（一般為伺服器推播時間）。 |
| `type`              | str      | 訂單類型（如市價、市價平倉、限價等）。 |

---

### 📤 回傳資料內容

| 名稱  | 型別 | 備註說明              |
|------|------|-----------------------|
| 無   | None | 無回傳值（僅接收並處理成交推播訊息）。 |
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