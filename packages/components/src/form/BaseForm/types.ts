import type { FormItemProp, FormItemRule, FormRules } from 'element-plus'
import type { Component } from 'vue'

export interface BaseFormProps {
  // 表单配置
  model?: Record<string, any>
  rules?: FormRules
  labelWidth?: string | number
  labelPosition?: 'left' | 'right' | 'top'
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
  readonly?: boolean
  showMessage?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  validateOnRuleChange?: boolean
  hideRequiredAsterisk?: boolean
  scrollToError?: boolean

  // 布局配置
  inline?: boolean
  layout?: 'horizontal' | 'vertical' | 'inline'
  colon?: boolean
  requiredMark?: boolean | 'optional'

  // 提交配置
  submitText?: string
  resetText?: string
  showSubmitButton?: boolean
  showResetButton?: boolean
  submitButtonProps?: Record<string, any>
  resetButtonProps?: Record<string, any>

  // 自定义配置
  fields?: FormField[]
  onFinish?: (values: Record<string, any>) => void | Promise<void>
  onFinishFailed?: (errorInfo: any) => void
  onValuesChange?: (changedValues: Record<string, any>, allValues: Record<string, any>) => void

  // 样式配置
  className?: string
  style?: Record<string, any>
}

export interface FormField {
  name: string
  label?: string
  component?: Component | string
  componentProps?: Record<string, any>
  rules?: FormItemRule[]
  required?: boolean
  placeholder?: string
  help?: string
  extra?: string
  hidden?: boolean
  disabled?: boolean
  readonly?: boolean
  span?: number
  offset?: number
  order?: number
}

// 扩展的表单实例接口，不直接继承 FormInstance 以避免类型冲突
export interface BaseFormInstance {
  // 基础方法
  validate: (callback?: (valid: boolean) => void) => Promise<boolean>
  validateField: (props?: string | string[], callback?: (valid: boolean) => void) => Promise<void>
  resetFields: (fields?: FormItemProp[]) => void
  clearValidate: (fields?: FormItemProp[]) => void
  scrollToField: (prop: string) => void

  // 扩展的方法
  validateFields: (fields?: string[]) => Promise<Record<string, any>>
  getFieldValue: (name: string) => any
  setFieldValue: (name: string, value: any) => void
  getFieldsValue: (names?: string[]) => Record<string, any>
  setFieldsValue: (values: Record<string, any>) => void
}
