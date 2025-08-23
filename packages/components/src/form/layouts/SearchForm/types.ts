import type { BaseFormProps } from '../../BaseForm/types'

export interface SearchFormProps extends Omit<BaseFormProps, 'layout' | 'showSubmitButton' | 'showResetButton'> {
  // 搜索表单特有属性
  collapsed?: boolean
  defaultCollapsed?: boolean
  collapseRender?: (collapsed: boolean) => string
  onCollapse?: (collapsed: boolean) => void
  
  // 搜索按钮配置
  searchText?: string
  resetText?: string
  submitButtonProps?: Record<string, any>
  resetButtonProps?: Record<string, any>
  
  // 折叠配置
  collapsedRows?: number
  expandIcon?: any
  collapseIcon?: any
  
  // 样式配置
  cardProps?: Record<string, any>
  ghost?: boolean
}
