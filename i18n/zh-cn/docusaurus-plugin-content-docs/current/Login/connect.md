---
id: login
title: login
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`login`

---

### 🎯 函数用途

初始化 **MetaTrader 5（MT5）交易终端** 并登录交易账号。  

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params`   | dict | 查询条件设置字典，字段说明如下： |

#### `params`（dict）字段说明

| 字段名称 | 类型 | 必填 | 说明 |
|----------|------|------|------|
| `account`      | int     | ✅   | 用户 MT5 交易账号（必须为有效的 MT5 实盘或模拟账号）。 |
| `password`     | str     | ✅   | 用户 MT5 交易密码（需与账号对应）。 |
| `server`       | str     | ✅   | 交易服务器名称（可在 MT5 登录界面查看）。 |
| `timeout`      | int     | ❌   | 连接超时时间（单位：毫秒），默认 `60000`（60 秒），建议在网络延迟高的情况下增加。 |

---

### 📤 返回内容

| 名称     | 类型  | 备注说明                                   |
|----------|-------|--------------------------------------------|
| （匿名） | bool  | 成功则返回 `True`，失败则返回错误信息。 |

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
            "server": "YOUR_SERVER",
            "timeout": 10000
        }
        if mas_client.login(login_params):
            print("登录成功！")
    except Exception as e:
        print(f"登录失败:{str(e)}")
```
---