# DialogForm - 弹窗表单

DialogForm 是一个弹窗形式的表单组件，适用于需要弹窗编辑的场景。

## 基础用法

```vue
<script setup>
import { DialogForm } from '@pro-components/components'
import { ref } from 'vue'

const showDialog = ref(false)

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: '姓名',
      required: true
    },
    age: {
      type: 'number',
      title: '年龄',
      minimum: 0
    }
  }
}

function handleSubmit(values) {
  console.log('提交数据:', values)
  showDialog.value = false
}
</script>

<template>
  <div>
    <el-button @click="showDialog = true">
      打开弹窗表单
    </el-button>

    <DialogForm
      v-model:visible="showDialog"
      :schema="schema"
      title="编辑用户"
      @submit="handleSubmit"
    />
  </div>
</template>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| visible | 是否显示弹窗 | boolean | false |
| title | 弹窗标题 | string | '表单' |
| schema | JSON Schema 配置 | object | - |
| width | 弹窗宽度 | string | '600px' |
| confirmText | 确认按钮文本 | string | '确定' |
| cancelText | 取消按钮文本 | string | '取消' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| submit | 提交表单时触发 | (values: object) |
| cancel | 取消时触发 | - |
| update:visible | 弹窗显示状态变化时触发 | (visible: boolean) |
```
