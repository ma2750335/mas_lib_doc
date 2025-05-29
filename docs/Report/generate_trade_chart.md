### function 名稱

`generate_trade_chart`

---

### function 用途

根據歷史交易紀錄，產生包含進出場點、資金曲線（Equity Curve）、累積損益等資訊的交易圖表資料。  
內部會透過 API `/backtest/gen_trade_report` 請求伺服器生成並回傳相關圖表所需的資料。

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| 無       | 無   | 函式會自動從內部交易資料取得內容進行圖表產製，無需傳入參數 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                               |
|--------|------|--------------------------------------------------------|
| return | 任意 | 回傳圖表資料或報表物件（依 gen_trade_report 實作決定），可為圖檔路徑、圖表物件、或 HTML 段落等 |

```python
{
    "equity_curve": [...],        # 每筆時間點對應資產淨值
    "trades": [...],              # 每筆交易進出場資料
    "cumulative_profit": [...],   # 累積損益資料
    "drawdowns": [...]            # 回撤分析
}
```

---

### 💡 範例程式碼

```python
chart_data = engine.generate_trade_chart()
if chart_data:
    print("成功產生交易圖表")
    plot_equity_curve(chart_data["equity_curve"])
else:
    print("圖表產生失敗")