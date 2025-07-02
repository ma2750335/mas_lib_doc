### function 名稱

`unsubscribe_ticks`

---

### function 用途

取消指定商品的即時 Tick 資料訂閱。  
此函式會中止內部背景訂閱執行緒，關閉對該商品的即時報價監控。  

---

### function 參數

| 參數名稱 | 型別  | 備註說明 |
|----------|-------|----------|
| params   | dict  | symbol（str）：要取消訂閱的商品代碼。 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                            |
|--------|------|-------------------------------------|
| 無     | None | 無回傳值，執行後即停止訂閱 |

---

### 💡 範例程式碼

```python
mas_client = MASClient()

params = {
    "symbol": "EURUSD"
}

mas_client.unsubscribe_ticks(params)