---
sidebar_position: 1
---
### function 名稱

`send_order`

---

### function 用途

發送一筆交易訂單（支援市價、限價、停損限價、GTC 與指定時間、完整 request 欄位）。
此函式為統一下單入口，根據 `backtest_toggle` 參數的值，自動切換：

- 若為 `True`：使用模擬交易流程進行下單，不連接 MetaTrader5 。
- 若為 `False`：使用實盤交易流程進行下單，連接 MetaTrader5 進行真實交易。

下單成功後推播訂單狀態與成交資訊。

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | 傳入的字典內容如下方欄位說明 |

| dict 欄位名稱      | 型別       | 必填 | 說明                                                  |
|-------------------|------------|------|-------------------------------------------------------|
| `backtest_toggle` | bool       | ✅   | 是否為回測模式（`True` 表示回測模式）。                     |
| `symbol`          | str        | ✅   | 交易商品代碼，例如 `"EURUSD.sml"`。                     |
| `order_type`      | str        | ✅   | 訂單類型：`buy`, `sell`, `buy_limit`, `sell_stop` 等。 |
| `volume`          | float      | ✅   | 下單數量，如 `0.1`。                                   |
| `price`           | float      | ❌   | 限價單 / 停損單價格（市價單會自動使用 bid/ask）。         |
| `sl`              | float      | ❌   | 停損價格。                                             |
| `tp`              | float      | ❌   | 停利價格。                                             |
| `stoplimit`       | float      | ❌   | 停損限價價格。                                         |
| `deviation`       | int        | ❌   | 最大價格滑點（預設 10）。                               |
| `magic`           | int        | ❌   | 自訂識別碼EA ID（預設 123456）。                        |
| `comment`         | str        | ❌   | 訂單備註（預設為 `"MAS Order"`）。                      |
| `type_time`       | enum/int   | ❌   | 訂單有效時間型態，預設為 `mt5.ORDER_TIME_GTC`。        |
| `expiration`      | datetime   | ❌   | 限單或停損單的到期時間（限 type_time 為指定時間）。      |
| `type_filling`    | enum/int   | ❌   | 成交方式，預設為 `mt5.ORDER_FILLING_FOK`。            |
| `position`        | int        | ❌   | 針對某個 position 修改下單。                          |
| `position_by`     | int        | ❌   | 用於對沖模式下指定 position_by。                      |

---

### request內容

| 欄位名稱      | 型別   | 說明 |
|---------------|--------|------|
| action        | int    | 交易操作類型。 |
| magic         | int    | EA ID，可用來標記策略來源。 |
| order         | int    | 訂單編號，修改委託單時必填。 |
| symbol        | str    | 商品代碼（例如 `"EURUSD"`），修改或平倉時非必填 |
| volume        | float  | 下單數量。 |
| price         | float  | 下單價格。若為市價單且屬於「市場成交型」（Market Execution），此欄位可不填。 |
| stoplimit     | float  | 當市價觸及 `price` 時，用於啟用限價單的價格（觸發後才送出）。 |
| sl            | float  | 停損價格。 |
| tp            | float  | 停利價格。 |
| deviation     | int    | 可接受的最大滑價（以點為單位）。 |
| type          | int    | 訂單類型。 |
| type_filling  | int    | 撮合方式。 |
| type_time     | int    | 訂單有效時間型態。 |
| expiration    | datetime | 掛單的到期時間。 |
| comment       | str    | 訂單備註。 |
| position      | int    | 持倉編號，用於修改或平倉指定倉位（通常與開倉訂單編號一致）。 |
| position_by   | int    | 反向倉位編號，用於「對沖平倉」操作（以相反方向的持倉進行平倉）。 |

---

### function 回傳內容

| 名稱        | 型別 | 備註說明                                         |
|------------|------|--------------------------------------------------|
| `order_id` | str  | 成功下單後回傳訂單編號(order_id)，失敗則回傳錯誤訊息。 |

---

### 💡 範例程式碼（實盤）
```python
from mas.mas import MAS

class MAS_Client(MAS):
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
from mas.mas import MAS

class MAS_Client(MAS):
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