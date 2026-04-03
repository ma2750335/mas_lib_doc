---
sidebar_position: 8
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`get_bars_from_pos`

---

### 🎯 函数用途

从 MT5 获取指定品种在特定**位置索引**起始的**固定数量历史 K 线（OHLCV）**。  
位置 `0` 表示最新的 K 线；位置 `1` 表示向前一根，以此类推。  
适用于无需指定绝对时间戳，直接加载最近 N 根 K 线用于指标计算的场景。

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明 |
|----------|------|----------|
| `params` | dict | 查询参数字典。 |

| dict 字段名称 | 类型 | 必填 | 说明 |
|--------------|------|------|------|
| `symbol`     | str  | ✅   | 商品代码（如 `"EURUSD"`）。 |
| `timeframe`  | str  | ✅   | K 线周期：`"M1"`、`"M5"`、`"H1"`、`"H4"`、`"D1"`、`"W1"`、`"MN1"` 等。 |
| `count`      | int  | ✅   | 要获取的 K 线数量。 |
| `start_pos`  | int  | ❌   | 起始位置索引（默认 `0`，即最新 K 棒）。 |

---

### 📤 返回数据内容

| 名称     | 类型         | 备注说明 |
|----------|-------------|----------|
| `result` | pd.DataFrame | K 线数据，最新 K 棒在最后一行。失败时返回空 DataFrame。 |

| 字段名称     | 类型     | 说明 |
|--------------|----------|------|
| `time`       | datetime | K 棒开盘时间。 |
| `open`       | float    | 开盘价。 |
| `high`       | float    | 最高价。 |
| `low`        | float    | 最低价。 |
| `close`      | float    | 收盘价。 |
| `tick_volume`| int      | 该 K 棒期间的 Tick 次数。 |
| `spread`     | int      | 该 K 棒期间的平均点差。 |
| `real_volume`| int      | 实际交易量（若有提供）。 |

返回格式如下：
```python
          time     open     high      low    close  tick_volume  spread  real_volume
0  2025-06-01  1.08501  1.09120  1.08350  1.08950         8432       8            0
1  2025-06-02  1.08950  1.09500  1.08800  1.09200         7651       9            0
...
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

    # 获取 EURUSD 最近 100 根日线
    df = mas_client.get_bars_from_pos({
        "symbol": "EURUSD",
        "timeframe": "D1",
        "count": 100
    })

    if not df.empty:
        print(f"已加载 {len(df)} 根 K 线。")
        print(df.tail(3))
    else:
        print("❌ 数据加载失败。")

    # 从第 10 根前开始获取 50 根 H1 K 线
    df_h1 = mas_client.get_bars_from_pos({
        "symbol": "EURUSD",
        "timeframe": "H1",
        "count": 50,
        "start_pos": 10
    })
    print(df_h1.head())

if __name__ == "__main__":
    main()
```
---
