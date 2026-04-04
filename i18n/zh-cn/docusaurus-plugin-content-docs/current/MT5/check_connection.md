---
sidebar_position: 2
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`check_connection`

---

### 🎯 函数用途

检查并报告当前系统是否与 MetaTrader 5（MT5） 保持有效连接。  

---

### 🔧 函数参数

| 参数名称 | 类型 | 备注说明     |
|----------|------|--------------|
| 无       | 无   | 此函数不需要任何参数。 |

---

### 📤 返回内容

| 名称   | 类型 | 备注说明                                |
|--------|------|-------------------------------------------|
| （匿名） | bool | 若连接正常则返回 `True`；若断开则返回 `False`，可作为重连判断依据。 |

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
        if mas_client.check_connection():
            print("当前已连接至 MT5")
        else:
            print("尚未连接 MT5，请先执行 login")
            
    except Exception as e:
        print(f"初始化失败:{str(e)}")
```
---
