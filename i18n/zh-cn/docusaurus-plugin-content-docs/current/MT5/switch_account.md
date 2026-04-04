---
sidebar_position: 8
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`switch_account`

---

### 🎯 函数用途

在无需重启应用程序的情况下，**切换至另一个 MT5 交易账户**。  
执行该函数后，系统将先调用 `shutdown_mt5()`，再使用新的账户凭证重新执行 `login()`。  
可用于多账户管理，或在模拟账户与实盘账户之间进行切换。

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params` | dict | 查询条件设置字典，字段说明如下： |

#### `params`（dict）字段说明

| 字段名称 | 类型 | 必填 | 说明 |
|----------|------|------|------|
| `account`    | int  | ✅   | 要切换的 MT5 账号。 |
| `password`   | str  | ✅   | 新账户的密码。 |
| `server`     | str  | ✅   | 新账户所属的券商服务器名称。 |
| `timeout`    | int  | ❌   | 连接超时时间（毫秒），默认 `6000`。 |

---

### 📤 返回内容

| 名称     | 类型 | 备注说明 |
|----------|------|----------|
| `result` | bool | 切换并重新登录成功返回 `True`，否则返回 `False`。 |

---

### 💡 示例代码

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

def main():
    mas_client = MAS_Client()

    # 登录初始账户
    mas_client.login({
        "account": 111111,
        "password": "password_a",
        "server": "BrokerA-Live"
    })

    print("切换账户中...")

    # 切换至另一账户
    success = mas_client.switch_account({
        "account": 222222,
        "password": "password_b",
        "server": "BrokerB-Demo"
    })

    if success:
        print("✅ 账户切换成功。")
    else:
        print("❌ 账户切换失败。")

if __name__ == "__main__":
    main()
```
---
