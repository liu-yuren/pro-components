# SearchForm - 搜索表单

SearchForm 是一个专门用于搜索场景的表单组件，支持折叠展开和重置功能。

## 基础用法

```vue
<script setup>
import { SearchForm } from '@pro-components/components'

const schema = {
  type: 'object',
  properties: {
    keyword: {
      type: 'string',
      title: '关键词',
      placeholder: '请输入搜索关键词'
    },
    status: {
      type: 'string',
      title: '状态',
      enum: ['全部', '启用', '禁用'],
      default: '全部'
    },
    dateRange: {
      type: 'array',
      title: '日期范围',
      items: {
        type: 'string',
        format: 'date'
      }
    }
  }
}

const defaultValues = {
  status: '全部'
}

function handleSearch(values) {
  console.log('搜索条件:', values)
}

function handleReset() {
  console.log('重置搜索')
}
</script>

<template>
  <SearchForm
    :schema="schema"
    :default-values="defaultValues"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>
```

## API

### Props

| 参数          | 说明             | 类型    | 默认值 |
| ------------- | ---------------- | ------- | ------ |
| schema        | JSON Schema 配置 | object  | -      |
| defaultValues | 默认值           | object  | {}     |
| collapsed     | 是否折叠         | boolean | false  |
| collapsedRows | 折叠时显示的行数 | number  | 1      |
| searchText    | 搜索按钮文本     | string  | '搜索' |
| resetText     | 重置按钮文本     | string  | '重置' |

### Events

| 事件名 | 说明             | 回调参数         |
| ------ | ---------------- | ---------------- |
| search | 搜索时触发       | (values: object) |
| reset  | 重置时触发       | -                |
| change | 表单值变化时触发 | (values: object) |
