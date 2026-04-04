---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`generate_trade_chart`

---

### 🎯 函数用途

依据历史交易记录，自动生成完整的交易图表，内容包含：

- **进出场点**（买卖位置标注）  
- **资金曲线**（Equity Curve，显示资金变化趋势）  
- **累计盈亏图**（Cumulative P/L）  
- 支持回测与实时策略绩效监控  

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| None     | None | 函数会自动从内部交易数据源获取内容并生成图表，无需传入参数 |

---

### 📤 返回内容

| 名称   | 类型 | 备注说明                                               |
|--------|------|--------------------------------------------------------|
| return | 任意 | 产出结果，成功则返回 `status=True`，失败则返回错误信息 |

#### 返回格式

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
            self.generate_trade_chart()

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
  href="/html/trade_report.html"
  target="_blank"
  rel="noopener noreferrer"
  style={{ fontSize: '20px', fontWeight: 'bold' }}
>
  查看报表
</a>

<iframe
  src="/html/trade_report.html"
  width="130%"
  height="1000"
  style={{ border: '1px solid #ccc' }}
/>