---
sidebar_position: 1
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`send_order`

---

### 🎯 函式用途

發送一筆交易訂單（支援市價、限價、停損限價、GTC 與指定時間、完整 `request` 欄位）。  
此函式為 **統一下單 API**，根據 `backtest_toggle` 參數自動切換下單模式：

- **回測模式 (`True`)**：使用模擬交易流程，不連接 MetaTrader5。
- **實盤模式 (`False`)**：連接 MT5 進行真實交易。

下單成功後系統會推播 **訂單狀態（Order Status）** 與 **成交資訊（Execution Data）**。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 字典欄位說明如下： |

| dict 欄位名稱      | 型別       | 必填 | 說明                                                  |
|-------------------|------------|------|-------------------------------------------------------|
| `backtest_toggle` | bool     | ✅   | 是否為回測模式（`True` 表示回測）。 |
| `symbol`          | str      | ✅   | 交易商品代碼（例如 `"EURUSD.sml"`）。 |
| `order_type`      | str      | ✅   | 訂單類型：`buy`, `sell`, `buy_limit`, `sell_stop` 等。 |
| `volume`          | float    | ✅   | 下單數量（例如 `0.1`）。 |
| `price`           | float    | ❌   | 限價單 / 停損單價格（市價單會自動使用 bid/ask）。 |
| `sl`              | float    | ❌   | 停損價格。 |
| `tp`              | float    | ❌   | 停利價格。 |
| `stoplimit`       | float    | ❌   | 停損限價價格。 |
| `deviation`       | int      | ❌   | 最大價格滑點（預設 10）。 |
| `magic`           | int      | ❌   | 自訂 EA 識別碼（預設 123456）。 |
| `comment`         | str      | ❌   | 訂單備註（預設 `"MAS Order"`）。 |
| `type_time`       | enum/int | ❌   | 訂單有效時間型態（預設 `mt5.ORDER_TIME_GTC`）。 |
| `expiration`      | datetime | ❌   | 到期時間（限 `type_time` 為指定時間）。 |
| `type_filling`    | enum/int | ❌   | 撮合方式（預設 `mt5.ORDER_FILLING_FOK`）。 |
| `position`        | int      | ❌   | 修改某個持倉的下單編號。 |
| `position_by`     | int      | ❌   | 對沖模式下的 `position_by` 值。 |
---

### request內容

| 欄位名稱   | 型別   | 說明 |
|------------|--------|------|
| action     | int    | 交易操作類型。 |
| magic      | int    | EA ID（策略識別碼）。 |
| order      | int    | 訂單編號（修改委託單時必填）。 |
| symbol     | str    | 商品代碼（例如 `"EURUSD"`，修改或平倉時非必填）。 |
| volume     | float  | 下單數量。 |
| price      | float  | 下單價格（市價單可不填）。 |
| stoplimit  | float  | 觸發限價單的價格。 |
| sl         | float  | 停損價格。 |
| tp         | float  | 停利價格。 |
| deviation  | int    | 最大滑價（以點為單位）。 |
| type       | int    | 訂單類型。 |
| type_filling | int  | 撮合方式。 |
| type_time  | int    | 訂單有效時間型態。 |
| expiration | datetime | 掛單到期時間。 |
| comment    | str    | 訂單備註。 |
| position   | int    | 持倉編號（修改或平倉使用）。 |
| position_by| int    | 反向倉位編號（對沖平倉使用）。 |

---

### 📤 回傳資料內容

| 名稱        | 型別 | 說明 |
|-------------|------|------|
| `order_id`  | str  | 成功則回傳訂單編號，失敗則回傳錯誤訊息。 |

---

### 💡 範例程式碼（實盤）
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
            "order_type": "buy_limit",
            "volume": 0.1,
            "price": 1.12345,
            "sl": 1.12000,
            "tp": 1.13000,
            "deviation": 10,
            "magic": 888888,
            "comment": "Test Order",
            "type_time": mt5.ORDER_TIME_GTC,
            "expiration": datetime(2025, 12, 31, 23, 59),
            "type_filling": mt5.ORDER_FILLING_IOC,
            "backtest_toggle": False
        }
        mas_client.send_order(order_params)
    except Exception as e:
        print(f"登入失敗:{str(e)}")
```

### 💡 範例程式碼（模擬）

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
---