---
sidebar_position: 2
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函数名称

`set_lang`

---

### 🎯 函数用途

设置系统的默认显示语言，影响所有信息显示与国际化（i18n）翻译内容。

---

### 🔧 函数参数

| 参数名称    | 类型    | 必填 | 备注说明 |
|------------|---------|------|----------|
| lang          | str  | ❌   | 语言代码，可选：`'en'`（英文，默认）、`'zh-tw'`（繁体中文）、`'zh-cn'`（简体中文）。 |

---

### 📤 返回数据内容

| 名称   | 类型    | 备注说明               |
|--------|---------|------------------------|
| None   | NoneType | 仅更新内部语言设置，无返回值。 |

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
        mas_client.set_lang("zh-tw")
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD"
        }
        if mas_client.login(login_params):
            print("登录成功！")
    except Exception as e:
        print(f"登录失败:{str(e)}")
```
---