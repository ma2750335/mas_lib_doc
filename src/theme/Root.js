// src/theme/Root.js
import React from 'react';
import Head from '@docusaurus/Head';

export default function Root({ children }) {
  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "順星智能科技有限公司|MAS Intelligent Technology Ltd.",
            "url": "https://mindaismart.com/",
            "logo": "https://mindaismart.com/img/logo.png",
            "description":
              "MAS Intelligent Technology's AI-powered Forex Margin Trading Platform with full MetaTrader MT5 broker integration allows investors to generate automated trading strategies simply by entering text. Supports instant backtesting,real-time data synchronization,and seamless multi-broker switching. No coding experience required to easily launch AI automated trading,optimize strategies,and reduce market risk. Designed for both individual traders and financial institutions with standardized MetaTrader MT5-compatible APIs,automated backtesting,and quantitative strategy optimization to help enterprises deploy stable and efficient trading solutions quickly.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "高雄市前鎮區成功二路25號8樓",
              "addressLocality": "高雄市",
              "addressRegion": "台灣",
              "postalCode": "80661",
              "addressCountry": "TW",
            },
            "knowsAbout": [
              "AI Forex Margin Trading",
              "AI Automated Trading Platform",
              "No-Code Trading",
              "Automated Strategy Generation",
              "Forex Backtesting Tools",
              "Investment Strategy Optimization",
              "Multi-Broker Automated Trading",
              "Quantitative Trading for Beginners",
              "AI Trading Assistant",
              "Low-Risk Automated Trading",
              "Beginner Automated Investing",
              "Forex Auto Execution",
              "AI Quantitative Trading Platform",
              "One-Click Backtesting",
              "Algorithmic Trading Learning",
              "Stable Passive Income",
              "Emotional Trading Solutions",
              "No-Coding Investment Strategies",
              "AI Strategy Generator",
              "Automated Risk Management",
              "MetaTrader Integration",
              "MT5 Trading API",
              "MT5 Automated Backtesting",
              "MT5 Multi-Broker Support",
              "AI MT5 Trading Bot",
              "Automated MetaTrader 5 Strategy",
            ],
          })}
        </script>
      </Head>
      {children}
    </>
  );
}
