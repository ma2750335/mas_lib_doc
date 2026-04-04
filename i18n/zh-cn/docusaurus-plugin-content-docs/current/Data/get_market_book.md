---
sidebar_position: 9
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`get_market_book`

---

### 🎯 函数用途

获取指定品种当前的**订单簿快照（市场深度 / DOM）**。  
需先调用 `subscribe_market_book()` 以启用数据源。  
返回各买卖报价层级及对应数量，可用于分析订单流或监控市场流动性。

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params` | dict | 查询条件设置字典，字段说明如下： |

#### `params`（dict）字段说明

| 字段名称 | 类型 | 必填 | 说明 |
|----------|------|------|------|
| `symbol`     | str  | ✅   | 要查询市场深度的商品代码（如 `"EURUSD"`），须先订阅。 |

---

### 📤 返回内容

| 名称     | 类型        | 备注说明 |
|----------|------------|----------|
| `result` | list[dict] | 按价位排序的委托簿条目列表。未订阅或失败时返回 `[]`。 |

| 字段名称     | 类型  | 说明 |
|--------------|-------|------|
| `type`       | int   | 条目类型：`1=Ask（卖方）`、`2=Bid（买方）`。 |
| `price`      | float | 该报价层级的价格。 |
| `volume`     | int   | 该层级的整数数量（手数）。 |
| `volume_dbl` | float | 该层级的精确数量（浮点数）。 |

#### 返回格式

```python
[
    {"type": 1, "price": 1.09520, "volume": 50,  "volume_dbl": 50.0},
    {"type": 1, "price": 1.09510, "volume": 120, "volume_dbl": 120.0},
    {"type": 2, "price": 1.09500, "volume": 80,  "volume_dbl": 80.0},
    {"type": 2, "price": 1.09490, "volume": 200, "volume_dbl": 200.0},
]
```

---

### 💡 示例代码

```python
import mas
import time

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

    symbol = "EURUSD"

    # 先订阅
    mas_client.subscribe_market_book({"symbol": symbol})
    time.sleep(0.5)

    # 获取委托簿快照
    book = mas_client.get_market_book({"symbol": symbol})

    bids = [e for e in book if e["type"] == 2]
    asks = [e for e in book if e["type"] == 1]

    print(f"最佳买价：{bids[0]['price'] if bids else 'N/A'}")
    print(f"最佳卖价：{asks[0]['price'] if asks else 'N/A'}")
    print(f"委托簿总层数：{len(book)}")

    # 取消订阅
    mas_client.unsubscribe_market_book({"symbol": symbol})

if __name__ == "__main__":
    main()
```
---
