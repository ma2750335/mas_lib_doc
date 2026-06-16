---
id: intro
title: Introduction
slug: /
sidebar_position: 1
description: MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.
---

# <img src="/img/mas_logo.png" alt="brain icon" width="48" style={{ verticalAlign: 'middle' }} /> MasQuant Python SDK 简介

MasQuant Python SDK 是一套专为外汇与多资产策略交易者设计的轻量级开源函数库。  
它支持**自动化交易、量化策略回测**与**MT5 部署集成**，让你**无需深入理解经纪商 API 或通信协议**，即可快速开发与执行交易策略。

---

## 🚀 MasQuant SDK 能帮你完成哪些任务？

- 📥 获取实时行情与历史 K 线数据（含外汇、指数等）  
- 📈 执行策略自动下单、模拟交易与真实交易绩效对比  
- 🧠 自定义交易逻辑（支持止盈/止损、技术指标如 RSI、MACD 等）  
- 🔗 集成 MasQuant Web 平台：账户信息、绩效报表一站式展示  

---

## 📊 策略回测与绩效报表功能

MasQuant SDK 可在回测与实盘交易后，自动生成多种专业级报表，帮助你评估策略质量与风险控制指标：

| 报表类型 | 说明 | 输出格式 |
|-----------|------|------------|
| 📘 原始交易记录明细 | 每笔交易的时间、方向、价格、仓位、类型等字段 | JSON |
| 📈 静态 KPI 报表 | 净利、胜率、最大回撤、交易次数、平均持仓时间等 | HTML |
| 💹 策略绩效数据（Silver 等级以上） | 资金曲线、累计收益与最大风险敞口变化 | JSON |
| 🔎 高级风控指标（Silver 等级以上） | Sharpe Ratio、Sortino Ratio、盈亏比等 | HTML |
| 🧮 动态交易点分析（Gold 等级以上） | 显示每笔进出场时间、价格、盈亏点、交易理由 | HTML |

☑️ 所有报表均可在 MasQuant SDK 查看与下载，或通过 SDK 导出（视方案等级而定）

---

## 🧩 使用 MasQuant SDK 前的准备事项

1. 注册 MasQuant 平台账号 [【立即注册↗】](https://trade.masquant.com/authentication/sign-up)（免费）  
2. 下载 MasQuant 软件 [【点我进行下载↗】](https://masquant.com/product_lib)，登录后可查看当前方案等级  
3. 安装 MasQuant SDK 并启动第一个策略项目 

---

## ⚙️ 安装 MasQuant SDK 并快速开始

安裝 MasQuant SDK：

```bash
pip install mas
```

最小运行示例：

```python
import mas

def main():
    # 测试用登录数据
    login_params = {
        "account": "YOUR_ACCOUNT",
        "password": "YOUR_PASSWORD",
        "server": "YOUR_BROKER_SERVER",
    }

    # 创建 MAS 实例
    mas = MAS()

    # 尝试登录
    success = mas.login(params)

    # 判断结果
    if success:
        print("[Test] ✅ 成功登录 MAS 系统与 MT5 平台！")
    else:
        print("[Test] ❌ 登录失败，请检查账号密码或 Token。")

if __name__ == "__main__":
    main()
```

---

## 📚 文档导航

| 区块         | 说明                  |
| ---------- | ------------------- |
| 安装与环境配置    | 完整说明安装流程与构建交易策略     |
| API 使用手册   | 所有 MasQuant 函数、参数与返回结果一览 |
| 策略开发实例     | RSI、MACD 等策略案例与代码解说 |
| MasQuant 平台集成流程 | 部署至 MT5 并执行交易策略     |

---

## 🖥️ 系统与环境需求

- Python 3.8 或以上
- 支持操作系统：Windows、macOS
- 依赖库：requests, pandas, matplotlib

---

## 🤖 不会写程序也能用？MasQuant AI 策略助理来帮你！

<iframe width="560" height="315" src="https://www.youtube.com/embed/fE8EPfdRPOk?si=WlRZvAjQi30UsDEj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<br /><br />


只需输入你的交易逻辑描述，MasQuant AI 策略助理即可帮助你：[【了解更多 ↗】](https://masquant.com/product_ai)

✅ 自动生成专属量化策略（基于 RSI、MACD 等指标）
✅ 回测并生成 HTML 报表与盈亏指标
✅ 导出可执行文件（.exe），可直接部署到 MT5
✅ 仅需输入经纪商账号，即可启动自动化交易流程

---

## 🛠️ MasQuant AI 策略助理特色一览

| 功能            | 说明                           |
| ------------- | ---------------------------- |
| 🧠 输入策略生成     | 例如：「当 RSI < 30 且 MACD 金叉时买入」 |
| 🔧 一键生成 + 回测  | 系统自动化生成完整策略与历史绩效             |
| 📊 报表自动生成     | 含收益率、胜率、风险收益比等 KPI           |
| 💻 可执行文件下载    | 生成 .exe 文件，无需安装 Python 环境    |
| 🔐 MT5 API 集成 | 输入账号密码即可完成部署与交易连接            |

---

## 📥 使用 MasQuant AI 策略助理的完整流程

```diff
🖋 步骤 1：在 MasQuant AI 策略助理界面输入策略逻辑
买入逻辑:「当 RSI < 30 且成交量突破 5 日均量时买入」
卖出逻辑:「RSI > 70 时卖出」

📊 步骤 2：系统执行回测并生成绩效报表 
- 净利：+8.6%
- 胜率：61%
- 回撤：-2.1%

💾 步骤 3：前往策略管理页面，选择并下载执行文件（.exe）  
文件名：rsi_vol_strategy_2025Q2.exe

🔐 步骤 4：运行下载的 .exe 文件，输入 MT5 经纪商账号与服务器信息，即可完成部署，开始自动化实盘交易。  
👉 立即体验 MasQuant AI 策略助理，让量化交易更轻松、更高效！
```

---

<!-- ## 🎥 教學影片資源

| 角色 | 推薦影片 | 連結 |
|------|----------|------|
| 新手交易者 | 【零程式碼教學】如何用 MasQuant 平台自動生成策略？ | 📺 前往觀看 |
| 程式開發者 | 【MasQuant SDK 入門】Python 寫一個自動交易策略 | 📺 前往觀看 |
| 進階用戶 | 【MT5 實單部署】如何串接 MasQuant 與你的帳戶？ | 📺 前往觀看 | -->
