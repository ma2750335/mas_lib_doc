### function 名稱

`generate_data_report`

---

### function 用途

根據歷史交易紀錄計算績效指標（如勝率、獲利因子、總損益、交易次數等），並回傳報表統計結果。  
內部會向後端 API `/backtest/gen_data_report` 發送 POST 請求取得結果。

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| 無       | 無   | 函式內部將直接取用 clientpost 物件中的歷史交易資料，不需傳入參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                     |
|--------|------|------------------------------|
| return | dict | 若成功則為 KPI 統計結果 dict，失敗則為 `None` |

回傳格式如下：

```python
{
    "total_trades": 25,
    "win_rate": 0.68,
    "profit_factor": 1.94,
    "total_profit": 10235.5,
    "max_drawdown": -2540.0,
    "avg_risk_reward": 1.45
}
```

---

### 💡 範例程式碼

```python
kpi_result = engine.generate_data_report()

if kpi_result:
    print("總損益：", kpi_result["total_profit"])
    print("勝率：", kpi_result["win_rate"])
else:
    print("產生報表失敗")

```