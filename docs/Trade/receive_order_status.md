### function 名稱

`receive_order_status`

---

### function 用途

接收交易系統回傳的訂單狀態更新資料（如成功、錯誤、等待等），用於後續狀態處理或顯示。

---

### function 參數

| 參數名稱   | 型別   | 備註說明                                      |
|------------|--------|-----------------------------------------------|
| order_id   | str    | 訂單代碼，用於識別該筆訂單                   |
| status_data| dict   | 包含狀態資訊的字典，如下方欄位說明 |

| status_data 欄位 | 型別  | 備註說明 |
|------------------|--------|----------|
| status           | int    | 訂單狀態代碼（通常與 MT5 `retcode` 相同） |
| retcode          | int    | MT5 回傳的狀態代碼 |
| message          | str    | MT5 回傳的訊息（例如 `"Request executed"`） |
| request          | dict   | 當初下單所使用的 request 結構 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明              |
|--------|------|-----------------------|
| return | None | 無回傳值（單純接收推播訊息處理） |

---

### 💡 範例程式碼

```python
# 實際下單完成後，推播狀態回傳至 receiver
self.receiver.on_order_status(order_id, {
    "status": result.retcode,
    "retcode": result.retcode,
    "message": result.comment,
    "request": request
})
