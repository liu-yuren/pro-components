<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { Component } from 'vue'
import type { BaseFormInstance, BaseFormProps } from './types'
import { parseTime } from '@pro-components/utils'
import { computed, nextTick, ref, watch } from 'vue'
import FormFieldComponent from './FormField.vue'

// Props
const props = withDefaults(defineProps<BaseFormProps>(), {
  model: () => ({}),
  rules: () => ({}),
  labelWidth: 'auto',
  labelPosition: 'right',
  size: 'default',
  disabled: false,
  readonly: false,
  showMessage: true,
  inlineMessage: false,
  statusIcon: false,
  validateOnRuleChange: true,
  hideRequiredAsterisk: false,
  scrollToError: false,
  inline: false,
  layout: 'horizontal',
  colon: true,
  requiredMark: true,
  submitText: '提交',
  resetText: '重置',
  showSubmitButton: true,
  showResetButton: true,
  submitButtonProps: () => ({}),
  resetButtonProps: () => ({}),
  fields: () => [],
  className: '',
  style: () => ({}),
})

// Emits
const emit = defineEmits<{
  'update:model': [value: Record<string, any>]
  'finish': [value: Record<string, any>]
  'finish-failed': [errorInfo: any]
  'values-change': [changedValues: Record<string, any>, allValues: Record<string, any>]
}>()

// Refs
const formRef = ref<FormInstance>()
const submitting = ref(false)

// 表单数据模型
const formModel = ref<Record<string, any>>({ ...props.model })

// 计算属性
const formClass = computed(() => ({
  'base-form__form': true,
  'base-form__form--inline': props.inline,
  'base-form__form--vertical': props.layout === 'vertical',
}))

const showActionButtons = computed(() => props.showSubmitButton || props.showResetButton)

const sortedFields = computed(() => {
  return [...props.fields].sort((a, b) => (a.order || 0) - (b.order || 0))
})

// 方法
function resolveComponent(component: Component | string | undefined): Component | string {
  if (!component)
    return 'el-input'
  return component
}

function handleFieldChange(name: string, value: any) {
  const oldValue = formModel.value[name]
  formModel.value[name] = value

  // 触发值变化事件
  emit('values-change', { [name]: value }, { ...formModel.value })

  // 触发父组件的值变化事件
  if (props.onValuesChange) {
    props.onValuesChange({ [name]: value }, { ...formModel.value })
  }
}

async function handleSubmit() {
  if (!formRef.value)
    return

  try {
    submitting.value = true
    const valid = await formRef.value.validate()

    if (valid) {
      const values = { ...formModel.value }

      // 触发完成事件
      emit('finish', values)

      // 触发父组件的完成事件
      if (props.onFinish) {
        await props.onFinish(values)
      }
    }
  }
  catch (error) {
    // 触发失败事件
    emit('finish-failed', error)

    // 触发父组件的失败事件
    if (props.onFinishFailed) {
      props.onFinishFailed(error)
    }
  }
  finally {
    submitting.value = false
  }
}

function handleReset() {
  if (!formRef.value)
    return
  formRef.value.resetFields()
  formModel.value = { ...props.model }
}

// 暴露的方法
async function validateFields(fields?: string[]) {
  if (!formRef.value)
    return {}
  await formRef.value.validate(fields)
  return { ...formModel.value }
}

function getFieldValue(name: string) {
  return formModel.value[name]
}

function setFieldValue(name: string, value: any) {
  formModel.value[name] = value
}

function getFieldsValue(names?: string[]) {
  if (!names)
    return { ...formModel.value }
  const result: Record<string, any> = {}
  names.forEach((name) => {
    result[name] = formModel.value[name]
  })
  return result
}

function setFieldsValue(values: Record<string, any>) {
  Object.assign(formModel.value, values)
}

