---
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

### 🧩 函式名稱

`get_account_info`

---

### 🎯 函式用途

查詢目前登入的 MetaTrader 5（MT5）交易帳號之完整帳戶資訊，包含餘額、淨值、槓桿、保證金狀態等關鍵數據。

---

### 🔧 函式參數

| 參數名稱 | 資料型別 | 備註說明                          |
|---------|----------|----------------------------------|
| 無       | 無      | 此函式不需要帶入任何參數即可執行。  |

---

### 📤 回傳內容

| 名稱   | 型別 | 備註說明                                                                                 |
|--------|------|-----------------------------------------------------------------------------------------|
| return | dict | 若查詢成功，回傳包含帳戶資訊的 dict；失敗則為 `{"error": "查詢帳戶資訊失敗"}`。詳細欄位如下： |

| 欄位名稱               | 類型  | 說明                                                    |
|-----------------------|-------|---------------------------------------------------------|
| `login`               | int   | MT5 登入帳號 ID。                                        |
| `trade_mode`          | int   | 交易模式（0=實盤, 1=模擬, 2=競賽）。                       |
| `leverage`            | int   | 槓桿倍數。                                               |
| `limit_orders`        | int   | 最大掛單數量。                                           |
| `margin_so_mode`      | int   | 強制平倉（Stop-out）計算模式（0=百分比, 1=固定金額）。      |
| `trade_allowed`       | int   | 是否允許手動交易（0=否，1=是）。                           |
| `trade_expert`        | int   | 是否允許 EA（自動程式）交易（0=否，1=是）。                 |
| `margin_mode`         | int   | 保證金計算模式（0=Netting, 1=Exchange, 2=Hedging）。      |
| `currency_digits`     | int   | 帳戶幣別顯示的小數位數（影響結果顯示精度）。                |
| `fifo_close`          | int   | 是否啟用 FIFO 平倉機制（0=否，1=是）。僅 Hedging 模式有效。 |
| `balance`             | float | 帳戶總餘額（Balance）。                                   |
| `credit`              | float | 信用額度。                                               |
| `profit`              | float | 未實現損益（Floating P/L）。                              |
| `equity`              | float | 帳戶淨值（Balance + Floating P/L）。                      |
| `margin`              | float | 已使用保證金（占用中保證金）。                             |
| `margin_free`         | float | 剩餘可用保證金（Free Margin）。                           |
| `margin_level`        | float | 保證金比率百分比（Margin Level %）。                       |
| `margin_so_call`      | float | Margin Call 水位（根據 mode 百分比或金額）。               |
| `margin_so_so`        | float | 強制平倉（Stop-out）水位（根據 mode 百分比或金額）。        |
| `margin_initial`      | float | 初始開倉所需保證金。                                      |
| `margin_maintenance`  | float | 維持部位所需最低保證金。                                  |
| `assets`              | float | 帳戶資產總值。                                           |
| `liabilities`         | float | 帳戶負債總額。                                           |
| `commission_blocked`  | float | 凍結中之交易手續費。                                      |
| `name`                | str   | MT5 交易使用者名稱。                                      |
| `server`              | str   | MT5 交易伺服器名稱。                                      |
| `currency`            | str   | 帳戶基準幣別（如 USD、EUR）。                              |
| `company`             | str   | 經紀商／券商公司名稱。                                    |

#### 回傳格式

```python
{
    "login": 25115284,
    "trade_mode": 0,
    "balance": 99588.3,
    "equity": 99543.2,
    "margin": 54.37,
    "free_margin": 99488.8,
    "leverage": 100,
    "margin_level": 183085,
    "currency": "USD",
    "limit_orders": 200,
    "margin_so_mode": 0,
    "trade_allowed": true,
    "trade_expert": true,
    "margin_mode": 2,
    "currency_digits": 2,
    "fifo_close": false,
    "credit": 0,
    "profit": -45.13,
    "margin_so_call": 50,
    "margin_so_so": 30,
    "margin_initial": 0,
    "margin_maintenance": 0,
    "assets": 0,
    "liabilities": 0,
    "commission_blocked": 0,
    "name": "James Smith",
    "server": "MetaQuotes-Demo",
    "company": "MetaQuotes Software Corp."
}
```

---

### 💡 範例程式碼

```python
import mas

class MAS_Client(mas):
    def __init__(self):
        super().__init__()

def main():
    try:
        mas_client = MAS_Client()
        login_params = {
            "account": "YOUR_ACCOUNT",
            "password": "YOUR_PASSWORD",
            "server": "YOUR_SERVER"
        }
        if mas_client.login(login_params):
            print("登入成功！")
        print(mas_client.get_account_info())
    except Exception as e:
        print(f"登入失敗:{str(e)}")
```
---
