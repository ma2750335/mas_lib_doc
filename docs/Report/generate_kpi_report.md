### function 名稱

`generate_kpi_report`

---

### function 用途

根據歷史交易紀錄計算績效指標（如勝率、獲利因子、總損益、交易次數等），並產生報表統計結果檔案。

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| 無       | 無   | 函式會自動從內部交易歷史來源產生報表，無需傳入參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                                |
|--------|------|---------------------------------------------------------|
| return | dict | 回傳是否產出成功，失敗時包含錯誤資訊|

回傳格式：

```python
{
    "status": True
}

{
    "status": False,
    "error": "Missing trade data for KPI generation"
}
```

---

### 💡 範例程式碼

```python
result = engine.generate_kpi_report()
if result["status"]:
    print("✅ KPI 報表產出成功")
else:
    print("❌ KPI 報表失敗：", result.get("error", "未知錯誤"))
```