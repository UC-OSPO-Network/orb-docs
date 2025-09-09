import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'UC ORB Showcase Documentation',
  tagline:
    'Comprehensive documentation for the UC Open Repository Browser - Architecture, APIs, Components, and Development Guide',
  favicon: 'img/favicon.ico',
  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  url: 'https://uc-ospo-network.github.io',
  baseUrl: '/orb-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // GitHub repo info
  organizationName: 'UC-OSPO-Network', // GitHub org
  projectName: 'orb-docs', // Repo name
  deploymentBranch: 'gh-pages', // Default branch for GitHub Pages
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/UC-OSPO-Network/orb-showcase/tree/main/doc/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    mermaid: {
      theme: { light: 'neutral', dark: 'forest' },
      options: {
        // put mermaid initialization options here
      },
    },
    navbar: {
      title: 'UC ORB Showcase',
      logo: {
        alt: 'UC ORB Showcase Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/UC-OSPO-Network/orb-showcase',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Architecture',
              to: '/docs/architecture',
            },
            {
              label: 'API Reference',
              to: '/docs/api',
            },
            {
              label: 'Components',
              to: '/docs/frontend-components',
            },
          ],
        },
        {
          title: 'UC OSPO Network',
          items: [
            {
              label: 'UC OSPO Website',
              href: 'https://ucospo.org',
            },
            {
              label: 'UC Berkeley OSPO',
              href: 'https://ospo.berkeley.edu',
            },
            {
              label: 'GitHub Organization',
              href: 'https://github.com/UC-OSPO-Network',
            },
          ],
        },
        {
          title: 'Development',
          items: [
            {
              label: 'Contributing Guide',
              to: '/docs/contributing',
            },
            {
              label: 'GitHub Repository',
              href: 'https://github.com/UC-OSPO-Network/orb-showcase',
            },
            {
              label: 'Issues & Bugs',
              href: 'https://github.com/UC-OSPO-Network/orb-showcase/issues',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} University of California Open Source Program Office Network. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
