---
id: intro
title: Introduction
slug: /
sidebar_position: 1
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

# <img src="/img/mas_logo.png" alt="brain icon" width="48" style={{ verticalAlign: 'middle' }} /> MasQuant Python SDK Overview

MasQuant Python SDK is a lightweight and modular Python toolkit built for quantitative and algorithmic trading.  
It allows you to create, backtest, and deploy automated Forex strategies—without needing to master broker APIs or low-level data structures.

---

## 🚀 What Can You Do with MasQuant SDK?

- 📥 Access real-time market quotes and historical candlestick data (Forex, indices, and more)  
- 📈 Automate your trading strategies and compare live trades against backtest performance  
- 🧠 Implement custom logic with support for indicators, stop-loss/take-profit conditions  
- 🔗 Seamlessly integrate with the MasQuant Web Platform to manage accounts and view performance reports

---

## 📊 Strategy Backtesting & Performance Reporting

MasQuant SDK automatically generates comprehensive performance reports after each backtest or live trade execution.  
These reports help you evaluate strategy profitability, risk exposure, and trade-level insights:

| Report Type                  | Description                                                         | Format |
|-----------------------------|---------------------------------------------------------------------|--------|
| 📘 Raw Trade Log             | Includes time, direction, price, order type, and position details   | JSON   |
| 📈 Static KPI Report         | Net profit, win rate, drawdown, trade count, average holding time   | HTML   |
| 💹 Equity Curve (Silver+)    | Visualizes capital growth, cumulative returns, and risk exposure    | JSON   |
| 🔎 Advanced Risk Metrics     | Sharpe Ratio, Sortino Ratio, win/loss ratio (Silver plan or above)  | HTML   |
| 🧮 Dynamic Trade Breakdown   | Entry/exit timing, PnL analysis, and rationale (Gold plan only)     | HTML   |

☑️ Reports can be viewed and exported directly within MasQuant SDK, depending on your plan tier.

---

## 🧩 Before You Begin

1. Register a MasQuant account on the official platform[【Sign Up ↗】](https://mas.mindaismart.com/authentication/sign-up) (FREE)  
2. Download the MasQuant desktop app [【Click here to download ↗】](https://mindaismart.com/product_lib), then log in to check your current plan  
3. Install MasQuant SDK and start building your trading strategy

---

## ⚙️ Quick Start Guide

Install MasQuant SDK:

```bash
pip install mas
```

Minimal example:

```python
import mas

def main():
    # Test login credentials
    login_params = {
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

| Section              | Description                                                |
|----------------------|------------------------------------------------------------|
| Installation & Setup | Step-by-step guide to install and launch your first strategy |
| API Reference        | Full SDK function list and parameter documentation         |
| Strategy Examples    | Pre-built strategies using indicators like RSI, MACD, etc. |
| Web Integration      | How to upload strategies and deploy them to MT5 via Web    |

---

## 🖥️ System Requirements

- Python 3.8 or above  
- Operating Systems: Windows, macOS  
- Dependencies: requests, pandas, matplotlib (auto-installed)

---

## 🤖 No Coding? MasQuant AI Strategy Assistant Has You Covered


<iframe width="560" height="315" src="https://www.youtube.com/embed/eTDXYtKvPVA?si=2oKLbL7Ig8QDJc-j" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<br /><br />


Just describe your trading logic in natural language—MasQuant AI Strategy Assistant will：[【Learn More ↗】](https://mindaismart.com/product_ai)

✅ Automatically generate a complete trading strategy  
✅ Run historical backtests and visualize performance  
✅ Export your strategy as a ready-to-run `.exe` file (no Python required)  
✅ Deploy directly to your MT5 broker account with login credentials

---

## 🛠️ AI Assistant Features at a Glance

| Feature                   | Description                                                        |
|---------------------------|--------------------------------------------------------------------|
| 🧠 Natural Language Input | e.g., “Buy when RSI < 30 and MACD shows a bullish crossover”       |
| 🔧 One-Click Strategy Gen | Instantly creates, backtests, and packages your trading logic      |
| 📊 Auto Performance Report| Shows ROI, win rate, and risk/reward ratio                         |
| 💻 Downloadable Executable| Exports a standalone `.exe`—no setup required                     |
| 🔐 MT5 Integration         | Easily connect and deploy to live MT5 trading accounts             |

---

## 📥 End-to-End Usage Flow

```diff
🖋 Step 1: Input your strategy using natural language in the MasQuant AI Strategy Assistant  
Buy Logic: “Buy when RSI < 30 and volume exceeds 5-day average”  
Sell Logic: “Sell when RSI > 70”

📊 Step 2: Review the automatically generated backtest results  
- Net Profit: +8.6%
- Win Rate: 61%
- Max Drawdown: -2.1%

💾 Step 3: Go to strategy manager and download your executable file  
Filename: rsi_vol_strategy_2025Q2.exe

🔐 Step 4: Run the `.exe`, enter your broker credentials, and deploy your strategy live to MT5
👉 Try MasQuant AI Strategy Assistant today and start automating your trades with ease!
```

---

<!-- ## 🎥 Recommended Videos

| User Type         | Video Title                                            | Link         |
| ----------------- | ------------------------------------------------------ | ------------ |
| Beginner Traders  | $No-Code Tutorial$ How to Auto-Build Strategy with MasQuant | 📺 Watch Now |
| Python Developers | $MasQuant SDK Intro$ Write your First Auto-Trading Strategy | 📺 Watch Now |
| Advanced Users    | $MT5 Live Deployment$ Connect MasQuant to Your Real Account | 📺 Watch Now | -->

