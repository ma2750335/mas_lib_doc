---
id: intro
title: Introduction
slug: /
sidebar_position: 1
---

# <img src="/img/mas_logo.png" alt="brain icon" width="48" style={{ verticalAlign: 'middle' }} /> MAS Python SDK Overview

MAS Python SDK is a lightweight Python library designed for algorithmic and quantitative traders.  
It enables automated trading and backtesting of customized Forex strategies—without needing to understand broker APIs or packet structures.

---

## 🚀 What Can You Do with MAS SDK?

- 📥 Receive real-time quotes and historical candlestick data  
- 📈 Automate trading and compare live vs. backtest results  
- 🧠 Execute custom strategies (with support for indicators, stop-loss/take-profit logic)  
- 🔗 Integrate your account and performance reports via the MAS Web Platform  

---

## 📊 Backtesting & Performance Reporting

After each backtest or live execution, MAS SDK automatically generates a full performance report, helping you evaluate strategy returns, risk metrics, and key entry/exit signals:

| Report Type | Description | Output Format |
|-------------|-------------|----------------|
| 📘 Raw Trade Records | Time, direction, price, position, order type, etc. | JSON |
| 📈 Static KPI Report | Net profit, win rate, max drawdown, trade count, avg. holding time | HTML |
| 💹 Strategy Metrics (Silver and above) | Equity curve, cumulative return, max risk exposure | JSON |
| 🔎 Advanced Risk Metrics (Silver and above) | Sharpe Ratio, Sortino Ratio, win/loss ratio | HTML |
| 🧮 Dynamic Trade Analysis (Gold and above) | Entry/exit time, price, PnL, strategy rationale | HTML |

☑️ All reports can be viewed/exported via MAS SDK (availability depends on subscription plan)

---

## 🧩 Before You Start

1. Sign up for a MAS platform account  
2. Download the MAS desktop app [Click here to download](https://mindaismart.com/) and log in to view your plan level   
3. Install MAS SDK and begin developing your strategy  

---

## ⚙️ Quick Start

Install MAS SDK:

```bash
pip install mas
```

Minimal example:

```python
from mas.mas import MAS

def main():
    # Test login credentials
    params = {
        "account": "YOUR_ACCOUNT",
        "password": "YOUR_PASSWORD",
        "server": "YOUR_BROKER_SERVER",
    }

    # Create MAS instance
    mas = MAS()

    # Attempt login
    success = mas.login(params)

    # Check result
    if success:
        print("[Test] ✅ Successfully logged in to MAS and MT5 platform!")
    else:
        print("[Test] ❌ Login failed. Please check your account or token.")

if __name__ == "__main__":
    main()
```

---

## 📚 Documentation Sections

| Section              | Description                                 |
| -------------------- | ------------------------------------------- |
| Installation & Setup | How to install and run your first strategy  |
| API Reference        | Full method and parameter explanations      |
| Strategy Examples    | Various strategy use cases and walkthroughs |
| MAS Web Integration  | How to link to web platform and deploy .exe |

---

## 🖥️ System Requirements

- Python 3.8+
- Supported OS: Windows / macOS
- Dependencies: requests, pandas, matplotlib (installed automatically)

---

## 🤖 Don’t know Python? MAS AI Assistant does it for you!

<iframe width="560" height="315" src="https://www.youtube.com/embed/WZJoxikns4Q?si=WUG36ZHWNOzRble4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<br /><br />

Just describe your logic, MAS AI Assistant will:

✅ Auto-generate trading strategy code  
✅ Backtest it and provide detailed reports  
✅ Export as .exe (no Python required)
✅ Deploy directly to MT5 with your broker credentials

---

## 🛠️ Feature Highlights

| Feature                   | Description                                     |
| ------------------------- | ----------------------------------------------- |
| 🧠 Natural Language Input | e.g. "Buy when RSI < 30 and MACD golden cross"  |
| 🔧 One-Click Generation   | Auto creates logic and runs backtest            |
| 📊 Auto-Generated Reports | Metrics like total return, win rate, risk ratio |
| 💻 Executable Download    | Get `.exe` file – no Python setup needed        |
| 🔐 MT5 Deployment         | Deploy to live account via MAS platform         |

---

## 📥 Sample Usage Flow

```diff
🖋 Step 1: Describe your strategy in MAS AI Assistant
Buy Logic: "Buy when RSI < 30 and volume > 5-day average"
Sell Logic: "Sell when RSI > 70"

📊 Step 2: View backtest results
- Net Profit: +8.6%
- Win Rate: 61%
- Max Drawdown: -2.1%

💾 Step 3: Download `.exe`
Filename: rsi_vol_strategy_2025Q2.exe

🔐 Step 4: Run exe, enter broker info, start trading
👉 Try MAS AI Strategy Assistant now!
```

---

<!-- ## 🎥 Recommended Videos

| User Type         | Video Title                                            | Link         |
| ----------------- | ------------------------------------------------------ | ------------ |
| Beginner Traders  | $No-Code Tutorial$ How to Auto-Build Strategy with MAS | 📺 Watch Now |
| Python Developers | $MAS SDK Intro$ Write your First Auto-Trading Strategy | 📺 Watch Now |
| Advanced Users    | $MT5 Live Deployment$ Connect MAS to Your Real Account | 📺 Watch Now | -->