function resetFields(fields?: string[]) {
  if (!formRef.value)
    return
  formRef.value.resetFields(fields)
  if (fields) {
    fields.forEach((field) => {
      formModel.value[field] = props.model[field]
    })
  }
  else {
    formModel.value = { ...props.model }
  }
}

function clearValidate(fields?: string[]) {
  if (!formRef.value)
    return
  formRef.value.clearValidate(fields)
}

// 监听 props.model 变化
watch(() => props.model, (newModel) => {
  formModel.value = { ...newModel }
}, { deep: true })

// 监听 formModel 变化，同步到父组件
watch(formModel, (newModel) => {
  emit('update:model', newModel)
}, { deep: true })

// 暴露组件实例
defineExpose<BaseFormInstance>({
  validate: (callback?: (valid: boolean) => void) => formRef.value?.validate(callback),
  validateField: (props?: string | string[], callback?: (valid: boolean) => void) =>
    formRef.value?.validateField(props, callback),
  resetFields,
  clearValidate,
  scrollToField: (prop: string) => formRef.value?.scrollToField(prop),
  // 扩展的方法
  validateFields,
  getFieldValue,
  setFieldValue,
  getFieldsValue,
  setFieldsValue,
})
</script>

<template>
  <div class="base-form" :class="[`base-form--${layout}`, className]">
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :size="size"
      :disabled="disabled"
      :readonly="readonly"
      :show-message="showMessage"
      :inline-message="inlineMessage"
      :status-icon="statusIcon"
      :validate-on-rule-change="validateOnRuleChange"
      :hide-required-asterisk="hideRequiredAsterisk"
      :scroll-to-error="scrollToError"
      :inline="inline"
      :class="formClass"
      :style="style"
    >
      <el-row :gutter="24">
        <template v-for="field in sortedFields" :key="field.name">
          <el-col
            v-if="!field.hidden"
            :span="field.span || 24"
            :offset="field.offset || 0"
            :order="field.order || 0"
          >
            <el-form-item
              :label="field.label"
              :prop="field.name"
              :required="field.required"
              :rules="field.rules"
            >
              <template v-if="field.label" #label>
                <span class="base-form__label">
                  {{ field.label }}
                  <span v-if="colon" class="base-form__colon">:</span>
                </span>
              </template>

              <FormFieldComponent
                :field="field"
                :value="formModel[field.name]"
                :disabled="disabled"
                :readonly="readonly"
                @update:value="(value) => handleFieldChange(field.name, value)"
              />

              <template v-if="field.help" #error>
                <div class="base-form__help">
                  {{ field.help }}
                </div>
              </template>

              <template v-if="field.extra" #extra>
                <div class="base-form__extra">
                  {{ field.extra }}
                </div>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>

      <!-- 操作按钮 -->
      <div v-if="showActionButtons" class="base-form__actions">
        <el-button
          v-if="showSubmitButton"
          type="primary"
          :loading="submitting"
          v-bind="submitButtonProps"
          @click="handleSubmit"
        >
          {{ submitText }}
        </el-button>

        <el-button
          v-if="showResetButton"
          v-bind="resetButtonProps"
          @click="handleReset"
        >
          {{ resetText }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.base-form {
  width: 100%;
}

.base-form--horizontal .base-form__form {
  /* 水平布局样式 */
}

.base-form--vertical .base-form__form {
  /* 垂直布局样式 */
}

.base-form--inline .base-form__form {
  /* 行内布局样式 */
}

.base-form__label {
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.base-form__colon {
  margin-left: 4px;
  color: var(--el-text-color-regular);
}

.base-form__help {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-top: 4px;
}

.base-form__extra {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-top: 4px;
}

.base-form__actions {
  margin-top: 24px;
  text-align: right;
}

.base-form__actions .el-button + .el-button {
  margin-left: 12px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .base-form__actions {
    text-align: center;
  }

  .base-form__actions .el-button {
    width: 100%;
    margin-bottom: 12px;
  }

  .base-form__actions .el-button + .el-button {
    margin-left: 0;
  }
}
</style>
