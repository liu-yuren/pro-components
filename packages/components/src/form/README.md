# Pro Components Form

基于 Element Plus 的高级表单组件库，提供更强大的表单功能和更好的开发体验。

## 组件列表

### BaseForm

基础表单组件，支持字段配置、验证规则、响应式布局等功能。

### SearchForm

搜索表单组件，支持折叠展开、卡片样式等特性。

### DialogForm

对话框表单组件，在对话框中展示表单内容。

## 安装

```bash
pnpm add @pro-components/components
```

## 使用

### 基础表单

```vue
<template>
  <BaseForm
    v-model:model="formData"
    :fields="formFields"
    :rules="formRules"
    label-width="120px"
    @finish="handleFinish"
  />
</template>

<script setup>
import { reactive } from 'vue'
import { BaseForm } from '@pro-components/components'

const formData = reactive({
  name: '',
  email: '',
  phone: ''
})

const formFields = [
  {
    name: 'name',
    label: '姓名',
    component: 'el-input',
    required: true,
    placeholder: '请输入姓名',
    span: 12
  },
  {
    name: 'email',
    label: '邮箱',
    component: 'el-input',
    required: true,
    placeholder: '请输入邮箱',
    span: 12
  },
  {
    name: 'phone',
    label: '手机号',
    component: 'el-input',
    placeholder: '请输入手机号',
    span: 24
  }
]

const formRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}

const handleFinish = (values) => {
  console.log('表单数据:', values)
}
</script>
```

### 搜索表单

```vue
<template>
  <SearchForm
    v-model:model="searchData"
    :fields="searchFields"
    :collapsed-rows="2"
    @finish="handleSearch"
  />
</template>

<script setup>
import { reactive } from 'vue'
import { SearchForm } from '@pro-components/components'

const searchData = reactive({
  keyword: '',
  status: '',
  dateRange: []
})

const searchFields = [
  {
    name: 'keyword',
    label: '关键词',
    component: 'el-input',
    placeholder: '请输入关键词',
    span: 8
  },
  {
    name: 'status',
    label: '状态',
    component: 'el-select',
    placeholder: '请选择状态',
    span: 8,
    componentProps: {
      options: [
        { label: '全部', value: '' },
        { label: '启用', value: 'enabled' },
        { label: '禁用', value: 'disabled' }
      ]
    }
  },
  {
    name: 'dateRange',
    label: '日期范围',
    component: 'el-date-picker',
    placeholder: '请选择日期范围',
    span: 8,
    componentProps: {
      type: 'daterange'
    }
  }
]

const handleSearch = (values) => {
  console.log('搜索条件:', values)
}
</script>
```

### 对话框表单

```vue
<template>
  <el-button type="primary" @click="showDialog = true">
    打开表单对话框
  </el-button>
  
  <DialogForm
    v-model:visible="showDialog"
    v-model:model="dialogData"
    :fields="dialogFields"
    :rules="dialogRules"
    title="用户信息"
    width="600px"
    @finish="handleDialogFinish"
  />
</template>

<script setup>
import { ref, reactive } from 'vue'
import { DialogForm } from '@pro-components/components'

const showDialog = ref(false)
const dialogData = reactive({
  name: '',
  email: '',
  phone: ''
})

const dialogFields = [
  {
    name: 'name',
    label: '姓名',
    component: 'el-input',
    required: true,
    placeholder: '请输入姓名'
  },
  {
    name: 'email',
    label: '邮箱',
    component: 'el-input',
    required: true,
    placeholder: '请输入邮箱'
  }
]

const dialogRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}

const handleDialogFinish = (values) => {
  console.log('对话框表单数据:', values)
}
</script>
```

## API

