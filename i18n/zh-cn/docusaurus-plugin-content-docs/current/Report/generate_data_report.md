---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`generate_data_report`

---

### 🎯 函数用途

根据历史交易记录自动计算多项绩效指标（如胜率、盈利因子、总盈亏、交易次数、最大回撤、累计收益率等），并返回可用于**策略回测报告**与**交易绩效分析**的统计结果。  
该函数可直接从 `clientpost` 对象内的交易数据生成报表，无需额外输入参数。

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| 无       | 无   | 函数内部会直接读取 `clientpost` 对象中的历史交易数据，无需传入任何参数。 |

---

### 📤 返回数据内容

| 字段名称 | 类型   | 说明                               |
|----------|-------|-----------------------------------|
| `status` | bool  | 是否成功生成报表。 |
| `data`   | dict  | 报表原始数据内容（仅在 `status = True` 时存在），根据用户权限显示不同范围的数据。 |
| `error`  | str   | 错误信息（仅在 `status = False` 时存在）。 |

**`data` 格式：**

```python
return {
            "data_source": dataframe,
            "一般数据": {
                "总盈亏": -1389.86,
                "交易次数": 13
            },
            "胜率与亏损率":{
                "胜率":30.77,
                "亏损率":69.23
            },
            "最大回撤趋势":{
                "最大回撤 (%)":{
                    "2020":-0.0,
                    "2021":10903.930817608712,
                    "2022":8785.534591193882,
                    "2023":9776.572327042826,
                    "2024":10826.57232704269
                }
            },
            "累计收益折线图":{
                "累计收益 (%)":{
                    "2020":-14.210600000000007,
                    "2021":-13.99699999999999,
                    "2022":-12.491599999999998,
                    "2023":-12.563000000000008,
                    "2024":-13.8986
                }
            },
            "绩效指标":{
                "交易次数":13,
                "胜率":30.77,
                "最大回撤":15.22,
                "盈亏比":0.29,
                "总收益率":-13.9
            }
        }
        
```
---

### 💡 示例代码

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