<script setup lang="ts">
import type { SearchFormProps } from './types'
import { computed, ref, watch } from 'vue'
import BaseForm from '../../BaseForm/BaseForm.vue'

// Props
const props = withDefaults(defineProps<SearchFormProps>(), {
  collapsed: undefined,
  defaultCollapsed: true,
  searchText: '搜索',
  resetText: '重置',
  collapsedRows: 1,
  expandIcon: '',
  collapseIcon: '',
  ghost: false,
  cardProps: () => ({}),
})

// Emits
const emit = defineEmits<{
  'update:collapsed': [value: boolean]
  'collapse': [value: boolean]
}>()

// Refs
const formRef = ref<any>()
const internalCollapsed = ref(props.defaultCollapsed)

// 计算属性
const collapsed = computed({
  get: () => props.collapsed !== undefined ? props.collapsed : internalCollapsed.value,
  set: (value: boolean) => {
    internalCollapsed.value = value
    emit('update:collapsed', value)
    emit('collapse', value)
  },
})

const showCollapseButton = computed(() => {
  return props.fields && props.fields.length > props.collapsedRows
})

const visibleFields = computed(() => {
  if (!props.fields)
    return []

  if (collapsed.value) {
    return props.fields.slice(0, props.collapsedRows)
  }

  return props.fields
})

const collapseText = computed(() => {
  if (props.collapseRender) {
    return props.collapseRender(collapsed.value)
  }
  return collapsed.value ? '展开' : '收起'
})

// 表单数据
const formModel = ref<Record<string, any>>({ ...props.model })

// 方法
function toggleCollapse() {
  collapsed.value = !collapsed.value

  if (props.onCollapse) {
    props.onCollapse(collapsed.value)
  }
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
defineExpose<any>({
  ...formRef.value,
})
</script>

<template>
  <div class="search-form" :class="{ 'search-form--ghost': ghost }">
    <el-card v-if="!ghost" v-bind="cardProps" class="search-form__card">
      <BaseForm
        ref="formRef"
        v-model:model="formModel"
        :fields="visibleFields"
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
        :submit-text="searchText"
        :reset-text="resetText"
        :show-submit-button="true"
        :show-reset-button="true"
        :submit-button-props="submitButtonProps"
        :reset-button-props="resetButtonProps"
        :on-finish="onFinish"
        :on-finish-failed="onFinishFailed"
        :on-values-change="onValuesChange"
        :class="className"
        :style="style"
      />

      <!-- 折叠按钮 -->
      <div v-if="showCollapseButton" class="search-form__collapse">
        <el-button
          type="link"
          size="small"
          @click="toggleCollapse"
        >
          {{ collapseText }}
          <el-icon class="search-form__collapse-icon">
            <component :is="collapsed ? expandIcon : collapseIcon" />
          </el-icon>
        </el-button>
      </div>
    </el-card>

    <!-- 无卡片模式 -->
    <div v-else class="search-form__content">
      <BaseForm
        ref="formRef"
        v-model:model="formModel"
        :fields="visibleFields"
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
        :submit-text="searchText"
        :reset-text="resetText"
        :show-submit-button="true"
        :show-reset-button="true"
        :submit-button-props="submitButtonProps"
        :reset-button-props="resetButtonProps"
        :on-finish="onFinish"
        :on-finish-failed="onFinishFailed"
        :on-values-change="onValuesChange"
        :class="className"
        :style="style"
      />

      <!-- 折叠按钮 -->
      <div v-if="showCollapseButton" class="search-form__collapse">
        <el-button
          type="link"
          size="small"
          @click="toggleCollapse"
        >
          {{ collapseText }}
          <el-icon class="search-form__collapse-icon">
            <component :is="collapsed ? expandIcon : collapseIcon" />
          </el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-form {
  width: 100%;
}

.search-form--ghost .search-form__content {
  padding: 16px;
  background: transparent;
}

.search-form__card {
  margin-bottom: 16px;
}

.search-form__card :deep(.el-card__body) {
  padding: 24px;
}

.search-form__collapse {
  text-align: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--el-border-color-lighter);
}

.search-form__collapse-icon {
  margin-left: 4px;
  transition: transform 0.3s;
}

.search-form__collapse-icon.is-expanded {
  transform: rotate(180deg);
}

/* 响应式布局 */
@media (max-width: 768px) {
  .search-form__card :deep(.el-card__body) {
    padding: 16px;
  }

  .search-form__collapse {
    margin-top: 12px;
    padding-top: 12px;
  }
}
</style>
