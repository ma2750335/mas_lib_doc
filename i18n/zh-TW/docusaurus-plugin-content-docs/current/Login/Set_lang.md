---
sidebar_position: 2
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`set_lang`

---

### 🎯 函式用途

設定系統的預設顯示語言，影響所有訊息顯示與國際化（i18n）翻譯內容。

---

### 🔧 函式參數

| 參數名稱    | 型別    | 必填 | 備註說明 |
|------------|---------|------|----------|
| lang          | str  | ❌   | 語言代碼，可選：`'en'`（英文，預設）、`'zh-tw'`（繁體中文）、`'zh-cn'`（簡體中文）。 |

---

### 📤 回傳資料內容

| 名稱   | 型別    | 備註說明               |
|--------|---------|------------------------|
| None   | NoneType | 僅更新內部語言設定，無回傳值。 |

---

### 範例程式碼

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
            print("登入成功！")
    except Exception as e:
        print(f"登入失敗:{str(e)}")
```
---