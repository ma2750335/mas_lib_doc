### function 名稱

`generate_kpi_report`

---

### function 用途

根據歷史交易紀錄，計算核心績效指標（KPI），包含勝率、獲利因子、交易次數、報酬風險比等評估指標。  
本函式會向後端 API `/backtest/gen_kpi_report` 發送 POST 請求，取得計算結果。

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| 無       | 無   | 函式會自動從內部交易歷史來源產生報表，無需傳入參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                                |
|--------|------|---------------------------------------------------------|
| return | dict | 回傳 KPI 報表內容的字典，欄位包含 win_rate、profit_factor、max_drawdown 等績效統計項目，實際格式依 gen_kpi_report() 實作而定 |

回傳格式：

```python
{
    "total_trades": 32,
    "win_rate": 0.72,
    "profit_factor": 2.15,
    "average_win": 320.5,
    "average_loss": -180.3,
    "expectancy": 85.7,
    "max_drawdown": -3100.0
}
```

---

### 💡 範例程式碼

```python
kpi = engine.generate_kpi_report()
if kpi:
    print("勝率：", kpi["win_rate"])
    print("獲利因子：", kpi["profit_factor"])
else:
    print("KPI 報表產生失敗")
```