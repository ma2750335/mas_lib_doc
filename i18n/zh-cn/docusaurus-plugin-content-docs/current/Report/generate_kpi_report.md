---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`generate_kpi_report`

---

### 🎯 函数用途

根据历史交易记录，自动计算多项交易绩效指标（如胜率、盈利因子、总盈亏、最大回撤、交易次数等），并生成 KPI 绩效统计报表文件。  

---

### 🔧 函数参数

| 参数名称       | 类型 | 备注说明 |
|----------------|------|----------|
| 无             | 无   | 函数会自动从内部历史交易数据源生成报表，无需传入参数。 |

---

### 📤 返回数据内容

| 名称   | 类型 | 备注说明                                      |
|--------|------|-----------------------------------------------|
| return | dict | 返回报表生成是否成功，若失败则包含错误信息内容。 |

**返回格式：**

```python
{
    "status": True
}

{
    "status": False,
    "error": "Missing trade data for KPI generation"
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
            self.generate_kpi_report()

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
### 💡 示例图表
<a
  href="/html/kpi_report.html"
  target="_blank"
  rel="noopener noreferrer"
  style={{ fontSize: '20px', fontWeight: 'bold' }}
>
  查看报表
</a>

<iframe
  src="/html/kpi_report.html"
  width="130%"
  height="3900"
  style={{ border: '1px solid #ccc' }}
/>
---