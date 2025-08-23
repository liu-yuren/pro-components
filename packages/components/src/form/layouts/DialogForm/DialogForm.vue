<script setup lang="ts">
import type { DialogFormProps } from './types'
import { computed, ref, watch } from 'vue'
import BaseForm from '../../BaseForm/BaseForm.vue'

// Props
const props = withDefaults(defineProps<DialogFormProps>(), {
  visible: false,
  title: '表单',
  width: '600px',
  fullscreen: false,
  top: '15vh',
  modal: true,
  appendToBody: false,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
  submitText: '确定',
  resetText: '取消',
  submitButtonProps: () => ({}),
  resetButtonProps: () => ({}),
  dialogClass: '',
  dialogStyle: () => ({}),
})

// Emits
const emit = defineEmits<{
  'update:visible': [value: boolean]
  'open': []
  'opened': []
  'close': []
  'closed': []
  'cancel': []
  'finish': [values: Record<string, any>]
  'finish-failed': [errorInfo: any]
}>()

// Refs
const formRef = ref<BaseFormInstance>()
const submitting = ref(false)

// 计算属性
const dialogVisible = computed({
  get: () => props.visible,
  set: (value: boolean) => {
    emit('update:visible', value)
  },
})

// 表单数据
const formModel = ref<Record<string, any>>({ ...props.model })

// 方法
function handleBeforeClose(done: () => void) {
  if (props.beforeClose) {
    props.beforeClose(done)
  }
  else {
    done()
  }
}

function handleOpen() {
  emit('open')
  if (props.onOpen) {
    props.onOpen()
  }
}

function handleOpened() {
  emit('opened')
  if (props.onOpened) {
    props.onOpened()
  }
}

function handleClose() {
  emit('close')
  if (props.onClose) {
    props.onClose()
  }
}

function handleClosed() {
  emit('closed')
  if (props.onClosed) {
    props.onClosed()
  }
}

function handleCancel() {
  dialogVisible.value = false
  emit('cancel')
  if (props.onCancel) {
    props.onCancel()
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

      // 关闭对话框
      dialogVisible.value = false
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

async function handleFinish(values: Record<string, any>) {
  // 触发完成事件
  emit('finish', values)

  // 触发父组件的完成事件
  if (props.onFinish) {
    await props.onFinish(values)
  }

  // 关闭对话框
  dialogVisible.value = false
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
  ...formRef.value,
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :fullscreen="fullscreen"
    :top="top"
    :modal="modal"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :before-close="handleBeforeClose"
    :class="dialogClass"
    :style="dialogStyle"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
  >
    <BaseForm
      ref="formRef"
      v-model:model="formModel"
      :fields="fields"
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
      :colon="colon"
      :required-mark="requiredMark"
      :on-finish="handleFinish"
      :on-finish-failed="onFinishFailed"
      :on-values-change="onValuesChange"
      :class="className"
      :style="style"
    />

    <template #footer>
      <div class="dialog-form__footer">
        <el-button @click="handleCancel">
          {{ resetText }}
        </el-button>
        <el-button
          type="primary"
          :loading="submitting"
          v-bind="submitButtonProps"
          @click="handleSubmit"
        >
          {{ submitText }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.dialog-form__footer {
  text-align: right;
}

.dialog-form__footer .el-button + .el-button {
  margin-left: 12px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .dialog-form__footer {
    text-align: center;
  }

  .dialog-form__footer .el-button {
    width: 100%;
    margin-bottom: 12px;
  }

  .dialog-form__footer .el-button + .el-button {
    margin-left: 0;
  }
}
</style>
