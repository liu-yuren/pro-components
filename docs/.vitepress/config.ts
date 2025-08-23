import {
  componentPreview,
  containerPreview,
} from '@vitepress-demo-preview/plugin'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Element Plus Pro Components',
  description: 'Professional UI components for Element Plus',
  base: '/pro-components/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/guide/quickstart' },
      { text: '组件', link: '/components/form' },
      { text: 'Changelog', link: '/changelog' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '文档',
          items: [
            { text: '简介', link: '/guide/intro' },
            { text: '快速开始', link: '/guide/quickstart' },
          ],
        },
      ],
      '/components/': [
        {
          text: '数据录入',
          items: [
            { text: 'Schema Form - JSON 表单', link: '/components/form' },
          ],
        },
      ],
      '/changelog': [
        {
          items: [
            { text: 'changelog', link: '/changelog' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://liu-yuren.github.io/pro-components/' },
    ],

    // footer: {
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2024-present Element Plus Pro Components',
    // },
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
})
