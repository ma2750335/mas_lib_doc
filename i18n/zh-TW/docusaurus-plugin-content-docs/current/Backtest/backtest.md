---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📘 Backtest 是什麼？

在進行任何自動化交易前，**策略回測（Backtest）** 是必不可少的步驟。透過歷史數據模擬交易策略，可以有效：

- 驗證策略是否具備穩定獲利能力  
- 測試策略在不同市況下的適應性與表現  
- 計算關鍵風險指標（如最大回檔、勝率、夏普值）  
- 降低實盤測試的時間成本與資金風險  

---

## 🔧 MasQuant SDK 如何進行策略回測？

MasQuant SDK 提供簡潔易用的回測功能，使用者只需繼承 `MAS` 類別並覆寫 `receive_bars` 方法，即可快速將策略邏輯應用於歷史數據測試，無需額外整合複雜框架。

下面是一段簡單的均線策略回測範例：

```python
import mas

class MAS_Client(mas):
    def __init__(self, toggle):
        super().__init__()
        self.index = 0
        self.hold = False
        self.ma = 0
        self.toggle = toggle
        self.order_id = None

    def receive_bars(self, symbol, data, is_end):
        single = self.index % self.ma

        if single == 0:
            if not self.hold:
                self.order_id = self.send_order({
                    "symbol": "EURUSD",
                    "order_type": "buy",
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = True
            else:
                self.send_order({
                    "symbol": "EURUSD",
                    "order_type": "sell",
                    "order_id": self.order_id,
                    "volume": 0.1,
                    "backtest_toggle": self.toggle
                })
                self.hold = False

        self.index = self.index+1
        if is_end:
            data = self.generate_data_report()
            data_source = data.get("data")
            print(data_source)
            self.generate_kpi_report()
            self.generate_trade_chart()

def main():
    try:
        toggle = True
        mas_c = MAS_Client(toggle)
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }

        mas_c.login(login_params)
        params = {
            "symbol": "EURUSD",
            "from": '2020-01-01',
            "to": '2024-12-31',
            "timeframe": "D1",
            "captital": 1000,
            "backtest_toggle": mas_c.toggle
        }
        mas_c.ma = 50
        df = mas_c.subscribe_bars(params)
    except Exception as e:
        return {
            'status': False,
            'error': str(e)
        }


if __name__ == "__main__":
    main()
```

---

## 📈 回測報表與 KPI 輸出

MasQuant SDK 在回測結束後會自動生成多維度報表，幫助交易者全面評估策略績效：

- **資料報表**：記錄每筆交易的下單時間、方向、盈虧情況（`generate_data_report()`）
- **KPI 報表**：提供夏普值、勝率、淨利、最大回檔等核心績效指標（`generate_kpi_report()`）  
- **買賣點圖表**：以可視化方式呈現每次交易的進出場點位（`generate_trade_chart()`） 

透過這些報表，你能快速判斷策略的可行性，並進一步優化參數設定。

---

## 🔄 回測的應用場景

- **策略研發初期**：驗證策略邏輯是否正確  
- **參數優化階段**：搭配網格搜尋（Grid Search）批量測試不同參數組合  
- **模擬真實環境**：可自訂手續費、滑價、延遲等條件，貼近實盤狀況  

---

## ⚙️ 切換至真實交易模式

MasQuant SDK 採用「單一程式碼架構 × 雙模式運行」設計，使用者僅需切換 `toggle` 參數，即可在「策略回測」與「真實交易」之間無縫切換，避免重複撰寫程式碼。

---

## ✅ 切換方式

可透過`toggle`參數快速切換模式：

- `True` → 回測模式

- `False` → 實盤模式

```python
try:
    # toggle = True 表示進行回測
    toggle = False  # 切換為真實交易

    mas_c = MAS_Client(toggle)
    params = {
        "account": "YOUR_ACCOUNT",
        "password": "YOUR_PASSWORD",
        "server": "YOUR_SERVER"
    }

    mas_c.login(params)
    params = {
        "symbol": "EURUSD",
        "from": '2020-01-01',
        "to": '2024-12-31',
        "timeframe": "D1",
        "backtest_toggle": mas_c.toggle
    }
    mas_c.ma = 50
    df = mas_c.subscribe_bars(params)

except Exception as e:
    return {
        'status': False,
        'error': str(e)
    }
```

---

## 🧩 切換原理

- **回測模式**（`toggle=True`）：所有下單指令由模擬引擎執行，不觸發真實交易  
- **實盤模式**（`toggle=False`）：下單指令直接送至券商 API 執行，進行真實交易  

此設計讓你能先在安全環境中驗證策略，再安心切換到實盤部署。

---

## 🛡️ 實盤前檢查清單

在切換至真實交易前，建議檢查以下項目以降低風險：

| 項目          | 建議                     | 說明                                 |
| ------------- | ----------------------- | ------------------------------------ |
| 策略績效報表   | ✅ 通過回測績效標準      | 建議具備正向淨利與穩定勝率           |
| 帳號登入測試   | ✅ `login()` 驗證成功    | 確認帳號資訊正確無誤                 |
| 下單 API      | ✅ 測試單成功送出        | 可先用小資金或模擬帳戶測試           |
| 止損與風控機制 | ✅ 已設計完善            | 避免實盤中發生無防護的裸單風險       |

---

## 🧩 切換後的開發流程

```text

[策略設計] → [歷史回測] → [回測報表分析] → ✅ [一鍵切換] → [實盤交易]

```

只需維護一份策略程式碼，即可兼顧回測與實盤交易的需求，降低開發與維護成本。

---