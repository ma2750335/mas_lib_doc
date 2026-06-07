---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📘 Backtest 是什么？

在进行任何自动化交易前，**策略回测（Backtest）** 是必不可少的步骤。通过历史数据模拟交易策略，可以有效：

- 验证策略是否具备稳定盈利能力  
- 测试策略在不同市况下的适应性与表现  
- 计算关键风险指标（如最大回撤、胜率、夏普比率）  
- 降低实盘测试的时间成本与资金风险  

---

## 🔧 MasQuant SDK 如何进行策略回测？

MasQuant SDK 提供简洁易用的回测功能，用户只需继承 `MAS` 类并重写 `receive_bars` 方法，即可快速将策略逻辑应用于历史数据测试，无需额外集成复杂框架。

下面是一段简单的均线策略回测示例：

```python
import mas

class MAS_Client(mas):
    def __init__(self, toggle):
        super().__init__()
        self.index = 0
        self.hold = False
        self.ma = 0
        self.toggle = toggle
        self.order_id = None

    def receive_bars(self, symbol, data, is_end):
        single = self.index % self.ma

        if single == 0:
            if not self.hold:
                self.order_id = self.send_order({
                    "symbol": "EURUSD",
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True
            else:
                self.send_order({
                    "symbol": "EURUSD",
                    "order_type": "sell",
                    "order_id": self.order_id,
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = False

        self.index = self.index+1
        if is_end:
            data = self.generate_data_report()
            data_source = data.get("data")
            print(data_source)
            self.generate_kpi_report()
            self.generate_trade_chart()

def main():
    try:
        toggle = True
        mas_c = MAS_Client(toggle)
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }

        mas_c.login(login_params)
        params = {
            "symbol": "EURUSD",
            "from": '2020-01-01',
            "to": '2024-12-31',
            "timeframe": "D1",
            "captital": 1000,
            "backtest_toggle": mas_c.toggle
        }
        mas_c.ma = 50
        df = mas_c.subscribe_bars(params)
    except Exception as e:
        return {
            'status': False,
            'error': str(e)
        }


if __name__ == "__main__":
    main()
```

---

## 📈 回测报表与 KPI 输出

MasQuant SDK 在回测结束后会自动生成多维度报表，帮助交易者全面评估策略绩效：

- **数据报表**：记录每笔交易的下单时间、方向、盈亏情况（`generate_data_report()`）  
- **KPI 报表**：提供夏普比率、胜率、净利、最大回撤等核心绩效指标（`generate_kpi_report()`）  
- **买卖点图表**：以可视化方式呈现每次交易的进出场点位（`generate_trade_chart()`）  

通过这些报表，你能快速判断策略的可行性，并进一步优化参数设置。

---

## 🔄 回测的应用场景

- **策略研发初期**：验证策略逻辑是否正确  
- **参数优化阶段**：搭配网格搜索（Grid Search）批量测试不同参数组合  
- **模拟真实环境**：可自定义手续费、滑点、延迟等条件，贴近实盘情况  

---

## ⚙️ 切换至真实交易模式

MasQuant SDK 采用「单一代码架构 × 双模式运行」设计，用户仅需切换 `toggle` 参数，即可在「策略回测」与「真实交易」之间无缝切换，避免重复编写代码。

---

## ✅ 切换方式

可通过 `toggle` 参数快速切换模式：

- `True` → 回测模式  

- `False` → 实盘模式  

```python
try:
    # toggle = True 表示进行回测
    toggle = False  # 切换为真实交易

    mas_c = MAS_Client(toggle)
    params = {
        "account": "YOUR_ACCOUNT",
        "password": "YOUR_PASSWORD",
        "server": "YOUR_SERVER"
    }

    mas_c.login(params)
    params = {
        "symbol": "EURUSD",
        "from": '2020-01-01',
        "to": '2024-12-31',
        "timeframe": "D1",
        "backtest_toggle": mas_c.toggle
    }
    mas_c.ma = 50
    df = mas_c.subscribe_bars(params)

except Exception as e:
    return {
        'status': False,
        'error': str(e)
    }
```

---

## 🧩 切換原理

- **回测模式**（`toggle=True`）：所有下单指令由模拟引擎执行，不触发真实交易
- **实盘模式**（`toggle=False`）：下单指令直接发送至经纪商 API 执行，进行真实交易

此設計讓你能先在安全環境中驗證策略，再安心切換到實盤部署。

---

## 🛡️ 实盘前检查清单

在切换至真实交易前，建议检查以下项目以降低风险：

| 项目      | 建议               | 说明              |
| ------- | ---------------- | --------------- |
| 策略绩效报表  | ✅ 通过回测绩效标准       | 建议具备正向净利与稳定胜率   |
| 账号登录测试  | ✅ `login()` 验证成功 | 确认账号信息正确无误      |
| 下单 API  | ✅ 测试单成功送出        | 可先用小资金或模拟账户测试   |
| 止损与风控机制 | ✅ 已设计完善          | 避免实盘中发生无防护的裸单风险 |

---

## 🧩 切换后的开发流程

```text

[策略设计] → [历史回测] → [回测报表分析] → ✅ [一键切换] → [实盘交易]

```

只需维护一份策略代码，即可兼顾回测与实盘交易的需求，降低开发与维护成本。

---