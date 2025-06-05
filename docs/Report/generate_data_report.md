### function 名稱

`generate_data_report`

---

### function 用途

根據歷史交易紀錄計算績效指標（如勝率、獲利因子、總損益、交易次數等），並回傳報表統計結果。

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
   "績效指標": {
                "盈虧比": round(total_profit / total_loss, 2) if total_loss != 0 else float("inf"),
                "勝率": round(win_rate * 100, 2),
                "最大回撤": round(max_drawdown_pct, 2),
                "交易次數": len(df),
                "總報酬率": round(total_return_pct, 2)
            },
            "累積報酬折線圖": {"累積報酬 (%)": annual_return_pct.to_dict()},
            "勝率與虧損率": {"勝率": round(win_rate * 100, 2), "虧損率": round(loss_rate * 100, 2)},
            "最大回撤趨勢": {"最大回撤 (%)": annual_drawdown_pct.to_dict()}
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