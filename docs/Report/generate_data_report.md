### Function Name

`generate_data_report`

---

### Function Purpose

Calculates performance metrics (such as win rate, profit factor, net profit/loss, number of trades, etc.) based on historical trading records and returns a structured report.

---

### Function Parameters

| Name | Type | Description |
|------|------|-------------|
| None | None | This function directly reads historical trading data from the internal `clientpost` object and requires no parameters. |

---

### Function Return 

| Name    | Type  | Description                                                                 |
|---------|-------|-----------------------------------------------------------------------------|
| status  | bool  | Indicates whether the report was successfully generated                     |
| data    | dict  | Raw report data (available when `status = True`), content may vary by user role |
| error   | str   | Error message (available when `status = False`)                             |

Return data(dict) format：

```python
return {
            "data_source": dataframe,
            "一般數據": {
                "總損益": -1389.86,
                "交易次數": 13
            },
            "勝率與虧損率":{
                "勝率":30.77,
                "虧損率":69.23
            },
            "最大回撤趨勢":{
                "最大回撤 (%)":{
                    "2020":-0.0,
                    "2021":10903.930817608712,
                    "2022":8785.534591193882,
                    "2023":9776.572327042826,
                    "2024":10826.57232704269
                }
            },
            "累積報酬折線圖":{
                "累積報酬 (%)":{
                    "2020":-14.210600000000007,
                    "2021":-13.99699999999999,
                    "2022":-12.491599999999998,
                    "2023":-12.563000000000008,
                    "2024":-13.8986
                }
            },
            "績效指標":{
                "交易次數":13,
                "勝率":30.77,
                "最大回撤":15.22,
                "盈虧比":0.29,
                "總報酬率":-13.9
            }
        }
        
```
---

### 💡 Example Code

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()
        self.toggle = False
        self.ma = 0
        self.index = 0
        self.hold = False
        self.order_id = None

    def receive_bars(self, symbol, data, is_end=False):
        single = self.index % self.ma

        if single == 0:
            if not self.hold:
                self.order_id = self.send_order({
                    "symbol": "EURUSD",
                    "order_type": "sell",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True
            else:
                self.send_order({
                    "symbol": "EURUSD",
                    "order_type": "buy",
                    "order_id": self.order_id,
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = False

        self.index = self.index+1
        if is_end:
            data = self.generate_data_report()
            print(data)


def main():
    try:
        mas_client = MAS_Client()
        mas_client.toggle = True
        mas_client.ma = 50
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        mas_client.login(login_params)

        params = {
            "symbol": "EURUSD",
            "from": '2020-01-01',
            "to": '2024-12-31',
            "timeframe": "D1",
            "backtest_toggle": mas_client.toggle
        }
        mas_client.subscribe_bars(params)
    except Exception as e:
        print(str(e))
```
---