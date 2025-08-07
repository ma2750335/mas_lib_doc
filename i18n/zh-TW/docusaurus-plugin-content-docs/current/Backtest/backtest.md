---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

## 📘 Backtest 是什麼？

在進行任何自動化交易前，**策略回測（Backtest）** 是一項必要的步驟。透過歷史資料模擬交易策略，我們可以：

- 驗證策略是否具備獲利能力  
- 測試策略在不同市況下的表現  
- 計算風險指標（如最大回檔、勝率、夏普值）  
- 節省實盤測試成本與風險  

---

## 🔧 MAS SDK 如何進行策略回測？

MAS SDK 提供了簡單的方式進行策略回測。你只需繼承 `MAS` 類別，並覆寫 `receive_bars` 方法來寫入你的策略邏輯。

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


if __name__ == "__main__":
    main()
```

---

## 📈 回測報表與 KPI 輸出

MAS SDK 在回測結束後，會自動產出以下報表：

- 資料報表：每筆下單記錄與盈虧結果（`generate_data_report()`）

- KPI 報表：夏普值、勝率、淨利、最大回檔等指標（`generate_kpi_report()`）

- 買賣點圖表：視覺化呈現每次交易的進出場點 (`generate_trade_chart()`)

這些報表將協助你快速評估策略是否可行，並據此優化參數。

---

## 🔄 應用場景

- 開發早期：快速測試策略邏輯是否執行正確

- 參數優化：配合 grid search 對不同參數組合進行大量回測

- 模擬真實情境：可設定手續費、滑價、延遲等真實條件

---

## ⚙️ 切換至真實交易模式

MAS SDK 採用「單一程式碼架構，雙模式運行」設計，使用者只需切換 toggle 參數，即可在「策略回測」與「真實交易」之間無痛切換。

---

## ✅ 切換方式

只需將 `toggle` 參數設為 `False`，其餘程式碼完全相同：

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

- 回測模式：`toggle=True`，所有下單指令由模擬引擎處理，不觸發真實交易

- 實盤模式：`toggle=False`，所有下單指令將送至指定券商 API，執行真實下單

程式架構一致，僅切換一個參數，讓你能放心從模擬環境推進至實盤部署。

---

## 🛡️ 建議部署前檢查項目

在切換至實盤模式前，請確認以下項目：

| 項目          | 建議                    | 說明                             |
| ------------- | ---------------------- | -------------------------------- |
| 策略績效報表   | ✅ 通過回測指標門檻     | 建議至少具備正向淨利與穩定勝率      |
| 帳號登入測試   | ✅ `login()` 驗證成功   | 確保帳號資訊正確無誤              |
| 下單 API      | ✅ 測試下單成功         | 可先用小資金或 demo account 驗證   |
| 止損與風控機制 | ✅ 已設計完畢           | 實盤需避免無風控裸單               |

---

## 🧩 切換後的開發流程

```text

[策略設計] → [歷史回測] → [回測報表分析] → ✅ [一鍵切換] → [實盤交易]

```

你只需管理一份策略程式碼，不需要區分兩份邏輯或程式。

---