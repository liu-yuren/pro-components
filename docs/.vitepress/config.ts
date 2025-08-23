import {
  componentPreview,
  containerPreview,
} from '@vitepress-demo-preview/plugin'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ProComponents',
  description: 'Professional UI components for Element Plus',
  base: '/pro-components/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/guide/quickstart' },
      { text: '组件', link: '/components/' },
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
          text: '架构设计',
          items: [
            { text: 'Components - 组价设计', link: '/components/' },
            { text: 'Schema - 通用配置', link: '/components/schema' },
          ],
        },
        {
          text: '数据录入',
          items: [
            { text: 'Schema Form - JSON 表单', link: '/components/schema-form' },
            { text: 'DialogForm - 弹窗表单', link: '/components/dialog-form' },
            { text: 'SearchForm - 搜索表单', link: '/components/search-form' },
            { text: 'StepsForm - 分布表单', link: '/components/steps-form' },
          ],
        },
        {
          text: '数据展示',
          items: [
            { text: 'ProTable - 高级表格', link: '/components/table' },
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
