### function 名稱

`generate_trade_chart`

---

### function 用途

根據歷史交易紀錄，產生包含進出場點、資金曲線（Equity Curve）、累積損益等資訊的交易圖表。  

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| 無       | 無   | 函式會自動從內部交易資料取得內容產生圖表，無需傳入參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                               |
|--------|------|--------------------------------------------------------|
| return | 任意 | 回傳是否產出成功，失敗時包含錯誤資訊 |

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
mas_client = MASClient()
result = mas_client.generate_trade_chart()
if result and result.get("status"):
    print("成功產生交易圖表")
else:
    print("圖表產生失敗")
```

### 💡 範例圖表 
<a
  href="/html/trade_report.html"
  target="_blank"
  rel="noopener noreferrer"
  style={{ fontSize: '20px', fontWeight: 'bold' }}
>
  查看報表
</a>

<iframe
  src="/html/trade_report.html"
  width="100%"
  height="1000"
  style={{ border: '1px solid #ccc' }}
/>