---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`generate_data_report`

---

### 🎯 函式用途

根據歷史交易紀錄自動計算多項績效指標（如勝率、獲利因子、總損益、交易次數、最大回撤、累積報酬率等），並回傳可用於**策略回測報告**與**交易績效分析**的統計結果。  
該函式可直接從 `clientpost` 物件內的交易資料生成報表，無需額外輸入參數。

---

### 🔧 函式參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| 無       | 無   | 函式內部會直接讀取 `clientpost` 物件中的歷史交易資料，不需傳入任何參數。 |

---

### 📤 回傳資料內容

| 欄位名稱 | 型別   | 說明                               |
|----------|-------|-----------------------------------|
| `status` | bool  | 是否成功生成報表。 |
| `data`   | dict  | 報表原始資料內容（僅在 `status = True` 時存在），依照使用者權限顯示不同範圍資料。 |
| `error`  | str   | 錯誤訊息（僅在 `status = False` 時存在）。 |

**`data` 格式：**

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

### 💡 範例程式碼

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
            "captital": 1000,
            "backtest_toggle": mas_client.toggle
        }
        mas_client.subscribe_bars(params)
    except Exception as e:
        print(str(e))
```
---