---
sidebar_position: 7
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`get_version`

---

### 🎯 函数用途

返回当前连接的 **MT5 终端版本信息**，包括版本号、Build 编号及发布日期。  
可用于排查兼容性问题或确认终端环境版本。

---

### 🔧 函数参数

此函数不需要任何参数。

---

### 📤 返回数据内容

| 名称     | 类型 | 备注说明 |
|----------|------|----------|
| `result` | dict | MT5 终端版本信息字典。失败时返回空字典 `{}`。 |

| 字段名称       | 类型 | 说明 |
|----------------|------|------|
| `version`      | int  | MT5 终端主要版本号。 |
| `build`        | int  | Build 号。 |
| `release_date` | str  | 发布日期字符串（如 `"24 Jan 2025"`）。 |

返回格式如下：
```python
{
    "version": 500,
    "build": 4755,
    "release_date": "24 Jan 2025"
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

    version_info = mas_client.get_version()
    print("MT5 版本信息：", version_info)
    # 输出：{'version': 500, 'build': 4755, 'release_date': '24 Jan 2025'}

if __name__ == "__main__":
    main()
```
---