### BaseForm Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| model | 表单数据对象 | `Record<string, any>` | `{}` |
| fields | 表单字段配置 | `FormField[]` | `[]` |
| rules | 验证规则 | `FormRules` | `{}` |
| labelWidth | 标签宽度 | `string \| number` | `'auto'` |
| labelPosition | 标签位置 | `'left' \| 'right' \| 'top'` | `'right'` |
| size | 组件尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| layout | 布局方式 | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` |
| colon | 是否显示冒号 | `boolean` | `true` |
| submitText | 提交按钮文本 | `string` | `'提交'` |
| resetText | 重置按钮文本 | `string` | `'重置'` |
| showSubmitButton | 是否显示提交按钮 | `boolean` | `true` |
| showResetButton | 是否显示重置按钮 | `boolean` | `true` |

### FormField

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 字段名称 | `string` | - |
| label | 字段标签 | `string` | - |
| component | 组件类型 | `Component \| string` | `'el-input'` |
| componentProps | 组件属性 | `Record<string, any>` | `{}` |
| rules | 验证规则 | `FormItemRule[]` | `[]` |
| required | 是否必填 | `boolean` | `false` |
| placeholder | 占位符 | `string` | - |
| help | 帮助文本 | `string` | - |
| extra | 额外信息 | `string` | - |
| hidden | 是否隐藏 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| span | 栅格占位 | `number` | `24` |
| offset | 栅格偏移 | `number` | `0` |
| order | 排序 | `number` | `0` |

### SearchForm Props

继承 BaseForm 的所有属性，并添加以下属性：

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| collapsed | 是否折叠 | `boolean` | - |
| defaultCollapsed | 默认折叠状态 | `boolean` | `true` |
| collapsedRows | 折叠时显示的行数 | `number` | `1` |
| ghost | 是否使用幽灵模式 | `boolean` | `false` |
| cardProps | 卡片属性 | `Record<string, any>` | `{}` |

### DialogForm Props

继承 BaseForm 的所有属性，并添加以下属性：

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| visible | 是否显示对话框 | `boolean` | `false` |
| title | 对话框标题 | `string` | `'表单'` |
| width | 对话框宽度 | `string \| number` | `'600px'` |
| fullscreen | 是否全屏 | `boolean` | `false` |
| modal | 是否显示遮罩 | `boolean` | `true` |

## 事件

### BaseForm Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| finish | 表单提交成功 | `(values: Record<string, any>)` |
| finish-failed | 表单提交失败 | `(errorInfo: any)` |
| values-change | 表单值变化 | `(changedValues: Record<string, any>, allValues: Record<string, any>)` |

### SearchForm Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| collapse | 折叠状态变化 | `(collapsed: boolean)` |

### DialogForm Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| open | 对话框打开 | - |
| opened | 对话框打开完成 | - |
| close | 对话框关闭 | - |
| closed | 对话框关闭完成 | - |
| cancel | 取消操作 | - |

## 支持的表单组件

- `el-input` - 输入框
- `el-input-number` - 数字输入框
- `el-select` - 选择器
- `el-date-picker` - 日期选择器
- `el-time-picker` - 时间选择器
- `el-switch` - 开关
- `el-checkbox` - 复选框
- `el-radio` - 单选框
- `el-textarea` - 文本域

## 样式定制

组件使用 CSS 变量进行样式定制，可以通过以下变量进行主题定制：

```css
:root {
  --el-text-color-primary: #303133;
  --el-text-color-regular: #606266;
  --el-text-color-secondary: #909399;
  --el-border-color-lighter: #ebeef5;
}
```

## 响应式设计

组件内置响应式设计，在小屏幕设备上会自动调整布局：

- 移动端按钮宽度调整为 100%
- 移动端按钮居中对齐
- 移动端间距适当调整

## 注意事项

1. 确保项目中已安装 Element Plus
2. 字段的 `name` 属性必须唯一
3. 验证规则遵循 Element Plus 的规则格式
4. 组件属性通过 `componentProps` 传递
5. 栅格布局使用 Element Plus 的栅格系统
