import type { BaseFormProps } from '../../BaseForm/types'

export interface DialogFormProps extends Omit<BaseFormProps, 'layout' | 'showSubmitButton' | 'showResetButton'> {
  // 对话框配置
  visible?: boolean
  title?: string
  width?: string | number
  fullscreen?: boolean
  top?: string
  modal?: boolean
  appendToBody?: boolean
  lockScroll?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  beforeClose?: (done: () => void) => void
  
  // 表单配置
  submitText?: string
  resetText?: string
  submitButtonProps?: Record<string, any>
  resetButtonProps?: Record<string, any>
  
  // 事件
  onOpen?: () => void
  onOpened?: () => void
  onClose?: () => void
  onClosed?: () => void
  onCancel?: () => void
  
  // 样式配置
  dialogClass?: string
  dialogStyle?: Record<string, any>
}
