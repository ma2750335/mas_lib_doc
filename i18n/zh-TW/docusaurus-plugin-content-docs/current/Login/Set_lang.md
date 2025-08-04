---
sidebar_position: 2
---

### function 名稱

`login`

---

### function 用途

設定系統預設語言。  

---

### function 參數

| 參數名稱    | 型別    | 必填 | 備註說明 |
|------------|---------|------|----------|
| lang       | str     | ❌   | 語言代碼，可選：`'en'`（英文，預設）、`'zh-tw'`（繁體中文）、`'zh-cn'`（簡體中文）。 |

---

### function 回傳內容

| 名稱   | 型別    | 備註說明               |
|--------|---------|------------------------|
| None   | NoneType | 僅設定內部語言狀態，無回傳值 |

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