# ProTable - 高级表格

ProTable 是一个功能强大的表格组件，集成了搜索、分页、排序、筛选等功能。

## 基础用法

```vue
<template>
  <ProTable
    :columns="columns"
    :dataSource="dataSource"
    :pagination="pagination"
    @search="handleSearch"
    @change="handleTableChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { ProTable } from '@pro-components/components'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    search: true
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: true
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    search: true
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    filters: [
      { text: '启用', value: 'active' },
      { text: '禁用', value: 'inactive' }
    ]
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => [
      <el-button type="primary" size="small" onClick={() => handleEdit(record)}>
        编辑
      </el-button>,
      <el-button type="danger" size="small" onClick={() => handleDelete(record)}>
        删除
      </el-button>
    ]
  }
]

const dataSource = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', status: 'active' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com', status: 'inactive' }
])

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 100,
  showSizeChanger: true,
  showQuickJumper: true
})

const handleSearch = (searchParams) => {
  console.log('搜索参数:', searchParams)
}

const handleTableChange = (pagination, filters, sorter) => {
  console.log('表格变化:', { pagination, filters, sorter })
}

const handleEdit = (record) => {
  console.log('编辑:', record)
}

const handleDelete = (record) => {
  console.log('删除:', record)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| columns | 列配置 | array | [] |
| dataSource | 数据源 | array | [] |
| pagination | 分页配置 | object | false |
| loading | 加载状态 | boolean | false |
| rowKey | 行键 | string \| function | 'id' |
| scroll | 表格滚动配置 | object | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| search | 搜索时触发 | (searchParams: object) |
| change | 表格变化时触发 | (pagination, filters, sorter) |
| row-click | 行点击时触发 | (record: object, index: number) |
| selection-change | 选择变化时触发 | (selection: array) |
