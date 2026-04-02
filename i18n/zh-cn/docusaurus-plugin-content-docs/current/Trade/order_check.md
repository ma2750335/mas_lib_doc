---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`order_check`

---

### 🎯 函数用途

在**不实际下单**的情况下，预先对订单请求进行**合法性验证**。  
可在调用 `send_order()` 前确认订单参数是否有效、账户保证金是否充足，以及券商是否允许此操作。  
返回详细结果，包含保证金需求与任何错误代码。

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params` | dict | 要验证的订单参数（与 `send_order` 结构相同）。 |

| dict 字段名称 | 类型  | 必填 | 说明 |
|--------------|-------|------|------|
| `symbol`     | str   | ✅   | 商品代码（如 `"EURUSD"`）。 |
| `order_type` | str   | ✅   | 订单类型：`"buy"`、`"sell"`、`"buy_limit"` 等。 |
| `volume`     | float | ✅   | 下单手数。 |
| `price`      | float | ❌   | 挂单价格（限价单使用）。 |
| `sl`         | float | ❌   | 止损价格。 |
| `tp`         | float | ❌   | 止盈价格。 |

---

### 📤 返回数据内容

| 名称     | 类型 | 备注说明 |
|----------|------|----------|
| `result` | dict | MT5 验证结果。失败时返回空字典 `{}`。 |

| 字段名称      | 类型  | 说明 |
|---------------|-------|------|
| `retcode`     | int   | 返回代码，`0` 代表订单有效。 |
| `balance`     | float | 假设成交后的账户余额。 |
| `equity`      | float | 假设成交后的净值。 |
| `profit`      | float | 预估盈亏。 |
| `margin`      | float | 此订单所需保证金。 |
| `margin_free` | float | 此订单成交后剩余可用保证金。 |
| `margin_level`| float | 保证金水平百分比。 |
| `comment`     | str   | 结果说明（如 `"Done"` 或错误信息）。 |

返回格式如下：
```python
{
    "retcode": 0,
    "balance": 10000.00,
    "equity": 10000.00,
    "profit": 0.0,
    "margin": 130.45,
    "margin_free": 9869.55,
    "margin_level": 7665.0,
    "comment": "Done"
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
    mas_client = MAS_Client()
    mas_client.login({
        "account": "YOUR_ACCOUNT",
        "password": "YOUR_PASSWORD",
        "server": "YOUR_SERVER"
    })

    check_result = mas_client.order_check({
        "symbol": "EURUSD",
        "order_type": "buy",
        "volume": 0.1,
        "sl": 1.08000,
        "tp": 1.10000
    })

    if check_result.get("retcode") == 0:
        print("✅ 订单有效，所需保证金：", check_result["margin"])
    else:
        print("❌ 订单验证失败：", check_result.get("comment"))

if __name__ == "__main__":
    main()
```
---
