### function 名稱

`stop_all_subscriptions`

---

### function 用途

停止所有 Tick 與 Bar 的資料訂閱。

---

### function 參數

| 參數名稱 | 型別 | 備註說明     |
|----------|------|--------------|
| 無       | 無   | 此函式不需任何參數。 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明       |
|--------|------|---------------|
| 無     | None | 此函式無回傳值 |

---

### 💡 範例程式碼

```python
mas_client = MASClient()

# 在關閉程式或切換帳號前，應呼叫此方法清除訂閱
mas_client.stop_all_subscriptions()