<script setup lang="ts">
import type { Component } from 'vue'
import type { FormField } from './types'
import { computed, ref, watch } from 'vue'

interface Props {
  field: FormField
  value: any
  disabled?: boolean
  readonly?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:value': [value: any]
  'change': [value: any]
  'input': [value: any]
  'blur': [event: Event]
  'focus': [event: Event]
}>()

// 字段值
const fieldValue = ref(props.value)

// 字段组件
const fieldComponent = computed<Component | string>(() => {
  if (typeof props.field.component === 'string') {
    return props.field.component
  }
  return props.field.component || 'el-input'
})

// 组件属性
const componentProps = computed(() => {
  const baseProps = {
    clearable: true,
    ...props.field.componentProps,
  }

  // 根据组件类型设置默认属性
  switch (props.field.component) {
    case 'el-select':
      return {
        ...baseProps,
        filterable: true,
        placeholder: props.field.placeholder || '请选择',
      }
    case 'el-date-picker':
      return {
        ...baseProps,
        type: 'date',
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
        placeholder: props.field.placeholder || '请选择日期',
      }
    case 'el-time-picker':
      return {
        ...baseProps,
        format: 'HH:mm:ss',
        valueFormat: 'HH:mm:ss',
        placeholder: props.field.placeholder || '请选择时间',
      }
    case 'el-input-number':
      return {
        ...baseProps,
        placeholder: props.field.placeholder || '请输入数字',
      }
    case 'el-switch':
      return {
        ...baseProps,
      }
    case 'el-checkbox':
      return {
        ...baseProps,
      }
    case 'el-radio':
      return {
        ...baseProps,
      }
    default:
      return {
        ...baseProps,
        placeholder: props.field.placeholder || '请输入',
      }
  }
})

// 事件处理
function handleChange(value: any) {
  emit('update:value', value)
  emit('change', value)
}

function handleInput(value: any) {
  emit('update:value', value)
  emit('input', value)
}

function handleBlur(event: Event) {
  emit('blur', event)
}

function handleFocus(event: Event) {
  emit('focus', event)
}

// 监听值变化
watch(() => props.value, (newValue) => {
  fieldValue.value = newValue
})

watch(fieldValue, (newValue) => {
  emit('update:value', newValue)
})
</script>

<template>
  <div class="form-field">
    <component
      :is="fieldComponent"
      v-model="fieldValue"
      v-bind="componentProps"
      :placeholder="field.placeholder"
      :disabled="field.disabled || disabled"
      :readonly="field.readonly || readonly"
      @change="handleChange"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </div>
</template>

<style scoped>
.form-field {
  width: 100%;
}
</style>
