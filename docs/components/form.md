# Form 表单

Form 是一个基础的表单组件，提供了完整的表单功能。

## 基础用法

:::preview

demo-preview=./examples/BasicForm.vue

:::

```vue
<script setup>
import { Form } from '@pro-components/components'

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: '姓名',
      required: true
    },
    email: {
      type: 'string',
      title: '邮箱',
      format: 'email'
    }
  }
}

function handleSubmit(values) {
  console.log('表单数据:', values)
}
</script>

<template>
  <Form :schema="schema" @submit="handleSubmit" />
</template>
```

## API

### Props

| 参数       | 说明             | 类型   | 默认值       |
| ---------- | ---------------- | ------ | ------------ |
| schema     | JSON Schema 配置 | object | -            |
| modelValue | 表单数据         | object | {}           |
| layout     | 表单布局         | string | 'horizontal' |

### Events

| 事件名 | 说明             | 回调参数         |
| ------ | ---------------- | ---------------- |
| submit | 提交表单时触发   | (values: object) |
| change | 表单值变化时触发 | (values: object) |
