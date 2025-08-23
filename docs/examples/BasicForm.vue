<script setup lang="ts">
import { reactive, ref } from 'vue'

// 基础表单数据
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  age: '',
  gender: '',
  birthday: '',
  description: '',
})

// 基础表单字段配置
const formFields: any[] = [
  {
    name: 'name',
    label: '姓名',
    component: 'el-input',
    required: true,
    placeholder: '请输入姓名',
    span: 12,
  },
  {
    name: 'email',
    label: '邮箱',
    component: 'el-input',
    required: true,
    placeholder: '请输入邮箱',
    span: 12,
    rules: [
      { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
    ],
  },
  {
    name: 'phone',
    label: '手机号',
    component: 'el-input',
    placeholder: '请输入手机号',
    span: 12,
  },
  {
    name: 'age',
    label: '年龄',
    component: 'el-input-number',
    placeholder: '请输入年龄',
    span: 12,
    componentProps: {
      min: 0,
      max: 150,
    },
  },
  {
    name: 'gender',
    label: '性别',
    component: 'el-select',
    placeholder: '请选择性别',
    span: 12,
    componentProps: {
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
      ],
    },
  },
  {
    name: 'birthday',
    label: '生日',
    component: 'el-date-picker',
    placeholder: '请选择生日',
    span: 12,
  },
  {
    name: 'description',
    label: '描述',
    component: 'el-input',
    placeholder: '请输入描述',
    span: 24,
    componentProps: {
      type: 'textarea',
      rows: 3,
    },
  },
]

// 基础表单验证规则
const formRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
}

// 搜索表单数据
const searchData = reactive({
  keyword: '',
  status: '',
  dateRange: [],
})

// 搜索表单字段配置
const searchFields: any[] = [
  {
    name: 'keyword',
    label: '关键词',
    component: 'el-input',
    placeholder: '请输入关键词',
    span: 8,
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
        { label: '禁用', value: 'disabled' },
      ],
    },
  },
  {
    name: 'dateRange',
    label: '日期范围',
    component: 'el-date-picker',
    placeholder: '请选择日期范围',
    span: 8,
    componentProps: {
      type: 'daterange',
      rangeSeparator: '至',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
    },
  },
]

// 对话框表单数据
const dialogData = reactive({
  name: '',
  email: '',
  phone: '',
})

// 对话框表单字段配置
const dialogFields: any[] = [
  {
    name: 'name',
    label: '姓名',
    component: 'el-input',
    required: true,
    placeholder: '请输入姓名',
  },
  {
    name: 'email',
    label: '邮箱',
    component: 'el-input',
    required: true,
    placeholder: '请输入邮箱',
  },
  {
    name: 'phone',
    label: '手机号',
    component: 'el-input',
    placeholder: '请输入手机号',
  },
]

// 对话框表单验证规则
const dialogRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
}

// 对话框显示状态
const showDialog = ref(false)

// 事件处理
function handleFinish(values: Record<string, any>) {
  console.log('表单数据:', values)
}

function handleFinishFailed(errorInfo: any) {
  console.error('验证错误:', errorInfo)
}

function handleSearch(values: Record<string, any>) {
  console.log('搜索条件:', values)
}

function handleDialogFinish(values: Record<string, any>) {
  console.log('对话框表单数据:', values)
}
</script>

<template>
  <div class="basic-form-example">
    <h2>基础表单示例</h2>

    <!-- 基础表单 -->
    <BaseForm />
    <!-- <BaseForm
      v-model:model="formData"
      :fields="formFields"
      :rules="formRules"
      label-width="120px"
      @finish="handleFinish"
      @finish-failed="handleFinishFailed"
    /> -->

    <el-divider />

    <!-- 搜索表单 -->
    <h3>搜索表单示例</h3>
    <!-- <SearchForm
      v-model:model="searchData"
      :fields="searchFields"
      :collapsed-rows="2"
      @finish="handleSearch"
    /> -->

    <el-divider />

    <!-- 对话框表单 -->
    <h3>对话框表单示例</h3>
    <el-button type="primary" @click="showDialog = true">
      打开表单对话框
    </el-button>

    <!-- <DialogForm
      v-model:visible="showDialog"
      v-model:model="dialogData"
      :fields="dialogFields"
      :rules="dialogRules"
      title="用户信息"
      width="600px"
      @finish="handleDialogFinish"
    /> -->
  </div>
</template>

<style scoped>
.basic-form-example {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.basic-form-example h2 {
  margin-bottom: 20px;
  color: var(--el-text-color-primary);
}

.basic-form-example h3 {
  margin: 20px 0;
  color: var(--el-text-color-primary);
}

.el-divider {
  margin: 30px 0;
}
</style>
