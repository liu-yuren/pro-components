# StepsForm - 分步表单

StepsForm 是一个分步骤的表单组件，适用于复杂的多步骤数据录入场景。

## 基础用法

```vue
<template>
  <StepsForm
    :steps="steps"
    :current="currentStep"
    @next="handleNext"
    @prev="handlePrev"
    @finish="handleFinish"
  />
</template>

<script setup>
import { ref } from 'vue'
import { StepsForm } from '@pro-components/components'

const currentStep = ref(0)

const steps = [
  {
    title: '基本信息',
    schema: {
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
  },
  {
    title: '详细信息',
    schema: {
      type: 'object',
      properties: {
        age: {
          type: 'number',
          title: '年龄',
          minimum: 0
        },
        address: {
          type: 'string',
          title: '地址'
        }
      }
    }
  }
]

const handleNext = (values, stepIndex) => {
  console.log(`第${stepIndex + 1}步数据:`, values)
  currentStep.value = stepIndex + 1
}

const handlePrev = (stepIndex) => {
  currentStep.value = stepIndex - 1
}

const handleFinish = (allValues) => {
  console.log('所有步骤数据:', allValues)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| steps | 步骤配置数组 | array | [] |
| current | 当前步骤索引 | number | 0 |
| direction | 步骤条方向 | 'horizontal' \| 'vertical' | 'horizontal' |
| size | 步骤条大小 | 'default' \| 'small' | 'default' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| next | 下一步时触发 | (values: object, stepIndex: number) |
| prev | 上一步时触发 | (stepIndex: number) |
| finish | 完成时触发 | (allValues: object) |
| change | 步骤变化时触发 | (current: number) |
