// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MAS Docs',
  tagline: 'MAS are cool',
  favicon: 'img/mas_logo.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ma2750335', // Usually your GitHub org/user name.
  projectName: 'mas_lib_doc', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['zh-tw', 'en'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      'zh-tw': {
        label: '繁體中文',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-SN1Q8NDH0J',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/mas_logo.jpg',
      metadata: [
        {
          name: 'keywords',
          content:
            'AI Forex Margin Trading,AI Automated Trading Platform,No-Code Trading,Automated Strategy Generation,Forex Backtesting Tools,Investment Strategy Optimization,Multi-Broker Automated Trading,Quantitative Trading for Beginners,AI Trading Assistant,Low-Risk Automated Trading,Beginner Automated Investing,Forex Auto Execution,AI Quantitative Trading Platform,One-Click Backtesting,Algorithmic Trading Learning,Stable Passive Income,Emotional Trading Solutions,No-Coding Investment Strategies,AI Strategy Generator,Automated Risk Management,MetaTrader Integration,MT5 Trading API,MT5 Automated Backtesting,MT5 Multi-Broker Support,AI MT5 Trading Bot,Automated MetaTrader 5 Strategy',
        },
      ],
      navbar: {
        title: 'MAS Docs',
        logo: {
          alt: 'Logo',
          src: 'img/mas_logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Guide',

          },
          {
            href: 'https://mindaismart.com/',
            label: 'Official Website',
            position: 'left',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/ma2750335/mas_lib_doc',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Guide',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Official Website',
                href: 'https://mindaismart.com/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ma2750335/mas_lib_doc',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} MindAiSmart Technology, Inc.`,
      },
      algolia: {
        appId: '6I172HX8MH',
        apiKey: '85a4cc95b0ecc5dbabec583130685ae0',
        indexName: 'mindaismart',
        contextualSearch: true,
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
