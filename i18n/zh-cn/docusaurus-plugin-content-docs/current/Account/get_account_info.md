---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`get_account_info`

---

### 🎯 函数用途

查询当前登录的 MetaTrader 5（MT5）交易账号的完整账户信息，包含余额、净值、杠杆、保证金状态等关键数据。

---

### 🔧 函数参数

| 参数名称 | 数据类型 | 备注说明                          |
|---------|----------|----------------------------------|
| 无       | 无      | 此函数不需要传入任何参数即可执行。  |

---

### 📤 返回内容

| 名称   | 类型 | 备注说明                                                                                 |
|--------|------|-----------------------------------------------------------------------------------------|
| return | dict | 若查询成功，返回包含账户信息的 dict；失败则为 `{"error": "查询账户信息失败"}`。详细字段如下： |

| 字段名称               | 类型  | 说明                                                    |
|-----------------------|-------|---------------------------------------------------------|
| `login`               | int   | MT5 登录账号 ID。                                        |
| `trade_mode`          | int   | 交易模式（0=实盘, 1=模拟, 2=竞赛）。                       |
| `leverage`            | int   | 杠杆倍数。                                               |
| `limit_orders`        | int   | 最大挂单数量。                                           |
| `margin_so_mode`      | int   | 强制平仓（Stop-out）计算模式（0=百分比, 1=固定金额）。      |
| `trade_allowed`       | int   | 是否允许手动交易（0=否，1=是）。                           |
| `trade_expert`        | int   | 是否允许 EA（自动程序）交易（0=否，1=是）。                 |
| `margin_mode`         | int   | 保证金计算模式（0=Netting, 1=Exchange, 2=Hedging）。      |
| `currency_digits`     | int   | 账户币别显示的小数位数（影响结果精度）。                   |
| `fifo_close`          | int   | 是否启用 FIFO 平仓机制（0=否，1=是）。仅 Hedging 模式有效。 |
| `balance`             | float | 账户总余额（Balance）。                                   |
| `credit`              | float | 信用额度。                                               |
| `profit`              | float | 未实现盈亏（Floating P/L）。                              |
| `equity`              | float | 账户净值（Balance + Floating P/L）。                      |
| `margin`              | float | 已使用保证金。                                            |
| `margin_free`         | float | 剩余可用保证金（Free Margin）。                           |
| `margin_level`        | float | 保证金比例百分比（Margin Level %）。                       |
| `margin_so_call`      | float | Margin Call 水位（根据 mode 百分比或金额）。               |
| `margin_so_so`        | float | 强制平仓（Stop-out）水位（根据 mode 百分比或金额）。        |
| `margin_initial`      | float | 初始开仓所需保证金。                                      |
| `margin_maintenance`  | float | 维持仓位所需最低保证金。                                  |
| `assets`              | float | 账户资产总值。                                           |
| `liabilities`         | float | 账户负债总额。                                           |
| `commission_blocked`  | float | 冻结中的交易手续费。                                      |
| `name`                | str   | MT5 交易用户名。                                          |
| `server`              | str   | MT5 交易服务器名称。                                      |
| `currency`            | str   | 账户基准货币（如 USD、EUR）。                              |
| `company`             | str   | 经纪商公司名称。                                          |

#### 返回格式

```python
{
    "login": 25115284,
    "trade_mode": 0,
    "balance": 99588.3,
    "equity": 99543.2,
    "margin": 54.37,
    "free_margin": 99488.8,
    "leverage": 100,
    "margin_level": 183085,
    "currency": "USD",
    "limit_orders": 200,
    "margin_so_mode": 0,
    "trade_allowed": true,
    "trade_expert": true,
    "margin_mode": 2,
    "currency_digits": 2,
    "fifo_close": false,
    "credit": 0,
    "profit": -45.13,
    "margin_so_call": 50,
    "margin_so_so": 30,
    "margin_initial": 0,
    "margin_maintenance": 0,
    "assets": 0,
    "liabilities": 0,
    "commission_blocked": 0,
    "name": "James Smith",
    "server": "MetaQuotes-Demo",
    "company": "MetaQuotes Software Corp."
}
```

---

### 💡 示例代码

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

def main():
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        if mas_client.login(login_params):
            print("登录成功！")
        print(mas_client.get_account_info())
    except Exception as e:
        print(f"登录失败:{str(e)}")
```
---
